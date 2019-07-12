"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _child_process = require("child_process");

var _server = _interopRequireDefault(require("../server"));

var _users = _interopRequireDefault(require("../models/users"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// import booking from '../models/booking';
// import trip from '../models/trip';
_chai["default"].use(_chaiHttp["default"]);

var expect = _chai["default"].expect; // let token;

describe('User test', function () {
  before(function (done) {
    var dump = 'psql -h localhost -d testDb -U postgres -f server/test/testDb.sql';
    (0, _child_process.exec)(dump, function (err) {
      done();
    });
  });
  describe('POST sign up successful api/v1/auth/signup', function () {
    it('should return signup successful', function (done) {
      _chai["default"].request(_server["default"]).post('/api/v1/auth/signup').set('Accept', 'application/json').send(_users["default"][0]).end(function (err, res) {
        console.log('this is the body ', res.body);
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal('success');
        expect(res.body.data.user_id).to.equal(1);
        expect(res.body.data.is_admin).to.equal(false);
        expect(res.body.data.token).to.be.a('string');
        expect(res.body.data.first_name).to.equal('amaka');
        expect(res.body.data.last_name).to.equal('chuks');
        expect(res.body.data.email).to.equal('boths1229@yahoo.com');
        done();
      });
    });
  });
  describe('POST email already in use api/v1/auth/signup', function () {
    it('should return user with this email already exist', function (done) {
      _chai["default"].request(_server["default"]).post('/api/v1/auth/signup').set('Accept', 'application/json').send(_users["default"][1]).end(function (err, res) {
        console.log('this is the body ', res.body);
        expect(res.body).to.be.an('object');
        expect(res.statusCode).to.equal(409);
        expect(res.body.message).to.equal('this email is already in use');
        done();
      });
    });
  });
  describe('POST sign up details in incomplete api/v1/auth/signup', function () {
    it('should return error when user signup details is incomplete', function (done) {
      _chai["default"].request(_server["default"]).post('/api/v1/auth/signup').set('Accept', 'application/json').send(_users["default"][2]).end(function (err, res) {
        var _res$body$errors = res.body.errors,
            first_name = _res$body$errors.first_name,
            email = _res$body$errors.email;
        expect(res.body).to.be.an('object');
        expect(res.statusCode).to.equal(400);
        expect(first_name[0]).to.equal('the first name is required');
        expect(email[0]).to.equal('the email is required');
        done();
      });
    });
  });
  describe('POST should return email is invalid api/v1/auth/signup', function () {
    it('should return error when email is invalid', function (done) {
      _chai["default"].request(_server["default"]).post('/api/v1/auth/signup').set('Accept', 'application/json').send(_users["default"][3]).end(function (err, res) {
        var email = res.body.errors.email;
        expect(res.body).to.be.an('object');
        expect(res.statusCode).to.equal(400);
        expect(email[0]).to.equal('the email format is invalid');
        done();
      });
    });
  });
  describe('POST should return password length is less than 6 or invalid api/v1/auth/signup', function () {
    it('should return error when password length is less than 6 or invalid', function (done) {
      _chai["default"].request(_server["default"]).post('/api/v1/auth/signup').set('Accept', 'application/json').send(_users["default"][4]).end(function (err, res) {
        var password = res.body.errors.password;
        expect(res.body).to.be.an('object');
        expect(res.statusCode).to.equal(400);
        expect(password[0]).to.equal('Min password limit is 6');
        done();
      });
    });
  });
  describe('POST api/v1/auth/signin', function () {
    it('should return signin successful', function (done) {
      _chai["default"].request(_server["default"]).post('/api/v1/auth/signin').set('Accept', 'application/json').send(_users["default"][5]).end(function (err, res) {
        console.log('this is the body ', res.body);
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal('success');
        expect(res.body.data.user_id).to.equal(1);
        expect(res.body.data.token).to.be.a('string');
        expect(res.body.data.first_name).to.equal('amaka');
        expect(res.body.data.last_name).to.equal('chuks');
        expect(res.body.data.email).to.equal('boths1229@yahoo.com'); //           // token = res.body.data.token;

        done();
      });
    });
  });
  describe('POST invalid input values api/v1/auth/signin', function () {
    it('should return error when invalid details', function (done) {
      _chai["default"].request(_server["default"]).post('/api/v1/auth/signin').set('Accept', 'application/json').send(_users["default"][6]).end(function (err, res) {
        console.log('this is the body ', res.body);
        expect(res.body).to.be.an('object');
        expect(res.statusCode).to.equal(401);
        expect(res.body.message).to.equal('invalid email or password');
        done();
      });
    });
  });
  describe('POST should return email field not filled api/v1/auth/signin', function () {
    it('should return error when email field is not filled', function (done) {
      _chai["default"].request(_server["default"]).post('/api/v1/auth/signin').set('Accept', 'application/json').send(_users["default"][7]).end(function (err, res) {
        expect(res.body).to.be.an('object');
        expect(res.statusCode).to.equal(400);
        expect(res.body.message).to.equal('Invalid Credentials');
        done();
      });
    });
  });
  describe('POST should return email format incorrect api/v1/auth/signin', function () {
    it('should return error when email format is incorrect', function (done) {
      _chai["default"].request(_server["default"]).post('/api/v1/auth/signin').set('Accept', 'application/json').send(_users["default"][8]).end(function (err, res) {
        expect(res.body).to.be.an('object');
        expect(res.statusCode).to.equal(400);
        expect(res.body.message).to.equal('Invalid Credentials');
        done();
      });
    });
  });
  describe('POST should return password field not filled api/v1/auth/signin', function () {
    it('should return error when password field is not filled', function (done) {
      _chai["default"].request(_server["default"]).post('/api/v1/auth/signin').set('Accept', 'application/json').send(_users["default"][9]).end(function (err, res) {
        expect(res.body).to.be.an('object');
        expect(res.statusCode).to.equal(400);
        expect(res.body.message).to.equal('Invalid Credentials');
        done();
      });
    });
  });
  describe('POST should return password incorrect api/v1/auth/signin', function () {
    it('should return error when password is incorrect', function (done) {
      _chai["default"].request(_server["default"]).post('/api/v1/auth/signin').set('Accept', 'application/json').send(_users["default"][10]).end(function (err, res) {
        expect(res.body).to.be.an('object');
        expect(res.statusCode).to.equal(400);
        expect(res.body.message).to.equal('Invalid Credentials');
        done();
      });
    });
  }); // describe('POST seat booking successful api/v1/bookings', () => {
  //   it('should return booking successful', (done) => {
  //     chai.request(server)
  //       .post('/api/v1/bookings')
  //       .set('Accept', 'application/json')
  //       .set("Authorization", token)
  //       .send(booking[0])
  //       .end((err, res) => {
  //         console.log('this is the body ', res.body);
  //         expect(res.body).to.be.an('object');
  //         expect(res.body.status).to.equal('success');
  //         expect(res.body.data.booking_id).to.equal(1);
  //         expect(res.body.data.user_id).to.equal(1);
  //         expect(res.body.data.trip_id).to.equal(1);
  //         expect(res.body.data.bus_id).to.equal(1);
  //         expect(res.body.data.seat_number).to.equal(1);
  //         expect(res.body.data.first_name).to.equal('amaka');
  //         expect(res.body.data.last_name).to.equal('chuks');
  //         expect(res.body.data.email).to.equal('boths1229@yahoo.com');
  //         done();
  //       });
  //   });
  // });
  // describe('GET all bookings /api/v1/bookings', () => {
  //   it('should return all bookings', (done) => {
  //     chai.request(server)
  //       .get('/api/v1/bookings')
  //       .set('Accept', 'application/json')
  //       .set("Authorization", token)
  //       .end((err, res) => {
  //         console.log('this is the body ', res.body);
  //         expect(res.body).to.be.an('object');
  //         expect(res.status).to.equal('success');
  //         expect(res.body.data.booking_id).to.equal(1);
  //         expect(res.body.data.user_id).to.equal(1);
  //         expect(res.body.data.trip_id).to.equal(1);
  //         expect(res.body.data.bus_id).to.equal(1);
  //         expect(res.body.data.trip_date).to.be.a('string');
  //         expect(res.body.data.seat_number).to.equal(1);
  //         expect(res.body.data.first_name).to.equal('chuks');
  //         expect(res.body.data.last_name).to.equal('emma');
  //         expect(res.body.data.email).to.equal('boths@yahoo.com');
  //         done();
  //       });
  //   });
  // });
  // describe('DELETE a booking /api/v1/bookings/:bookingId', () => {
  //   it('should return booking deleted', (done) => {
  //     chai.request(server)
  //       .delete('/api/v1/bookings/1')
  //       .set('Accept', 'application/json')
  //       .set("Authorization", token)
  //       .end((err, res) => {
  //         console.log('this is the body ', res.body);
  //         expect(res.body).to.be.an('object');
  //         expect(res.status).to.equal('success');
  //         expect(res.body.data.message).to.equal('Booking deleted successfully');
  //         expect(res.body.data.booking_id).to.equal(1);
  //         expect(res.body.data.trip_id).to.equal(1);
  //         expect(res.body.data.bus_id).to.equal(1);
  //         expect(res.body.data.trip_date).to.be.a('string');
  //         expect(res.body.data.seat_number).to.equal(1);
  //         done();
  //       });
  //   });
  // });
  // describe('POST cerate a trip api/v1/trips', () => {
  //   it('should return create trip successful', (done) => {
  //     chai.request(server)
  //       .post('/api/v1/trips')
  //       .set('Accept', 'application/json')
  //       .set("Authorization", token)
  //       .send(trip[0])
  //       .end((err, res) => {
  //         console.log('this is the body ', res.body);
  //         expect(res.body).to.be.an('object');
  //         expect(res.body.status).to.equal('success');
  //         expect(res.body.data.trip_id).to.equal(1);
  //         expect(res.body.data.bus_id).to.equal(1);
  //         expect(res.body.data.origin).to.equal('yaba');
  //         expect(res.body.data.destination).to.equal('ikeja');
  //         expect(res.body.data.trip_date).to.be.a('string');
  //         expect(res.body.data.fare).to.equal(100);
  //         expect(res.body.data.status).to.equal('active');
  //         done();
  //       });
  //   });
  // });
  // describe('GET all trips /api/v1/trips', () => {
  //   it('should return all trips', (done) => {
  //     chai.request(server)
  //       .get('/api/v1/trips')
  //       .set('Accept', 'application/json')
  //       .set("Authorization", token)
  //       .end((err, res) => {
  //         console.log('this is the body ', res.body);
  //         expect(res.body).to.be.an('object');
  //         expect(res.status).to.equal('success');
  //         expect(res.body.data.trip_id).to.equal(1);
  //         expect(res.body.data.bus_id).to.equal(1);
  //         expect(res.body.data.origin).to.equal('yaba');
  //         expect(res.body.data.destination).to.equal('ikeja');
  //         expect(res.body.data.trip_date).to.be.a('string');
  //         expect(res.body.data.fare).to.equal(100);
  //         expect(res.body.data.status).to.equal('active');
  //         done();
  //       });
  //   });
  // });
  // describe('PATCH Trip cancelled /api/v1/trips/:tripId', () => {
  //   it('should return trip cancelled successfully', (done) => {
  //     chai.request(server)
  //       .patch('/api/v1/trips/1')
  //       .set('Accept', 'application/json')
  //       .set("Authorization", token)
  //       .send({
  //         status: 'cancelled',
  //       })
  //       .end((err, res) => {
  //         console.log('this is the body ', res.body);
  //         expect(res.body).to.be.an('object');
  //         expect(res.status).to.equal('success');
  //         expect(res.body.data.message).to.equal('Trip Cancelled Successfully');
  //         expect(res.body.data.trip_id).to.equal(1);
  //         expect(res.body.data.bus_id).to.equal(1);
  //         expect(res.body.data.origin).to.equal('yaba');
  //         expect(res.body.data.destination).to.equal('ikeja');
  //         expect(res.body.data.trip_date).to.equal("2019-07-05T22:46:16.312Z");
  //         expect(res.body.data.fare).to.equal(100);
  //         expect(res.body.data.status).to.equal('cancelled');
  //         done();
  //       });
  //   });
  // });
});