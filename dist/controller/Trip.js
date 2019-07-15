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

var Trip =
/*#__PURE__*/
function () {
  function Trip() {
    _classCallCheck(this, Trip);
  }

  _createClass(Trip, null, [{
    key: "model",
    value: function model() {
      return new _db["default"]('Trip');
    }
  }, {
    key: "bus",
    value: function bus() {
      return new _db["default"]('Bus');
    }
  }, {
    key: "createTrip",
    value: function () {
      var _createTrip = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(req, res) {
        var _req$body, origin, destination, fare, bus_id, trip_date, check, trip;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _req$body = req.body, origin = _req$body.origin, destination = _req$body.destination, fare = _req$body.fare, bus_id = _req$body.bus_id, trip_date = _req$body.trip_date;
                _context.next = 4;
                return Book.bus().select('*', 'bus_id=$1', [bus_id]);

              case 4:
                check = _context.sent;

                if (check[0]) {
                  _context.next = 7;
                  break;
                }

                return _context.abrupt("return", res.status(400).json({
                  status: 'error',
                  message: 'invalid bus id'
                }));

              case 7:
                _context.next = 9;
                return Trip.model().insert('origin, destination, fare, bus_id, trip_date, number_plate, model, capacity', '$1, $2, $3, $4, $5, $6, $7, $8', [origin, destination, fare, bus_id, trip_date, check[0].number_plate, check[0].model, check[0].capacity]);

              case 9:
                trip = _context.sent;
                return _context.abrupt("return", res.status(201).json({
                  status: 'success',
                  data: {
                    trip_id: trip[0].trip_id,
                    bus_id: trip[0].bus_id,
                    origin: trip[0].origin,
                    destination: trip[0].destination,
                    trip_date: trip[0].trip_date,
                    fare: trip[0].fare,
                    number_plate: check[0].number_plate,
                    model: check[0].model,
                    capacity: check[0].capacity,
                    status: trip[0].status
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

      function createTrip(_x, _x2) {
        return _createTrip.apply(this, arguments);
      }

      return createTrip;
    }()
  }, {
    key: "getAllTrips",
    value: function () {
      var _getAllTrips = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(req, res) {
        var rows;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return Trip.model().select('trip_id, bus_id, origin, destination, trip_date, fare, status');

              case 3:
                rows = _context2.sent;

                if (!(rows.length === 0)) {
                  _context2.next = 6;
                  break;
                }

                return _context2.abrupt("return", res.status(400).json({
                  status: 'error',
                  message: 'No trip found'
                }));

              case 6:
                return _context2.abrupt("return", res.status(200).json({
                  status: 'success',
                  data: rows
                }));

              case 9:
                _context2.prev = 9;
                _context2.t0 = _context2["catch"](0);
                return _context2.abrupt("return", res.status(500).json({
                  error: 'server error',
                  e: _context2.t0
                }));

              case 12:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 9]]);
      }));

      function getAllTrips(_x3, _x4) {
        return _getAllTrips.apply(this, arguments);
      }

      return getAllTrips;
    }()
  }, {
    key: "cancelTrip",
    value: function () {
      var _cancelTrip = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(req, res) {
        var tripId, rows;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                tripId = req.params.tripId;
                _context3.next = 4;
                return Trip.model().update('status=$1', 'trip_id=$2', ['cancelled', tripId]);

              case 4:
                rows = _context3.sent;

                if (!rows) {
                  _context3.next = 7;
                  break;
                }

                return _context3.abrupt("return", res.status(200).json({
                  status: 'success',
                  data: {
                    message: 'Trip Cancelled Successfully',
                    trip_id: rows.trip_id,
                    bus_id: rows.bus_id,
                    origin: rows.origin,
                    destination: rows.destination,
                    trip_date: rows.trip_date,
                    fare: rows.fare,
                    status: rows.status
                  }
                }));

              case 7:
                return _context3.abrupt("return", res.status(404).json({
                  status: 'error',
                  message: 'trip not found'
                }));

              case 10:
                _context3.prev = 10;
                _context3.t0 = _context3["catch"](0);
                return _context3.abrupt("return", res.status(500).json({
                  error: 'server error',
                  e: _context3.t0
                }));

              case 13:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[0, 10]]);
      }));

      function cancelTrip(_x5, _x6) {
        return _cancelTrip.apply(this, arguments);
      }

      return cancelTrip;
    }()
  }]);

  return Trip;
}();

var _default = Trip;
exports["default"] = _default;