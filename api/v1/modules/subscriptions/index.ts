import express from 'express'
import Subscriptions from './routes'

const router = express.Router()

router.use('/subscriptions', Subscriptions)

export default router
