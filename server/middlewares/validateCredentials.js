import Validator from 'validatorjs';
import debug from 'debug';

const Debug = debug('http');
const errorMessages = {
  required: 'the :attribute is required',
  email: 'the email format is invalid',
  min: 'Min :attribute limit is :min',
};

const validateCredentials = (req, res, next, rules) => {
  const validator = new Validator(req.body, rules, errorMessages);
  if (validator.passes()) {
    return next();
  }
  const errors = validator.errors.all();
  return res.status(400).json({
    status: 'error',
    message: 'Invalid Credentials',
    errors
  });
};

export const validateRegisterationCredentials = (req, res, next) => {
  const rules = {
    first_name: 'required|alpha',
    last_name: 'required|alpha',
    email: 'required|email',
    password: 'required|min:6'
  };
  return validateCredentials(req, res, next, rules);
};

export const validateSigninCredentials = (req, res, next) => {
  const rules = {
    email: 'required|email',
    password: 'required|min:6'
  };
  return validateCredentials(req, res, next, rules);
};

export const validateTripCredentials = (req, res, next) => {
  const rules = {
    origin: 'required',
    destination: 'required',
    fare: 'required',
    bus_id: 'required',
    trip_date: 'required'
  };
  return validateCredentials(req, res, next, rules);
};

export const validateBookingCredentials = (req, res, next) => {
  const rules = {
    trip_id: 'required'
  };
  return validateCredentials(req, res, next, rules);
};

export const validateBusCredentials = (req, res, next) => {
  const rules = {
    number_plate: 'required',
    manufacturer: 'required',
    model: 'required',
    year: 'required',
    capacity: 'required'
  };
  return validateCredentials(req, res, next, rules);
};
Debug(`Server starting on port: ${req.body}`);