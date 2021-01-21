import express from 'express'

import Application from './app'
import ShortenService from './services/shorten'
import { setupRouter } from './routes'
import RedisClient from './redis-client'

const main = () => {
  const PORT = process.env.PORT ?? 8080

  const server = express()

  const redis = new RedisClient()
  const service = new ShortenService(redis)
  const router = setupRouter(service)

  const application = new Application(server, router)
  const loggerHandler = () => console.log(`server running on port ${PORT}`)

  application.listen(PORT, loggerHandler)
}

main()
