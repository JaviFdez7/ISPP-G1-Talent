/* eslint-disable @typescript-eslint/no-unsafe-argument */
import express from 'express';
import {
  getAllAnalysis,
  getAnalysisById,
  getAnalysisByGitHubUsername,
  createAnalysis
} from './controllers/AnalysisController';
import { validateGitHubUserAndApiKey, validateUsername,
   checkValidToken,checkValidTokenAndValidAnalysis,checkValidTokenAndValidGithubUser } from './validators/analysisvalidator'
const router = express.Router();
router.use(express.json());
// Define routes for the Analysis module
router.get('/',getAllAnalysis);
router.get('/:id',checkValidTokenAndValidAnalysis, getAnalysisById);
router.get('/github/:username', validateUsername, checkValidTokenAndValidGithubUser,getAnalysisByGitHubUsername);
router.post('/', validateGitHubUserAndApiKey ,checkValidToken , createAnalysis);

export default router;
