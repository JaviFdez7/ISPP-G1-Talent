import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useAuthContext } from '../../context/authContext'
import axios from 'axios'
import DataTableVertical from '../../components/DataTableVertical.jsx'
import DataTable from '../../components/DataTable.jsx'
import Input from '../../components/Input.jsx'
import mainBackgroundRegisterLogin from '../../images/main-background2.jpg'
import MainButton from '../../components/mainButton.jsx'
import FavoriteButton from '../../components/history/FavoriteButton.jsx'
import { handleNetworkError } from '../../components/TokenExpired'
import { useNavigate } from 'react-router-dom'
import profile from '../../images/profile.jpg'
import WorkExperienceListNoButtons from '../../components/WorkExperienceListNoButtons'
import { Chart as ChartJS } from 'chart.js/auto'
import { Pie, Bar, Radar } from 'react-chartjs-2'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function AnalysisDashboard() {
	const textColor = ' var(--talent-white-text)'
	const textColor2 = 'var(--talent-highlight)'
	const graphsTextColor = 'white'
	const borderColor = 'var(--talent-secondary)'
	const { analysisId: githubUsername } = useParams()
	const { isRepresentative } = useAuthContext()

	const [error, setError] = useState(false)
	const [errorMessage, setErrorMessage] = useState('')
	const [history, setHistory] = useState(null)
	const navigate = useNavigate()
	const [isFavorite, setIsFavorite] = useState(history?.favorite)

	const [dataArray, setDataArray] = useState([])
	const [candidate, setCandidate] = useState()
	const [experience, setExperience] = useState([])
	const apiURL = import.meta.env.VITE_BACKEND_URL

	const handleToggleFavorite = () => {
		setIsFavorite(!isFavorite)
	}

	async function fetchDataFromEndpoint(analysisEndPoint) {
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

	async function fetchHistory(currentAnalysisId) {
		try {
			const historyData = await getHistory(currentAnalysisId)
			setIsFavorite(historyData.favorite)
			setHistory(historyData)
		} catch (error) {
			console.error('Error fetching history:', error)
		}
	}

	useEffect(() => {
		fetchDataFromEndpoint('/analysis/github/' + githubUsername)
			.then((data) => {
				const newArray = data
				const currentAnalysisId = data._id
				setDataArray(newArray)
				fetchHistory(currentAnalysisId)
			})
			.catch((error) => {
				console.error('Error fetching data:', error)
			})
	}, [githubUsername])

	const calculateTimePeriod = (startDate, endDate) => {
		const start = new Date(startDate)
		const end = new Date(endDate)
		const timeDiff = Math.abs(end - start)
		const days = Math.ceil(timeDiff / (1000 * 60 * 60 * 24))
		return days
	}

	const languages = dataArray.globalTopLanguages ? dataArray.globalTopLanguages : []
	const tecnologies = dataArray.globalTechnologies
		? dataArray.globalTechnologies.map((item) => ({
				name: item,
				appearences: dataArray.topRepositories.filter((repo) =>
					repo.technologies.includes(item)
				).length,
			}))
		: []
	let areas = experience.map((item) => ({
		name: item.professionalArea,
		duration: calculateTimePeriod(item.startDate, item.endDate),
	}))
	const areas_max_duration =
		areas.length > 0 ? areas.sort((a, b) => b.duration - a.duration)[0].duration : 1
	areas = areas.map((item) => ({
		name: item.name,
		duration: (item.duration / areas_max_duration) * 100,
	}))
	const companies = experience.map((item) => ({
		name: item.companyName,
		duration: calculateTimePeriod(item.startDate, item.endDate),
	}))

	function getHistory(currentAnalysisId) {
		const currentUserId = localStorage.getItem('userId')
		const uri = `/user/${currentUserId}/history`
		return fetchDataFromEndpoint(uri)
			.then((data) => {
				const filteredHistory = data.filter((item) => item.analysisId === currentAnalysisId)
				return filteredHistory[0]
			})
			.catch((error) => {
				console.error('Error while retrieving the history related to this analysis', error)
				throw error
			})
	}

	let mobile = false
	if (window.screen.width < 500) {
		mobile = true
	}

	async function fetchCandidatesFromAnalysis() {
		try {
			const response = await axios.get(apiURL + '/user')
			setError(false)
			return response.data.data
		} catch (error) {
			setError(false)
			setErrorMessage('Unable to connect to the server. Please try again later.')
			handleNetworkError(error, navigate)
		}
	}

	async function fetchExperienceFromCandidate(currentCandidate) {
		try {
			const experiences = []
			for (const experienceId of currentCandidate.profesionalExperiences) {
				const response = await axios.get(
					`${import.meta.env.VITE_BACKEND_URL}/professional-experience/${experienceId}`
				)
				experiences.push(response.data.data)
			}
			setError(false)
			setExperience(experiences)
		} catch (error) {
			setError(false)
			setErrorMessage('Unable to connect to the server. Please try again later.')
			handleNetworkError(error, navigate)
		}
	}

	useEffect(() => {
		if (dataArray && dataArray._id) {
			fetchCandidatesFromAnalysis()
				.then((data) => {
					const candidato = data.find((i) => i.analysisId == dataArray._id)
					if (candidato != null) {
						fetchExperienceFromCandidate(candidato)
						setCandidate(candidato)
					}
				})
				.catch((error) => {
					console.error('Error fetching data:', error)
				})
		}
	}, [dataArray])

	let imgSrc
	if (candidate && Object.keys(candidate).length > 0) {
		if (candidate.profilePicture) {
			imgSrc = candidate.profilePicture
		} else {
			imgSrc = profile
		}
	} else {
		imgSrc = dataArray.avatarUrl
	}

	let data = []

	if (candidate) {
		if (candidate.email) {
			data.push({
				header: 'Email',
				content: candidate.email,
			})
		}

		if (candidate.phone) {
			data.push({
				header: 'Phone',
				content: candidate.phone,
			})
		}
	}

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
			className='text-white flex flex-row justify-center bg-fixed'
			style={{
				backgroundImage: `url(${mainBackgroundRegisterLogin})`,
				backgroundSize: 'cover',
			}}>
			<div className='fixed top-6 left-0 mb-4 ml-6' style={{ zIndex: '2' }}>
				{MainButton('Analysis History', `/analysis/list`, '')}
			</div>

			<div className='container flex flex-col items-center w-10/12 h-full'>
				<div
					className='analysis-main-container'
					style={{ flexDirection: mobile ? 'column' : 'row' }}>
					<div className='flex flex-col items-center space-y-4'>
						<img className='analysis-profile-img' src={imgSrc} alt='Imagen' />
						<h2 className='analysis-name'>{dataArray.githubUsername}</h2>
						<div>
							{isRepresentative && history ? (
								<FavoriteButton
									history={history}
									isFavorite={isFavorite}
									onToggleFavorite={handleToggleFavorite}
									toggleText
								/>
							) : null}
						</div>
						<div className='w-full'>
							{candidate &&
								candidate.email &&
								data.map((item) => (
									<>
										<div className='flex flex-row w-full justify-between space-x-16 items-center'>
											<p className='analysis-subtitle'>{item.header}:</p>
											<p className='analysis-text'>{item.content}</p>
										</div>
										<br></br>
										<hr></hr>
										<br></br>
									</>
								))}
						</div>
					</div>
					{dataArray && dataArray.contributions && (
						<div className='flex flex-col space-y-4'>
							<div className='flex flex-row space-x-4'>
								<div className='analysis-data-container w-full'>
									<p className='analysis-subtitle'>Followers</p>
									<p className='analysis-text-big'>{dataArray.followers}</p>
								</div>
								<div className='analysis-data-container w-full'>
									<p className='analysis-subtitle'>Issues Closed</p>
									<p className='analysis-text-big'>
										{dataArray.globalIssuesClosed}
									</p>
								</div>
							</div>
							<div className='flex flex-row space-x-4'>
								<div className='analysis-data-container w-full'>
									<p className='analysis-subtitle'>Total Commits</p>
									<p className='analysis-text-big'>
										{dataArray.contributions.totalCommits}
									</p>
								</div>
								<div className='analysis-data-container w-full'>
									<p className='analysis-subtitle'>Total Pull Requests</p>
									<p className='analysis-text-big'>
										{dataArray.contributions.totalPullRequests}
									</p>
								</div>
							</div>
						</div>
					)}
				</div>

				{languages.length > 0 && (
					<div
						className='w-full p-1 rounded shadow-md flex flex-col mt-10 mb-10'
						style={{
							backgroundColor: 'rgba(0, 0, 0, 0.5)',
							marginLeft: '100',
							marginRight: '100',
							borderColor: borderColor,
							borderWidth: '1px',
						}}>
						<h6 className='text-2xl font-bold text-center text-white mt-6'>
							Languages
						</h6>

						<div
							className='flex items-center w-10/12 justify-around self-center p-10'
							style={{
								flexDirection: mobile ? 'column' : 'row',
							}}>
							<div
								className='analysis-data-container space-y-10 w-3/12'
								style={{ width: mobile ? '100%' : '30.00%' }}>
								<div>
									<p className='analysis-subtitle'>Most used language</p>
									<p className='analysis-name'>
										{
											languages.sort((a, b) => b.percentage - a.percentage)[0]
												.language
										}
									</p>
								</div>
								{languages.length > 1 && (
									<div className='flex flex-col'>
										<p className='analysis-subtitle'>#2</p>
										<p className='analysis-text'>
											{
												languages.sort(
													(a, b) => b.percentage - a.percentage
												)[1].language
											}
										</p>
									</div>
								)}
								{languages.length > 2 && (
									<div className='flex flex-col'>
										<p className='analysis-subtitle'>#3</p>
										<p className='analysis-text'>
											{
												languages.sort(
													(a, b) => b.percentage - a.percentage
												)[2].language
											}
										</p>
									</div>
								)}
							</div>

							<div
								className='w-7/12 justify-center flex'
								style={{
									width: mobile ? '200%' : '50.00%',
									marginTop: mobile ? '40px' : '0',
								}}>
								<Pie
									data={{
										labels: languages.map((item) => item.language),
										datasets: [
											{
												label: '',
												data: languages.map((item) => item.percentage),
												backgroundColor: getListOfRandomColors(
													languages.length
												),
											},
										],
									}}
									options={{
										plugins: {
											legend: {
												labels: {
													color: graphsTextColor,
													font: {
														size: 13, 
													  },
												},
											},
										},
									}}></Pie>
							</div>
						</div>
					</div>
				)}

				{tecnologies.length > 0 && (
					<div
						className='w-full p-1 rounded shadow-md flex flex-col mt-10 mb-10'
						style={{
							backgroundColor: 'rgba(0, 0, 0, 0.5)',
							marginLeft: '100',
							marginRight: '100',
							borderColor: borderColor,
							borderWidth: '1px',
						}}>
						<h6 className='text-2xl font-bold text-center text-white mt-6'>
							Tecnologies
						</h6>

						<div
							className='flex items-center w-10/12 justify-around self-center p-10'
							style={{
								flexDirection: mobile ? 'column' : 'row',
							}}>
							<div className='w-2/12' style={{ width: mobile ? '100%' : '30.00%' }}>
								<DataTable
									header={'Used Tecnologies'}
									contentArray={
										tecnologies
											? tecnologies
													.sort((a, b) => b.appearences - a.appearences)
													.map((item) => item.name)
											: []
									}
								/>
							</div>

							<div
								className='w-10/12 justify-center flex'
								style={{
									width: mobile ? '150%' : '50.00%',
									marginTop: mobile ? '40px' : '0',
								}}>
								<Bar
									data={{
										labels: tecnologies.map((item) => item.name),
										datasets: [
											{
												label: 'Technologies usage',
												data: tecnologies.map((item) => item.appearences),
												backgroundColor: getListOfRandomColors(
													tecnologies.length
												),
											},
										],
									}}
									options={{
										plugins: {
											legend: {
												labels: {
													color: graphsTextColor,
													font: {
														size: 13, 
													  },
												},
											},
										},
										scales: {
											x: {
												ticks: {
													color: graphsTextColor,
													font: {
														size: 13, 
													  },
												},
											},
											y: {
												ticks: {
													color: graphsTextColor,
													
												},
											},
										},
									}}></Bar>
							</div>
						</div>
					</div>
				)}

				<div
					className='w-full p-1 rounded shadow-md flex flex-col mt-10 mb-10'
					style={{
						backgroundColor: 'rgba(0, 0, 0, 0.5)',
						marginLeft: '100',
						marginRight: '100',
						borderColor: borderColor,
						borderWidth: '1px',
					}}>
					{errorMessage ? (
						<div className='text-center text-white'>{errorMessage}</div>
					) : (
						<>
							<br></br>
							<h6 className='text-2xl font-bold text-center text-white mt-6'>
								Top Repositories
							</h6>
							<br></br>
							{errorMessage ? (
								<div className='text-center text-white'>{errorMessage}</div>
							) : (
								<div
									className='mt-2 w-11/12 self-center'
									style={{ backdropFilter: 'blur(8px)', maxHeight: '200px' }}>
									<table className='w-full datatable-header-container'>
										<thead>
											<tr>
												<th
													className='datatable-header'
													style={{ width: '16.66%' }}>
													Stars
												</th>
												<th
													className='datatable-header'
													style={{ width: '16.66%' }}>
													Name
												</th>
												<th
													className='datatable-header'
													style={{ width: '16.66%' }}>
													Forks
												</th>
												<th
													className='datatable-header'
													style={{ width: '16.66%' }}>
													Languages
												</th>
												<th
													className='datatable-header'
													style={{ width: '16.66%' }}>
													Technologies
												</th>
											</tr>
										</thead>
									</table>
									<div
										className='datatable-body-container'
										style={{ overflow: 'auto', maxHeight: '450px' }}>
										<table className='w-full'>
											<tbody className='datatable-body'>
												{dataArray.topRepositories
													? dataArray.topRepositories
														.sort((a, b) => {
															if (b.stars !== a.stars) {
															return b.stars - a.stars;
															}
															return b.forks - a.forks;
														})
														.map((item, index) => (
																<>
																	<tr
																		key={index}
																		style={{
																			display: 'table',
																			width: '100%',
																			tableLayout: 'fixed',
																		}}>
																		<td className='datatable-cell-small text-center'>
																			<br></br>
																			{item.stars}
																		</td>
																		<td className='datatable-cell-small  text-center'>
																			<br></br>
																			{item.name}
																		</td>
																		<td className='datatable-cell-small text-center'>
																			<br></br>
																			{item.forks}
																		</td>
																		<td className='datatable-cell-small text-center'>
																			<br></br>
																			{item.languages.join(
																				', '
																			)}
																		</td>
																		<td className='datatable-cell-small text-center'>
																			<br></br>
																			{item.technologies.join(
																				', '
																			)}
																		</td>
																	</tr>
																	<tr
																		style={{
																			display: 'table',
																			width: '100%',
																			tableLayout: 'fixed',
																		}}>
																		<td>
																			<hr
																				style={{
																					width: '101%',
																				}}></hr>
																		</td>
																		<td>
																			<hr
																				style={{
																					width: '101%',
																				}}></hr>
																		</td>
																		<td>
																			<hr
																				style={{
																					width: '101%',
																				}}></hr>
																		</td>
																		<td>
																			<hr
																				style={{
																					width: '101%',
																				}}></hr>
																		</td>
																		<td>
																			<hr
																				style={{
																					width: '101%',
																				}}></hr>
																		</td>
																		<td>
																			<hr
																				style={{
																					width: '100%',
																				}}></hr>
																		</td>
																	</tr>
																</>
															))
													: null}
											</tbody>
										</table>
									</div>
								</div>
							)}
							<br></br>
							<br></br>
							<br></br>
							<br></br>
							<br></br>
							<div
								className='flex justify-around self-center mb-10'
								style={{
									marginTop: mobile ? '40vh' : '30vh',
									width: mobile ? '95%' : '60%',
								}}>
								<div
									className='analysis-data-container'
									style={{
										marginRight: mobile ? '2vh' : '20vh',
									}}>
									<p className='analysis-subtitle'>
										Repositories Contributes with Commits
									</p>
									<p className='analysis-text-big'>
										{dataArray && dataArray.contributions
											? dataArray.contributions
													.totalRepositoriesContributedWithCommits
											: 0}
									</p>
								</div>
								<div className='analysis-data-container'>
									<p className='analysis-subtitle'>
										Repositories Contributes with Pull Requests
									</p>
									<p className='analysis-text-big'>
										{dataArray && dataArray.contributions
											? dataArray.contributions
													.totalRepositoriesContributedWithPullRequests
											: 0}
									</p>
								</div>
							</div>
							<br></br>
						</>
					)}
				</div>

				{candidate && experience && experience.length > 0 && (
					<div
						className='w-full flex justify-center items-center p-1 rounded shadow-md flex-col mt-10 mb-10'
						style={{
							backgroundColor: 'rgba(0, 0, 0, 0.5)',
							marginLeft: '100',
							marginRight: '100',
							borderColor: borderColor,
							borderWidth: '1px',
						}}>
						{errorMessage ? (
							<div className='text-center text-white'>{errorMessage}</div>
						) : (
							<>
								<br />
								{experience && experience.length > 0 ? (
									<>
										<br />
										<h6 className='text-2xl font-bold text-center text-white '>
											Working experiences
										</h6>
										<div
											className='flex w-full justify-around mt-10 items-center'
											style={{
												flexDirection: mobile ? 'column' : 'row',
											}}>
											<div
												className='flex flex-col items-center'
												style={{
													width: mobile ? '90%' : '40%',
												}}>
												<h6 className='text-xl font-bold text-center text-white mb-4'>
													Areas of expertise
												</h6>
												<Radar
													options={{
														scales: {
															r: {
																
																max: 100,
																min: 0,
																pointLabels: {
																	color: graphsTextColor,
																	font: {
																		size: 15, 
																	  },
																  },
																ticks: {
																	stepSize: 20,
																	textStrokeColor:
																		'rgb(54, 162, 235)',
																	color: graphsTextColor,
																	font: {
																		size: 15, 
																	  },
																	backdropColor:
																		'rgb(47, 56, 62)',
																},
																angleLines: {
																	color: 'rgba(240, 240, 240,0.5)',
																},

																grid: {
																	color: 'lightgreen',
																},
															},
														},
														plugins: {
															legend: {
															  labels: {
																color: graphsTextColor, // Cambia este valor al color que desees
																font: {
																  size: 15, // Cambia este valor al tamaño de letra que desees
																},
															  },
															},
														  },
													}}
													data={{
														labels: areas.map((item) => item.name),
														datasets: [
															{
																label: '',
																data: areas.map(
																	(item) => item.duration
																),
																fill: true,
																backgroundColor:
																	'rgba(255, 99, 132, 0.2)',
																borderColor: 'rgb(255, 99, 132)',
																pointBackgroundColor:
																	'rgb(255, 99, 132)',
																pointBorderColor: '#fff',
																pointHoverBackgroundColor: '#fff',
																pointHoverBorderColor:
																	'rgb(255, 99, 132)',
															},
														],
													}}></Radar>
											</div>
											<div
												className='flex flex-col w-4/12 items-center'
												style={{
													width: mobile ? '90%' : '30%',
												}}>
												<h6 className='text-xl font-bold text-center text-white mb-4'>
													Companies worked for
												</h6>
												<Pie
												options={{
													plugins: {
													  legend: {
														labels: {
														  color: graphsTextColor, // Cambia este valor al color que desees
														  font: {
															size: 13, // Cambia este valor al tamaño de letra que desees
														  },
														},
													  },
													},
												  }}
													data={{
														labels: companies.map((item) => item.name),
														datasets: [
															{
																label: '',
																data: companies.map(
																	(item) => item.duration
																),
																backgroundColor:
																	getListOfRandomColors(
																		companies.length
																	),
															},
														],
													}}></Pie>
											</div>
										</div>
										<div className='flex justify-between items-center w-full'>
											<WorkExperienceListNoButtons experience={experience} />
										</div>
										<br></br>
									</>
								) : null}
							</>
						)}
					</div>
				)}
			</div>
		</section>
	)
}
