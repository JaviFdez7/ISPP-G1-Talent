/* eslint-disable @typescript-eslint/no-unsafe-argument */
import express from 'express';
import {
  getAllAnalysis,
  getAnalysisById,
  getAnalysisByGitHubUsername,
  createAnalysis,
  deleteAnalysis
} from './controllers/AnalysisController';
import {validateGitHubUserAndApiKey, validateUsername} from './validators/analysisvalidator'
const router = express.Router();
router.use(express.json());
// Define routes for the Analysis module
router.get('/', getAllAnalysis);
router.get('/:id', getAnalysisById);
router.get('/github/:username',validateUsername, getAnalysisByGitHubUsername);
router.post('/', validateGitHubUserAndApiKey,createAnalysis);
router.delete('/github/:username', deleteAnalysis);

export default router;
