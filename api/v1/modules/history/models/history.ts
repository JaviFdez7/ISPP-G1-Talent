import mongoose from 'mongoose'

const { Schema, model } = mongoose

const historySchema = new Schema({
	// Id of the user who made the request and owns the history
	userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },

	// Id of the analysys
	analysisId: { type: Schema.Types.ObjectId, ref: 'Analysis', required: true },

	// Date of the request
	date: { type: Date, required: true },

	// Marks the request as favourite
	favorite: { type: Boolean, required: true },
})

const History = model('History', historySchema)

const teamCreatorHistorySchema = new Schema({
	userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
	teamCreatorId: { type: Schema.Types.ObjectId, ref: 'TeamCreator', required: true },
	date: { type: Date, required: true },
	favorite: { type: Boolean, required: true },
})

const TeamCreatorHistory = model('TeamCreatorHistory', teamCreatorHistorySchema)

export { History, TeamCreatorHistory }
