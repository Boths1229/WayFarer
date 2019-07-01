"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateRegisterationCredentials = void 0;

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