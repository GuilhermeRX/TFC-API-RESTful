import * as chai from 'chai';
import * as Sinon from 'sinon';
import { app } from '../app';
import Matches from '../database/models/matches';
// @ts-ignore
import chaiHttp = require('chai-http');

chai.use(chaiHttp)

const { expect } = chai;

const allMatches = [
  {
    "id": 1,
    "homeTeam": 16,
    "homeTeamGoals": 1,
    "awayTeam": 8,
    "awayTeamGoals": 1,
    "inProgress": false,
  },
  {
    "id": 2,
    "homeTeam": 9,
    "homeTeamGoals": 1,
    "awayTeam": 14,
    "awayTeamGoals": 1,
    "inProgress": true,
  }
]

const matchesInProgressTrue = [{
  "id": 2,
  "homeTeam": 9,
  "homeTeamGoals": 1,
  "awayTeam": 14,
  "awayTeamGoals": 1,
  "inProgress": true,
}]

const matchesInProgressFalse = [{
  "id": 2,
  "homeTeam": 9,
  "homeTeamGoals": 1,
  "awayTeam": 14,
  "awayTeamGoals": 1,
  "inProgress": false,
}]

describe('Testa a rota matches', () => {
  beforeEach(() => {
    Sinon.restore();
  })

  it('Testa se retorna todas as matches', async () => {
    Sinon.stub(Matches, 'findAll').resolves(allMatches as any)
    const response = await chai.request(app)
      .get('/matches');
    expect(response.status).to.equal(200);
    expect(response.body).to.be.deep.equal(allMatches);
  });

  it('Testa se retorna todas as matches com "inProgress = true "', async () => {
    Sinon.stub(Matches, 'findAll').resolves(matchesInProgressTrue as any)
    const response = await chai.request(app)
      .get('/matches?inProgress=true');
    expect(response.status).to.equal(200);
    expect(response.body).to.be.deep.equal(matchesInProgressTrue);
  });

  it('Testa se retorna todas as matches com "inProgress = false "', async () => {
    Sinon.stub(Matches, 'findAll').resolves(matchesInProgressFalse as any)
    const response = await chai.request(app)
      .get('/matches?inProgress=false');
    expect(response.status).to.equal(200);
    expect(response.body).to.be.deep.equal(matchesInProgressFalse);
  });
});