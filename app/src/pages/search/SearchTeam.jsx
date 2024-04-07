import React from 'react'
import DataTableVertical from '../../components/DataTableVertical.jsx'
import axios from 'axios'
import profile from '../../images/profile.jpg'
import { useEffect, useState } from 'react'
import DropdownComponent from '../../components/DropDown.jsx'
import mainBackgroundRegisterLogin from '../../images/main-background2.jpg'
import MainButton from '../../components/mainButton.jsx'
import { useNavigate } from 'react-router-dom'
import Modal from 'react-modal'

export default function SearchResult() {
	const [error, setError] = useState(false)
	const [errorMessage, setErrorMessage] = useState('')
	const apiURL = import.meta.env.VITE_BACKEND_URL
	const [showModal, setShowModal] = useState(false)
	const [selectedId, setSelectedId] = useState(null)
	const [analysisData, setAnalysisData] = useState({})
	const [teamData, setTeamData] = useState(null)
	let searchResultCount = 0
	let navigate = useNavigate()

	async function fetchDataFromEndpoint(representativeId) {
		try {
			const token = localStorage.getItem('access_token')
			const config = {
				headers: { Authorization: `${token}` },
			}
			const response = await axios.get(
				apiURL + '/team-creator/representative-user/' + representativeId,
				config
			)
			setTeamData(response.data.data)
			setError(false)
			return response.data
		} catch (error) {
			if (!error.response) {
				setErrorMessage('Invalid ID supplied')
			} else if (error.response) {
				if (error.response.status === 400) {
					setErrorMessage('Bad request, invalid ID supplied')
				} else if (error.response.status === 404) {
					setErrorMessage('Team Creator entry not found')
				} else if (error.response.status === 500) {
					setErrorMessage('Internal server error')
				} else {
					setErrorMessage('Unable to connect to the server. Please try again later.')
				}
			}
			setError(true)
			throw error
		}
	}

	useEffect(() => {
		const representativeId = localStorage.getItem('userId')
		fetchDataFromEndpoint(representativeId)
	}, [])

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
		if (teamData) {
			teamData.forEach((teamList) => {
				teamList.profiles.forEach((team) => {
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
			})
		}
	}, [teamData])

	async function deleteDataFromEndpoint(searchId) {
		try {
			const token = localStorage.getItem('access_token')
			const config = {
				headers: { Authorization: `${token}` },
			}
			const response = await axios.delete(apiURL + '/team-creator/' + searchId, config)
			window.location.reload()

			return response.data
		} catch (error) {
			setError(true)
			setErrorMessage('Unable to connect to the server. Please try again later.')
			throw error
		}
	}

	function deleteSearchResult(id) {
		setSelectedId(id)
		setShowModal(true)
	}
	function handleCancel() {
		setShowModal(false)
	}

	async function handleClick(candidate) {
		try {
			const response = await fetchAnalysisFromEndpoint(candidate)
			navigate(`/analysis/${candidate.github_username}`)
		} catch (error) {
			if (error.response && error.response.status == 404) {
				navigate(`/analysis/analyze`)
			}
		}
	}

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
				<div className='flex justify-center w-full mt-10'>
					<h6 className='text-3xl font-bold text-center text-white mt-5 mb-5'>
						Your searched teams
					</h6>
				</div>
				{error && <p>{errorMessage}</p>}
				{teamData &&
					teamData.map((teamList, listIndex) => (
						<DropdownComponent
							key={listIndex}
							name={`Searched Candidate ${listIndex + 1}`}>
							<div className='flex flex-col'>
								{teamList.profiles.map((team, index) => {
									searchResultCount++
									return (
										<div
											className='flex flex-col items-center w-full'
											key={`${listIndex}-${searchResultCount}`}>
											<h6 className='text-2xl font-bold text-center text-white mt-5 mb-5'>
												Filter Parameters {index + 1}
											</h6>
											<DataTableVertical
												width='w-3/4'
												data={[
													{
														header: 'Technologies',
														content: team.profileRequested.technologies
															? team.profileRequested.technologies.join(
																	', '
																)
															: '',
													},
													{
														header: 'Languages',
														content: team.profileRequested.languages
															? team.profileRequested.languages.join(
																	', '
																)
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
														content:
															team.profileRequested.yearsOfExperience,
													},
												]}
											/>
											<div
												className='flex flex-wrap mt-5'
												style={{
													flexDirection: mobile ? 'column' : 'row',
												}}>
												{Array.isArray(team.recommendedCandidates) &&
													team.recommendedCandidates.map(
														(candidate, candidateIndex) => (
															<div
																key={candidateIndex}
																className='w-1/3 px-2 '>
																<h6
																	className='text-1xl font-bold text-center text-white mt-5 mb-5'
																	style={{
																		marginLeft: mobile
																			? '140px'
																			: '',
																		width: 'calc(100% )',
																	}}>
																	Filtered Candidate{' '}
																	{candidateIndex + 1}
																</h6>

																<DataTableVertical
																	width='w-full'
																	data={[
																		{
																			header: 'Gihub username',
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
																									]
																										.data
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
																				? candidate.languages.join(
																						', '
																					)
																				: '',
																		},
																		{
																			header: 'Field',
																			content: Array.isArray(
																				candidate.field
																			)
																				? candidate.field.join(
																						', '
																					)
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
																	className='flex justify-center  mt-10 mb-4'
																	style={{
																		marginLeft: mobile
																			? '140px'
																			: '',
																		width: 'calc(100% )',
																	}}>
																	{MainButton(
																		'View Analysis',
																		'',
																		() => handleClick(candidate)
																	)}
																</div>
															</div>
														)
													)}
											</div>
										</div>
									)
								})}
								<div className='flex justify-center mt-16 mb-0'>
									{MainButton('Delete search', '', () =>
										deleteSearchResult(teamList._id)
									)}
								</div>
							</div>
						</DropdownComponent>
					))}
				<Modal
					isOpen={showModal}
					onRequestClose={handleCancel}
					contentLabel='Delete Confirmation'
					style={{
						content: {
							width: '40%',
							height: '20%',
							margin: 'auto',
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'center',
							alignItems: 'center',
							backgroundColor: 'var(--talent-secondary)',
							borderRadius: '10px',
							color: 'white',
						},
					}}>
					<h2 style={{ marginBottom: '3%' }}>
						Are you sure you want to delete this Search result?
					</h2>
					<div>
						<button
							onClick={() => deleteDataFromEndpoint(selectedId)}
							style={{
								marginRight: '10px',
								padding: '10px',
								backgroundColor: 'var(--talent-highlight)',
								color: 'white',
								border: 'none',
								borderRadius: '5px',
							}}>
							Yes
						</button>
						<button
							onClick={handleCancel}
							style={{
								padding: '10px',
								backgroundColor: 'var(--talent-black)',
								color: 'white',
								border: 'none',
								borderRadius: '5px',
							}}>
							No
						</button>
					</div>
				</Modal>
				<div className='flex justify-center mt-10 mb-10'>
					{MainButton('New search', `/searches/search`, '')}
				</div>
			</div>
		</section>
	)
}
