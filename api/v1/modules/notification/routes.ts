/* eslint-disable @typescript-eslint/no-unsafe-argument */
import express from 'express'
import {
	deleteNotification,
	getAllNotification,
	getNotificationById,
	getNotificationsOfCandidate,
	updateNotification,
} from './controllers/NotificationController'
import { checkReadingMailbox, checkReadingOneMail } from './validators/NotificationMiddleware'

const router = express.Router()

// Define routes for the Notification module
router.get('/:userId/notification', checkReadingMailbox, getNotificationsOfCandidate)
router.delete('/:userId/notification/:id', checkReadingOneMail, deleteNotification)
router.patch('/:userId/notification/:id', updateNotification)
router.get('/:userId/notification/:id', checkReadingOneMail, getNotificationById)

export default router
