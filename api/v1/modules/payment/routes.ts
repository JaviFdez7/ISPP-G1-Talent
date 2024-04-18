/* eslint-disable @typescript-eslint/no-unsafe-argument */
import express from 'express'
import { makePayment } from './controllers/PaymentController'
import { validatePayment, checkValidToken } from './validators/PaymentValidators'

const router = express.Router()
router.use(express.json())

// Define routes for the Payment module
router.post('/', checkValidToken, validatePayment, makePayment)

export default router
