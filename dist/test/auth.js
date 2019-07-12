"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cleanExceptDefaultUser = exports.loginWithDefaultUser = void 0;

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _child_process = require("child_process");

var _server = _interopRequireDefault(require("../server"));

var _users = _interopRequireDefault(require("../models/users"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

process.env.NODE_ENV = "test";
process.env.API_BASE = "/api";

_chai["default"].use(_chaiHttp["default"]);

var expect = _chai["default"].expect;
var defaultUser = {
  "email": "boths1229@yahoo.com",
  "password": "amaka000"
};

var createUser =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    var UserModel;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            UserModel = new _users["default"](defaultUser);
            _context.next = 3;
            return UserModel.save();

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function createUser() {
    return _ref.apply(this, arguments);
  };
}();

var getDefaultUser =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2() {
    var users;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _users["default"].find({
              "email": defaultUser.email
            });

          case 2:
            users = _context2.sent;

            if (!(users.length === 0)) {
              _context2.next = 9;
              break;
            }

            _context2.next = 6;
            return createUser();

          case 6:
            return _context2.abrupt("return", getDefaultUser());

          case 9:
            return _context2.abrupt("return", users[0]);

          case 10:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function getDefaultUser() {
    return _ref2.apply(this, arguments);
  };
}();

var loginWithDefaultUser =
/*#__PURE__*/
function () {
  var _ref3 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3() {
    var user;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return getDefaultUser();

          case 2:
            user = _context3.sent;
            return _context3.abrupt("return", request.post(process.env.API_BASE + "/auth/signin").send({
              "email": defaultUser.email,
              "password": defaultUser.password
            }).expect(200));

          case 4:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function loginWithDefaultUser() {
    return _ref3.apply(this, arguments);
  };
}();

exports.loginWithDefaultUser = loginWithDefaultUser;

var cleanExceptDefaultUser =
/*#__PURE__*/
function () {
  var _ref4 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4() {
    var user;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return getDefaultUser();

          case 2:
            user = _context4.sent;
            _context4.next = 5;
            return _users["default"].deleteMany({
              "email": {
                $ne: user.email
              }
            });

          case 5:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function cleanExceptDefaultUser() {
    return _ref4.apply(this, arguments);
  };
}();

exports.cleanExceptDefaultUser = cleanExceptDefaultUser;