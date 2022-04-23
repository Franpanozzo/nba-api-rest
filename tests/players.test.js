const request = require('supertest');

require('dotenv').config();

const app = require('../src/app');
const { loadTeamsData } = require('../src/models/teams.model');
const {
  mongoConnect,
  mongoDisconnect
} = require('../src/services/mongo');


describe('Players API', () => {
  beforeAll(async () => {
    await mongoConnect(process.env.MONGO_URL);
    await loadTeamsData();
  });

  afterAll(async () => {
    await mongoDisconnect(process.env.MONGO_URL);
  });

  test('GET /players should respond status 200', async () => {
    const response = await request(app)
    .get('/v1/players')
    .expect('Content-Type', /json/)
    .expect(200); 
  })


});