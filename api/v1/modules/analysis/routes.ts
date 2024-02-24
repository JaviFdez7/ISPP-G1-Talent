/* eslint-disable @typescript-eslint/no-unsafe-argument */
import express from 'express';
import {
  getAllAnalysis,
  getAnalysisById,
  createAnalysis,
  updateAnalysis,
  deleteAnalysis
} from './controllers/AnalysisController';

const router = express.Router();

// Define routes for the Analysis module
router.get('/', getAllAnalysis);
router.get('/:id', getAnalysisById);
router.post('/', createAnalysis);
router.patch('/:id', updateAnalysis);
router.delete('/:id', deleteAnalysis);

export default router;
