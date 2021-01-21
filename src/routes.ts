import { Router } from 'express'
import ShortnerController from './controllers/shorten'
import { IShortnerService } from './services/shorten'

export const setupRouter = (service: IShortnerService): Router => {
  const router = Router()
  const shortnerController = new ShortnerController(service)

  router.post('/', shortnerController.create)
  router.get('/:url', shortnerController.get)

  return router
}
