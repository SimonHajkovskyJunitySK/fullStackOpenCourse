const { test, describe, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcryptjs')
const app = require('../app')
const User = require('../models/user')

const api = supertest(app)

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', name: 'Root User', passwordHash })
    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await api.get('/api/users')

    const newUser = {
      username: 'shajkovsky',
      name: 'Simon Hajkovsky',
      password: 'salainen'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await api.get('/api/users')
    assert.strictEqual(usersAtEnd.body.length, usersAtStart.body.length + 1)

    const usernames = usersAtEnd.body.map((u) => u.username)
    assert.ok(usernames.includes(newUser.username))
  })

  test('creation fails if username is already taken', async () => {
    const usersAtStart = await api.get('/api/users')

    const result = await api
      .post('/api/users')
      .send({ username: 'root', name: 'Superuser', password: 'salainen' })
      .expect(400)

    assert.ok(result.body.error.includes('expected `username` to be unique'))

    const usersAtEnd = await api.get('/api/users')
    assert.strictEqual(usersAtEnd.body.length, usersAtStart.body.length)
  })

  test('creation fails if username is shorter than 3 characters', async () => {
    const usersAtStart = await api.get('/api/users')

    const result = await api
      .post('/api/users')
      .send({ username: 'ab', name: 'Too Short', password: 'salainen' })
      .expect(400)

    assert.ok(result.body.error.includes('shorter than the minimum allowed length'))

    const usersAtEnd = await api.get('/api/users')
    assert.strictEqual(usersAtEnd.body.length, usersAtStart.body.length)
  })

  test('creation fails if password is shorter than 3 characters', async () => {
    const usersAtStart = await api.get('/api/users')

    const result = await api
      .post('/api/users')
      .send({ username: 'validuser', name: 'Weak Password', password: 'ab' })
      .expect(400)

    assert.ok(result.body.error.includes('password must be at least 3 characters long'))

    const usersAtEnd = await api.get('/api/users')
    assert.strictEqual(usersAtEnd.body.length, usersAtStart.body.length)
  })

  test('creation fails if username is missing', async () => {
    const result = await api
      .post('/api/users')
      .send({ name: 'No Username', password: 'salainen' })
      .expect(400)

    assert.ok(result.body.error.includes('username and password are required'))
  })

  test('creation fails if password is missing', async () => {
    const result = await api
      .post('/api/users')
      .send({ username: 'nopassword', name: 'No Password' })
      .expect(400)

    assert.ok(result.body.error.includes('username and password are required'))
  })

  test('password hash is not returned', async () => {
    const response = await api.get('/api/users')
    response.body.forEach((user) => {
      assert.strictEqual(user.passwordHash, undefined)
    })
  })
})

after(async () => {
  await mongoose.connection.close()
})