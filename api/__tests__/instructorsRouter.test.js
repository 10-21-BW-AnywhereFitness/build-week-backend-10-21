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
  
  describe('[GET] /api/instructor/:user_id/classes', () => {
    it.todo('sends back status 200')
    it.todo('only allows an authenticated instructor to access the endpoint')
    it.todo('returns 3 classes')
    it.todo("not able to access other instructor's classes")
    it.todo('data returns in the correct shape')
  })

  describe('[GET] /api/instructor/:user_id/classes/:class_id', () => {
    it.todo('sends back status 200')
    it.todo('returns 1 class by its class_id')
    it.todo('returns correct class')
    it.todo('sends an error message if the class does not exist')
    it.todo('sends the correct data shape')
  })

  describe('[POST] /api/instructor/:user_id/classes/ (auth instructor)', () => {
    it.todo('returns status 201 for successful class creation')
    it.todo('responds with class information')
  })

  describe('[PUT] /api/instructor/:user_id/classes/:class_id (auth_instructor)', () => {
    it.todo('placeholder')
  })

  describe('[DELETE] /api/instructor/:user_id/classes/:class_id (auth instructor)', () => {
    it.todo('placeholder')
  })
  
