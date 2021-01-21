import express from 'express'
import request from 'supertest'

import RedisClient from '../redis-client'
import ShortnerService from '../services/shorten'
import { setupRouter } from '../routes'

describe('shorten controller', () => {
  it('should generates a shorten url successfully', async () => {
    const server = express()
    const redis = new RedisClient()
    const service = new ShortnerService(redis)

    const router = setupRouter(service)
    server.use(express.json())
    server.use(router)

    await request(server)
      .post('/')
      .send({ url: 'http://google.com.br' })
      .expect('Content-Type', /json/)
      .expect(201)
  })

  it('should throws an error when does not sends an url', async () => {
    const server = express()
    const redis = new RedisClient()
    const service = new ShortnerService(redis)

    const router = setupRouter(service)
    server.use(express.json())
    server.use(router)

    await request(server)
      .post('/')
      .expect('Content-Type', /json/)
      .expect(400)
  })

  it('should gets the generated url succesfully', async () => {
    const server = express()
    const redis = new RedisClient()
    const service = new ShortnerService(redis)

    const router = setupRouter(service)
    server.use(express.json())
    server.use(router)

    const url = 'http://google.com.br'
    const responseGeneratedUrl = await request(server)
      .post('/')
      .send({ url })
      .expect('Content-Type', /json/)
      .expect(201)

    const compressedUrl = responseGeneratedUrl.body.url
    await request(server)
      .get(`/${compressedUrl}`)
      .expect('Content-Type', /json/)
      .expect(200, { url })
  })

  it('should returns an not found when its been called with a non registered url', async () => {
    const server = express()
    const redis = new RedisClient()
    const service = new ShortnerService(redis)

    const router = setupRouter(service)
    server.use(express.json())
    server.use(router)

    await request(server)
      .get('/foobar')
      .expect('Content-Type', /json/)
      .expect(404, { error: 'not found' })
  })
})
