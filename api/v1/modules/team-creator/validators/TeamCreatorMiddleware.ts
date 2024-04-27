import { verifyJWT } from '../../user/helpers/handleJWT'
import { ApiResponse } from '../../../utils/ApiResponse'
import { Candidate, Representative } from '../../user/models/user'
import e, { type Request, type Response, type NextFunction } from 'express'
import { TeamCreator } from '../models/TeamCreatorModel'
import { Subscription } from '../../subscriptions/models/subscription'

export const checkTeamCreatorById: any = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const id = req.params.id.toString()
		const teamCreator = await TeamCreator.findById(id)
		if (!teamCreator) {
			ApiResponse.sendError(res, [
				{
					title: 'Internal Server Error',
					detail: 'TeamCreator not found',
				},
			])
			return
		} else {
			next()
		}
	} catch (error: any) {
		ApiResponse.sendError(res, [
			{
				title: 'Internal Server Error',
				detail: error.message,
			},
		])
		return
	}
}
export const checkValidToken: any = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const token = req.headers.authorization ?? ''

		if (token.length === 0) {
			ApiResponse.sendError(res, [
				{
					title: 'Internal Server Error',
					detail: 'No token provided.',
				},
			],401)
			return
		} else {
			next()
		}
	} catch (error: any) {
		ApiResponse.sendError(res, [
			{
				title: 'Internal Server Error',
				detail: error.message,
			},
		])
		return
	}
}

export const checkIsRepresentative: any = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const token = req.headers.authorization ?? ''

		const decodedToken = verifyJWT(token)

		const existingRepresentative = await Representative.findById(decodedToken.sub)
		if (!existingRepresentative) {
			ApiResponse.sendError(res, [
				{
					title: 'Internal Server Error',
					detail: 'Representative user not exists.',
				},
			],401)
			return
		} else {
			next()
		}
	} catch (error: any) {
		ApiResponse.sendError(res, [
			{
				title: 'Internal Server Error',
				detail: error.message,
			},
		])
		return
	}
}

export const checkAuthorization: any = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const userId = req.params.id.toString()
		const token = req.headers.authorization ?? ''

		const decodedToken = verifyJWT(token)

		const representativeUser = await Representative.findById(userId)
		if (decodedToken.sub !== representativeUser?._id.toString()) {
			ApiResponse.sendError(res, [
				{
					title: 'Internal Server Error',
					detail: 'Unauthorized.',
				},
			],401)
			return
		} else {
			next()
		}
	} catch (error: any) {
		ApiResponse.sendError(res, [
			{
				title: 'Internal Server Error',
				detail: error.message,
			},
		])
		return
	}
}

export const checkDataCreateTeam: any = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const data = req.body
		if (!data) {
			ApiResponse.sendError(res, [
				{
					title: 'Internal Server Error',
					detail: 'No data to insert',
				},
			])
			return
		}

		for (let i = 0; i < data.length; i++) {
			let profile = data[i]

			if (
				profile.languages.length == 0 &&
				profile.technologies.length == 0 &&
				profile.yearsOfExperience == '' &&
				profile.field == ''
			) {
				ApiResponse.sendError(res, [
					{
						title: 'Internal Server Error',
						detail: 'profile requested is empty.',
					},
				])
				return
			}
		}

		next()
	} catch (error: any) {
		console.error('Error inserting professional experience:', error)
		ApiResponse.sendError(res, [
			{
				title: 'Internal Server Error',
				detail: error.message,
			},
		])
		return
	}
}

export const checkSubscriptionState: any = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const profiles=req.body
		const token = req.headers.authorization ?? ''
		const decodedToken = verifyJWT(token)
		const representativeUser = await Representative.findById(decodedToken.sub)
		const subscription= await Subscription.findById((representativeUser as any).subscriptionId)
		if(subscription===null){
			const message = 'You arent subscribed'
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
		}else if((subscription as any).remainingSearches<profiles.length){
			const message = 'You dont have enough tokens to search'
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
		}else if(profiles.length>(subscription as any).teamLimit){
			const message = `You cant make teams higher tha ${(subscription as any).teamLimit}`
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
		next()

	} catch (error: any) {
		ApiResponse.sendError(res, [
			{
				title: 'Internal Server Error',
				detail: error.message,
			},
		])
		return
	}
}
