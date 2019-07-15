import Model from '../models/db';

class Book {
    static model() {
      return new Model('Booking');
    }
    static trips() {
        return new Model('Trip');
      }
    static seat() {
        return new Model('Bus');
      }  
    static async seatBooking(req, res) {
        try {
          const {
          trip_id
          } = req.body; 

          const check = await Book.trips().select('*', 'trip_id=$1', [trip_id]);
          if (!check[0]) {
            return res.status(400).json({
                status: 'error',
                message: 'invalid trip id',
            });
          }
          const busId = check[0].bus_id;
          const seatCheck = await Book.seat().select('*', 'bus_id=$1', [busId]);
          const busCapacity = seatCheck[0].capacity;
          
          const bookingId = await Book.model().select('*', `trip_id=${check[0].trip_id}`)
          if (bookingId.length > busCapacity ) {
            return res.status(400).json({
              status: 'error',
              message: 'No more seat available in this bus',
          });
          }
          const seatsBooked = bookingId.length
          const book = await Book.model().insert(
            'trip_id, user_id, bus_id, trip_date, seat_number, number_plate, model, first_name, last_name, email', '$1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11',
            [check[0].trip_id, req.user.userId, check[0].bus_id, check[0].trip_date, seatsBooked, seatCheck[0].number_plate, seatCheck[0].model, req.user.firstName, req.user.lastName, req.user.email]
          );
          
              return res.status(201).json({
                status: 'success',
                data: {
                  booking_id: book[0].booking_id,
                  user_id: book[0].user_id,
                  trip_id: check[0].trip_id,
                  bus_id: check[0].bus_id,
                  trip_date: check[0].trip_date,
                  seat_number: seatsBooked,
                  number_plate: seatCheck[0].number_plate,
                  model: seatCheck[0].model,
                  first_name: book[0].first_name,
                  last_name: book[0].last_name,
                  email: book[0].email
                }
            });
        } catch (e) {
          return res.status(500).json({
            error: e.message,
            e
          });
        }
      }
      static async getAllBookings(req, res) {
        try {
            if ( req.user.isAdmin === false ) {    
                const rows = await Book.model().select('booking_id, user_id, trip_id, bus_id, trip_date, seat_number, number_plate, model, first_name, last_name, email', `user_id=${req.user.userId}`);
                
                if (rows.length === 0) {
                  return res.status(400).json({
                    status: 'error',  
                    message: 'No booking found'
                  });
                }
      
                return res.status(200).json({
                  status: 'success',
                  data: rows,
          
                });
              }
           if ( req.user.isAdmin === true ) {    
          const rows = await Book.model().select('booking_id, user_id, trip_id, bus_id, trip_date, seat_number, number_plate, model, first_name, last_name, email');
          
          if (rows.length === 0) {
            return res.status(400).json({
              status: 'error',  
              message: 'No booking found'
            });
          }

          return res.status(200).json({
            status: 'success',
            data: rows,
    
          });
        }
        
        } catch (e) {
          return res.status(500).json({
            error: 'server error',
            e
          });
        }
      }
      static async deleteBooking(req, res) {
          try {
            const { bookingId } = req.params;
            const rows = await Book.model().delete('booking_id=$1', [bookingId]);
            if (rows.user_id !== req.user.userId ) {
                return res.status(409).json({
                    status: 'error',
                    message: 'you can only delete your own booking'
                })
            }      
            if (rows.user_id === req.user.userId) {
              return res.status(200).json({
                status: 'success',
                data: {
                    message: 'Booking deleted successfully',
                    booking_id: rows.booking_id,
                    trip_id: rows.trip_id,
                    bus_id: rows.bus_id,
                    trip_date: rows.trip_date,
                    seat_number: rows.seat_number
                   },
                 });
              }
            return res.status(404).json({
              status: 'error',  
              message: 'booking not found'
            });
          } catch (e) {
            return res.status(500).json({
              error: 'server error'
            });
     }
  }
}
  
  export default Book;