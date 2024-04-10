// eslint-disable-next-line @typescript-eslint/await-thenable
import { type Request, type Response } from 'express'
import SubscriptionsService from '../services/SubscriptionsService'
import { ApiResponse } from '../../../utils/ApiResponse'

// Default controller functions
export const getAllSubscriptions: any = async (req: Request, res: Response) => {
	try {
		const data = await SubscriptionsService.getAllSubscriptions()
		ApiResponse.sendSuccess(res, data, 200, {
			self: `${req.protocol}://${req.get('host')}${req.originalUrl}`,
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

export const getSubscriptionsByUserId: any = async (req: Request, res: Response) => {
	try {
		const id = req.params.userId
		const data = await SubscriptionsService.getSubscriptionsByUserId(id)
		ApiResponse.sendSuccess(res, data, 200, {
			self: `${req.protocol}://${req.get('host')}${req.originalUrl}`,
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

export const createSubscriptions: any = async (req: Request, res: Response) => {
	try {
		const data = await SubscriptionsService.createSubscriptions(req.body)
		ApiResponse.sendSuccess(res, data, 200, {
			self: `${req.protocol}://${req.get('host')}${req.originalUrl}`,
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

export const updateSubscriptionByUserId: any = async (req: Request, res: Response) => {
	try {
		const id = req.params.userId
		const subtype = req.body.subtype
		const data = await SubscriptionsService.updateSubscriptions(id, subtype)
		ApiResponse.sendSuccess(res, data, 200, {
			self: `${req.protocol}://${req.get('host')}${req.originalUrl}`,
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
export default {
	getAllSubscriptions,
	getSubscriptionsByUserId,
	createSubscriptions,
	updateSubscriptionByUserId,
}
