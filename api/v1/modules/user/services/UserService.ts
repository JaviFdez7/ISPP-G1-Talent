import { generateJWT, generateJWTWithSoonerExpiration } from '../helpers/handleJWT'
import { Candidate, User } from '../models/user'
import { ProfessionalExperience } from '../../professional-experience/models/professional-experience'
import { getModelForRole } from '../helpers/handleRoles'
import { createAnalysis } from '../../analysis/services/AnalysisService'
import {
	createRepresentativeSubscriptions,
	createCandidateSubscriptions,
	getSubscriptionsByUserId,
} from '../../subscriptions/services/SubscriptionsService'
import { CandidateSubscription } from '../../subscriptions/models/subscription'
import { sgMail } from '../helpers/sengrid'

export const getAllUser: any = async () => await User.find({})

export const getUserById: any = async (id: any) => await User.findById(id)

export const getProfessionalExperiencesByUserId: any = async (userId: any) => {
	try {
		return await ProfessionalExperience.find({ userId })
	} catch (error) {
		console.error('Error when obtaining professional experience:', error)
		throw error
	}
}

export const createUser: any = async (data: any, role: string) => {
	try {
		const Model = getModelForRole(role)
		if (role === 'Candidate') {
			const analysis = await createAnalysis(data?.githubUser, '', data?.githubToken)
			const subscription = await createCandidateSubscriptions()
			data.analysisId = analysis._id
			data.subscriptionId = subscription._id
		}
		if (role === 'Representative') {
			const subscription = await createRepresentativeSubscriptions()
			data.subscriptionId = subscription._id
		}
		const user = new Model(data)
		await user.save()
		return user
	} catch (error) {
		console.error('Error inserting user:', error)
		throw error
	}
}

export const updateUser: any = async (id: any, data: any, role: string) => {
	try {
		const Model = getModelForRole(role) as typeof User
		if (role === 'Candidate') {
			const analysis = await createAnalysis(data?.githubUser, data?.githubToken)
			data.analysisId = analysis._id
		}
		const updatedUser = await Model.findByIdAndUpdate(id, data, { new: true })
		return updatedUser
	} catch (error) {
		console.error('Error updating user:', error)
		throw error
	}
}

export const updateUserProfilePicture: any = async (id: any, picture: string) => {
	try {
		const updatedUser = await User.findByIdAndUpdate(
			id,
			{ profilePicture: picture },
			{ new: true }
		)
		return updatedUser
	} catch (error) {
		console.error('Error updating user profile picture:', error)
		throw error
	}
}

export const updateUserPassword: any = async (id: any, newPassword: string) => {
	try {
		const updatedUser = await User.findByIdAndUpdate(
			id,
			{ password: newPassword },
			{ new: true }
		)
		return updatedUser
	} catch (error) {
		console.error('Error updating user password:', error)
		throw error
	}
}

export const deleteUser: any = async (id: any, role: string) => {
	try {
		const Model = getModelForRole(role) as typeof User
		await Model.findByIdAndDelete(id)
		return 'User deleted successfully.'
	} catch (error) {
		console.error('Error deleting user', error)
		throw error
	}
}

export const sendEmail: any = async (to: string, subject: string, text: string,html: string) =>{
	try{
		const from= process.env.SENGRID_EMAIL ?? ''
		const msg = {
			to,
			from,
			subject,
			text,
			html,
		  };
		await sgMail
		.send(msg)
		.then(() => {
		  console.log('Email sent')
		})
		.catch((error:any) => {
		  console.error(error)
		})
	}catch(error:any){
		console.error('Error creating your request:', error)
		throw error
	}
}

export const createChangePasswordRequest: any = async (data: any,originalUrl: string) => {
	try {
		const userByEmail = await User.findOne({ email: data.usernameOrEmail })
		const userByUsername=await User.findOne({ username: data.usernameOrEmail })
		const user = userByEmail ?? userByUsername
		const id = user?._id.toString()
		const token = generateJWTWithSoonerExpiration(id)
		const result = originalUrl+"/"+token
		const text=`To change the forgotten password, access this link: ${result}. \n
		 \n
		 In case of error, simply ignore the message.
		Thank you very much for using IT TALENT :3`
		await sendEmail(user?.email,'Verify password change',
			text,`<strong> ${text} </strong>`
		)
	} catch (error) {
		console.error('Error creating your request:', error)
		throw error
	}
}

export const loginUser: any = async (data: any) => {
	try {
		const user = await User.findOne({ username: data.username })
		const id = user?._id.toString()
		const token = generateJWT(id)
		const result = { token, user }
		return result
	} catch (error) {
		console.error('Error logging in:', error)
		throw error
	}
}
export default {
	getAllUser,
	getUserById,
	getProfessionalExperiencesByUserId,
	createUser,
	updateUser,
	updateUserProfilePicture,
	updateUserPassword,
	deleteUser,
	loginUser,createChangePasswordRequest
}
