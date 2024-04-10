import { type Request, type Response, type NextFunction } from 'express'
import dotenv from 'dotenv'
import { ApiResponse } from '../../../utils/ApiResponse'
import { verifyJWT } from '../../user/helpers/handleJWT'
import { getUserById } from '../../user/services/UserService'
import { Candidate, CandidateSubscription, CompanySubscription, Representative } from '../../user/models/user'



export const validatePayment = async (req: Request, res: Response, next: NextFunction): Promise<void>  => {
    const subscriptionPlan = req.body.subscriptionPlan
	const price = req.body.price
	const payment_method = req.body.payment_method

	const token = req.headers.authorization ?? ''
	const decodedToken = verifyJWT(token)
	const userId = decodedToken.sub
	const user = await getUserById(userId)
	const role = user.role

if (role == "Candidate")
{
        console.log(!Object.values(CandidateSubscription).includes(subscriptionPlan))
		if (!Object.values(CandidateSubscription).includes(subscriptionPlan))
		{
			 ApiResponse.sendError(res, [
				{
					title: 'Unrecogniced plan',
					detail: "Plan not recogniced for candidates",
				},
			 ])
             return
			 
	}
	
	}
	else if (role == "Representative")
	{
		if (!Object.values(CompanySubscription).includes(subscriptionPlan))
		{
			 ApiResponse.sendError(res, [
				{
					title: 'Unrecogniced plan',
					detail: "Plan not recogniced for representatives",
				},
			 ])	
             return
	}
	
}
else
	{
		 ApiResponse.sendError(res, [
			{
				title: "Unrecogniced role",
				detail: `Role ${role} not recogniced`,
			},
		])
        return
	}
    next()
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
			])
			return
		}
		const decodedToken = verifyJWT(token).sub
		const representative = await Representative.findById(decodedToken)
		const candidate = await Candidate.findById(decodedToken);
		if (!representative && !candidate) {
			const message = 'Permission denied'
			ApiResponse.sendError(res, [{ title: 'Forbidden', detail: message }], 401)
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