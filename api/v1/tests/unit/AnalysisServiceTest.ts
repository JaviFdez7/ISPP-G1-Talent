import assert from 'assert'
import mongoose from 'mongoose'
import { createUser, loginUser } from '../../modules/user/services/UserService'
import { getAnalysisById, createAnalysis } from '../../modules/analysis/services/AnalysisService'
import * as dotenv from 'dotenv'
import * as path from 'path'
import { getHistoryFromUser } from '../../modules/history/services/HistoryService'
import { getSubscriptionsByUserId } from '../../modules/subscriptions/services/SubscriptionsService'
import { CompanySubscription } from '../../modules/subscriptions/models/subscription'

dotenv.config({ path: path.resolve(__dirname, '') })

describe('Analysis Service Tests', function () {
	let candidateId
	let candidateAnalysisId: any
	let representativeId: any
	let representativeAnalysisId: any

	before(async function () {
		try {
			// Candidate setup
			const candidate = await createUser(
				{
					username: 'candidate',
					password: 'string',
					email: 'user@example.com',
					phone: '+4617559',
					paymentMethods: ['string'],
					fullName: 'string',
					githubUser: 'FJMonteroInformatica',
					profilePicture: 'string',
					CV: 'string',
					residence: 'string',
					lifestyle: 'On-site',
				},
				'Candidate'
			)

			candidateId = candidate._id
			candidateAnalysisId = candidate.analysisId

			// Representative setup
			const representative = await createUser(
				{
					username: 'representative',
					password: 'string',
					email: 'representative@example.com',
					phone: '+9720817485488',
					paymentMethods: ['string'],
					companyName: 'string',
					projectSocietyName: 'string',
				},
				'Representative'
			)
			representativeId = representative._id

			const subscription = await CompanySubscription.create({
				subtype: 'Pro plan',
				remainingSearches: 5,
				teamLimit: 3,
				price: {
					amount: 100,
					currency: 'EUR',
				},
				lastPaymentDate: new Date(),
				expirationDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
				automaticRenovation: true,
			})
			representative.subscriptionId = subscription._id
			await representative.save()

			const data = {
				username: 'representative',
				password: 'string',
			}
			const representativeToken = await loginUser(data)

			const representativeAnalysis = await createAnalysis('motero2k', representativeToken)
			representativeAnalysisId = representativeAnalysis._id
		} catch (error: any) {
			console.log(error)
		}
	})

	after(async function () {
		try {
			// Clean up database
			const collections = mongoose.connection.collections
			for (const key in collections) {
				const collection = collections[key]
				await collection.deleteMany({})
			}
		} catch (error: any) {
			console.log(error)
		}
	})

	it('should allow a candidate to view their own analysis profile', async function () {
		const analysis = await getAnalysisById(candidateAnalysisId)
		assert.strictEqual(analysis._id.toString(), candidateAnalysisId.toString())
		assert.strictEqual(analysis.githubUsername, 'FJMonteroInformatica')
	})

	it('should allow a representative to view an analysis they searched for and deduct a usage token', async function () {
		const analysis = await getAnalysisById(representativeAnalysisId)
		const history = await getHistoryFromUser(representativeId)
		assert.strictEqual(analysis._id.toString(), representativeAnalysisId.toString())
		for (let i = 0; i < history.length; i++)
			assert.strictEqual(history[i].analysisId.toString(), analysis._id.toString())
	})
})
