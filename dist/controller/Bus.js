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

var Bus = /*#__PURE__*/function () {
  function Bus() {
    _classCallCheck(this, Bus);
  }

  _createClass(Bus, null, [{
    key: "model",
    value: function model() {
      return new _db["default"]('Bus');
    }
  }, {
    key: "createBus",
    value: function () {
      var _createBus = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
        var _req$body, number_plate, manufacturer, model, year, capacity, bus;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _req$body = req.body, number_plate = _req$body.number_plate, manufacturer = _req$body.manufacturer, model = _req$body.model, year = _req$body.year, capacity = _req$body.capacity;
                _context.next = 4;
                return Bus.model().insert('number_plate, manufacturer, model, year, capacity', '$1, $2, $3, $4, $5', [number_plate, manufacturer, model, year, capacity]);

              case 4:
                bus = _context.sent;
                return _context.abrupt("return", res.status(201).json({
                  status: 'success',
                  data: {
                    bus_id: bus[0].bus_id,
                    number_plate: bus[0].number_plate,
                    manufacturer: bus[0].manufacturer,
                    model: bus[0].model,
                    year: bus[0].year,
                    capacity: bus[0].capacity
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

      function createBus(_x, _x2) {
        return _createBus.apply(this, arguments);
      }

      return createBus;
    }()
  }, {
    key: "getAllBus",
    value: function () {
      var _getAllBus = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
        var rows;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return Bus.model().select('bus_id, number_plate, manufacturer, model, year, capacity');

              case 3:
                rows = _context2.sent;

                if (!(rows.length === 0)) {
                  _context2.next = 6;
                  break;
                }

                return _context2.abrupt("return", res.status(400).json({
                  status: 'error',
                  message: 'No bus found'
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

      function getAllBus(_x3, _x4) {
        return _getAllBus.apply(this, arguments);
      }

      return getAllBus;
    }()
  }]);

  return Bus;
}();

var _default = Bus;
exports["default"] = _default;