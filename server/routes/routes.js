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
<<<<<<< HEAD
const { createTrip, getAllTrips, cancelTrip 
=======
const { createTrip, getAllTrips 
>>>>>>> develop
} = Trip;

const router = express.Router();
// User
router.post('/auth/signup', validateRegisterationCredentials, validateEmailExistence, signUp);
router.post('/auth/signin', validateSigninCredentials, signIn);
router.get('/users', isAdmin, getAllUsers);

// Trip
router.post('/trips', validateTripCredentials, isAdmin, createTrip);
router.get('/trips', verifyToken, getAllTrips);
<<<<<<< HEAD
router.patch('/trips/:tripId', isAdmin, cancelTrip);
=======
>>>>>>> develop

export default router;