import express from 'express';
import Trend from './routes';

const router = express.Router();

router.use('/trend', Trend);

export default router;
