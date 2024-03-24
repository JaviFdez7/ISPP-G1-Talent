/* eslint-disable @typescript-eslint/no-unsafe-argument */
import express from 'express';
import {
  getPaymentsByUserId
} from './controllers/PaymentController';

const router = express.Router();

router.get('/:id', getPaymentsByUserId);

export default router;
