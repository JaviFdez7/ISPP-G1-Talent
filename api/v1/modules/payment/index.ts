import express from 'express';
import Payment from './routes';

const router = express.Router();

// This is the initial url of Payment
router.use('/payment', Payment);

export default router;
