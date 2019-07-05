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
              trip_id: trip.trip_id,
              bus_id: trip.bus_id,
              origin: trip.origin,
              destination: trip.destination,
              trip_date: trip.trip_date,
              fare: trip.fare,
              status: trip.status
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
  
  export default Trip;