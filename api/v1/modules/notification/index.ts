import express from 'express';
import Notification from './routes';

const router = express.Router();

router.use('/v1/notification', Notification);

export default router;
