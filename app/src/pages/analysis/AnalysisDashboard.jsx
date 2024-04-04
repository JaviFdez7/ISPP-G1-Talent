import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useAuthContext } from '../../context/authContext'
import axios from 'axios'

import DataTable from '../../components/DataTable.jsx'
import Input from '../../components/Input.jsx'
import mainBackgroundRegisterLogin from '../../images/main-background2.jpg'
import MainButton from '../../components/mainButton.jsx'
import FavoriteButton from '../../components/history/FavoriteButton.jsx'
import { handleNetworkError } from '../../components/TokenExpired'
import { useNavigate } from 'react-router-dom'

export default function AnalysisDashboard() {
	const textColor = ' var(--talent-white-text)'
	const textColor2 = 'var(--talent-highlight)'
	const borderColor = 'var(--talent-highlight)'
	const { analysisId } = useParams()
	const { isRepresentative } = useAuthContext()

	const [error, setError] = useState(false)
	const [errorMessage, setErrorMessage] = useState('')
	const [history, setHistory] = useState(null)
	const navigate = useNavigate()

	const [dataArray, setDataArray] = useState([])
	const apiURL = import.meta.env.VITE_BACKEND_URL

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
			setHistory(historyData)
		} catch (error) {
			console.error('Error fetching history:', error)
		}
	}

	useEffect(() => {
		fetchDataFromEndpoint('/analysis/github/' + analysisId)
			.then((data) => {
				const newArray = data
				const currentAnalysisId = data._id
				setDataArray(newArray)
				fetchHistory(currentAnalysisId)
			})
			.catch((error) => {
				console.error('Error fetching data:', error)
			})
	}, [analysisId])

	const languages = dataArray.globalTopLanguages
		? dataArray.globalTopLanguages.map((item) => item.language)
		: []
	const tecnologies = dataArray.globalTechnologies
		? dataArray.globalTechnologies.map((item) => item)
		: []

	function getHistory(currentAnalysisId) {
		const currentUserId = localStorage.getItem('userId')
		const uri = `/user/${currentUserId}/history`
		return fetchDataFromEndpoint(uri)
			.then((data) => {
				const filteredHistory = data.filter((item) => item.analysisId === currentAnalysisId)
				return filteredHistory[0]
			})
			.catch((error) => {
				console.log('Error while retrieving the history related to this analysis', error)
				throw error
			})
	}

	let mobile = false
	if (window.screen.width < 500) {
		mobile = true
	}

	return (
		<section
			className='text-white flex flex-row justify-center bg-fixed'
			style={{
				backgroundImage: `url(${mainBackgroundRegisterLogin})`,
				backgroundSize: 'cover',
			}}>
			<div className='fixed top-6 left-0 mb-4 ml-6' style={{ zIndex: '2' }}>
				{MainButton('Go back', `/analysis/list`, '')}
			</div>

			<div className='container flex flex-col items-center w-10/12 h-full'>
				{/* CANDIDATE column */}

				<br></br>
				<div className='flex flex-col items-center w-full mt-10'>
					{isRepresentative && history ? (
						<FavoriteButton history={history} toggleText />
					) : null}
					<br></br>

					<h6 className='text-3xl font-bold text-center text-white mt-5 mb-5  '>
						GitHub Statistics
					</h6>
					<br></br>
					<div className='analysis-profile'>
						<img
							src={dataArray.avatarUrl}
							alt='Imagen'
							className='analysis-profile-img'
							style={{ position: 'relative', left: '0%', zIndex: '1' }}
						/>

						<div className='analysis-profile-text'>
							<div className='analysis-profile-textcell-main'>
								<h2>{dataArray.githubUsername}</h2>
							</div>
							<div className='analysis-profile-textcell'>
								{Input({
									name: 'Followers',
									value: dataArray.followers,
									width: '300px',
								})}
							</div>
							<div className='analysis-profile-textcell'>
								{Input({
									name: 'Commits',
									value:
										dataArray && dataArray.contributions
											? dataArray.contributions.totalCommits
											: 0,
									width: '300px',
								})}
							</div>
							<div className='analysis-profile-textcell'>
								{Input({
									name: 'Pull Requests',
									value:
										dataArray && dataArray.contributions
											? dataArray.contributions.totalPullRequests
											: 0,
									width: '300px',
								})}
							</div>
						</div>
					</div>
					<br></br>
				</div>

				<div
					className='w-full p-1 rounded shadow-md flex flex-col mt-10 mb-10 ml-10'
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
							<h6 className='text-3xl font-bold text-center text-white mt-5 mb-5  '>
								Top recent Repositories
							</h6>
							<br></br>
							{errorMessage ? (
								<div className='text-center text-white'>{errorMessage}</div>
							) : (
								<div
									className='mt-2 w-11/12 self-center'
									style={{ backdropFilter: 'blur(8px)', maxHeight: '200px' }}>
									<table className='w-full'>
										<thead>
											<tr>
												<th
													className='datatable-header'
													style={{ width: '16.66%' }}>
													Name
												</th>
												<th
													className='datatable-header'
													style={{ width: '16.66%' }}>
													Stars
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
												<th
													className='datatable-header'
													style={{ width: '16.66%' }}>
													Url
												</th>
											</tr>
										</thead>
									</table>
									<div style={{ overflow: 'auto', maxHeight: '450px' }}>
										<table className='w-full'>
											<tbody className='datatable-body'>
												{dataArray.topRepositories
													? dataArray.topRepositories.map(
															(item, index) => (
																<>
																	<tr
																		key={index}
																		style={{
																			display: 'table',
																			width: '100%',
																			tableLayout: 'fixed',
																		}}>
																		<td className='datatable-cell-small  text-center'>
																			<br></br>
																			{item.name}
																		</td>
																		<td className='datatable-cell-small text-center'>
																			<br></br>
																			{item.stars}
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
																		<td className='datatable-cell-small text-center'>
																			<br></br>
																			<Link to={item.url}>
																				ICON
																			</Link>
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
																					width: '100%',
																				}}></hr>
																		</td>
																		<td>
																			<hr
																				style={{
																					width: '100%',
																				}}></hr>
																		</td>
																		<td>
																			<hr
																				style={{
																					width: '100%',
																				}}></hr>
																		</td>
																		<td>
																			<hr
																				style={{
																					width: '100%',
																				}}></hr>
																		</td>
																		<td>
																			<hr
																				style={{
																					width: '100%',
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
															)
														)
													: null}
											</tbody>
										</table>
									</div>
								</div>
							)}
							<br></br>
							<div
								className='flex w-full justify-around mt-10 mb-10'
								style={{
									marginTop: '20%',
									flexDirection: mobile ? 'column' : 'row',
								}}>
								<div className='flex flex-row justify-center pl-20'>
									{Input({
										name: 'Repositories Contributes with Commits',
										value:
											dataArray && dataArray.contributions
												? dataArray.contributions
														.totalRepositoriesContributedWithCommits
												: 0,
									})}
								</div>
								<div className='flex flex-row justify-center pl-20'>
									{Input({
										name: 'Repositories Contributes with Pull Requests',
										value:
											dataArray && dataArray.contributions
												? dataArray.contributions
														.totalRepositoriesContributedWithPullRequests
												: 0,
									})}
								</div>
							</div>
							<br></br>
						</>
					)}
				</div>

				<div
					className='w-10/12 max-w-6xl  h-100 p-1  rounded shadow-md flex flex-col justify-between mt-10 mb-10 ml-10 mr-10'
					style={{
						backgroundColor: 'rgba(0, 0, 0, 0.5)',
						marginLeft: '100',
						marginRight: '100',
						borderColor: borderColor,
						borderWidth: '1px',
					}}>
					<br></br>
					<h6 className='text-3xl font-bold text-center  text-white  mt-5 mb-5'>
						Experience
					</h6>
					<br></br>
					{errorMessage ? (
						<div className='text-center text-white'>{errorMessage}</div>
					) : (
						<>
							<div className='flex flex-col items-center w-8/12 self-center'>
								<DataTable
									header={'Top 5 Used Languages'}
									contentArray={languages}
								/>
								<div className='mr-20 '></div>
								<br></br>
								<br></br>
								<DataTable header={'Used Tecnologies'} contentArray={tecnologies} />
							</div>
						</>
					)}
					<br></br>
				</div>
			</div>
		</section>
	)
}
