const request = require('supertest');
const server = require('./server');


describe('server', () => {
  describe('[GET] / endpoint', () => {
    test('the db env is testing', () => {
      expect(process.env.DB_ENV).toBe('testing')
    }) 
  })

  // test('should return 200 OK', () => {
  //   return request(server).get('/')
  //   .then(response => {
  //     expect(response.status).toBe(200)
  //   })
  // })
})