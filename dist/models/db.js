"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _dotenv = _interopRequireDefault(require("dotenv"));

var _pg = require("pg");

var _debug = _interopRequireDefault(require("debug"));

var _config = _interopRequireDefault(require("../config/config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

_dotenv["default"].config();

var Model =
/*#__PURE__*/
function () {
  function Model(table) {
    _classCallCheck(this, Model);

    this.table = table;
    this.pool = new _pg.Pool({
      connectionString: process.env.DB_URL
    });
    this.pool.on('error', function (err, client) {
      console.log('error');
    });
  }

  _createClass(Model, [{
    key: "select",
    value: function () {
      var _select = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(columns, clause, values) {
        var query, _ref, rows;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;

                if (clause) {
                  query = "SELECT ".concat(columns, " FROM ").concat(this.table, " WHERE ").concat(clause);
                } else {
                  query = "SELECT ".concat(columns, " FROM ").concat(this.table);
                }

                _context.next = 4;
                return this.pool.query(query, values);

              case 4:
                _ref = _context.sent;
                rows = _ref.rows;
                return _context.abrupt("return", rows);

              case 9:
                _context.prev = 9;
                _context.t0 = _context["catch"](0);
                throw _context.t0;

              case 12:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 9]]);
      }));

      function select(_x, _x2, _x3) {
        return _select.apply(this, arguments);
      }

      return select;
    }()
  }, {
    key: "insert",
    value: function () {
      var _insert = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(columns, selector, values) {
        var query, _ref2, rows;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                query = "INSERT INTO ".concat(this.table, " (").concat(columns, ") VALUES (").concat(selector, ") returning *");
                _context2.prev = 1;
                console.log(query);
                _context2.next = 5;
                return this.pool.query(query, values);

              case 5:
                _ref2 = _context2.sent;
                rows = _ref2.rows;
                return _context2.abrupt("return", rows);

              case 10:
                _context2.prev = 10;
                _context2.t0 = _context2["catch"](1);
                throw _context2.t0;

              case 13:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[1, 10]]);
      }));

      function insert(_x4, _x5, _x6) {
        return _insert.apply(this, arguments);
      }

      return insert;
    }()
  }, {
    key: "update",
    value: function () {
      var _update = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(columns, clause, values) {
        var query, _ref3, rows;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                query = "UPDATE ".concat(this.table, " SET ").concat(columns, " WHERE ").concat(clause, " returning *");
                _context3.prev = 1;
                _context3.next = 4;
                return this.pool.query(query, values);

              case 4:
                _ref3 = _context3.sent;
                rows = _ref3.rows;
                return _context3.abrupt("return", rows[0]);

              case 9:
                _context3.prev = 9;
                _context3.t0 = _context3["catch"](1);
                throw _context3.t0;

              case 12:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[1, 9]]);
      }));

      function update(_x7, _x8, _x9) {
        return _update.apply(this, arguments);
      }

      return update;
    }()
  }, {
    key: "delete",
    value: function () {
      var _delete2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(clause, values) {
        var query, _ref4, rows;

        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                query = "DELETE FROM ".concat(this.table, " WHERE ").concat(clause, " returning *");
                _context4.prev = 1;
                _context4.next = 4;
                return this.pool.query(query, values);

              case 4:
                _ref4 = _context4.sent;
                rows = _ref4.rows;
                return _context4.abrupt("return", rows[0]);

              case 9:
                _context4.prev = 9;
                _context4.t0 = _context4["catch"](1);
                throw _context4.t0;

              case 12:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this, [[1, 9]]);
      }));

      function _delete(_x10, _x11) {
        return _delete2.apply(this, arguments);
      }

      return _delete;
    }()
  }]);

  return Model;
}();

var _default = Model;
exports["default"] = _default;