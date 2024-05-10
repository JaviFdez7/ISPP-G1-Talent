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
import Input from '../../components/Input.jsx'
import { Chart as ChartJS } from 'chart.js/auto'
import { Pie, Bar, Radar } from 'react-chartjs-2'
import DataTable from '../../components/DataTable.jsx'

export default function SearchResult() {
	let navigate = useNavigate()
	const [error, setError] = useState(false)
	const [errorMessage, setErrorMessage] = useState('')
	const [analysisData, setAnalysisData] = useState({})
	const [historyData, setHistoryData] = useState({})
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
			console.log(analysisData)
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
						const history = await fetchHistory(analysis.data._id)
						setHistoryData((prevState) => ({
							...prevState,
							[candidate.github_username]: history,
						}))
					})
				}
			})
		}
	}, [teamData])

	async function fetchHistory(currentAnalysisId) {
		try {
			const _historyData = await getHistory(currentAnalysisId)
			return _historyData
		} catch (error) {
			console.error('Error fetching history:', error)
		}
	}

	function getHistory(currentAnalysisId) {
		const currentUserId = localStorage.getItem('userId')
		const uri = `/user/${currentUserId}/history`
		return fetchDataFromEndpoint2(uri)
			.then((data) => {
				const filteredHistory = data.filter((item) => item.analysisId === currentAnalysisId)
				return filteredHistory[0]
			})
			.catch((error) => {
				console.error('Error while retrieving the history related to this analysis', error)
				throw error
			})
	}

	async function fetchDataFromEndpoint2(analysisEndPoint) {
		try {
			const token = localStorage.getItem('access_token')
			const config = {
				headers: { Authorization: `${token}` },
			}
			const response = await axios.get(apiURL + analysisEndPoint, config)
			setError(false)
			return response.data.data
		} catch (error) {
			setError(false)
			setErrorMessage('Unable to connect to the server. Please try again later.')
			handleNetworkError(error, navigate)
		}
	}

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

	function randomNumberInRange(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min
	}

	function getListOfRandomColors(n) {
		const colors = []
		for (let i = 0; i < n; i++) {
			const randomColor = `rgb(${randomNumberInRange(0, 255) * 0.4}, ${randomNumberInRange(0, 255) * 0.4}, ${randomNumberInRange(0, 255) * 0.4})`
			colors.push(randomColor)
		}
		return colors
	}

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
								<div
									className='flex flex-wrap items-center w-full justify-center mt-5 mb-5'
									style={{
										flexDirection:
											mobile ||
											(team.recommendedCandidates &&
												team.recommendedCandidates.length < 3)
												? 'column'
												: 'row',
										width: '100%',
									}}>
									{Array.isArray(team.recommendedCandidates) &&
									team.recommendedCandidates.length > 0 ? (
										team.recommendedCandidates.map(
											(candidate, candidateIndex) => (
												<div
													key={candidateIndex}
													className='items-center flex flex-col'>
													<div
														className='flex items-center justify-around w-full px-4'
														style={{
															flexDirection: mobile
																? 'column'
																: 'row',
														}}>
														{historyData[candidate.github_username] &&
															analysisData[
																candidate.github_username
															] &&
															analysisData[candidate.github_username]
																.data && (
																<div
																	className='flex flex-col items-center pt-8'
																	style={{
																		width: mobile
																			? '100%'
																			: '25%',
																	}}>
																	<img
																		src={
																			analysisData[
																				candidate
																					.github_username
																			].data.avatarUrl
																		}
																		className='w-3/4 rounded-full'
																	/>
																	<h6 className='text-center text-3xl mt-2'>
																		{candidate.github_username}
																	</h6>
																</div>
															)}

														{candidate &&
															analysisData[
																candidate.github_username
															] &&
															analysisData[candidate.github_username]
																.data && (
																<div
																	className='flex flex-col space-y-4 mt-8'
																	style={{
																		width: mobile
																			? '100%'
																			: '50%',
																	}}>
																	<div className='flex flex-row space-x-4'>
																		<div className='analysis-data-container w-full'>
																			<p className='analysis-subtitle-2'>
																				Experienced
																				Technology
																			</p>
																			<p className='analysis-text'>
																				{Array.isArray(
																					candidate.technologies
																				)
																					? candidate
																							.technologies[0]
																					: ''}
																			</p>
																		</div>
																		<div className='analysis-data-container w-full'>
																			<p className='analysis-subtitle-2'>
																				Most used language
																			</p>
																			<p className='analysis-text'>
																				{
																					analysisData[
																						candidate
																							.github_username
																					].data.globalTopLanguages.sort(
																						(a, b) =>
																							b.percentage -
																							a.percentage
																					)[0].language
																				}
																			</p>
																		</div>
																	</div>
																	<div className='flex flex-row space-x-4'>
																		<div className='analysis-data-container w-full'>
																			<p className='analysis-subtitle-2'>
																				Common field
																			</p>
																			<p className='analysis-text'>
																				{Array.isArray(
																					candidate.field
																				)
																					? candidate
																							.field[0]
																					: ''}
																			</p>
																		</div>
																		<div className='analysis-data-container w-full'>
																			<p className='analysis-subtitle-2'>
																				Years of Experience
																			</p>
																			<p className='analysis-text'>
																				{candidate.yearsOfExperience.toFixed(
																					2
																				)}
																			</p>
																		</div>
																	</div>
																</div>
															)}
													</div>

													<div
														className='flex items-center justify-around w-full px-4'
														style={{
															flexDirection: mobile
																? 'column'
																: 'row',
														}}>
														{analysisData[candidate.github_username] &&
															analysisData[candidate.github_username]
																.data && (
																<div
																	className='flex flex-row items-center'
																	style={{
																		width: mobile
																			? '100%'
																			: '30.00%',
																	}}>
																	<div className='flex flex-col items-center mt-8'>
																		<h6 className='text-center text-xl'>
																			Top Languages
																		</h6>
																		<br></br>
																		<Pie
																			data={{
																				labels: analysisData[
																					candidate
																						.github_username
																				].data.globalTopLanguages.map(
																					(item) =>
																						item.language
																				),
																				datasets: [
																					{
																						label: '',
																						data: analysisData[
																							candidate
																								.github_username
																						].data.globalTopLanguages.map(
																							(
																								item
																							) =>
																								item.percentage
																						),
																						backgroundColor:
																							getListOfRandomColors(
																								analysisData[
																									candidate
																										.github_username
																								]
																									.data
																									.globalTopLanguages
																									.length
																							),
																					},
																				],
																			}}></Pie>
																	</div>
																</div>
															)}

														{analysisData[candidate.github_username] &&
															analysisData[candidate.github_username]
																.data && (
																<div
																	className='flex flex-row items-center mt-4'
																	style={{
																		width: mobile
																			? '100%'
																			: '30.00%',
																	}}>
																	<DataTable
																		maxHeight='200px'
																		header={'Used Tecnologies'}
																		contentArray={
																			analysisData[
																				candidate
																					.github_username
																			].data
																				.globalTechnologies
																		}
																	/>
																</div>
															)}
													</div>

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
													<hr className='w-11/12 bg-white'></hr>
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
							<div className='px-2'>
								<h6 className='text-s font-bold text-center text-white mt-5 mb-5'>
									Parameters:
								</h6>
								<div className='flex flex-col items-center w-full self-center text-xs'>
									<div className='flex flex-row justify-around'>
										{Input({
											name: 'Technologies:',
											value: team.profileRequested.technologies
												? team.profileRequested.technologies.join(', ')
												: '',
										})}
										{Input({
											name: 'Languages:',
											value: team.profileRequested.languages
												? team.profileRequested.languages.join(', ')
												: '',
										})}
									</div>
									<div className='flex flex-row justify-around'>
										{Input({
											name: 'Field:',
											value: team.profileRequested.field
												? team.profileRequested.field
												: '',
										})}
										{Input({
											name: 'Years of Experience:',
											value: team.profileRequested.yearsOfExperience,
										})}
									</div>
								</div>
							</div>
						</DropdownComponent>
					))}

				<div className='flex justify-center mt-2 mb-4 space-x-20'>
					{MainButton('Back to Search', `/searches/search`, '')}
					{SecondaryButton('Search list', '/searches/list', '')}
				</div>
				{error && <p>{errorMessage}</p>}
			</div>
		</section>
	)
}
