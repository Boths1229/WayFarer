import chai from 'chai';
import chaiHttp from 'chai-http';
import { exec } from 'child_process';
import { Pool } from 'pg';
import dotenv from 'dotenv';
import server from '../server';
import users from '../models/users';
import config from '../config/config';


chai.use(chaiHttp);
dotenv.config();
// const env = process.env.NODE_ENV;
const pool = new Pool({ connectionString: process.env.DB_URL });

pool.on('error', (err) => {
  console.log(err);
});


const { expect } = chai;
describe('User test', () => {
  before((done) => {
    const dump = 'psql -h localhost -d testDb -U postgres -f server/test/testDb.sql';
    exec(dump, (err) => {
      done();
    });
  });

  describe('POST sign up successful api/v1/auth/signup', () => {
    it('should return signup successful', (done) => {
      chai.request(server)
        .post('/api/v1/auth/signup')
        .set('Accept', 'application/json')
        .send(users[0])
        .end((err, res) => {
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

  describe('POST email already in use api/v1/auth/signup', () => {
    it('should return user with this email already exist', (done) => {
      chai.request(server)
        .post('/api/v1/auth/signup')
        .set('Accept', 'application/json')
        .send(users[1])
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(res.statusCode).to.equal(409);
          expect(res.body.message).to.equal('this email is already in use');
          done();
        });
    });
  });
  describe('POST sign up details in incomplete api/v1/auth/signup', () => {
    it('should return error when user signup details is incomplete', (done) => {
      chai.request(server)
        .post('/api/v1/auth/signup')
        .set('Accept', 'application/json')
        .send(users[2])
        .end((err, res) => {
          const {
            first_name, email
          } = res.body.errors;
          expect(res.body).to.be.an('object');
          expect(res.statusCode).to.equal(400);
          expect(first_name[0]).to.equal('the first name is required');
          expect(email[0]).to.equal('the email is required');
          done();
        });
    });
  });

  describe('POST should return email is invalid api/v1/auth/signup', () => {
    it('should return error when email is invalid', (done) => {
      chai.request(server)
        .post('/api/v1/auth/signup')
        .set('Accept', 'application/json')
        .send(users[3])
        .end((err, res) => {
          const {
            email
          } = res.body.errors;
          expect(res.body).to.be.an('object');
          expect(res.statusCode).to.equal(400);
          expect(email[0]).to.equal('the email format is invalid');
          done();
        });
    });
  });

  describe('POST should return password length is less than 6 or invalid api/v1/auth/signup', () => {
    it('should return error when password length is less than 6 or invalid', (done) => {
      chai.request(server)
        .post('/api/v1/auth/signup')
        .set('Accept', 'application/json')
        .send(users[4])
        .end((err, res) => {
          const {
            password
          } = res.body.errors;
          expect(res.body).to.be.an('object');
          expect(res.statusCode).to.equal(400);
          expect(password[0]).to.equal('Min password limit is 6');
          done();
        });
    });
  });

  describe('POST api/v1/auth/signin', () => {
    it('should return signin successful', (done) => {
      chai.request(server)
        .post('/api/v1/auth/signin')
        .set('Accept', 'application/json')
        .send(users[5])
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(res.body.status).to.equal('success');
          expect(res.body.data.user_id).to.equal(1);
          expect(res.body.data.token).to.be.a('string');
          expect(res.body.data.first_name).to.equal('amaka');
          expect(res.body.data.last_name).to.equal('chuks');
          expect(res.body.data.email).to.equal('boths1229@yahoo.com');
          done();
        });
    });
  });

  describe('POST invalid input values api/v1/auth/signin', () => {
    it('should return error when invalid details', (done) => {
      chai.request(server)
        .post('/api/v1/auth/signin')
        .set('Accept', 'application/json')
        .send(users[6])
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(res.statusCode).to.equal(401);
          expect(res.body.message).to.equal('invalid email or password');
          done();
        });
    });
  });

  describe('POST should return email field not filled api/v1/auth/signin', () => {
    it('should return error when email field is not filled', (done) => {
      chai.request(server)
        .post('/api/v1/auth/signin')
        .set('Accept', 'application/json')
        .send(users[7])
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(res.statusCode).to.equal(400);
          expect(res.body.message).to.equal('Invalid Credentials');
          done();
        });
    });
  });

  describe('POST should return email format incorrect api/v1/auth/signin', () => {
    it('should return error when email format is incorrect', (done) => {
      chai.request(server)
        .post('/api/v1/auth/signin')
        .set('Accept', 'application/json')
        .send(users[8])
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(res.statusCode).to.equal(400);
          expect(res.body.message).to.equal('Invalid Credentials');
          done();
        });
    });
  });

  describe('POST should return password field not filled api/v1/auth/signin', () => {
    it('should return error when password field is not filled', (done) => {
      chai.request(server)
        .post('/api/v1/auth/signin')
        .set('Accept', 'application/json')
        .send(users[9])
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(res.statusCode).to.equal(400);
          expect(res.body.message).to.equal('Invalid Credentials');
          done();
        });
    });
  });

  describe('POST should return password incorrect api/v1/auth/signin', () => {
    it('should return error when password is incorrect', (done) => {
      chai.request(server)
        .post('/api/v1/auth/signin')
        .set('Accept', 'application/json')
        .send(users[10])
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(res.statusCode).to.equal(400);
          expect(res.body.message).to.equal('Invalid Credentials');
          done();
        });
    });
  });
});