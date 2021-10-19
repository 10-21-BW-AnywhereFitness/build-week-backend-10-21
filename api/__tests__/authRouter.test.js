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

it('sanity check', () => {
  expect(true).not.toBe(false)
})

describe('server.js', () => {
  it('is the correct testing environment', async () => {
    expect(process.env.NODE_ENV).toBe('testing')
  })
})

describe('[POST]  /api/auth/register', () => {
  let res
  beforeEach(async () => {
    res = await request(server).post('/api/auth/register').send({ username: "taco", password: "12345" })
  })

  it('responds with 201 created', () => {
    expect(res.status).toBe(201)
  })
  it('causes a user to be added to the db', async () => {
    const users = await db('users')
    expect(users.length).toBe(5)
  })
  it('responds with newly created user', () => {
    expect(res.body).toMatchSnapshot()
  })
  it('new user has user_id, username, and role_id', () => {
    expect(res.body).toMatchObject({
      user_id: 5,
      username: "taco",
      role_id: 2
    })
  })
})

describe('[POST]  /api/auth/login', () => {
  let res 
  beforeEach(async () => {
    res = await request(server).post('/api/auth/login').send({ username: "selene", password: "12345" })
  })
  it('responds with a status 200', () => {
    expect(res.status).toBe(200);
  })
  it('sends back user_id, welcome message, and token', () => {
    expect(res.body).toMatchObject({
      "user_id": 4,
      "message": "Welcome back selene"
    })
    expect(res.body.token).toBeDefined()
  })
})

