import * as jwt from 'jsonwebtoken';
import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/User';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('testando a rota login', () => {
  describe('quando o login e informado corretamente', () => {
  let chaiHttpResponse: Response;

  beforeEach(async () => {
    sinon
      .stub(User, "findOne")
      .resolves({
        id: 1,
        email: "admin@admin.com",
        password: "$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW",
        username: "Admin",
        role: "admin"
      } as unknown as User);
      sinon
        .stub(jwt , 'sign')
        .returns('token' as never)
  });

  it('deve retorna um status 200', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({
        email: "admin@admin.com",
        password: "secret_admin"
      })

     expect(chaiHttpResponse.status).to.be.equal(200)
     expect(chaiHttpResponse.body).to.be.deep.equal({ token: 'token'})
   });

  afterEach(()=>{
    (jwt.sign as sinon.SinonStub).restore();
    (User.findOne as sinon.SinonStub).restore();
  })

  })
  describe('quando o email ou senha não foi passado corretamente', () => {
  let chaiHttpResponse: Response;

  beforeEach(async () => {
    sinon
      .stub(User, "findOne")
      .resolves({
        id: 1,
        email: "admin@admin.com",
        password: "$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW",
        username: "Admin",
        role: "admin"
      } as unknown as User);
  });

  afterEach(()=>{
    (User.findOne as sinon.SinonStub).restore();
  })

  it('se não tiver a chave email deve retornar 400', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({
        "password": "string"
      } )

     expect(chaiHttpResponse.status).to.be.equal(400)
     expect(chaiHttpResponse.body).to.be.deep.equal({ "message": "All fields must be filled" })
   });
  it('se não tiver a chave senha deve retornar 400', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({
        "email": "string",
      } )

     expect(chaiHttpResponse.status).to.be.equal(400)
     expect(chaiHttpResponse.body).to.be.deep.equal({ "message": "All fields must be filled" })
   });
  it('se o email nao existir deve retornar um 401', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({
        "email": "emailInexistente",
        "password": "string",
      } )

     expect(chaiHttpResponse.status).to.be.equal(401)
     expect(chaiHttpResponse.body).to.be.deep.equal({ "message": "Incorrect email or password" })
   });
  it('se a senha estiver incorreta deve retornar um 401', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({
        "email": "admin@admin.com",
        "password": "sen",
      } )

     expect(chaiHttpResponse.status).to.be.equal(401)
     expect(chaiHttpResponse.body).to.be.deep.equal({ "message": "Incorrect email or password" })
   });
  })
});
