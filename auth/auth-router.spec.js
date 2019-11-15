const db = require('../database/dbConfig');
const request = require('supertest');
const server = require('../api/server');

const bcrypt = require('bcrypt');


beforeEach(async () => {
  await db('users').truncate()
})

describe('Users', () => {

  describe('POST /register', async () => {

    test('should register a user', async () => {
    const newUser = await request(server).post('/api/auth/register')
    .send({ username: 'zara', password: '1234' })
    expect(newUser.body.username).toMatch(/zara/)
    })

    test('should return a status of 201', async () => {
      const response = await request(server).post('/api/auth/register')
      .send({ username: 'zara', password: '1234' })
      expect(response.status).toBe(201)
    })
  })

  describe('POST /login', async () => {
    test('Should return 200 status', async () => {
      await db('users').insert({
        username: 'zara', password: bcrypt.hashSync('1234', 10)
      })
      const res = await request(server).post('/api/auth/login')
      .send({
        username: 'zara',
        password: '1234'
      })
      .set('Content-Type', 'application/json')
      expect(res.status).toBe(200)
    })

    test('Token should exist', async () => {
      await db('users').insert({
        username: 'zara', password: bcrypt.hashSync('1234', 10)
      })
      const res = await request(server).post('/api/auth/login')
      .send({
        username: 'zara',
        password: '1234'
      })
      .set('Content-Type', 'application/json')
      expect(res.body.token).toBeTruthy()
    })
  })
})