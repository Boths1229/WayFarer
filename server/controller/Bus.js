import Model from '../models/db';

class Bus {
    static model() {
      return new Model('Bus');
    }
    static async createBus(req, res) {
        try {
          const {
          number_plate, manufacturer, model, year, capacity
          } = req.body; 
          const bus = await Bus.model().insert(
            'number_plate, manufacturer, model, year, capacity', '$1, $2, $3, $4, $5',
            [number_plate, manufacturer, model, year, capacity]
          );
    
          return res.status(201).json({
            status: 'success',
            data: {
              bus_id: bus[0].bus_id,
              number_plate: bus[0].number_plate,
              manufacturer: bus[0].manufacturer,
              model: bus[0].model,
              year: bus[0].year,
              capacity: bus[0].capacity,
            }
          });
        } catch (e) {
          return res.status(500).json({
            error: e.message,
            e
          });
        }
      }

      static async getAllBus(req, res) {
        try {
          const rows = await Bus.model().select('bus_id, number_plate, manufacturer, model, year, capacity');
          if (rows.length === 0) {
            return res.status(400).json({
              status: 'error',  
              message: 'No bus found'
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
  
  export default Bus;