"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _db = _interopRequireDefault(require("../models/db"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Book =
/*#__PURE__*/
function () {
  function Book() {
    _classCallCheck(this, Book);
  }

  _createClass(Book, null, [{
    key: "model",
    value: function model() {
      return new _db["default"]('Booking');
    }
  }, {
    key: "trips",
    value: function trips() {
      return new _db["default"]('Trip');
    }
  }, {
    key: "seatBooking",
    value: function () {
      var _seatBooking = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(req, res) {
        var trip_id, check, book;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                trip_id = req.body.trip_id;
                _context.next = 4;
                return Book.trips().select('*', 'trip_id=$1', [trip_id]);

              case 4:
                check = _context.sent;

                if (check[0]) {
                  _context.next = 7;
                  break;
                }

                return _context.abrupt("return", res.status(400).json({
                  status: 'error',
                  message: 'invalid trip id'
                }));

              case 7:
                _context.next = 9;
                return Book.model().insert('trip_id, user_id, bus_id, first_name, last_name, email', '$1, $2, $3, $4, $5, $6', [check[0].trip_id, req.user.userId, check[0].bus_id, req.user.firstName, req.user.lastName, req.user.email]);

              case 9:
                book = _context.sent;
                return _context.abrupt("return", res.status(201).json({
                  status: 'success',
                  data: {
                    booking_id: book[0].booking_id,
                    user_id: book[0].user_id,
                    trip_id: check[0].trip_id,
                    bus_id: check[0].bus_id,
                    trip_date: book[0].trip_date,
                    seat_number: book[0].seat_number,
                    first_name: book[0].first_name,
                    last_name: book[0].last_name,
                    email: book[0].email
                  }
                }));

              case 13:
                _context.prev = 13;
                _context.t0 = _context["catch"](0);
                return _context.abrupt("return", res.status(500).json({
                  error: _context.t0.message,
                  e: _context.t0
                }));

              case 16:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 13]]);
      }));

      function seatBooking(_x, _x2) {
        return _seatBooking.apply(this, arguments);
      }

      return seatBooking;
    }()
  }, {
    key: "getAllBookings",
    value: function () {
      var _getAllBookings = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(req, res) {
        var rows, _rows;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;

                if (!(req.user.isAdmin === false)) {
                  _context2.next = 8;
                  break;
                }

                _context2.next = 4;
                return Book.model().select('booking_id, user_id, trip_id, bus_id, trip_date, seat_number, first_name, last_name, email', "user_id=".concat(req.user.userId));

              case 4:
                rows = _context2.sent;

                if (!(rows.length === 0)) {
                  _context2.next = 7;
                  break;
                }

                return _context2.abrupt("return", res.status(400).json({
                  status: 'error',
                  message: 'No booking found'
                }));

              case 7:
                return _context2.abrupt("return", res.status(200).json({
                  status: 'success',
                  data: rows
                }));

              case 8:
                if (!(req.user.isAdmin === true)) {
                  _context2.next = 15;
                  break;
                }

                _context2.next = 11;
                return Book.model().select('booking_id, user_id, trip_id, bus_id, trip_date, seat_number, first_name, last_name, email');

              case 11:
                _rows = _context2.sent;

                if (!(_rows.length === 0)) {
                  _context2.next = 14;
                  break;
                }

                return _context2.abrupt("return", res.status(400).json({
                  status: 'error',
                  message: 'No booking found'
                }));

              case 14:
                return _context2.abrupt("return", res.status(200).json({
                  status: 'success',
                  data: _rows
                }));

              case 15:
                _context2.next = 20;
                break;

              case 17:
                _context2.prev = 17;
                _context2.t0 = _context2["catch"](0);
                return _context2.abrupt("return", res.status(500).json({
                  error: 'server error',
                  e: _context2.t0
                }));

              case 20:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 17]]);
      }));

      function getAllBookings(_x3, _x4) {
        return _getAllBookings.apply(this, arguments);
      }

      return getAllBookings;
    }()
  }]);

  return Book;
}();

var _default = Book;
exports["default"] = _default;