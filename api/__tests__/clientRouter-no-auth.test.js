const request = require('supertest')
const server = require('../server')
const db = require('../data/db-config')

beforeAll(async () => {
  await db.migrate.rollback()
  await db.migrate.latest()
})
beforeEach(async () => {
  await db.seed.run()
})
afterAll(async () => {
  await db.destroy()
})

describe('[GET] /api/client/public/classes (no auth)', () => {
  let res
  beforeEach(async () => {
    res = await request(server).get('/api/client/public/classes')
  })
    it('does not require auth and returns status 200', () => {
      expect(res.status).toBe(200);
    })
    it('retrieves 4 classes', () => {
      expect(res.body).toHaveLength(4);
    })
    it('returns the data in the correct shape made for public requests', () => {
      expect(res.body).toMatchSnapshot();
    })
  })

  describe('Cannot access any of the authorized endpoints without a token', () => {
    it('cannot access [GET]/api/client/classes', async() => {
      const res = await request(server).get('/api/client/classes')
      expect(res.status).toBe(401)
      expect(res.body.message).toBe('Token required')
    })
    it('cannot access [GET]/client/classes/:class_id', async () => {
      const res = await request(server).get('/api/client/classes/1')
      expect(res.status).toBe(401)
      expect(res.body.message).toBe('Token required')
    })
    it('cannot [POST] /client/classes/:class_id', async () => {
      const res = await request(server).post('/api/client/classes/1').send()
      expect(res.status).toBe(401)
      expect(res.body.message).toBe('Token required')
    })
    it('cannot [GET] /client/:user_id/classes', async () => {
      const res = await request(server).get('/api/client/1/classes')
      expect(res.status).toBe(401)
      expect(res.body.message).toBe('Token required')
    })
    it('cannot [GET] /client/:user_id/classes/:class_id', async () => {
      const res = await request(server).get('/api/client/1/classes/1')
      expect(res.status).toBe(401)
      expect(res.body.message).toBe('Token required')
    })
    it('cannot [DELETE] /client/:user_id/classes/:class_id', async() => {
      const res = await request(server).delete('/api/client/1/classes/1')
      expect(res.status).toBe(401)
      expect(res.body.message).toBe('Token required')
    })
  })