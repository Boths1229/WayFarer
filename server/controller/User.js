import { createToken } from '../helper/token';
import Model from '../models/db';
import pass from '../helper/password';

class User {
  static model() {
    return new Model('users');
  }


  static async getAllUsers(req, res) {
    try {
      const rows = await User.model().select('id, email, first_name, last_name, is_admin');
      if (rows.length === 0) {
        return res.status(400).json({
          status: 'error',  
          message: 'No user found'
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

  static async signUp(req, res) {
    try {
      const {
        email, first_name, last_name
      } = req.body;

      let { password } = req.body;
      const token = createToken({
        email, first_name, last_name
      });
      password = pass.hashPassword(password);
      const rows = await User.model().insert(
        'email, first_name, last_name, password',
        `'${email}', '${first_name}', '${last_name}', '${password}'`
      );

      return res.status(201).json({
        status: 'success',
        data: {
          user_id: rows.user_id,
          is_admin: rows.is_admin,
          token,
          first_name: rows.first_name,
          last_name: rows.last_name,
          email: rows.email
        }
      });
    } catch (e) {
      return res.status(500).json({
        error: e.message,
        e
      });
    }
  }

  static async signIn(req, res) {
    try {
      const { email, password } = req.body;
      const registered = await User.model().select('*', 'email=$1', [email]);

      if (registered && pass.decryptPassword(password, registered.password)) {
        const isAdmin = registered.is_admin;
        const token = createToken({ email, password, isAdmin });
        console.log(isAdmin);
        return res.status(200).json({
          status: 'success',
          data: {
            user_id: registered.user_id,
            is_admin: registered.is_admin,
            token,
            first_name: registered.first_name,
            last_name: registered.last_name,
            email: registered.email
          }
        });
      } return res.status(401).json({
        status: 'error',
        message: 'invalid email or password'
      });
    } catch (e) {
      return res.status(500).json({
        error: 'server error',
        e
      });
    }
  }
}

export default User;