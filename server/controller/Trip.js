import Model from '../models/db';

class Trip {
    static model() {
      return new Model('Trip');
    }
    static bus() {
      return new Model('Bus');
    }
    static async createTrip(req, res) {
        try {
          const {
          origin, destination, fare, bus_id, trip_date
          } = req.body; 
          const check = await Trip.bus().select('*', 'bus_id=$1', [bus_id]);
          if (!check[0]) {
            return res.status(400).json({
                status: 'error',
                message: 'invalid bus id',
            });
          }
          const trip = await Trip.model().insert(
            'origin, destination, fare, bus_id, trip_date, number_plate, model, capacity', '$1, $2, $3, $4, $5, $6, $7, $8',
            [origin, destination, fare, bus_id, trip_date, check[0].number_plate, check[0].model, check[0].capacity]
          );
    
          return res.status(201).json({
            status: 'success',
            data: {
              id: trip[0].id,
              trip_id: trip[0].trip_id,
              bus_id: trip[0].bus_id,
              origin: trip[0].origin,
              destination: trip[0].destination,
              trip_date: trip[0].trip_date,
              fare: trip[0].fare,
              number_plate: check[0].number_plate,
              model: check[0].model,
              capacity: check[0].capacity,
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
          const rows = await Trip.model().select('id, trip_id, bus_id, origin, destination, trip_date, number_plate, model, capacity, fare, status');
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
    
      static async cancelTrip(req, res) {
        try {
          const { tripId } = req.params;
          const rows = await Trip.model().update('status=$1', 'trip_id=$2', ['cancelled', tripId]);
    
          if (rows) {
            return res.status(200).json({
              status: 'success',
              data: {
                message: 'Trip Cancelled Successfully',
                id: rows.id,
                trip_id: rows.trip_id,
                bus_id: rows.bus_id,
                origin: rows.origin,
                destination: rows.destination,
                trip_date: rows.trip_date,
                fare: rows.fare,
                status: rows.status
              },
            });
          }

          return res.status(404).json({
            status: 'error',  
            message: 'trip not found'
          });
        } catch (e) {
          return res.status(500).json({
            error: 'server error',
            e
          });
        }
      }
      static async getTripsDestination(req, res) {
        try {
          const { destination } = req.params;
          const rows = await Trip.model().select('*', `destination=${destination}`);
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