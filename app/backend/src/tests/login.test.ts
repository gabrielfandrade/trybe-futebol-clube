import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';

import User from '../database/models/user';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teste do endpoint "/login"', () => {
  it('Verifica se é possível efetuar um Login', async () => {
    sinon.stub(User, 'findOne').resolves({
      id: 1,
      username: 'Admin',
      role: 'admin',
      email: 'admin@admin.com',
      password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
    } as User)

    const httpResponse = await chai
      .request(app)
      .post('/login')
      .send({ email: 'admin@admin.com', password: 'secret_admin' })
    
    expect(httpResponse.status).to.equal(200)
    expect(httpResponse.body).to.have.any.keys('token')

    sinon.restore();
  })

  it('Verifica sem não é possível efetuar um Login sem um Email', async () => {
    const httpResponse = await chai
      .request(app)
      .post('/login')
      .send({ password: 'secret_admin' })

      expect(httpResponse.status).to.equal(400)
      expect(httpResponse.body).to.be.deep.equal({ message: 'All fields must be filled' })
  })

  it('Verifica sem não é possível efetuar um Login sem um Password', async () => {
    const httpResponse = await chai
      .request(app)
      .post('/login')
      .send({ email: 'admin@admin.com' })

      expect(httpResponse.status).to.equal(400)
      expect(httpResponse.body).to.be.deep.equal({ message: 'All fields must be filled' })
  })

  it('Verifica sem não é possível efetuar um Login com um Email invalido', async () => {
    sinon.stub(User, 'findOne').resolves()

    const httpResponse = await chai
      .request(app)
      .post('/login')
      .send({ email: 'erro@erro.com', password: 'secret_admin' })

    expect(httpResponse.status).to.equal(401)
    expect(httpResponse.body).to.be.deep.equal({ message: 'Incorrect email or password' })

    sinon.restore();
  })

  it('Verifica sem não é possível efetuar um Login com um Password invalido', async () => {
    sinon.stub(User, 'findOne').resolves({
      id: 1,
      username: 'Admin',
      role: 'admin',
      email: 'admin@admin.com',
      password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
    } as User)

    const httpResponse = await chai
      .request(app)
      .post('/login')
      .send({ email: 'admin@admin.com', password: 'wrong_password' })

    expect(httpResponse.status).to.equal(401)
    expect(httpResponse.body).to.be.deep.equal({ message: 'Incorrect email or password' })

    sinon.restore();
  })

  it('Verifica se o Token é validado', async () => {
    const httpResponse = await chai
      .request(app)
      .get('/login/validate')
      .set({ authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJBZG1pbiIsInJvbGUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwiaWF0IjoxNjY2NjI2MzI2fQ.ePTtMS3KkZl2dyKFNvLTIF3pmsSwOkUgCIpa1sk1HZo' })

    expect(httpResponse.status).to.equal(200)
    expect(httpResponse.body).to.be.deep.equal({ role: 'admin' })
  })
})