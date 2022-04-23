const request = require('supertest');

const app = require('../src/app');
const { loadTeamsData } = require('../src/models/teams.model');
const {
  mongoConnect,
  mongoDisconnect
} = require('../src/services/mongo');

require('dotenv').config();

describe('Teams API', () => {
  beforeAll(async () => {
    await mongoConnect(process.env.MONGO_URL);
    await loadTeamsData();
  });

  afterAll(async () => {
    await mongoDisconnect(process.env.MONGO_URL);
  })
  
  test('GET /teams should respond status 200', async () => {
    const response = await request(app)
      .get('/v1/teams')
      .expect('Content-Type', /json/)
      .expect(200);

    const firstTeam = response.body.shift();
    expect(firstTeam.name).toBe('Hawks');
  }); 

  test('GET /teams/3 should respond with the Nets', async () => {
    const response = await request(app)
      .get('/v1/teams/3')
      .expect('Content-Type', /json/)
      .expect(200);

      const team = response.body;
      expect(team.name).toBe('Nets');
  })
 });

describe('Teams model', () => {

});