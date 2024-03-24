import express from 'express';
import Payment from './routes';

const router = express.Router();

router.use('/payment', Payment);

export default router;
