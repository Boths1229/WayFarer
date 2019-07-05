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
    key: "createTrip",
    value: function () {
      var _createTrip = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(req, res) {
        var _req$body, origin, destination, fare, trip;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _req$body = req.body, origin = _req$body.origin, destination = _req$body.destination, fare = _req$body.fare;
                _context.next = 4;
                return Trip.model().insert('origin, destination, fare', '$1, $2, $3', [origin, destination, fare]);

              case 4:
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
                    status: trip[0].status
                  }
                }));

              case 8:
                _context.prev = 8;
                _context.t0 = _context["catch"](0);
                return _context.abrupt("return", res.status(500).json({
                  error: _context.t0.message,
                  e: _context.t0
                }));

              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 8]]);
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
  }]);

  return Trip;
}();

var _default = Trip;
exports["default"] = _default;