"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _child_process = require("child_process");

var _server = _interopRequireDefault(require("../server"));

var _loans = _interopRequireDefault(require("../models/loans"));

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
describe('Loan test', function () {
  before(function (done) {
    var dump = 'psql -h localhost -d testDb -U postgres -f server/test/testDb.sql';
    (0, _child_process.exec)(dump, function (err) {
      done();
    });
  });
  describe('POST loan applylication successful api/v1/loans', function () {
    it('should return booking successful', function (done) {
      _chai["default"].request(_server["default"]).post('/api/v1/loans').set('Accept', 'application/json').set("Authorization", token).send(_loans["default"][0]).end(function (err, res) {
        console.log('this is the body ', res.body);
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal('success');
        expect(res.body.data.id).to.equal(1);
        expect(res.body.data.fullName).to.equal('Somkene Bryan Chukwuma');
        expect(res.body.data.email).to.equal('kene@yahoo.com');
        expect(res.body.data.date).to.equal('2019-07-12 08:39:35 +0000');
        expect(res.body.data.amount).to.equal(5000);
        expect(res.body.data.homeAddress).to.equal('rd 17 diamond estate isheri');
        expect(res.body.data.officeAddress).to.equal('egbada lagos');
        expect(res.body.data.verified).to.equal(false);
        expect(res.body.data.approved).to.equal(false);
        done();
      });
    });
  });
  describe('POST booking details in incomplete api/v1/bookings', function () {
    it('should return error when user booking details is incomplete', function (done) {
      _chai["default"].request(_server["default"]).post('/api/v1/loans').set('Accept', 'application/json').send(_loans["default"][1]).end(function (err, res) {
        var amount = res.body.errors.amount;
        expect(res.body).to.be.an('object');
        expect(res.statusCode).to.equal(400);
        expect(amount[0]).to.equal('the amount is required');
        done();
      });
    });
  });
  describe('GET all loans /api/v1/loans', function () {
    it('should return all loans', function (done) {
      _chai["default"].request(_server["default"]).get('/api/v1/loans').set('Accept', 'application/json').set("Authorization", token).end(function (err, res) {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(200);
        done();
      });
    });
  });
});