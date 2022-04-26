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
      const playerData = {
        first_name: "Bronny",
        last_name: "James",
        position: "G",
        team: {
          teamId: 26,
          full_name: "Sacramento Kings"
        }
      };

      const response = await request(app)
      .post('/v1/players')
      .set('x-api-key', process.env.API_KEY)
      .send(playerData)
      .expect('Content-Type', /json/)
      .expect(201); 
  
      expect(response.body).toStrictEqual(playerData);
    })

    test('POST /players shoud return 400 when posting a player with missing properties', async () => {
      const playerData = {
        first_name: "Bronny",
        position: "G",
        team: {
          teamId: 26,
          full_name: "Sacramento Kings"
        }
      };
      const response = await request(app)
      .post('/v1/players')
      .set('x-api-key', process.env.API_KEY)
      .send(playerData)
      .expect('Content-Type', /json/)
      .expect(400); 
  
      expect(response.body).toStrictEqual({
        error: 'Missing required player properties'
      });
    })

    test('POST /players shoud return 400 when posting a player with unnecesary properties', async () => {
      const playerData = {
        first_name: "Bronny",
        position: "G",
        last_name: "James",
        favorite_food: 'noodles',
        team: {
          teamId: 26,
          full_name: "Sacramento Kings"
        }
      };
      const response = await request(app)
      .post('/v1/players')
      .set('x-api-key', process.env.API_KEY)
      .send(playerData)
      .expect('Content-Type', /json/)
      .expect(400); 
  
      expect(response.body).toStrictEqual({
        error: 'Unnecesary properties'
      });
    })

    test('POST /players shoud return 400 when posting a player with invalid properties types', async () => {
      const playerData = {
        first_name: true,
        position: "G",
        last_name: 43,
        team: {
          teamId: 26,
          full_name: "Sacramento Kings"
        }
      };
      const response = await request(app)
      .post('/v1/players')
      .set('x-api-key', process.env.API_KEY)
      .send(playerData)
      .expect('Content-Type', /json/)
      .expect(400); 
  
      expect(response.body).toStrictEqual({
        error: 'All the fields should be strings, except for the teamId'
      });
    })

    test('POST /players shoud return 400 when posting a player with invalid position ', async () => {
      const playerData = {
        first_name: "Bronny",
        last_name: "James",
        position: "SG",
        team: {
          teamId: 26,
          full_name: "Sacramento Kings"
        }
      };
      const response = await request(app)
      .post('/v1/players')
      .set('x-api-key', process.env.API_KEY)
      .send(playerData)
      .expect('Content-Type', /json/)
      .expect(400); 
  
      expect(response.body).toStrictEqual({
        error: 'Invalid position - Choose one: G,F,C,G-F,F-C'
      });
    })
    
    test('POST /players shoud return 400 when posting a player with invalid team', async () => {
      const playerData = {
        first_name: "Bronny",
        last_name: "James",
        position: "G",
        team: {
          teamId: 40,
          full_name: "Seattle Supersonics"
        }
      };
      const response = await request(app)
      .post('/v1/players')
      .set('x-api-key', process.env.API_KEY)
      .send(playerData)
      .expect('Content-Type', /json/)
      .expect(400); 
  
      expect(response.body).toStrictEqual({
        error: 'Not matching team was found in the Id'
      });
    })

  })

  describe('DELETE /players', () => {

    test('DELETE /players should response 404 when tryng to delete an unexisting player', async () => {
      const response = await request(app)
      .delete('/v1/players/40000000')
      .set('x-api-key', process.env.API_KEY)
      .expect('Content-Type', /json/)
      .expect(404);
    })

    test('DELETE /players should return 200 when when tring to delete someone and succesfully delete it', async () => {
      const playerData = {
        first_name: "Bronny",
        last_name: "James",
        position: "G",
        team: {
          teamId: 26,
          full_name: "Sacramento Kings"
        }
      };

      const response = await request(app)
      .get('/v1/players')
      .query({
        search: 'Bronny'
      })
      .expect('Content-Type', /json/)
      .expect(200); 

      const playerId = response.body.shift(0).playerId;

      const response2 = await request(app)
      .delete(`/v1/players/${playerId}`)
      .set('x-api-key', process.env.API_KEY)
      .expect('Content-Type', /json/)
      .expect(200);

      expect(response2.body).toStrictEqual({
        ok: `Player ${playerId} succesfully deleted`
      });
    })
  })

});