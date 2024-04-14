// eslint-disable-next-line @typescript-eslint/await-thenable
import { type Request, type Response } from 'express'
import AnalysisService from '../services/AnalysisService'
import { ApiResponse } from '../../../utils/ApiResponse'
import { getUserById } from '../../user/services/UserService'

// Default controller functions
export const getAllAnalysis: any = async (req: Request, res: Response) => {
	try {
		const data = await AnalysisService.getAllAnalysis()
		return ApiResponse.sendSuccess(res, data, 200, {
			self: `${req.protocol}:://${req.get('host')}${req.originalUrl}`,
		})
	} catch (error: any) {
		console.error(error)
		return ApiResponse.sendError(res, [
			{
				title: 'Internal Server Error',
				detail: error.message,
			},
		])
	}
}

export const getAnalysisById: any = async (req: Request, res: Response) => {
	try {
		const id = req.params.id
		const token = req.headers.authorization ?? ''
		const data = await AnalysisService.getAnalysisById(id, token)
		return ApiResponse.sendSuccess(res, data, 200, {
			self: `${req.protocol}:://${req.get('host')}${req.originalUrl}`,
		})
	} catch (error: any) {
		console.error(error)
		return ApiResponse.sendError(res, [
			{
				title: 'Internal Server Error',
				detail: error.message,
			},
		])
	}
}

export const getAnalysisByGitHubUsername: any = async (req: Request, res: Response) => {
	try {
		const githubUsername = req.params.username.toString()
		const data = await AnalysisService.getAnalysisByGitHubUsername(githubUsername)
		return ApiResponse.sendSuccess(res, data, 200, {
			self: `${req.protocol}:://${req.get('host')}${req.originalUrl}`,
		})
	} catch (error: any) {
		return ApiResponse.sendError(res, [
			{
				title: 'Internal Server Error',
				detail: error.message,
			},
		])
	}
}

export const updateAnalysisProfile: any = async (req: Request, res: Response) => {
	try {
		const candidate = await getUserById(req.params.userId)
		const githubUsername = candidate.githubUser
		const userApikey = req.body.apikey
		const token = req.headers.authorization ?? ''
		const data = await AnalysisService.createAnalysis(githubUsername, token, userApikey)
		return ApiResponse.sendSuccess(res, data, 200, {
			self: `${req.protocol}:://${req.get('host')}${req.originalUrl}`,
		})
	} catch (error: any) {
		ApiResponse.sendError(res, [
			{
				title: 'Internal Server Error',
				detail: error.message,
			},
		])
	}
}

export const createAnalysis: any = async (req: Request, res: Response) => {
	try {
		const githubUsername = req.body.username
		const userApikey = req.body.apikey
		const token = req.headers.authorization ?? ''
		const data = await AnalysisService.createAnalysis(githubUsername, token, userApikey)
		return ApiResponse.sendSuccess(res, data, 200, {
			self: `${req.protocol}:://${req.get('host')}${req.originalUrl}`,
		})
	} catch (error: any) {
		ApiResponse.sendError(res, [
			{
				title: 'Internal Server Error',
				detail: error.message,
			},
		])
	}
}

export const deleteAnalysis: any = async (req: Request, res: Response) => {
	try {
		const githubUsername = req.params.username
		const data = await AnalysisService.deleteAnalysis(githubUsername)
		return ApiResponse.sendSuccess(res, data, 200, {
			self: `${req.protocol}:://${req.get('host')}${req.originalUrl}`,
		})
	} catch (error: any) {
		console.error(error)
		return ApiResponse.sendError(res, [
			{
				title: 'Internal Server Error',
				detail: error.message,
			},
		])
	}
}
export default {
	getAllAnalysis,
	getAnalysisById,
	getAnalysisByGitHubUsername,
	createAnalysis,
	deleteAnalysis,
}
