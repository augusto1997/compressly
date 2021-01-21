import * as express from 'express'

import morgan from 'morgan'
import path from 'path'
import Boom from 'express-boom'

type ListenCallback = () => void | undefined

export default class Application {
  constructor(
    private readonly express: express.Express,
    private readonly router: express.IRouter
  ) {
    this.setupViewEngine()
    this.setupMiddlewares()
    this.useRouter();
  }

  private setupMiddlewares() {
    const publicPath = path.resolve(__dirname, 'public')
    this.express.use(morgan('common'))
    this.express.use(express.json())
    this.express.use(Boom())
    this.express.use(express.static(publicPath))
  }

  private setupViewEngine() {
    this.express.set('views', path.resolve(__dirname, 'views'))
    this.express.set('view engine', 'pug')
  }

  public listen(port: number | string, callback: ListenCallback) {
    this.express.listen(port, callback)
  }

  private useRouter() {
    const { router } = this;
    this.express.use(router)
  }
}
