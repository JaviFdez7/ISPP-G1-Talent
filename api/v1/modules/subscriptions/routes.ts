/* eslint-disable @typescript-eslint/no-unsafe-argument */
import express from 'express';
import {
  getAllSubscriptions,
  getSubscriptionsByUserId,
  createSubscriptions,
  updateSubscriptions
} from './controllers/SubscriptionsController';

const router = express.Router();

// Define routes for the Subscriptions module
router.get('/', getAllSubscriptions);
router.get('/:id', getSubscriptionsByUserId);
router.patch('/:id', updateSubscriptions);

export default router;
