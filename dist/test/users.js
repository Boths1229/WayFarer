"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _child_process = require("child_process");

var _pg = require("pg");

var _dotenv = _interopRequireDefault(require("dotenv"));

var _server = _interopRequireDefault(require("../server"));

var _users = _interopRequireDefault(require("../models/users"));

var _config = _interopRequireDefault(require("../config/config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_chai["default"].use(_chaiHttp["default"]);

_dotenv["default"].config();

var env = process.env.NODE_ENV;
var pool = new _pg.Pool({
  connectionString: _config["default"].databaseUrl[env]
});
pool.on('error', function (err) {
  console.log(err);
});
var expect = _chai["default"].expect;
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
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal('success');
        expect(res.body.data.user_id).to.equal(1);
        expect(res.body.data.is_admin).to.equal(false);
        expect(res.body.data.token).to.be.a('string');
        expect(res.body.data.first_name).to.equal('ann');
        expect(res.body.data.last_name).to.equal('doris');
        expect(res.body.data.email).to.equal('ann@yahoo.com');
        done();
      });
    });
  });
  describe('POST email already in use api/v1/auth/signup', function () {
    it('should return user with this email already exist', function (done) {
      _chai["default"].request(_server["default"]).post('/api/v1/auth/signup').set('Accept', 'application/json').send(_users["default"][1]).end(function (err, res) {
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
});