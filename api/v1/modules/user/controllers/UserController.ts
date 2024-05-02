// eslint-disable-next-line @typescript-eslint/await-thenable
import { type Request, type Response } from 'express'
import UserService from '../services/UserService'
import { ApiResponse } from '../../../utils/ApiResponse'
import multer from 'multer';
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
// Default controller functions
export const getAllUser: any = async (req: Request, res: Response) => {
	try {
		const data = await UserService.getAllUser()
		return ApiResponse.sendSuccess(res, data, 200, {
			self: `${req.protocol}://${req.get('host')}${req.originalUrl}`,
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

export const getUserById: any = async (req: Request, res: Response) => {
	try {
		const id = req.params.id
		const data = await UserService.getUserById(id)
		return ApiResponse.sendSuccess(res, data, 200, {
			self: `${req.protocol}://${req.get('host')}${req.originalUrl}`,
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


export const getProfessionalExperiencesByUserId: any = async (req: Request, res: Response) => {
	try {
		const userId = req.params.id
		const data = await UserService.getProfessionalExperiencesByUserId(userId)
		return ApiResponse.sendSuccess(res, data, 200, {
			self: `${req.protocol}://${req.get('host')}${req.originalUrl}`,
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

export const createCandidate: any = async (req: Request, res: Response) => {
	try {
		const role: string = 'Candidate'
		const data = await UserService.createUser(req.body, role)
		return ApiResponse.sendSuccess(res, data, 200, {
			self: `${req.protocol}://${req.get('host')}${req.originalUrl}`,
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

export const createRepresentative: any = async (req: Request, res: Response) => {
	try {
		const role: string = 'Representative'
		const data = await UserService.createUser(req.body, role)
		return ApiResponse.sendSuccess(res, data, 200, {
			self: `${req.protocol}://${req.get('host')}${req.originalUrl}`,
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

export const updateCandidate: any = async (req: Request, res: Response) => {
	try {
		const id = req.params.id
		const role: string = 'Candidate'
		const data = await UserService.updateUser(id, req.body, role)
		return ApiResponse.sendSuccess(res, data, 200, {
			self: `${req.protocol}://${req.get('host')}${req.originalUrl}`,
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

export const updateRepresentative: any = async (req: Request, res: Response) => {
	try {
		const id = req.params.id
		const role: string = 'Representative'
		const data = await UserService.updateUser(id, req.body, role)
		return ApiResponse.sendSuccess(res, data, 200, {
			self: `${req.protocol}://${req.get('host')}${req.originalUrl}`,
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

export const updateUserProfilePicture: any = async (req: Request, res: Response) => {
	try {
		const id = req.params.id
		const picture = req.body.profilePicture
		const data = await UserService.updateUserProfilePicture(id, picture)
		return ApiResponse.sendSuccess(res, data, 200, {
			self: `${req.protocol}://${req.get('host')}${req.originalUrl}`,
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

export const updateUserPassword: any = async (req: Request, res: Response) => {
	try {
		const id = req.params.id
		const { newPassword } = req.body
		const data = await UserService.updateUserPassword(id, newPassword)
		return ApiResponse.sendSuccess(res, data, 200, {
			self: `${req.protocol}://${req.get('host')}${req.originalUrl}`,
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

export const loginUser: any = async (req: Request, res: Response) => {
	try {
		const data = await UserService.loginUser(req.body)
		return ApiResponse.sendSuccess(res, data, 200, {
			self: `${req.protocol}://${req.get('host')}${req.originalUrl}`,
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

export const deleteUser: any = async (req: Request, res: Response) => {
	try {
		const id = req.params.id
		const data = await UserService.deleteUser(id)
		return ApiResponse.sendSuccess(res, data, 200, {
			self: `${req.protocol}://${req.get('host')}${req.originalUrl}`,
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
export default {
	getAllUser,
	getUserById,
	createCandidate,
	createRepresentative,
	updateCandidate,
	updateRepresentative,
	updateUserProfilePicture,
	updateUserPassword,
	deleteUser,
	loginUser,
}
