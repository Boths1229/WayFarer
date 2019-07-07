"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _child_process = require("child_process");

var _server = _interopRequireDefault(require("../server"));

var _booking = _interopRequireDefault(require("../models/booking"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_chai["default"].use(_chaiHttp["default"]);

var expect = _chai["default"].expect;
describe('Booking test', function () {
  before(function (done) {
    var dump = 'psql -h localhost -d testDb -U postgres -f server/test/testDb.sql';
    (0, _child_process.exec)(dump, function (err) {
      done();
    });
  });
  describe('POST seat booking successful api/v1/bookings', function () {
    it('should return booking successful', function (done) {
      _chai["default"].request(_server["default"]).post('/api/v1/bookings').set('Accept', 'application/json').send(_booking["default"][0]).end(function (err, res) {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal('success');
        expect(res.body.data.booking_id).to.equal(1);
        expect(res.body.data.user_id).to.equal(1);
        expect(res.body.data.trip_id).to.equal(1);
        expect(res.body.data.bus_id).to.equal(1);
        expect(res.body.data.seat_number).to.equal(1);
        expect(res.body.data.first_name).to.equal('amaka');
        expect(res.body.data.last_name).to.equal('chuks');
        expect(res.body.data.email).to.equal('boths1229@yahoo.com');
        done();
      });
    });
  });
  describe('POST booking details in incomplete api/v1/bookings', function () {
    it('should return error when user booking details is incomplete', function (done) {
      _chai["default"].request(_server["default"]).post('/api/v1/bookings').set('Accept', 'application/json').send(_booking["default"][1]).end(function (err, res) {
        var trip_id = res.body.errors.trip_id;
        expect(res.body).to.be.an('object');
        expect(res.statusCode).to.equal(400);
        expect(trip_id[0]).to.equal('the trip id is required');
        done();
      });
    });
  });
});