const request = require('supertest');

require('dotenv').config();

const app = require('../src/app');
const { loadTeamsData } = require('../src/models/teams.model');
const { loadPlayersData } = require('../src/models/players.model');
const {
  mongoConnect,
  mongoDisconnect
} = require('../src/services/mongo');

jest.setTimeout(1000000);

describe('Teams API', () => {
  beforeAll(async () => {
    await mongoConnect(process.env.MONGO_URL);
    await loadTeamsData();
    await loadPlayersData();
  });

  afterAll(async () => {
    await mongoDisconnect();
  })
  
  test('GET /teams should respond status 200', async () => {
    const response = await request(app)
      .get('/v1/teams')
      .expect('Content-Type', /json/)
      .expect(200);

    const team = response.body.shift();
    expect(team.name).toBe('Hawks');
  }); 

  test('GET /teams/3 should respond with the Nets', async () => {
    const response = await request(app)
      .get('/v1/teams/3')
      .expect('Content-Type', /json/)
      .expect(200);

      const team = response.body;
      expect(team.name).toBe('Nets');
  })

  test('GET /teams/:teamId with unexisting teamId should respond status 404', async () => {
    const response = await request(app)
      .get('/v1/teams/40')
      .expect('Content-Type', /json/)
      .expect(404);
  })
 });
