import { User } from '../../user/models/user'
import {
	CandidateSubscription,
	CompanySubscription,
	CandidateSubscriptionTypes,
	CompanySubscriptionTypes,
	Subscription,
} from '../models/subscription'

// Default service functions
export const getAllSubscriptions: any = async () => {
	try {
		return await Subscription.find()
	} catch (error) {
		console.error(error)
		throw new Error('Error getting subscriptions')
	}
}

export const getSubscriptionsByUserId: any = async (userId: any) => {
	try {
		const user = await User.findById(userId)
		if (!user) throw new Error('User not found')

		return await Subscription.findById(user.subscriptionId)
	} catch (error) {
		console.error(error)
		throw new Error('Error getting subscriptions')
	}
}

export const createRepresentativeSubscriptions: any = async () => {
	try {
		const expirationDate = new Date()
		expirationDate.setMonth(expirationDate.getMonth() + 24)
		const subscription = new CompanySubscription({
			subtype: CompanySubscriptionTypes.NO_SUBSCRIPTION,
			price: {
				amount: 0,
				currency: 'EUR',
			},
			lastPaymentDate: new Date(),
			expirationDate,
			automaticRenovation: false,
			remainingSearches: 0,
			teamLimit: 0,
		})
		await subscription.save()
		return subscription
	} catch (error) {
		console.error(error)
		throw new Error('Error creating subscription')
	}
}

export const createCandidateSubscriptions: any = async (role: any) => {
	try {
		const expirationDate = new Date()
		expirationDate.setMonth(expirationDate.getMonth() + 1)
		const subscription = new CandidateSubscription({
			subtype: CandidateSubscriptionTypes.BASIC,
			price: {
				amount: 0,
				currency: 'EUR',
			},
			lastPaymentDate: new Date(),
			expirationDate,
			automaticRenovation: false,
			remainingUpdates: 1,
		})
		await subscription.save()
		return subscription
	} catch (error) {
		console.error(error)
		throw new Error('Error creating subscription')
	}
}

export const updateSubscriptions: any = async (userId: any, subtype: any) => {
	try {
		const user = await User.findById(userId)
		if (!user) throw new Error('User not found')

		const subscription = await Subscription.findById(user.subscriptionId)
		if (!subscription) throw new Error('Subscription not found')
		else if ((subscription as any).type === 'CompanySubscription') {
			subscription.set({ subtype })
			if (subtype === CompanySubscriptionTypes.BASIC) {
				subscription.set({
					price: { amount: 49.95, currency: 'EUR' },
					remainingSearches: 25,
					teamLimit: 3,
				})
			} else if (subtype === CompanySubscriptionTypes.PRO) {
				subscription.set({
					price: { amount: 99.95, currency: 'EUR' },
					remainingSearches: 150,
					teamLimit: 5,
				})
			}
			subscription.lastPaymentDate = new Date()
			subscription.expirationDate = new Date()
			subscription.expirationDate.setMonth(subscription.expirationDate.getMonth() + 1)
			await subscription.save()
			return subscription
		} else if ((subscription as any).type === 'CandidateSubscription') {
			subscription.set({ subtype })
			if (subtype === CandidateSubscriptionTypes.BASIC) {
				subscription.set({
					price: { amount: 0, currency: 'EUR' },
					remainingUpdates: 1,
					canInspectEmail: false,
				})
			} else if (subtype === CandidateSubscriptionTypes.PRO) {
				subscription.set({
					price: { amount: 9.99, currency: 'EUR' },
					remainingUpdates: 3,
					canInspectEmail: true,
				})
			}
			subscription.lastPaymentDate = new Date()
			subscription.expirationDate = new Date()
			subscription.expirationDate.setMonth(subscription.expirationDate.getMonth() + 1)
			await subscription.save()
			return subscription
		}
	} catch (error) {
		console.error(error)
		throw new Error('Error updating subscription')
	}
}

export default {
	getAllSubscriptions,
	getSubscriptionsByUserId,
	createRepresentativeSubscriptions,
	createCandidateSubscriptions,
	updateSubscriptions,
}
