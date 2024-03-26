/* eslint-disable @typescript-eslint/no-unsafe-argument */
import express from 'express';
import {
  getAllAnalysis,
  getAnalysisById,
  getAnalysisByGitHubUsername,
  createAnalysis,
  deleteAnalysis,
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
router.delete('/github/:username',checkValidTokenAndValidGithubUser,deleteAnalysis);

export default router;
