import { Notification } from '../models/notification'
import { Candidate, Representative } from '../../user/models/user'

export const getAllNotification: any = async () => {
	try {
		const notifications = await Notification.find({})
		return notifications
	} catch (error) {
		throw new Error('Unknown error when getting all notifications.')
	}
}

export const getNotificationById: any = async (id: any) => {
	try {
		const notifications = await Notification.findById(id)
		return notifications
	} catch (error) {
		throw new Error(`Unknown error when getting the notification with ID ${id}`)
	}
}

export const getNotificationsByCandidateId: any = async (candidateId: any) => {
	try {
		const notifications = await Notification.find({ candidateId: candidateId })
		return notifications
	} catch (error) {
		throw new Error('Unknown error when getting all notifications of candidate.')
	}
}

export const createNotification: any = async (data: any) => {
	try {
		const notification = new Notification(data)
		notification.dateTime = new Date()
		const candidate = await Candidate.findOne({ _id: data?.candidateId })
		const representative = await Representative.findOne({ _id: data?.representativeId })
		if (!candidate) throw new Error('No Candidate with that candidateId')
		if (!representative) throw new Error('No Representative with that representativeId')
		await notification.save()
		return notification
	} catch (error) {
		console.error('Error inserting notification:', error)
		throw error
	}
}

export const updateNotification: any = async (id: any, data: any) => {
	try {
		const notification = await Notification.findByIdAndUpdate(id, data, { new: true })
		return notification
	} catch (error) {
		console.error('Error inserting notification:', error)
		throw error
	}
}

export const deleteNotification: any = async (id: any) => {
	try {
		await Notification.findByIdAndDelete(id)
		return 'Notification deleted successfully'
	} catch (error) {
		console.error('Error deleting notification:', error)
		throw error
	}
}
export default {
	getAllNotification,
	getNotificationById,
	createNotification,
	updateNotification,
	deleteNotification,
	getNotificationsByCandidateId,
}
