import Model from '../models/db';

class Book {
    static model() {
      return new Model('Booking');
    }
    static trips() {
        return new Model('Trip');
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

          const book = await Book.model().insert(
            'trip_id, user_id, bus_id, first_name, last_name, email', '$1, $2, $3, $4, $5, $6',
            [check[0].trip_id, req.user.userId, check[0].bus_id, req.user.firstName, req.user.lastName, req.user.email]
          );
    
          return res.status(201).json({
            status: 'success',
            data: {
              booking_id: book[0].booking_id,
              user_id: book[0].user_id,
              trip_id: check[0].trip_id,
              bus_id: check[0].bus_id,
              trip_date: book[0].trip_date,
              seat_number: book[0].seat_number,
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
  }
  
  export default Book;