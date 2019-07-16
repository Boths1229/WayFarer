import express from 'express';
import User from '../controller/User';
import Trip from '../controller/Trip';
import Bus from '../controller/Bus';
import Booking from '../controller/Booking';
import {
  validateRegisterationCredentials, validateSigninCredentials, validateTripCredentials, validateBookingCredentials, 
  validateBusCredentials
} from '../middlewares/validateCredentials';
import validateEmailExistence from '../middlewares/validateEmailExistence';
import { verifyToken } from '../helper/token';
import { isAdmin } from '../middlewares/isAdmin';


const {
  signUp, signIn, getAllUsers
} = User;
const { createTrip, getAllTrips, cancelTrip, getTripsDestination
} = Trip;
const { seatBooking, getAllBookings, deleteBooking
} = Booking;
const { createBus, getAllBus } = Bus

const router = express.Router();
// User
router.post('/auth/signup', validateEmailExistence, signUp);
router.post('/auth/signin', signIn);
router.get('/users', isAdmin, getAllUsers);

// Trip
router.post('/trips', isAdmin, createTrip);
router.get('/trips', verifyToken, getAllTrips);
router.patch('/trips/:tripId', isAdmin, cancelTrip);
router.get('/trips?sort_by=destination.asc', verifyToken, getTripsDestination);

// Booking
router.post('/bookings', verifyToken, seatBooking);
router.get('/bookings', verifyToken, getAllBookings);
router.delete('/bookings/:bookingId', verifyToken, deleteBooking);

//Bus
router.post('/bus', isAdmin, createBus);
router.get('/bus', isAdmin, getAllBus);

export default router;