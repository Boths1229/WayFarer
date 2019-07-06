import chai from 'chai';
import chaiHttp from 'chai-http';
import { exec } from 'child_process';
import server from '../server';
import trip from '../models/trip';


chai.use(chaiHttp);

const { expect } = chai;
describe('Trip test', () => {
  before((done) => {
    const dump = 'psql -h localhost -d testDb -U postgres -f server/test/testDb.sql';
    exec(dump, (err) => {
      done();
    });
  });

  describe('POST cerate a trip api/v1/trips', () => {
    it('should return create trip successful', (done) => {
      chai.request(server)
        .post('/api/v1/trips')
        .set('Accept', 'application/json')
        .send(trip[0])
        .end((err, res) => {
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

  describe('POST create trip details incomplete api/v1/trips', () => {
    it('should return error when create trip details is incomplete', (done) => {
      chai.request(server)
        .post('/api/v1/trips')
        .set('Accept', 'application/json')
        .send(trip[1])
        .end((err, res) => {
          const {
            origin
          } = res.body.errors;
          expect(res.body).to.be.an('object');
          expect(res.statusCode).to.equal(400);
          expect(origin[0]).to.equal('the origin is required');
          done();
        });
    });
  });

  describe('POST should return is_admin is invalid api/v1/trips', () => {
    it('should return error when is_admin is false', (done) => {
      chai.request(server)
        .post('/api/v1/trips')
        .set('Accept', 'application/json')
        .send(trip[2])
        .end((err, res) => {
          const {
            fare
          } = res.body.errors;
          expect(res.body).to.be.an('object');
          expect(res.statusCode).to.equal(400);
          expect(fare[0]).to.equal('the fare is required');
          done();
        });
    });
  });

  describe('GET all trips /api/v1/trips', () => {
    it('should return all trips', (done) => {
      chai.request(server)
        .get('/api/v1/trips')
        .set('Accept', 'application/json')
        .end((err, res) => {
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

  describe('PATCH Trip cancelled /api/v1/trips/:tripId', () => {
    it('should return trip cancelled successfully', (done) => {
      chai.request(server)
        .patch('/api/v1/trips/1')
        .set('Accept', 'application/json')
        .send({
          status: 'cancelled',
        })
        .end((err, res) => {
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
});