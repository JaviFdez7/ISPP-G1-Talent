/* eslint-disable @typescript-eslint/no-unsafe-argument */
import express from 'express';
import {
  getAllAnalysis,
  getAnalysisById,
  getAnalysisByGitHubUsername,
  createAnalysis,
  deleteAnalysis,
} from './controllers/AnalysisController';
import { validateGitHubUserAndApiKey, validateUsername ,checkValidToken} from './validators/analysisvalidator'
const router = express.Router();
router.use(express.json());
// Define routes for the Analysis module
router.get('/', checkValidToken,getAllAnalysis);
router.get('/:id',checkValidToken, getAnalysisById);
router.get('/github/:username',checkValidToken, validateUsername, getAnalysisByGitHubUsername);
router.post('/', validateGitHubUserAndApiKey, checkValidToken,createAnalysis);
router.delete('/github/:username', checkValidToken,deleteAnalysis);

export default router;
