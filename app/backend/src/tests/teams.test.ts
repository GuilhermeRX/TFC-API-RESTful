import * as chai from 'chai';
import * as Sinon from 'sinon';
import { app } from '../app';
import Team from '../database/models/teams';
// @ts-ignore
import chaiHttp = require('chai-http');

chai.use(chaiHttp)

const { expect } = chai;
const allTeams = [
  { id: 1, teamName: 'Flamengo' },
  { id: 2, teamName: 'Vasco' }
]

const uniqueTeam = { id: 1, teamName: 'Flamengo' }

describe('Testa a rota teams', () => {
  beforeEach(() => {
    Sinon.restore();
  })

  it('Testa se retorna todos os times', async () => {
    Sinon.stub(Team, 'findAll').resolves(allTeams as Team[])
    const response = await chai.request(app)
      .get('/teams');
    expect(response.status).to.equal(200);
    expect(response.body).to.be.deep.equal(allTeams);
  });

  it('Testa se retorna um time especifico', async () => {
    Sinon.stub(Team, 'findByPk').resolves(uniqueTeam as Team)
    const response = await chai.request(app)
      .get('/teams/1');
    expect(response.status).to.equal(200);
    expect(response.body).to.be.deep.equal(uniqueTeam);
  });
});