const db = require('../database/dbConfig');
const request = require('supertest');
const server = require('../api/server');

beforeEach(async () => {
  await db('users').truncate()
})

describe('Jokes', () => {
  describe('GET /', () => {

    test('Returns json OK', () => {
      return request(server).get('/api/jokes')
      .expect('Content-Type', /json/)
    });

    test('Should return 200 status', () => {
      return request(server).get('/api/jokes')
      .set('authorization', `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoxLCJ1c2VybmFtZSI6ImZ1bnRlZSIsImlhdCI6MTU3MzgwNzEwNSwiZXhwIjoxNTczODkzNTA1fQ.1WvcNsQuBeDyn_eLqnLWYNH-KavBYkb9SdF80ClIzRQ`)
      .then(res => {
        expect(res.status).toBe(200)
      })
    })
  })
})