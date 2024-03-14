/* eslint-disable @typescript-eslint/no-unsafe-argument */
import express from 'express';
import {
  getAllNotification,
  getNotificationById,
  createNotification,
  updateNotification,
  deleteNotification
} from './controllers/NotificationController';

const router = express.Router();

// Define routes for the Notification module
router.get('/', getAllNotification);
router.get('/:id', getNotificationById);
router.post('/', createNotification);
router.patch('/:id', updateNotification);
router.delete('/:id', deleteNotification);

export default router;
