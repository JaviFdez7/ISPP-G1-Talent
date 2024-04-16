/* eslint-disable @typescript-eslint/no-unsafe-argument */
import express from 'express';
import {
  getTrend
} from './controllers/TrendController';

const router = express.Router();

// Define routes for the Trend module
router.get('/', getTrend);

export default router;
