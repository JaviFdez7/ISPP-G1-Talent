import React from 'react'
import DataTableVertical from '../../components/DataTableVertical.jsx'
import axios from 'axios'
import profile from '../../images/profile.jpg'
import { useEffect, useState } from 'react'
import DropdownComponent from '../../components/DropDown.jsx'
import mainBackgroundRegisterLogin from '../../images/main-background2.jpg'
import MainButton from '../../components/mainButton.jsx'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import SecondaryButton from '../../components/secondaryButton.jsx'

export default function SearchResult() {
	let navigate = useNavigate()
	const [error, setError] = useState(false)
	const [errorMessage, setErrorMessage] = useState('')
	const [analysisData, setAnalysisData] = useState({})
	const apiURL = import.meta.env.VITE_BACKEND_URL
	const { searchId } = useParams()

	const [teamData, setTeamData] = useState(null)

	async function fetchDataFromEndpoint(searchId) {
		try {
			const token = localStorage.getItem('access_token')
			const config = {
				headers: { Authorization: `${token}` },
			}
			const response = await axios.get(apiURL + '/team-creator/' + searchId, config)
			setTeamData(response.data.data)
			setError(false)
			return response.data
		} catch (error) {
			if (error.message && error.message.includes('Network Error')) {
				setErrorMessage(
					'Unable to connect to the server. Please make sure the server is running and accepting connections.'
				)
			} else if (error.response) {
				if (error.response.status === 500) {
					setErrorMessage('Internal server error. Please try again later.')
				} else {
					setErrorMessage('An unknown error occurred. Please try again later.')
				}
			} else {
				setErrorMessage('An unknown error occurred. Please try again later.')
			}
			setError(true)
		}
	}

	async function handleClick(candidate) {
		try {
			const token = localStorage.getItem('access_token')
			const config = {
				headers: { Authorization: `${token}` },
			}
			const response = await axios.get(
				`${apiURL}/analysis/github/${candidate.github_username}`,
				config
			)
			navigate(`/analysis/${candidate.github_username}`)
		} catch (error) {
			if (error.response && error.response.status == 404) {
				navigate(`/analysis/analyze`)
			}
		}
	}

	async function fetchAnalysisFromEndpoint(candidate) {
		try {
			const token = localStorage.getItem('access_token')
			const config = {
				headers: { Authorization: `${token}` },
			}
			const response = await axios.get(
				`${apiURL}/analysis/github/${candidate.github_username}`,
				config
			)
			setAnalysisData((prevState) => ({
				...prevState,
				[candidate.github_username]: response.data,
			}))
			return response.data
		} catch (error) {
			setError(true)
			setErrorMessage('Unable to connect to the server. Please try again later.')
			throw error
		}
	}

	useEffect(() => {
		if (teamData && teamData.profiles) {
			teamData.profiles.forEach((team) => {
				if (Array.isArray(team.recommendedCandidates)) {
					team.recommendedCandidates.forEach(async (candidate) => {
						const analysis = await fetchAnalysisFromEndpoint(candidate)
						setAnalysisData((prevState) => ({
							...prevState,
							[candidate.github_username]: analysis,
						}))
					})
				}
			})
		}
	}, [teamData])

	useEffect(() => {
		fetchDataFromEndpoint(searchId)
	}, [searchId])

	const [mobile, setMobile] = useState(window.screen.width < 500)

	useEffect(() => {
		const handleResize = () => {
			setMobile(window.screen.width < 500)
		}

		window.addEventListener('resize', handleResize)
		return () => {
			window.removeEventListener('resize', handleResize)
		}
	}, [])

	return (
		<section
			className='text-white flex flex-row justify-center bg-fixed h-screen'
			style={{
				backgroundImage: `url(${mainBackgroundRegisterLogin})`,
				backgroundSize: 'cover',
				overflowY: 'scroll',
			}}>
			<div className='container flex flex-col items-center w-10/12 h-full '>
				{teamData &&
					teamData.profiles.map((team, index) => (
						<DropdownComponent
							key={index}
							name={`Searched Candidate ${index + 1}`}
							defaultOpen={true}>
							<div className='flex flex-col items-center w-full' key={index}>
								<div className='flex flex-col items-center w-full'>
									<h6 className='text-2xl font-bold text-center text-white mt-5 mb-5'>
										Filter Parameters {index + 1}
									</h6>
									<DataTableVertical
										width={(mobile || (team.recommendedCandidates && team.recommendedCandidates.length < 3)) ? 'w-full' : 'w-3/4'}
										data={[
											{
												header: 'Technologies',
												content: team.profileRequested.technologies
													? team.profileRequested.technologies.join(', ')
													: '',
											},
											{
												header: 'Languages',
												content: team.profileRequested.languages
													? team.profileRequested.languages.join(', ')
													: '',
											},
											{
												header: 'Field',
												content: team.profileRequested.field
													? team.profileRequested.field
													: '',
											},
											{
												header: 'Years of Experience',
												content: team.profileRequested.yearsOfExperience,
											},
										]}
									/>
								</div>
								<div
									className='flex flex-wrap items-center w-full justify-center mt-5 mb-5'
									style={{  flexDirection: (mobile || (team.recommendedCandidates && team.recommendedCandidates.length < 3)) ? 'column' : 'row',
									width: '100%',  }}>
									{Array.isArray(team.recommendedCandidates) &&
									team.recommendedCandidates.length > 0 ? (
										team.recommendedCandidates.map(
											(candidate, candidateIndex) => (
												<div
													key={candidateIndex}
													className={mobile ? 'w-full px-2' : 'w-1/3 px-2'}>
													<h6
														className='text-1xl font-bold text-center text-white  mt-5 mb-5'>
														Filtered Candidate {candidateIndex + 1}
													</h6>
													<DataTableVertical
														
														data={[
															{
																header: 'Github username',
																content: (
																	<>
																		<div>
																			{
																				candidate.github_username
																			}
																		</div>
																		{analysisData[
																			candidate
																				.github_username
																		] &&
																			analysisData[
																				candidate
																					.github_username
																			].data && (
																				<img
																					src={
																						analysisData[
																							candidate
																								.github_username
																						].data
																							.avatarUrl
																					}
																					style={{
																						width: '25px',
																						height: '25px',
																						borderRadius:
																							'50%',
																						marginLeft:
																							'5px',
																					}}
																				/>
																			)}
																	</>
																),
															},
															{
																header: 'Technologies',
																content: Array.isArray(
																	candidate.technologies
																)
																	? candidate.technologies.join(
																			', '
																		)
																	: '',
															},
															{
																header: 'Languages',
																content: Array.isArray(
																	candidate.languages
																)
																	? candidate.languages.join(', ')
																	: '',
															},
															{
																header: 'Field',
																content: Array.isArray(
																	candidate.field
																)
																	? candidate.field.join(', ')
																	: '',
															},
															{
																header: 'Years of Experience',
																content:
																	candidate.yearsOfExperience,
															},
														]}
													/>
													<div
														style={{
															display: 'flex',
															justifyContent: 'center',
															alignItems: 'center',
															

														}}>
														<div className='flex justify-center mt-10 mb-4'>
															{MainButton('View Analysis', '', () =>
																handleClick(candidate)
															)}
														</div>
													</div>
												</div>
											)
										)
									) : (
										<h6 className='text-2xl font-bold text-center text-white mt-5 mb-5'>
											No results for the search, please try different filters
										</h6>
									)}
								</div>
							</div>
						</DropdownComponent>
					))}

				<div className='flex justify-center mt-10 mb-10'>
					{MainButton('Back to Search', `/searches/search`, '')}
					{SecondaryButton('Search list', '/searches/list', '')}
				</div>
				{error && <p>{errorMessage}</p>}
			</div>
		</section>
	)
}
