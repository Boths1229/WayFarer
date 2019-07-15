import chai from 'chai';
import chaiHttp from 'chai-http';
import { exec } from 'child_process';
import server from '../server';
import booking from '../models/booking';
import { createToken } from '../helper/token';
import users from '../models/users';

chai.use(chaiHttp);

const { expect } = chai;
const isAdmin = users[1].is_admin;
const firstName = users[1].first_name;
const lastName = users[1].last_name;
const email = users[1].email;
let password = users[1].password;
const userId = users[1].user_id;
const token = createToken({ email, password, isAdmin, userId, firstName, lastName });
describe('Booking test', () => {
  before((done) => {
    const dump = 'psql -h localhost -d testDb -U postgres -f server/test/testDb.sql';
    exec(dump, (err) => {
      done();
    });
  });

  describe('POST seat booking successful api/v1/bookings', () => {
    it('should return booking successful', (done) => {
      chai.request(server)
        .post('/api/v1/bookings')
        .set('Accept', 'application/json')
        .set("Authorization", token)
        .send(booking[0])
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(res.body.status).to.equal('success');
          expect(res.body.data.booking_id).to.equal(1);
          expect(res.body.data.user_id).to.equal(2);
          expect(res.body.data.trip_id).to.equal(1);
          expect(res.body.data.bus_id).to.equal(1);
          expect(res.body.data.seat_number).to.equal(1);
          expect(res.body.data.number_plate).to.equal('AGL 519 FE');
          expect(res.body.data.model).to.equal('corolla');
          expect(res.body.data.first_name).to.equal('chuks');
          expect(res.body.data.last_name).to.equal('emma');
          expect(res.body.data.email).to.equal('boths@yahoo.com');
          done();
        });
    });
  });

  describe('POST booking details in incomplete api/v1/bookings', () => {
    it('should return error when user booking details is incomplete', (done) => {
      chai.request(server)
        .post('/api/v1/bookings')
        .set('Accept', 'application/json')
        .send(booking[1])
        .end((err, res) => {
          const {
            trip_id
          } = res.body.errors;
          expect(res.body).to.be.an('object');
          expect(res.statusCode).to.equal(400);
          expect(trip_id[0]).to.equal('the trip id is required');
          done();
        });
    });
  });

  describe('GET all bookings /api/v1/bookings', () => {
    it('should return all bookings', (done) => {
      chai.request(server)
        .get('/api/v1/bookings')
        .set('Accept', 'application/json')
        .set("Authorization", token)
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(res.status).to.equal(200);
          done();
        });
    });
  });

  describe('DELETE a booking /api/v1/bookings/:bookingId', () => {
    it('should return booking deleted', (done) => {
      chai.request(server)
        .delete('/api/v1/bookings/1')
        .set('Accept', 'application/json')
        .set("Authorization", token)
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(res.status).to.equal(200);
          expect(res.body.data.message).to.equal('Booking deleted successfully');
          expect(res.body.data.booking_id).to.equal(1);
          expect(res.body.data.trip_id).to.equal(1);
          expect(res.body.data.bus_id).to.equal(1);
          expect(res.body.data.trip_date).to.be.a('string');
          expect(res.body.data.seat_number).to.equal(1);
          done();
        });
    });
  });
});