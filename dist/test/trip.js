"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _child_process = require("child_process");

var _pg = require("pg");

var _dotenv = _interopRequireDefault(require("dotenv"));

var _server = _interopRequireDefault(require("../server"));

var _trip = _interopRequireDefault(require("../models/trip"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_chai["default"].use(_chaiHttp["default"]);
<<<<<<< HEAD
=======

_dotenv["default"].config();
>>>>>>> develop

var pool = new _pg.Pool({
  connectionString: process.env.DB_URL
});
pool.on('error', function (err) {
  console.log(err);
});
var expect = _chai["default"].expect;
describe('Trip test', function () {
  before(function (done) {
    var dump = 'psql -h localhost -d testDb -U postgres -f server/test/testDb.sql';
    (0, _child_process.exec)(dump, function (err) {
      done();
    });
  });
  describe('POST cerate a trip api/v1/trips', function () {
    it('should return create trip successful', function (done) {
      _chai["default"].request(_server["default"]).post('/api/v1/trips').set('Accept', 'application/json').send(_trip["default"][0]).end(function (err, res) {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal('success');
        expect(res.body.data.trip_id).to.equal(1);
        expect(res.body.data.bus_id).to.equal(1);
        expect(res.body.data.origin).to.equal('yaba');
        expect(res.body.data.destination).to.equal('ikeja');
        expect(res.body.data.trip_date).to.be.a('string');
        expect(res.body.data.fare).to.equal(100);
        expect(res.body.data.status).to.equal('active');
        done();
      });
    });
  });
  describe('POST create trip details incomplete api/v1/trips', function () {
    it('should return error when create trip details is incomplete', function (done) {
      _chai["default"].request(_server["default"]).post('/api/v1/trips').set('Accept', 'application/json').send(_trip["default"][1]).end(function (err, res) {
        var origin = res.body.errors.origin;
        expect(res.body).to.be.an('object');
        expect(res.statusCode).to.equal(400);
        expect(origin[0]).to.equal('the origin is required');
        done();
      });
    });
  });
  describe('POST fare incomplete api/v1/trips', function () {
    it('should return error when there is no fare', function (done) {
      _chai["default"].request(_server["default"]).post('/api/v1/trips').set('Accept', 'application/json').send(_trip["default"][2]).end(function (err, res) {
        var fare = res.body.errors.fare;
        expect(res.body).to.be.an('object');
        expect(res.statusCode).to.equal(400);
        expect(fare[0]).to.equal('the fare is required');
        done();
      });
    });
  });
  describe('GET all trips /api/v1/trips', function () {
    it('should return all trips', function (done) {
      _chai["default"].request(_server["default"]).get('/api/v1/trips').set('Accept', 'application/json').end(function (err, res) {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal('success');
        expect(res.body.data.trip_id).to.equal(1);
        expect(res.body.data.bus_id).to.equal(1);
        expect(res.body.data.origin).to.equal('yaba');
        expect(res.body.data.destination).to.equal('ikeja');
        expect(res.body.data.trip_date).to.be.a('string');
        expect(res.body.data.fare).to.equal(100);
        expect(res.body.data.status).to.equal('active');
        done();
      });
    });
  });
<<<<<<< HEAD
  describe('PATCH Trip cancelled /api/v1/trips/:tripId', function () {
    it('should return trip cancelled successfully', function (done) {
      _chai["default"].request(_server["default"]).patch('/api/v1/trips/1').set('Accept', 'application/json').send({
        status: 'cancelled'
      }).end(function (err, res) {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal('success');
        expect(res.body.data.message).to.equal('Trip Cancelled Successfully');
        expect(res.body.data.trip_id).to.equal(1);
        expect(res.body.data.bus_id).to.equal(1);
        expect(res.body.data.origin).to.equal('yaba');
        expect(res.body.data.destination).to.equal('ikeja');
        expect(res.body.data.trip_date).to.equal("2019-07-05T22:46:16.312Z");
        expect(res.body.data.fare).to.equal(100);
        expect(res.body.data.status).to.equal('cancelled');
        done();
      });
    });
  });
=======
>>>>>>> develop
});