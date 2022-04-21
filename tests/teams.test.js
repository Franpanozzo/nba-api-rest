const request = require('supertest');
const app = require('../src/app');

describe('Teams API', () => {
  test('GET /launches should respond status 200', async () => {
    const response = await request(app)
      .get('/v1/teams')
      .expect('Content-Type', /json/)
      .expect(200);

    const firstTeam = response.body.pop();
    expect(firstTeam.name).toBe('Hawks');
  }) 
});

describe('Teams model', () => {

})