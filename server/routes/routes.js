import express from 'express';
import User from '../controller/User';
import {
  validateRegisterationCredentials, validateSigninCredentials
} from '../middlewares/validateCredentials';
import validateEmailExistence from '../middlewares/validateEmailExistence';
// import { verifyToken } from '../helper/token';
import { isAdmin } from '../middlewares/isAdmin';


const {
  signUp, signIn, getAllUsers
} = User;
const router = express.Router();

router.post('/auth/signup', validateRegisterationCredentials, validateEmailExistence, signUp);
router.post('/auth/signin', validateSigninCredentials, signIn);
router.get('/users', isAdmin, getAllUsers);

export default router;