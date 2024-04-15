import { History, TeamCreatorHistory } from '../models/history'
import { User } from '../../user/models/user'
// Default service functions
export const getHistoryFromUser: any = async (userId: string) => {
	try {
		const history = await History.find({ userId }).sort({ date: 1 })
		return history
	} catch (error) {
		console.error('Error getting history:', error)
		throw error
	}
}

export const getNotFavoritesFromUser: any = async (userId: any) => {
	try {
		const history = await History.find({})
			.where('userId')
			.equals(userId)
			.where('favorite')
			.equals(false)
		return history
	} catch (error) {
		console.error('Error getting history:', error)
		throw error
	}
}

export const getFavoritesFromUser: any = async (userId: any) => {
	try {
		const history = await History.find({})
			.where('userId')
			.equals(userId)
			.where('favorite')
			.equals(true)
		return history
	} catch (error) {
		console.error('Error getting history:', error)
		throw error
	}
}

export const createHistory: any = async (userId: any, data: any) => {
	try {
		const history = new History(data)
		const user = await User.findById(userId)
		if (!user) throw new Error('User not found')

		history.userId = user._id
		history.date = new Date()
		history.favorite = false
		await history.save()
		return history
	} catch (error) {
		console.error('Error inserting history:', error)
		throw error
	}
}

export const toggleFavorite: any = async (id: any) => {
	try {
		const history = await History.findById(id)
		if (!history) throw new Error('History not found')

		const updatedHistory = await History.findByIdAndUpdate(
			id,
			{ favorite: !history.favorite },
			{ new: true }
		)
		return updatedHistory
	} catch (error) {
		console.error('Error updating history:', error)
		throw error
	}
}

export const updateHistory: any = async (id: any, data: any) => {
	try {
		const updatedHistory = await History.findByIdAndUpdate(id, data, { new: true })
		return updatedHistory
	} catch (error) {
		console.error('Error updating history:', error)
		throw error
	}
}

export const deleteHistory: any = async (id: any) => {
	try {
		await History.findByIdAndDelete(id)
		return 'History deleted successfully'
	} catch (error) {
		console.error('Error deleting history:', error)
		throw error
	}
}

// TEAM CREATOR HISTORY

export const getTeamCreatorHistoryFromUser: any = async (userId: string) => {
	try {
		const history = await TeamCreatorHistory.find({ userId }).sort({ date: 1 })
		return history
	} catch (error) {
		console.error('Error getting history:', error)
		throw error
	}
}

export const getNotFavoritesTeamCreatorsFromUser: any = async (userId: any) => {
	try {
		const history = await TeamCreatorHistory.find({})
			.where('userId')
			.equals(userId)
			.where('favorite')
			.equals(false)
		return history
	} catch (error) {
		console.error('Error getting history:', error)
		throw error
	}
}

export const getFavoritesTeamCreatorsFromUser: any = async (userId: any) => {
	try {
		const history = await TeamCreatorHistory.find({})
			.where('userId')
			.equals(userId)
			.where('favorite')
			.equals(true)
		return history
	} catch (error) {
		console.error('Error getting history:', error)
		throw error
	}
}

export const createTeamCreatorHistory: any = async (userId: any, data: any) => {
	try {
		const history = new TeamCreatorHistory(data)
		const user = await User.findById(userId)
		if (!user) throw new Error('User not found')

		history.userId = user._id
		history.date = new Date()
		history.favorite = false
		await history.save()
		return history
	} catch (error) {
		console.error('Error inserting history:', error)
		throw error
	}
}

export const toggleFavoriteTeamCreator: any = async (id: any) => {
	try {
		const history = await TeamCreatorHistory.findById(id)
		if (!history) throw new Error('History not found')

		const updatedHistory = await TeamCreatorHistory.findByIdAndUpdate(
			id,
			{ favorite: !history.favorite },
			{ new: true }
		)
		return updatedHistory
	} catch (error) {
		console.error('Error updating history:', error)
		throw error
	}
}

export const updateTeamCreatorHistory: any = async (id: any, data: any) => {
	try {
		const updatedHistory = await TeamCreatorHistory.findByIdAndUpdate(id, data, { new: true })
		return updatedHistory
	} catch (error) {
		console.error('Error updating history:', error)
		throw error
	}
}

export const deleteTeamCreatorHistory: any = async (id: any) => {
	try {
		await TeamCreatorHistory.findByIdAndDelete(id)
		return 'History deleted successfully'
	} catch (error) {
		console.error('Error deleting history:', error)
		throw error
	}
}

export default {
	getHistoryFromUser,
	getFavoritesFromUser,
	getNotFavoritesFromUser,
	createHistory,
	toggleFavorite,
	updateHistory,
	deleteHistory,
	getTeamCreatorHistoryFromUser,
	getFavoritesTeamCreatorsFromUser,
	getNotFavoritesTeamCreatorsFromUser,
	createTeamCreatorHistory,
	toggleFavoriteTeamCreator,
	updateTeamCreatorHistory,
	deleteTeamCreatorHistory,
}
