import express from 'express';
import User from '../controller/User';
import {
  validateRegisterationCredentials
} from '../middlewares/validateCredentials';
import validateEmailExistence from '../middlewares/validateEmailExistence';

const {
  signUp
} = User;
const router = express.Router();

router.post('/auth/signup', validateRegisterationCredentials, validateEmailExistence, signUp);

export default router;