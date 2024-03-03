import express from 'express';
import Analysis from './routes';

const router = express.Router();

//This is the initial url of Analysis
router.use('/analysis', Analysis);

export default router;
