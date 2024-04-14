// eslint-disable-next-line @typescript-eslint/await-thenable
import { type Request, type Response } from 'express'
import { ApiResponse } from '../../../utils/ApiResponse'
import { verifyJWT } from '../../user/helpers/handleJWT'
import { getUserById } from '../../user/services/UserService';
import {CompanySubscription, CandidateSubscription} from '../../user/models/user';
import { createSubscriptions } from '../../subscriptions/services/SubscriptionsService';
const stripe = require('stripe')(process.env.STRIPE_API_KEY);

export const makePayment: any = async (req: Request, res: Response) => {
	const subscriptionPlan = req.body.subscriptionPlan
	const price = req.body.price * 100
	const paymentMethod = req.body.paymentMethod

	const token = req.headers.authorization ?? ''
	const decodedToken = verifyJWT(token)
	const userId = decodedToken.sub
	const user = await getUserById(userId)
	const role = user.role

	try {
		const paymentIntent = await stripe.paymentIntents.create({
			amount: price.toFixed(2),
			currency: "eur",
			payment_method: paymentMethod,
			description: `Pago por plan de suscripción ${subscriptionPlan} para el usuario ${user.username}`,
			confirm: true,
			automatic_payment_methods: {
				enabled: true,
				allow_redirects: 'never'
			},

		  });

		switch(paymentIntent.status) {
			case "succeeded": {
				const data = await createSubscriptions(role);
				return ApiResponse.sendSuccess(res, data, 200, {
					self: `${req.protocol}:://${req.get('host')}${req.originalUrl}`,
				})
		}
		case "canceled": {
			return ApiResponse.sendError(res, [
				{
					title: 'Payment cancelled',
					detail: "An error ocurred while processing the payment, check your card permissions",
				},
			])
		}
		default: {
			return ApiResponse.sendError(res, [
				{
					title: 'Payment stopped',
					detail: "An error ocurred while processing the payment. Aditional steps required",
				},
			])
		}
		}

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
	makePayment
}
