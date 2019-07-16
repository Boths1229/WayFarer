"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateBusCredentials = exports.validateBookingCredentials = exports.validateTripCredentials = exports.validateSigninCredentials = exports.validateRegisterationCredentials = void 0;

var _validatorjs = _interopRequireDefault(require("validatorjs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var errorMessages = {
  required: 'the :attribute is required',
  email: 'the email format is invalid',
  min: 'Min :attribute limit is :min'
};

var validateCredentials = function validateCredentials(req, res, next, rules) {
  var validator = new _validatorjs["default"](req.body, rules, errorMessages);

  if (validator.passes()) {
    return next();
  }

  var errors = validator.errors.all();
  return res.status(400).json({
    status: 'error',
    message: 'Invalid Credentials',
    errors: errors
  });
};

var validateRegisterationCredentials = function validateRegisterationCredentials(req, res, next) {
  var rules = {
    first_name: 'required|alpha',
    last_name: 'required|alpha',
    email: 'required|email',
    password: 'required|min:6'
  };
  return validateCredentials(req, res, next, rules);
};

exports.validateRegisterationCredentials = validateRegisterationCredentials;

var validateSigninCredentials = function validateSigninCredentials(req, res, next) {
  var rules = {
    email: 'required|email',
    password: 'required|min:6'
  };
  return validateCredentials(req, res, next, rules);
};

exports.validateSigninCredentials = validateSigninCredentials;

var validateTripCredentials = function validateTripCredentials(req, res, next) {
  var rules = {
    origin: 'required',
    destination: 'required',
    fare: 'required',
    bus_id: 'required',
    trip_date: 'required'
  };
  return validateCredentials(req, res, next, rules);
};

exports.validateTripCredentials = validateTripCredentials;

var validateBookingCredentials = function validateBookingCredentials(req, res, next) {
  var rules = {
    trip_id: 'required'
  };
  return validateCredentials(req, res, next, rules);
};

exports.validateBookingCredentials = validateBookingCredentials;

var validateBusCredentials = function validateBusCredentials(req, res, next) {
  var rules = {
    number_plate: 'required',
    manufacturer: 'required',
    model: 'required',
    year: 'required',
    capacity: 'required'
  };
  return validateCredentials(req, res, next, rules);
};

exports.validateBusCredentials = validateBusCredentials;