import mongoose from 'mongoose'

const { Schema, model } = mongoose

const TrendState = {
	UPDATED: 'Updated',
	IN_PROGRESS: 'In Progress',
	OUTDATED: 'Outdated',
}

const trendSchema = new Schema({
	date: { type: Date, required: true },
	state: { type: String, required: true, values: Object.values(TrendState) },
	mostSolicitatedTechnologies: { type: Array, required: true },
	mostSolicitatedLanguages: { type: Array, required: true },
	mostSolicitatedFields: { type: Array, required: true },
	yearsOfExperienceMean: { type: Number, required: true },
	mostUsedLanguages: { type: Array, required: true },
	mostUsedTechnologies: { type: Array, required: true },
	mostOcupatedFields: { type: Array, required: true },
	topRepositories: { type: Array, required: true },
})

const Trend = model('Trend', trendSchema)

export default Trend
