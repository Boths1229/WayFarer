import chai from 'chai';
import chaiHttp from 'chai-http';
import { exec } from 'child_process';
import server from '../server';
import loans from '../models/loans';
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
describe('Loan test', () => {
  before((done) => {
    const dump = 'psql -h localhost -d testDb -U postgres -f server/test/testDb.sql';
    exec(dump, (err) => {
      done();
    });
  });

  describe('POST loan applylication successful api/v1/loans', () => {
    it('should return booking successful', (done) => {
      chai.request(server)
        .post('/api/v1/loans')
        .set('Accept', 'application/json')
        .set("Authorization", token)
        .send(loans[0])
        .end((err, res) => {
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

  describe('POST booking details in incomplete api/v1/bookings', () => {
    it('should return error when user booking details is incomplete', (done) => {
      chai.request(server)
        .post('/api/v1/loans')
        .set('Accept', 'application/json')
        .send(loans[1])
        .end((err, res) => {
          const {
            amount
          } = res.body.errors;
          expect(res.body).to.be.an('object');
          expect(res.statusCode).to.equal(400);
          expect(amount[0]).to.equal('the amount is required');
          done();
        });
    });
  });

  describe('GET all loans /api/v1/loans', () => {
    it('should return all loans', (done) => {
      chai.request(server)
        .get('/api/v1/loans')
        .set('Accept', 'application/json')
        .set("Authorization", token)
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(res.status).to.equal(200);
          done();
        });
    });
  });
});
