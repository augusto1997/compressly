import '@babel/polyfill'

import express from 'express'

import morgan from 'morgan'
import path from 'path'
import Boom from 'express-boom'

import router from './routes'

class Application {
  constructor () {
    this.express = express()
    this.setupViewEngine()
    this.setupMiddlewares()
    this.setupRoutes()
  }

  setupMiddlewares () {
    this.express.use(morgan('common'))
    this.express.use(express.json())
    this.express.use(Boom())
    this.express.use(express.static(path.resolve(__dirname, 'public')))
  }

  setupRoutes () {
    this.express.use(router)
  }

  setupViewEngine () {
    this.express.set('views', path.resolve(__dirname, 'views'))
    this.express.set('view engine', 'pug')
  }
}

export default new Application().express
