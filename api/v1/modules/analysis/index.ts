import express from 'express';
import Analysis from './routes';

const router = express.Router();

router.use('/v1/analysis', Analysis);

export default router;
