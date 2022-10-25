import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';

import User from '../database/models/user';
import Team from '../database/models/team';
import Match from '../database/models/match';
import { matches, matchesInProgress, newMatch, updateMatch } from './mocks/match.mock';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

interface TeamName {
  teamName: string,
}

interface MatchWithTeam {
  match: Match,
  teamHome: TeamName,
}

describe('Teste do endpoint "/matches"', () => {
  it('Verifica se retorna uma lista de partidas', async () => {
    sinon.stub(Match, 'findAll').resolves(matches as [])

    const httpResponse = await chai
      .request(app)
      .get('/matches')

    expect(httpResponse.status).to.equal(200)
    expect(httpResponse.body).to.be.deep.equal(matches)

    sinon.restore()
  })

  it('Verifica se retorna uma lista de partidas em progresso', async () => {
    sinon.stub(Match, 'findAll').resolves(matchesInProgress as [])

    const httpResponse = await chai
      .request(app)
      .get('/matches?inProgress=true')
    
    expect(httpResponse.status).to.equal(200)
    expect(httpResponse.body).to.be.deep.equal(matchesInProgress)

    sinon.restore()
  })

  it('Verifica se é possível adicionar uma partida', async () => {
    sinon.stub(Match, 'create').resolves(newMatch as Match)

    const httpResponse = await chai
      .request(app)
      .post('/matches')
      .set({ authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJBZG1pbiIsInJvbGUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwiaWF0IjoxNjY2NjI2MzI2fQ.ePTtMS3KkZl2dyKFNvLTIF3pmsSwOkUgCIpa1sk1HZo' })
      .send({ homeTeam: 13, awayTeam: 9 })

      expect(httpResponse.status).to.equal(201)
      expect(httpResponse.body).to.be.deep.equal(newMatch)
  
      sinon.restore()
  })

  it('Verifica se não é possível adicionar uma partida com times iguais', async () => {
    const httpResponse = await chai
      .request(app)
      .post('/matches')
      .set({ authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJBZG1pbiIsInJvbGUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwiaWF0IjoxNjY2NjI2MzI2fQ.ePTtMS3KkZl2dyKFNvLTIF3pmsSwOkUgCIpa1sk1HZo' })
      .send({ homeTeam: 10, awayTeam: 10 })

      expect(httpResponse.status).to.equal(422)
      expect(httpResponse.body).to.be.deep.equal({ message: 'It is not possible to create a match with two equal teams' })
  })

  it('Verifica se não é possível adicionar uma partida com times inexistentes', async () => {
    sinon.stub(Team, 'findAndCountAll').resolves({ rows: [], count: 1 })

    const httpResponse = await chai
      .request(app)
      .post('/matches')
      .set({ authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJBZG1pbiIsInJvbGUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwiaWF0IjoxNjY2NjI2MzI2fQ.ePTtMS3KkZl2dyKFNvLTIF3pmsSwOkUgCIpa1sk1HZo' })
      .send({ homeTeam: 30, awayTeam: 1 })

    expect(httpResponse.status).to.equal(404)
    expect(httpResponse.body).to.be.deep.equal({ message: 'There is no team with such id!' })

    sinon.restore()
  })

  it('Verifica se não é possível adicionar uma partida tendo um Token invalido', async () => {
    const httpResponse = await chai
      .request(app)
      .post('/matches')
      .set({ authorization: 'abc123' })
      .send({ homeTeam: 13, awayTeam: 9 })  

    expect(httpResponse.status).to.equal(401)
    expect(httpResponse.body).to.be.deep.equal({ message: 'Token must be a valid token' })
  })

  it('Verifica se não é possível adicionar uma partida sem um Token', async () => {
    const httpResponse = await chai
      .request(app)
      .post('/matches')
      .send({ homeTeam: 13, awayTeam: 9 })
      
    expect(httpResponse.status).to.equal(401)
    expect(httpResponse.body).to.be.deep.equal({ message: 'Token must be a valid token' })
  })

  it('Verifica se é possível atualizar o progresso da partida', async () => {
    sinon.stub(Match, 'update').resolves()

    const httpResponse = await chai
      .request(app)
      .patch('/matches/1/finish')

    expect(httpResponse.status).to.equal(200)
    expect(httpResponse.body).to.be.deep.equal({ message: 'Finished' })

    sinon.restore()
  })

  it('Verifica se é possível atualizar uma partida', async () => {
    sinon.stub(Match, 'update').resolves()

    const httpResponse = await chai
      .request(app)
      .patch('/matches/1')
      .send({ homeTeamGoals: 2, awayTeamGoals: 1 })

    expect(httpResponse.status).to.equal(200)

    sinon.restore()
  })
})