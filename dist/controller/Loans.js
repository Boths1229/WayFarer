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

var Loans = /*#__PURE__*/function () {
  function Loans() {
    _classCallCheck(this, Loans);
  }

  _createClass(Loans, null, [{
    key: "model",
    value: function model() {
      return new _db["default"]('loans');
    }
  }, {
    key: "getAllLoans",
    value: function () {
      var _getAllLoans = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
        var rows;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return Loans.model().select('id, fullName, email, date, amount, homeAddress, officeAddress, verified, approved');

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

      function getAllLoans(_x, _x2) {
        return _getAllLoans.apply(this, arguments);
      }

      return getAllLoans;
    }()
  }, {
    key: "applyLoan",
    value: function () {
      var _applyLoan = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
        var _req$body, fullName, email, amount, homeAddress, officeAddress, rows;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _req$body = req.body, fullName = _req$body.fullName, email = _req$body.email, amount = _req$body.amount, homeAddress = _req$body.homeAddress, officeAddress = _req$body.officeAddress;
                _context2.next = 4;
                return Loans.model().insert('fullName, email, amount, homeAddress, officeAddress', "'".concat(fullName, "','").concat(email, "', '").concat(amount, "', '").concat(homeAddress, "', '").concat(officeAddress, "'"));

              case 4:
                rows = _context2.sent;

                if (!(rows[0].length === 0)) {
                  _context2.next = 7;
                  break;
                }

                return _context2.abrupt("return", res.status(400).json({
                  status: 'error',
                  message: 'No user found'
                }));

              case 7:
                return _context2.abrupt("return", res.status(201).json({
                  status: 'success',
                  data: {
                    id: rows[0].id,
                    fullName: rows[0].fullName,
                    email: rows[0].email,
                    date: rows[0].date,
                    amount: rows[0].amount,
                    homeAddress: rows[0].homeAddress,
                    officeAddress: rows[0].officeAddress,
                    verified: rows[0].verified,
                    approved: rows[0].approved
                  }
                }));

              case 10:
                _context2.prev = 10;
                _context2.t0 = _context2["catch"](0);
                return _context2.abrupt("return", res.status(500).json({
                  error: _context2.t0.message,
                  e: _context2.t0
                }));

              case 13:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 10]]);
      }));

      function applyLoan(_x3, _x4) {
        return _applyLoan.apply(this, arguments);
      }

      return applyLoan;
    }()
  }]);

  return Loans;
}();

var _default = Loans;
exports["default"] = _default;