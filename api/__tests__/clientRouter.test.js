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

describe('placeholder', () => {
    it.todo('placeholder')
    it.todo('placeholder')
    it.todo('placeholder')
    it.todo('placeholder')
    it.todo('placeholder')
    it.todo('placeholder')
  })
  