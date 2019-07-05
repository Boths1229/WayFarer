import Model from '../models/db';

class Trip {
    static model() {
      return new Model('Trip');
    }
    static async createTrip(req, res) {
        try {
          const {
          origin, destination, fare
          } = req.body; 
          const trip = await Trip.model().insert(
            'origin, destination, fare', '$1, $2, $3',
            [origin, destination, fare]
          );
    
          return res.status(201).json({
            status: 'success',
            data: {
              trip_id: trip[0].trip_id,
              bus_id: trip[0].bus_id,
              origin: trip[0].origin,
              destination: trip[0].destination,
              trip_date: trip[0].trip_date,
              fare: trip[0].fare,
              status: trip[0].status
            }
          });
        } catch (e) {
          return res.status(500).json({
            error: e.message,
            e
          });
        }
      }

      static async getAllTrips(req, res) {
        try {
          const rows = await Trip.model().select('trip_id, bus_id, origin, destination, trip_date, fare, status');
          if (rows.length === 0) {
            return res.status(400).json({
              status: 'error',  
              message: 'No trip found'
            });
          }
    
          return res.status(200).json({
            status: 'success',
            data: rows,
    
          });
        } catch (e) {
          return res.status(500).json({
            error: 'server error',
            e
          });
        }
      }
    
  }
  
  export default Trip;