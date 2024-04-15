import { AnalysisModel, AnalysisDocument } from '../../analysis/models/analysis.model'
import { ProfessionalExperience } from '../../professional-experience/models/professional-experience'
import { History } from '../../history/models/history'
import {
	createHistory,
	createTeamCreatorHistory,
	updateHistory,
} from '../../history/services/HistoryService'
import { Notification } from '../../notification/models/notification'
import { Candidate, type CandidateDocument, Representative } from '../../user/models/user'
import {
	type ProfileRequested,
	type SkillRequested,
	type FilteredCandidates,
	type ProfileMap,
	TeamCreatorDocument,
	TeamCreator,
} from '../models/TeamCreatorModel'
import mongoose from 'mongoose'
import {
	createNotification,
	updateNotification,
} from '../../notification/services/NotificationService'
import { getSubscriptionsByUserId } from '../../subscriptions/services/SubscriptionsService'

function processSkillsRequested(profiles: ProfileRequested[]): SkillRequested {
	const languagesSet = new Set<string>()
	const technologiesSet = new Set<string>()
	let minYearsOfExperience = profiles.length > 0 ? profiles[0].yearsOfExperience : 0
	const fieldsSet = new Set<string>()
	profiles.forEach((profile) => {
		profile.languages.forEach((language) => languagesSet.add(language))
		profile.technologies.forEach((technology) => technologiesSet.add(technology))
		if (profile.yearsOfExperience < minYearsOfExperience)
			minYearsOfExperience = profile.yearsOfExperience

		fieldsSet.add(profile.field)
	})

	return {
		languages: Array.from(languagesSet),
		technologies: Array.from(technologiesSet),
		yearsOfExperience: minYearsOfExperience,
		field: Array.from(fieldsSet),
	}
}
async function filterCandidates(skillsRequested: SkillRequested): Promise<FilteredCandidates[]> {
	const candidates = (await Candidate.find()
		.populate('analysisId')
		.populate('profesionalExperiences')
		.exec()) as unknown as CandidateDocument[]

	const qualifiedCandidates: FilteredCandidates[] = []

	candidates.forEach((candidate) => {
		console.log(candidate.analysisId.globalTopLanguages)
		const hasMatchingSkill =
			candidate.analysisId.globalTopLanguages.some((lang) =>
				skillsRequested.languages.includes(lang.language)
			) ||
			candidate.analysisId.globalTechnologies.some((tech) =>
				skillsRequested.technologies.includes(tech)
			)

		let totalExperienceYears = 0
		let matchesField = false

		candidate.profesionalExperiences.forEach((exp) => {
			const startDate = new Date(exp.startDate)
			const endDate = exp.endDate ? new Date(exp.endDate) : new Date()
			const years = endDate.getFullYear() - startDate.getFullYear()
			const monthDiff = endDate.getMonth() - startDate.getMonth()
			if (years > 0 || monthDiff > 0) totalExperienceYears += years + monthDiff / 12

			if (skillsRequested.field.includes(exp.professionalArea)) matchesField = true
		})

		if (
			hasMatchingSkill ||
			(matchesField && totalExperienceYears >= skillsRequested.yearsOfExperience)
		) {
			const filteredLanguages = candidate.analysisId.globalTopLanguages
				.map((lang) => lang.language)
				.filter((lang) => skillsRequested.languages.includes(lang))

			const filteredTechnologies = candidate.analysisId.globalTechnologies.filter((tech) =>
				skillsRequested.technologies.includes(tech)
			)

			qualifiedCandidates.push({
				github_username: candidate.githubUser,
				languages: filteredLanguages,
				technologies: filteredTechnologies,
				yearsOfExperience: totalExperienceYears,
				field: skillsRequested.field,
			})
		}
	})
	return qualifiedCandidates
}

