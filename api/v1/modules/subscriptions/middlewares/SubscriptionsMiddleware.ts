import { verifyJWT } from '../../user/helpers/handleJWT'
import { User } from '../../user/models/user'
import { type Request, type Response, type NextFunction } from 'express'
import { ApiResponse } from '../../../utils/ApiResponse'

export const checkUpdateSubscriptionByUserId: any = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const id = req.params.userId.toString()
		const data = req.body
		if (!data) {
			const message = 'No data to update'
			ApiResponse.sendError(
				res,
				[
					{
						title: 'Bad Request',
						detail: message,
					},
				],
				400
			)
			return
		}
		const token = req.headers.authorization ?? ''
		const user = await User.findById(id)
		if (!user || user === null) {
			const message = 'User not found'
			ApiResponse.sendError(
				res,
				[
					{
						title: 'Not Found',
						detail: message,
					},
				],
				404
			)
			return
		} else if (token.length === 0) {
			const message = 'No token provided'
			ApiResponse.sendError(
				res,
				[
					{
						title: 'Unauthorized',
						detail: message,
					},
				],
				401
			)
			return
		}
		const decodedToken = verifyJWT(token)
		if (decodedToken.sub !== id) {
			const message = 'Permission denied'
			ApiResponse.sendError(
				res,
				[
					{
						title: 'Forbidden',
						detail: message,
					},
				],
				401
			)
			return
		} else {
			next()
		}
	} catch (error: any) {
		ApiResponse.sendError(res, [
			{
				title: 'Error updating subscription of user',
				detail: error.message,
			},
		])
		return
	}
}

export const checkGetSubscriptionByUserId: any = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const id = req.params.userId.toString()
		const token = req.headers.authorization ?? ''
		const user = await User.findById(id)
		if (!user || user === null) {
			const message = 'User not found'
			ApiResponse.sendError(
				res,
				[
					{
						title: 'Not Found',
						detail: message,
					},
				],
				404
			)
			return
		} else if (token.length === 0) {
			const message = 'No token provided'
			ApiResponse.sendError(
				res,
				[
					{
						title: 'Unauthorized',
						detail: message,
					},
				],
				401
			)
			return
		}
		const decodedToken = verifyJWT(token)
		if (decodedToken.sub !== id) {
			const message = 'Permission denied'
			ApiResponse.sendError(
				res,
				[
					{
						title: 'Forbidden',
						detail: message,
					},
				],
				401
			)
			return
		} else {
			next()
		}
	} catch (error: any) {
		ApiResponse.sendError(res, [
			{
				title: 'Error updating subscription of user',
				detail: error.message,
			},
		])
		return
	}
}

export default {
	checkGetSubscriptionByUserId,
	checkUpdateSubscriptionByUserId,
}
