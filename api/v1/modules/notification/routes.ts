/* eslint-disable @typescript-eslint/no-unsafe-argument */
import express from 'express';
import {
  deleteNotification,
  getAllNotification,
  getNotificationById,
  getNotificationsOfCandidate
} from './controllers/NotificationController';
import { checkReadingMailbox } from './validators/NotificationMiddleware';

const router = express.Router();

// Define routes for the Notification module
router.get('/notification',getAllNotification);
router.get('/:userId/notification',checkReadingMailbox,getNotificationsOfCandidate);
router.delete('/:userId/notification/:id',deleteNotification);
router.get('/:userId/notification/:id',getNotificationById);


export default router;
