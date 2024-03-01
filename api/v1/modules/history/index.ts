import express from 'express';
import History from './routes';

const router = express.Router();

router.use('/history', History);

export default router;
