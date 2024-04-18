/* eslint-disable @typescript-eslint/no-unsafe-argument */
import express from 'express'
import {
	getAllSubscriptions,
	getSubscriptionsByUserId,
	updateSubscriptionByUserId,
} from './controllers/SubscriptionsController'

import {
	checkGetSubscriptionByUserId,
	checkUpdateSubscriptionByUserId,
} from './middlewares/SubscriptionsMiddleware'

const router = express.Router()

// Define routes for the Subscriptions module
router.get('/', getAllSubscriptions)
router.get('/:userId', checkGetSubscriptionByUserId, getSubscriptionsByUserId)
router.patch('/:userId', checkUpdateSubscriptionByUserId, updateSubscriptionByUserId)

export default router
