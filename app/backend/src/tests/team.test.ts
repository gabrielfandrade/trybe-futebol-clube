import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';

import Team from '../database/models/team';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teste do endpoint "/teams"', () => {
  it('Verifica se retorna uma lista de times', async () => {
    sinon.stub(Team, 'findAll').resolves([
      {
        id: 1,
        teamName: 'Avaí/Kindermann',
      }, {
        id: 2,
        teamName: 'Bahia',
      }, {
        id: 3,
        teamName: 'Botafogo',
      }
    ] as Team[])

    const httpResponse = await chai
      .request(app)
      .get('/teams')

    expect(httpResponse.status).to.equal(200)
    expect(httpResponse.body).to.be.deep.equal([
      {
        id: 1,
        teamName: 'Avaí/Kindermann',
      }, {
        id: 2,
        teamName: 'Bahia',
      }, {
        id: 3,
        teamName: 'Botafogo',
      }
    ])

    sinon.restore()
  })

  it('Verifica se retorna um time de id 1', async () => {
    sinon.stub(Team, 'findOne').resolves({
      id: 1,
      teamName: 'Avaí/Kindermann',
    } as Team)

    const httpResponse = await chai
      .request(app)
      .get('/teams/1')

    expect(httpResponse.status).to.equal(200)
    expect(httpResponse.body).to.be.deep.equal({ id: 1, teamName: 'Avaí/Kindermann' })

    sinon.restore()
  })
})