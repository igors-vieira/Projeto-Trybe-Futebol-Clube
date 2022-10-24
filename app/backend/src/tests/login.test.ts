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
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjU0NTI3MTg5fQ.XS_9AA82iNoiVaASi0NtJpqOQ_gHSHhxrpIdigiT-fc"
      } as unknown as User);
  });

  afterEach(()=>{
    (User.findOne as sinon.SinonStub).restore();
  })

  it('deve retorna um status 200', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({
        "email": "string",
        "password": "string"
      })

     expect(chaiHttpResponse.status).to.be.equal(200)
     expect(chaiHttpResponse.body).to.be.deep.equal({
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjU0NTI3MTg5fQ.XS_9AA82iNoiVaASi0NtJpqOQ_gHSHhxrpIdigiT-fc"
    })
   });
  })
  describe('quando o email ou senha não foi passado corretamente', () => {
  let chaiHttpResponse: Response;

  beforeEach(async () => {
    sinon
      .stub(User, "findOne")
      .resolves({
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjU0NTI3MTg5fQ.XS_9AA82iNoiVaASi0NtJpqOQ_gHSHhxrpIdigiT-fc"
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
        "email": "emailInexistente",
        "password": "sen",
      } )

     expect(chaiHttpResponse.status).to.be.equal(401)
     expect(chaiHttpResponse.body).to.be.deep.equal({ "message": "Incorrect email or password" })
   });
  })
});