function selectBestCandidates(
	filteredCandidates: FilteredCandidates[],
	profilesRequested: ProfileRequested[]
): Map<ProfileRequested, FilteredCandidates[]> {
	const bestCandidatesPerProfile = new Map<ProfileRequested, FilteredCandidates[]>()

	for (const profile of profilesRequested) {
		const maxScore = 0
		const candidatesScores = new Map<FilteredCandidates, number>()

		for (const candidate of filteredCandidates) {
			let score = 0
			candidate.languages.forEach((lang) => {
				if (profile.languages.includes(lang)) score++
			})
			candidate.technologies.forEach((tech) => {
				if (profile.technologies.includes(tech)) score++
			})
			if (candidate.yearsOfExperience >= profile.yearsOfExperience) score++
			if (candidate.field.includes(profile.field)) score++
			candidatesScores.set(candidate, score)
		}
		const sortedCandidates = Array.from(candidatesScores.entries())
			.sort((a, b) => b[1] - a[1])
			.slice(0, 3)
			.map((entry) => entry[0])

		bestCandidatesPerProfile.set(profile, sortedCandidates)
	}

	return bestCandidatesPerProfile
}
async function saveTeamCreator(userId: string, profilesMap: ProfileMap): Promise<any> {
	const profiles = Array.from(profilesMap).map(([profileRequested, recommendedCandidates]) => ({
		profileRequested,
		recommendedCandidates,
	}))

	const teamCreator = new TeamCreator({
		userId,
		profiles,
	})

	const savedRecord = await teamCreator.save()

	for (const { recommendedCandidates } of profiles) {
		for (const candidate of recommendedCandidates) {
			try {
				const candidateDocument = (await Candidate.findOne({
					githubUser: candidate.github_username,
				}).exec()) as CandidateDocument | null
				const representative = await Representative.findById(userId)
				if (representative !== null && candidateDocument !== null) {
					const notification = await Notification.findOne({
						candidateId: (candidateDocument as any)._id,
						representativeId: representative._id,
					})
					if (!notification) {
						await createNotification({
							representativeId: representative._id,
							candidateId: (candidateDocument as any)._id,
							message: `${(representative as any).companyName} has seen your profile.`,
						})
					} else await updateNotification(notification._id, { dateTime: Date.now() })
				}
				const analysisId = candidateDocument?.analysisId._id

				const existingHistory = await History.findOne({
					userId,
					analysisId,
				}).exec()

				if (!existingHistory) {
					await createHistory(userId, {
						analysisId,
						date: new Date(),
						favorite: false,
					})
				}
				return savedRecord
			} catch (error) {
				console.error('Error al crear el historial para el análisis:', error)
			}
		}
	}
}
export const createTeamCreator: any = async (data: ProfileRequested[], userId: string) => {
	const skills: SkillRequested = processSkillsRequested(data)
	const filteredcandidates: FilteredCandidates[] = await filterCandidates(skills)
	const selectCandidates: ProfileMap = selectBestCandidates(filteredcandidates, data)
	const savedRecord = await saveTeamCreator(userId, selectCandidates)
	try {
		const subscription = await getSubscriptionsByUserId(userId)
		subscription.remainingSearches -= data.length
		await subscription.save()
		const representative = await Representative.findById(userId)
		if (representative !== null) {
			await createTeamCreatorHistory(representative._id, { teamCreatorId: savedRecord._id })
		}
		return savedRecord
	} catch (error: any) {
		console.log(error)
	}
}
export const getAllTeamCreatorOfRepresentative: any = async (id: any) => {
	try {
		const result = await TeamCreator.find({ userId: id }).exec()
		return result
	} catch (err) {
		console.error(err)
	}
}

export const deleteTeamCreator: any = async (id: any) => {
	try {
		const result = await TeamCreator.findByIdAndDelete(id)
	} catch (err) {
		console.error(err)
	}
}

export const getTeamCreatorById: any = async (id: any) => {
	try {
		const result = await TeamCreator.findById(id)
		return result
	} catch (err) {
		console.error(err)
	}
}

export default {
	getAllTeamCreatorOfRepresentative,
	createTeamCreator,
	deleteTeamCreator,
	getTeamCreatorById,
}
