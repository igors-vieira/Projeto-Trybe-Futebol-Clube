import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Matches from '../database/models/Matches';

import { Response } from 'superagent';
import allMatches from './mocks/allMatches';
import trueProgress from './mocks/trueProgressMatches';
import falseProgress from './mocks/falseProgressMatches';

chai.use(chaiHttp);

const { expect } = chai;

describe('testando a rota "/matches"', () => {
  describe('quando a rota "get" feita corretamente', () => {
  let chaiHttpResponse: Response;

  beforeEach(async () => {
    sinon
      .stub(Matches, "findAll")
      .resolves(allMatches as unknown as Matches[]);
  });

  it('deve retorna um status 200', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/matches')
    
     expect(chaiHttpResponse.status).to.be.equal(200)
     expect(chaiHttpResponse.body).to.be.deep.equal(allMatches)
   });

  afterEach(()=>{
    (Matches.findAll as sinon.SinonStub).restore();
    })
  })

  describe('quando a rota "get" com query isProgress retorna corretamente', () => {
  let chaiHttpResponse: Response;

  it('deve retorna as partidas com isProgress: true', async () => {
    sinon
      .stub(Matches, "findAll")
      .resolves(trueProgress as unknown as Matches[]);
      
    chaiHttpResponse = await chai
      .request(app)
      .get('/matches')
      .query({ isProgress: true })
    
     expect(chaiHttpResponse.status).to.be.equal(200)
     expect(chaiHttpResponse.body).to.be.deep.equal(trueProgress)
   });

  it('deve retorna as partidas com isProgress: true', async () => {
    sinon
      .stub(Matches, "findAll")
      .resolves(falseProgress as unknown as Matches[]);

    chaiHttpResponse = await chai
      .request(app)
      .get('/matches')
      .query({ isProgress: false })
    
     expect(chaiHttpResponse.status).to.be.equal(200)
     expect(chaiHttpResponse.body).to.be.deep.equal(falseProgress)
   });

  afterEach(()=>{
    (Matches.findAll as sinon.SinonStub).restore();
    })
  })
});

