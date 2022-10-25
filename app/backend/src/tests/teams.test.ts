import * as jwt from 'jsonwebtoken';
import * as sinon from 'sinon';
import * as chai from 'chai';
import teams from './mocks/allTeams'
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Teams from '../database/models/Teams';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('testando a rota /Teams', () => {
  describe('verificando a rota "/Teams"', () => {
  let chaiHttpResponse: Response;

  beforeEach(async () => {
    sinon
      .stub(Teams, 'findAll' )
        .resolves(teams as Teams[])
    });

  it('quando a rota "get" feita corretamente', async () => {
    chaiHttpResponse = await chai
    .request(app)
    .get('/teams')

    expect(chaiHttpResponse.status).to.be.equal(200) 
    expect(chaiHttpResponse.body).to.be.deep.equal(teams) 
   });
  afterEach(()=>{
    (Teams.findAll as sinon.SinonStub).restore();
  })
  })

  describe('verificando a rota "/Teams/:id"', () => {
  let chaiHttpResponse: Response;

  it('quando a rota "get" feita corretamente', async () => {
    sinon
      .stub(Teams, 'findOne' )
        .resolves(teams[4] as Teams)
        
    chaiHttpResponse = await chai
    .request(app)
    .get('/teams/5')

    expect(chaiHttpResponse.status).to.be.equal(200) 
    expect(chaiHttpResponse.body).to.be.deep.equal(teams[4]) 
   });

  it('quando a rota "get" e feita e da erro', async () => {
    sinon
      .stub(Teams, 'findOne' )
        .resolves(null)
    chaiHttpResponse = await chai
    .request(app)
    .get('/teams/999')

    expect(chaiHttpResponse.status).to.be.equal(404)
   });

  afterEach(()=>{
    (Teams.findOne as sinon.SinonStub).restore();
  })
  })
});
