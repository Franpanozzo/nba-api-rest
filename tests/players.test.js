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

describe('Players API', () => {
  beforeAll(async () => {
    await mongoConnect(process.env.MONGO_TEST_URL);
    await loadTeamsData();
    await loadPlayersData();
  });

  afterAll(async () => {
    await mongoDisconnect();
  });

  describe('GET /players', () => {

    test('GET /players should respond status 200', async () => {
      const response = await request(app)
      .get('/v1/players')
      .expect('Content-Type', /json/)
      .expect(200); 
    })
  
    test('GET /players with a query param shoud return status 200 all the players in search', async () => {
      const response = await request(app)
      .get('/v1/players')
      .query({
        search: 'Harden'
      })
      .expect('Content-Type', /json/)
      .expect(200); 
  
      const player = response.body.shift(0); // Las query params filtran, por eso me devuelve un arreglo
      expect(player.last_name).toBe('Harden');
    })

  })

  describe('POST /players', () => {
    
    test('POST /players shoud return 201 created and return the stored ', async () => {
      const response = await request(app)
      .get('/v1/players')
      .query({
        search: 'Harden'
      })
      .expect('Content-Type', /json/)
      .expect(200); 
  
      const player = response.body.shift(0); // Las query params filtran, por eso me devuelve un arreglo
      expect(player.last_name).toBe('Harden');
    })

  })

});