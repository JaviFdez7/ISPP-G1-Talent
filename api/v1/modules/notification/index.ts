import express from 'express'
import Notification from './routes'

const router = express.Router()

router.use('/user', Notification)

export default router
