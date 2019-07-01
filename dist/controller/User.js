"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _token = require("../helper/token");

var _db = _interopRequireDefault(require("../models/db"));

var _password = _interopRequireDefault(require("../helper/password"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var User =
/*#__PURE__*/
function () {
  function User() {
    _classCallCheck(this, User);
  }

  _createClass(User, null, [{
    key: "model",
    value: function model() {
      return new _db["default"]('users');
    }
  }, {
    key: "getAllUsers",
    value: function () {
      var _getAllUsers = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(req, res) {
        var rows;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return User.model().select('id, email, first_name, last_name, is_admin');

              case 3:
                rows = _context.sent;

                if (!(rows.length === 0)) {
                  _context.next = 6;
                  break;
                }

                return _context.abrupt("return", res.status(400).json({
                  status: 'error',
                  message: 'No user found'
                }));

              case 6:
                return _context.abrupt("return", res.status(200).json({
                  status: 'success',
                  data: rows
                }));

              case 9:
                _context.prev = 9;
                _context.t0 = _context["catch"](0);
                return _context.abrupt("return", res.status(500).json({
                  error: 'server error',
                  e: _context.t0
                }));

              case 12:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 9]]);
      }));

      function getAllUsers(_x, _x2) {
        return _getAllUsers.apply(this, arguments);
      }

      return getAllUsers;
    }()
  }, {
    key: "signUp",
    value: function () {
      var _signUp = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(req, res) {
        var _req$body, email, first_name, last_name, password, token, rows;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _req$body = req.body, email = _req$body.email, first_name = _req$body.first_name, last_name = _req$body.last_name;
                password = req.body.password;
                token = (0, _token.createToken)({
                  email: email,
                  first_name: first_name,
                  last_name: last_name
                });
                password = _password["default"].hashPassword(password);
                _context2.next = 7;
                return User.model().insert('email, first_name, last_name, password', "'".concat(email, "', '").concat(first_name, "', '").concat(last_name, "', '").concat(password, "'"));

              case 7:
                rows = _context2.sent;
                return _context2.abrupt("return", res.status(201).json({
                  status: 'success',
                  data: {
                    user_id: rows.user_id,
                    is_admin: rows.is_admin,
                    token: token,
                    first_name: rows.first_name,
                    last_name: rows.last_name,
                    email: rows.email
                  }
                }));

              case 11:
                _context2.prev = 11;
                _context2.t0 = _context2["catch"](0);
                return _context2.abrupt("return", res.status(500).json({
                  error: _context2.t0.message,
                  e: _context2.t0
                }));

              case 14:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 11]]);
      }));

      function signUp(_x3, _x4) {
        return _signUp.apply(this, arguments);
      }

      return signUp;
    }()
  }]);

  return User;
}();

var _default = User;
exports["default"] = _default;