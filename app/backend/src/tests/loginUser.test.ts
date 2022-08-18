import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';
import * as Sinon from 'sinon';
import { app } from '../app';
import User from '../database/models/users';
import passwordService from '../services/passwordService';
// @ts-ignore
import chaiHttp = require('chai-http');

chai.use(chaiHttp);

const { expect } = chai;

const credentialsMock = {
  email: "admin@admin.com",
  password: "secret_admin"
}

const errorCredentialsMock = {
  email: "any_email",
  password: "any_password"
}

const errorPasswordMock = {
  email: "admin@admin.com",
  password: "any_password"
}

const userMock = {
  id: 6,
  username: 'any_name',
  role: 'admin',
  email: 'any_email',
  password: "any_password",
}

const tokenMock = 'any_token';

describe('Testa a rota de login', () => {
  beforeEach(() => {
    Sinon.restore();
  })

  it('Ao fazer uma requisição com dados válidos retorna status "200" e o token', async () => {
    Sinon.stub(User, 'findOne').resolves(credentialsMock as User)
    Sinon.stub(passwordService, 'comparePassword').returns(true)
    Sinon.stub(jwt, 'sign').returns(tokenMock as any)

    const response = await chai.request(app)
      .post('/login')
      .send(credentialsMock);
    const { token } = response.body;

    expect(response.status).to.equal(200);
    expect(token).to.equal(tokenMock);
  });

  it('Ao fazer uma requisição com usuário que não existe retorna status "401" e a mensagem "Incorrect email or password"', async () => {
    Sinon.stub(User, 'findOne').resolves(undefined)
    const response = await chai.request(app)
      .post('/login')
      .send(errorCredentialsMock);
    const { message } = response.body;

    expect(response.status).to.equal(401);
    expect(message).to.equal('Incorrect email or password');
  });

  it('Ao fazer uma requisição com password inválido retorna status "400" e a mensagem "Dados Inválidos"', async () => {
    Sinon.stub(User, 'findOne').resolves(credentialsMock as User)
    Sinon.stub(passwordService, 'comparePassword').returns(false)
    const response = await chai.request(app)
      .post('/login')
      .send(errorPasswordMock);
    const { message } = response.body;

    expect(response.status).to.equal(400);
    expect(message).to.equal('Dados inválidos');
  });

  it('Ao fazer uma requisição sem os dados necessários retorna status "400" e a mensagem "All fields must be filled"', async () => {
    const response = await chai.request(app)
      .post('/login')
    const { message } = response.body;

    expect(response.status).to.equal(400);
    expect(message).to.equal('All fields must be filled');
  });

  it('Ao fazer uma requisição para login/validate com o token inválido retorna status "400" e "Token inválido"', async () => {

    const response = await chai.request(app)
      .get('/login/validate')
      .set('authorization', 'any_token');

    const { message } = response.body;
    expect(response.status).to.equal(400);
    expect(message).to.equal('Token inválido');
  });

  it('Ao fazer uma requisição para login/validate com o token correto retorna status "200" e a roule do usuário', async () => {
    Sinon.stub(jwt, 'verify').returns(userMock as unknown as any);
    Sinon.stub(User, 'findOne').resolves(userMock as User)

    const response = await chai.request(app)
      .get('/login/validate')
      .set('authorization', 'any_token');

    const { role } = response.body;
    expect(response.status).to.equal(200);
    expect(role).to.equal('admin');
  });


});
