"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _User = _interopRequireDefault(require("../controller/User"));

var _Trip = _interopRequireDefault(require("../controller/Trip"));

var _Booking = _interopRequireDefault(require("../controller/Booking"));

var _validateCredentials = require("../middlewares/validateCredentials");

var _validateEmailExistence = _interopRequireDefault(require("../middlewares/validateEmailExistence"));

var _token = require("../helper/token");

var _isAdmin = require("../middlewares/isAdmin");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var signUp = _User["default"].signUp,
    signIn = _User["default"].signIn,
    getAllUsers = _User["default"].getAllUsers;
var createTrip = _Trip["default"].createTrip,
    getAllTrips = _Trip["default"].getAllTrips,
    cancelTrip = _Trip["default"].cancelTrip;
var seatBooking = _Booking["default"].seatBooking,
    getAllBookings = _Booking["default"].getAllBookings,
    deleteBooking = _Booking["default"].deleteBooking;

var router = _express["default"].Router(); // User


router.post('/auth/signup', _validateCredentials.validateRegisterationCredentials, _validateEmailExistence["default"], signUp);
router.post('/auth/signin', _validateCredentials.validateSigninCredentials, signIn);
router.get('/users', _isAdmin.isAdmin, getAllUsers); // Trip

router.post('/trips', _validateCredentials.validateTripCredentials, _isAdmin.isAdmin, createTrip);
router.get('/trips', _token.verifyToken, getAllTrips);
router.patch('/trips/:tripId', _isAdmin.isAdmin, cancelTrip); // Booking

router.post('/bookings', _validateCredentials.validateBookingCredentials, _token.verifyToken, seatBooking);
router.get('/bookings', _token.verifyToken, getAllBookings);
router["delete"]('/bookings/:bookingId', _token.verifyToken, deleteBooking);
var _default = router;
exports["default"] = _default;