import { connect } from 'mongoose'
import { AnalysisModel } from './modules/analysis/models/analysis.model'
import { User } from './modules/user/models/user'
import { ProfessionalExperience } from './modules/professional-experience/models/professional-experience'
import { History, TeamCreatorHistory } from './modules/history/models/history'
import { Subscription } from './modules/subscriptions/models/subscription'
import { TeamCreator } from './modules/team-creator/models/TeamCreatorModel'
import { Notification } from './modules/notification/models/notification'
import fs from 'fs'
async function insertIfNotExists(Model: any, data: any) {
	for (const item of data) {
		const exists = await Model.findOne({ _id: item._id })
		if (!exists) {
			await Model.create(item)
		}
	}
}
export async function populate() {
	const analysis_data = JSON.parse(fs.readFileSync('./populate_data/analysis_data.json', 'utf8'))
	const subscription_data = JSON.parse(
		fs.readFileSync('./populate_data/subcription_data.json', 'utf-8')
	)
	const users_data = JSON.parse(fs.readFileSync('./populate_data/user_data.json', 'utf8'))
	const history_data = JSON.parse(fs.readFileSync('./populate_data/history_data.json', 'utf8'))
	const professional_experience_data = JSON.parse(
		fs.readFileSync('./populate_data/professional_experience_data.json', 'utf8')
	)
	const team_creator_data = JSON.parse(
		fs.readFileSync('./populate_data/team_creator_data.json', 'utf8')
	)
	const team_creator_history_data = JSON.parse(
		fs.readFileSync('./populate_data/team_creator_history_data.json', 'utf8')
	)
	const notification_data = JSON.parse(
		fs.readFileSync('./populate_data/notification_data.json', 'utf8')
	)

	try {
		await insertIfNotExists(Subscription, subscription_data)
		await insertIfNotExists(User, users_data)
		await insertIfNotExists(AnalysisModel, analysis_data)
		await insertIfNotExists(History, history_data)
		await insertIfNotExists(ProfessionalExperience, professional_experience_data)
		await insertIfNotExists(TeamCreator, team_creator_data)
		await insertIfNotExists(TeamCreatorHistory, team_creator_history_data)
		await insertIfNotExists(Notification, notification_data)

		console.log('Database successfully populated.')
	} catch (err: any) {
		if (err.code === 11000) {
			// Código de error de duplicado en MongoDB
			console.log('Ignorando duplicados')
		}
		console.error('Error populating the database:', err)
	}
}
