import chai from 'chai';
import chaiHttp from 'chai-http';
import { exec } from 'child_process';
import { Pool } from 'pg';
import dotenv from 'dotenv';
import server from '../server';
import trip from '../models/trip';


chai.use(chaiHttp);
dotenv.config();
const pool = new Pool({ connectionString: process.env.DB_URL });

pool.on('error', (err) => {
  console.log(err);
});


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
});