import Model from '../models/db';

class Loans {
  static model() {
    return new Model('loans');
  }


  static async getAllLoans(req, res) {
    try {
      const rows = await Loans.model().select('id, fullName, email, date, amount, homeAddress, officeAddress, verified, approved');
      if (rows.length === 0) {
        return res.status(400).json({
          status: 'error',
          message: 'No user found'
        });
      }

      return res.status(200).json({
        data: rows,

      });
    } catch (e) {
      return res.status(500).json({
        error: 'server error',
        e
      });
    }
  }

  static async applyLoan(req, res) {
    try {
      const {
        fullName, email, amount, homeAddress, officeAddress
      } = req.body;

      const rows = await Loans.model().insert(
        'fullName, email, amount, homeAddress, officeAddress',
        `'${fullName}','${email}', '${amount}', '${homeAddress}', '${officeAddress}'`
      );
      if (rows[0].length === 0) {
        return res.status(400).json({
          status: 'error',
          message: 'No user found'
        });
      }
      return res.status(201).json({
        status: 'success',
        data: {
          id: rows[0].id,
          fullName: rows[0].fullName,
          email: rows[0].email,
          amount: rows[0].amount,
          homeAddress: rows[0].homeAddress,
          officeAddress: rows[0].officeAddress,
          verified: rows[0].verified,
          approved: rows[0].approved
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

export default Loans;
