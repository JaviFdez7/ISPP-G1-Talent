import express from 'express';
import History from './routes';

const router = express.Router();

router.use('/v1/history', History);

export default router;
