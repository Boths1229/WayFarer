"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _child_process = require("child_process");

var _server = _interopRequireDefault(require("../server"));

var _booking = _interopRequireDefault(require("../models/booking"));

var _token = require("../helper/token");

var _users = _interopRequireDefault(require("../models/users"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_chai["default"].use(_chaiHttp["default"]);

var expect = _chai["default"].expect;
var isAdmin = _users["default"][1].is_admin;
var firstName = _users["default"][1].first_name;
var lastName = _users["default"][1].last_name;
var email = _users["default"][1].email;
var password = _users["default"][1].password;
var userId = _users["default"][1].user_id;
var token = (0, _token.createToken)({
  email: email,
  password: password,
  isAdmin: isAdmin,
  userId: userId,
  firstName: firstName,
  lastName: lastName
});
describe('Booking test', function () {
  before(function (done) {
    var dump = 'psql -h localhost -d testDb -U postgres -f server/test/testDb.sql';
    (0, _child_process.exec)(dump, function (err) {
      done();
    });
  });
  describe('POST seat booking successful api/v1/bookings', function () {
    it('should return booking successful', function (done) {
      _chai["default"].request(_server["default"]).post('/api/v1/bookings').set('Accept', 'application/json').set("Authorization", token).send(_booking["default"][0]).end(function (err, res) {
        console.log('this is the body ', res.body);
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal('success');
        expect(res.body.data.id).to.equal(1);
        expect(res.body.data.booking_id).to.equal(1);
        expect(res.body.data.user_id).to.equal(2);
        expect(res.body.data.trip_id).to.equal(1);
        expect(res.body.data.bus_id).to.equal(5);
        expect(res.body.data.seat_number).to.equal(0);
        expect(res.body.data.number_plate).to.equal('AGL 519 FE');
        expect(res.body.data.model).to.equal('corolla');
        expect(res.body.data.first_name).to.equal('chuks');
        expect(res.body.data.last_name).to.equal('emma');
        expect(res.body.data.email).to.equal('boths@yahoo.com');
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
  describe('GET all bookings /api/v1/bookings', function () {
    it('should return all bookings', function (done) {
      _chai["default"].request(_server["default"]).get('/api/v1/bookings').set('Accept', 'application/json').set("Authorization", token).end(function (err, res) {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(200);
        done();
      });
    });
  });
  describe('DELETE a booking /api/v1/bookings/:bookingId', function () {
    it('should return booking deleted', function (done) {
      _chai["default"].request(_server["default"])["delete"]('/api/v1/bookings/1').set('Accept', 'application/json').set("Authorization", token).end(function (err, res) {
        console.log('this is the body ', res.body);
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(200);
        expect(res.body.data.message).to.equal('Booking deleted successfully');
        expect(res.body.data.id).to.equal(1);
        expect(res.body.data.booking_id).to.equal(1);
        expect(res.body.data.trip_id).to.equal(1);
        expect(res.body.data.bus_id).to.equal(5);
        expect(res.body.data.trip_date).to.be.a('string');
        expect(res.body.data.seat_number).to.equal(0);
        done();
      });
    });
  });
});