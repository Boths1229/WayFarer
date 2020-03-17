"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _User = _interopRequireDefault(require("../controller/User"));

var _Trip = _interopRequireDefault(require("../controller/Trip"));

var _Bus = _interopRequireDefault(require("../controller/Bus"));

var _Booking = _interopRequireDefault(require("../controller/Booking"));

var _Loans = _interopRequireDefault(require("../controller/Loans"));

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
    cancelTrip = _Trip["default"].cancelTrip,
    getTripsDestination = _Trip["default"].getTripsDestination;
var seatBooking = _Booking["default"].seatBooking,
    getAllBookings = _Booking["default"].getAllBookings,
    deleteBooking = _Booking["default"].deleteBooking;
var createBus = _Bus["default"].createBus,
    getAllBus = _Bus["default"].getAllBus;
var getAllLoans = _Loans["default"].getAllLoans,
    applyLoan = _Loans["default"].applyLoan;

var router = _express["default"].Router(); // User


router.post('/auth/signup', _validateEmailExistence["default"], signUp);
router.post('/auth/signin', signIn);
router.get('/users', getAllUsers); // Trip

router.post('/trips', _isAdmin.isAdmin, createTrip);
router.get('/trips', _token.verifyToken, getAllTrips);
router.patch('/trips/:tripId', _isAdmin.isAdmin, cancelTrip);
router.get('/trips?sort_by=destination.asc', _token.verifyToken, getTripsDestination); // Booking

router.post('/bookings', _token.verifyToken, seatBooking);
router.get('/bookings', _token.verifyToken, getAllBookings);
router["delete"]('/bookings/:bookingId', _token.verifyToken, deleteBooking); // Bus

router.post('/bus', _isAdmin.isAdmin, createBus);
router.get('/bus', _isAdmin.isAdmin, getAllBus); // Loans

router.post('/loans', _token.verifyToken, _validateCredentials.validateLoanCredentials, applyLoan);
router.get('/loans', getAllLoans);
var _default = router;
exports["default"] = _default;