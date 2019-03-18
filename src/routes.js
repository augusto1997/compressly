import { Router } from 'express'
import ShortnerController from './controllers/shorten'

const router = Router()

router.get('/', ShortnerController.new)
router.post('/', ShortnerController.index)
router.get('/:url', ShortnerController.get)

export default router
