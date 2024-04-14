/* eslint-disable @typescript-eslint/no-unsafe-argument */
import express from 'express'
import {
	getAllAnalysis,
	getAnalysisById,
	getAnalysisByGitHubUsername,
	createAnalysis,
	updateAnalysisProfile,
} from './controllers/AnalysisController'
import {
	validateGitHubUserAndApiKey,
	validateUsername,
	checkValidToken,
	checkValidTokenAndValidAnalysis,
	checkValidTokenAndValidGithubUser,
	checkSubscriptionState,
	validateUpdateData,
	checkCandidateToken,
} from './validators/analysisvalidator'
const router = express.Router()
router.use(express.json())
// Define routes for the Analysis module
router.get('/', getAllAnalysis)
router.get('/:id', checkValidTokenAndValidAnalysis, getAnalysisById)
router.get(
	'/github/:username',
	validateUsername,
	checkValidTokenAndValidGithubUser,
	getAnalysisByGitHubUsername
)
router.post(
	'/',
	validateGitHubUserAndApiKey,
	checkValidToken,
	checkSubscriptionState,
	createAnalysis
)
//TODO: Método de actualizar perfil(NO ESTA ACABADO)
router.patch(
	'/:userId',
	checkCandidateToken,
	validateUpdateData,
	checkSubscriptionState,
	updateAnalysisProfile
)

export default router
