/* eslint-disable @typescript-eslint/no-unsafe-argument */
import express from 'express';
import {
  getAllSubscriptions,
  getSubscriptionsByUserId,
  createSubscriptions,
  updateSubscriptions,
  deleteSubscriptions
} from './controllers/SubscriptionsController';

const router = express.Router();

// Define routes for the Subscriptions module
router.get('/', getAllSubscriptions);
router.get('/:userId', getSubscriptionsByUserId);
router.patch('/:userId', updateSubscriptions);
router.delete('/:userId', deleteSubscriptions);

export default router;
