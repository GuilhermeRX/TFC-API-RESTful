import * as chai from 'chai';
import * as Sinon from 'sinon';
import { app } from '../app';
import Team from '../database/models/teams';
import { tableAll, tableAway, tableHome, teamsAndMatches } from './mock';
// @ts-ignore
import chaiHttp = require('chai-http');

chai.use(chaiHttp)

const { expect } = chai;

const mockTeamsAndMatches = teamsAndMatches;

describe('Testa a rota leaderboard', () => {
  beforeEach(() => {
    Sinon.restore();
  })

  it('Testa se retorna a classificação geral', async () => {
    Sinon.stub(Team, 'findAll').resolves(teamsAndMatches as any)
    const response = await chai.request(app)
      .get('/leaderboard');
    expect(response.status).to.equal(200)
    expect(response.body).to.deep.equals(tableAll)
  });

  it('Testa se retorna a classificação dos times da casa', async () => {
    Sinon.stub(Team, 'findAll').resolves(teamsAndMatches as any)
    const response = await chai.request(app)
      .get('/leaderboard/home');
    expect(response.status).to.equal(200)
    expect(response.body).to.deep.equals(tableHome)
  });

  it('Testa se retorna a classificação dos times visitantes', async () => {
    Sinon.stub(Team, 'findAll').resolves(teamsAndMatches as any)
    const response = await chai.request(app)
      .get('/leaderboard/away');
    expect(response.status).to.equal(200)
    expect(response.body).to.deep.equals(tableAway)
  });
});