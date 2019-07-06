import express from 'express';
import User from '../controller/User';
import Trip from '../controller/Trip';
import {
  validateRegisterationCredentials, validateSigninCredentials, validateTripCredentials
} from '../middlewares/validateCredentials';
import validateEmailExistence from '../middlewares/validateEmailExistence';
import { verifyToken } from '../helper/token';
import { isAdmin } from '../middlewares/isAdmin';


const {
  signUp, signIn, getAllUsers
} = User;
const { createTrip, getAllTrips, cancelTrip 
} = Trip;

const router = express.Router();
// User
router.post('/auth/signup', validateRegisterationCredentials, validateEmailExistence, signUp);
router.post('/auth/signin', validateSigninCredentials, signIn);
router.get('/users', isAdmin, getAllUsers);

// Trip
router.post('/trips', validateTripCredentials, isAdmin, createTrip);
router.get('/trips', verifyToken, getAllTrips);
router.patch('/trips/:tripId', isAdmin, cancelTrip);

export default router;