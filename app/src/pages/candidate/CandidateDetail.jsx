import React, { useState } from 'react'
import Input from '../../components/Input'
import profile from '../../images/profile.jpg'
import mainBackground from '../../images/main-background2.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'
import DataTable from '../../components/DataTable.jsx'
import axios from 'axios'
import { useAuthContext } from '../../context/authContext'
import SecondaryButton from '../../components/secondaryButton'
import WorkExperienceList from '../../components/WorkExperienceList'
import TopRepositoriesTable from '../../components/TopRepositoriesTable'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import Modal from 'react-modal'
import { Pie, Bar, Radar } from 'react-chartjs-2'

export default function CandidateDetail() {
	const { isAuthenticated } = useAuthContext()
	const [candidate, setCandidate] = useState({
		profilePictureURL: ''
	})
	const [subscription, setSubscription] = useState(null)
	const [experience, setExperience] = useState([])
	const [analysis, setAnalysis] = useState(null)
	const [apikey, setApiKey] = useState('')
	const [errors, setErrors] = useState({})
	const borderColor = 'var(--talent-secondary)'
	let navigate = useNavigate()
	const [showModal, setShowModal] = useState(false)

	const languages =
		analysis && analysis.globalTopLanguages
			? analysis.globalTopLanguages
				? analysis.globalTopLanguages
				: []
			: []

	const tecnologies =
		analysis && analysis.globalTechnologies
			? analysis.globalTechnologies.map((item) => ({
					name: item,
					appearences: analysis.topRepositories.filter((repo) =>
						repo.technologies.includes(item)
					).length,
				}))
			: []
	async function getSubscription(userId) {
		try {
			if (isAuthenticated) {
				const token = localStorage.getItem('access_token')
				if (userId && token) {
					const response = await axios.get(
						`${import.meta.env.VITE_BACKEND_URL}/subscriptions/${userId}`,
						{
							params: {
								userId: userId,
							},
							headers: {
								'Content-type': 'application/json',
								Authorization: `${token}`,
							},
						}
					)
					console.log('Subscription data:', response)
					setSubscription(response.data.data.remainingUpdates)
					const remainingUpdates = response.data.data.remainingUpdates
					return remainingUpdates
				}
			}
		} catch (error) {
			console.error('Error fetching notification data:', error.response.data.message)
		}
	}

	const updateAnalysis = async () => {
		try {
			const body = apikey ? { apikey: apikey } : {}
			const token = localStorage.getItem('access_token')
			const url = `${import.meta.env.VITE_BACKEND_URL}/analysis/${candidate._id}`
			const response = await axios.patch(
				url,
				{ body },
				{
					headers: {
						'Content-type': 'application/json',
						Authorization: token,
					},
				}
			)
			setAnalysis(response.data.data)
			if (response.status === 404) {
				setErrors(response.data)
				return
			}
			if (response.status === 400) {
				setErrors(response.data)
				return
			}
			if (response.status === 401 || response.status === 403) {
				setErrors(response.data)
				return
			}
			navigate('/candidate/detail')

			Swal.fire({
				icon: 'success',
				title: `Candidate updated successfully, you have ${await getSubscription(candidate._id)} update left.`,
				showConfirmButton: false,
				background: 'var(--talent-secondary)',
				color: 'white',
				timer: 1500,
			})
		} catch (error) {
			if (!candidate.subscriptionId || (await getSubscription(candidate._id)) <= 0) {
				Swal.fire({
					icon: 'warning',
					title: `You have reached your update limit of this month`,
					showConfirmButton: true,
					background: 'var(--talent-secondary)',
					color: 'white',
					timer: 2000,
					confirmButtonColor: 'var(--talent-highlight)',
				})
			}
		} finally {
			setShowModal(false)
		}
	}
	const handleConfirm = () => {
		setShowModal(false)
		updateAnalysis()
	}

	function handleCancel() {
		setShowModal(false)
	}

	function onInputChange(e) {
		const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
		setApiKey({
			...apikey,
			[e.target.name]: value,
		})
		setErrors({})
	}

	React.useEffect(() => {
		const fetchUserData = async () => {
			try {
				if (isAuthenticated) {
					const currentUserId = localStorage.getItem('userId')
					const experiences = []
					const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user`)
					const user = response.data.data.find((user) => user._id === currentUserId)
					const token = localStorage.getItem('access_token')
					for (const experienceId of user.profesionalExperiences) {
						const response = await axios.get(
							`${import.meta.env.VITE_BACKEND_URL}/professional-experience/${experienceId}`
						)
						experiences.push(response.data.data)
					}
					user.profilePictureURL = `/profileImages/${user._id}.png`;
					setCandidate(user)
					setExperience(experiences)
				}
			} catch (error) {
				console.error('Error fetching user data:', error)
			}
		}
		fetchUserData()
	}, [isAuthenticated])

	React.useEffect(() => {
		const fetchDataFromEndpoint = async () => {
			try {
				if (candidate && candidate.analysisId) {
					const analysisId = candidate.analysisId
					const token = localStorage.getItem('access_token')
					const response = await axios.get(
						`${import.meta.env.VITE_BACKEND_URL}/analysis/${analysisId}`,
						{
							headers: {
								Authorization: `${token}`,
							},
						}
					)
					setAnalysis(response.data.data)
					return response.data.data
				}
			} catch (error) {
				console.error('Error fetching user data:', error)
			}
		}
		fetchDataFromEndpoint()
	}, [isAuthenticated, candidate])
	const userId = localStorage.getItem('userId')
	React.useEffect(() => {
		if (userId) {
			getSubscription(userId)
		}
	}, [userId])

	React.useEffect(() => {
		console.log('Subscription state:', subscription)
		if (subscription) {
			console.log('Remaining updates:', subscription)
		}
	}, [subscription])

	let mobile = false
	if (window.screen.width < 500) {
		mobile = true
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
		<div
			className='flex flex-col bg-fixed'
			style={{
				backgroundImage: `url(${mainBackground})`,
				backgroundSize: 'cover',
			}}>
			<div
				className='flex flex-row justify-center items-center profile-header w-10/12 mt-20'
				style={{ marginLeft: '8%' }}>
				<div className='flex flex-col items-center'>
					<img
						src={
							candidate && candidate.profilePictureURL
								? candidate.profilePictureURL
								: profile
						}
						className='rounded-full border border-gray-300 profile-img'
						style={{
							objectFit: 'cover',
							objectPosition: 'center',
							width: '300px',
							height: '300px',
						}}
					/>
				</div>
				<div className='flex flex-col mt-10 w-fit'>
					<div className='profile-name-text text-center'>
						<h2>{candidate && candidate.fullName ? candidate.fullName : ' - '}</h2>
					</div>
					<div className='flex flex-col w-full profile-info-text'>
						{Input({
							name: 'Username',
							value: candidate ? candidate.username : ' - ',
							editable: false,
						})}
						<br></br>
						{Input({
							name: 'Email',
							value: candidate ? candidate.email : ' - ',
							editable: false,
						})}
						<br></br>
						{Input({
							name: 'Phone',
							value: candidate ? candidate.phone : ' - ',
							editable: false,
						})}
						<br></br>
						{Input({
							name: 'Github username',
							value: candidate ? candidate.githubUser : ' - ',
							editable: false,
						})}
						<div className='text-white mt-8'>
							<FontAwesomeIcon
								icon={faMapMarkerAlt}
								style={{ color: 'var(--talent-highlight)' }}
							/>
							{candidate.residence}{' '}
							{candidate && candidate.address
								? candidate.address
								: ' Seville, Spain '}
						</div>
						<div className='mt-8 self-center'>
							{SecondaryButton(
								'Update Profile',
								`/candidate/detail/edit/${candidate._id}`,
								''
							)}
						</div>
					</div>
				</div>
			</div>
			<br></br>
			<br></br>
			<h3 className='profile-title'>Update your Developer info</h3>
			<hr className='w-5/12 self-center'></hr>

			<br></br>
			<h2 className='text-white text-center'>
				{console.log(subscription)}
				{subscription !== null && subscription !== undefined && `You have `}
				{subscription !== null && subscription !== undefined && (
					<span style={{ color: 'var(--talent-highlight)' }}>{subscription}</span>
				)}
				{subscription !== null &&
					subscription !== undefined &&
					` remaining ${subscription === 1 ? 'update' : 'updates'} this month`}
			</h2>

			<div
				className='input-analysis-container'
				style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
				<div
					className='flex'
					style={{
						marginBottom: '1rem',
						width: '100%',
						maxWidth: '600px',
					}}>
					<input
						type='password'
						className='leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
						style={{
							width: '100%',
							padding: '0.5rem 0.75rem',
						}}
						placeholder='Enter your Apikey of your Username of GitHub'
						name='apikey'
						value={apikey.apikey}
						onChange={(e) => onInputChange(e)}
					/>
					{errors.apikey && (
						<p className='text-red-500 text-xs italic'>{errors.apikey}</p>
					)}
				</div>
				{errors && errors.errors && errors.errors[0] && errors.errors[0].detail && (
					<p className='text-red-500'>{errors.errors[0].detail}</p>
				)}
				<h2 className='text-white text-center'>
					(Please make sure you write your real GitHub APIkey)
				</h2>
				<div className='mt-8'>
					{SecondaryButton('Update Developer', '', () => setShowModal(true))}
				</div>
			</div>
			<br></br>
			<h3 className='profile-title'>Developer info</h3>
			<hr className='w-5/12 self-center'></hr>
			<br></br>
			<div
				className='input-analysis-container'
				style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
				{analysis && analysis.contributions && (
					<div className='flex flex-col space-y-4'>
						<div className='flex flex-row space-x-4'>
							<div className='analysis-data-container w-full'>
								<p className='analysis-subtitle'>Followers</p>
								<p className='analysis-text-big text-white'>{analysis.followers}</p>
							</div>
							<div className='analysis-data-container w-full'>
								<p className='analysis-subtitle'>Issues Closed</p>
								<p className='analysis-text-big text-white'>
									{analysis.globalIssuesClosed}
								</p>
							</div>
							<div className='analysis-data-container w-full'>
								<p className='analysis-subtitle'>Total Commits</p>
								<p className='analysis-text-big text-white'>
									{analysis.contributions.totalCommits}
								</p>
							</div>
							<div className='analysis-data-container w-full'>
								<p className='analysis-subtitle'>Total Pull Requests</p>
								<p className='analysis-text-big text-white'>
									{analysis.contributions.totalPullRequests}
								</p>
							</div>
						</div>
					</div>
				)}
			</div>

			<br></br>
			<div className='flex flex-col w-10/12 self-center'>
				<>
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
												languages.sort(
													(a, b) => b.percentage - a.percentage
												)[0].language
											}
										</p>
									</div>
									{languages.length > 1 && (
										<div className='flex flex-col'>
											<p className='analysis-subtitle'>#2</p>
											<p className='analysis-text text-white'>
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
											<p className='analysis-text text-white'>
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
														color: 'white',
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
								<div
									className='w-2/12'
									style={{ width: mobile ? '100%' : '30.00%' }}>
									<DataTable
										header={'Used Tecnologies'}
										contentArray={
											tecnologies
												? tecnologies
														.sort(
															(a, b) => b.appearences - a.appearences
														)
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
													data: tecnologies.map(
														(item) => item.appearences
													),
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
														color: 'white',
													},
												},
											},
											scales: {
												x: {
													ticks: {
														color: 'white',
													},
												},
												y: {
													ticks: {
														color: 'white',
													},
												},
											},
										}}></Bar>
								</div>
							</div>
						</div>
					)}

					{analysis && (
						<div
							className='w-full p-1 rounded shadow-md flex flex-col mt-10 mb-10'
							style={{
								backgroundColor: 'rgba(0, 0, 0, 0.5)',
								marginLeft: '100',
								marginRight: '100',
								borderColor: borderColor,
								borderWidth: '1px',
							}}>
							<>
								<br></br>
								<h6 className='text-2xl font-bold text-center text-white mt-6'>
									Top Repositories
								</h6>
								<br></br>
								<div
									className='mt-2 w-11/12 self-center'
									style={{ backdropFilter: 'blur(8px)', maxHeight: '200px' }}>
									<table className='w-full datatable-header-container text-white '>
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
												{analysis && analysis.topRepositories
													? analysis.topRepositories
															.sort((a, b) => b.stars - a.stars)
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
										<p className='analysis-text-big text-white'>
											{analysis && analysis.contributions
												? analysis.contributions
														.totalRepositoriesContributedWithCommits
												: 0}
										</p>
									</div>
									<div className='analysis-data-container'>
										<p className='analysis-subtitle'>
											Repositories Contributes with Pull Requests
										</p>
										<p className='analysis-text-big text-white'>
											{analysis && analysis.contributions
												? analysis.contributions
														.totalRepositoriesContributedWithPullRequests
												: 0}
										</p>
									</div>
								</div>
								<br></br>
							</>
						</div>
					)}
				</>
				<br></br>
			</div>
			<h3 className='profile-title'>Work experience</h3>
			<hr className='w-5/12 self-center'></hr>
			<div className='w-9/12 self-center' style={{ marginBottom: '3rem', marginTop: '2rem' }}>
				<div className='flex justify-between items-center'>
					<WorkExperienceList experience={experience} />
				</div>
			</div>
			<br></br>
			<br></br>
			<Modal
				isOpen={showModal}
				onRequestClose={handleCancel}
				contentLabel='Update Confirmation'
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
					Are you sure you want to update your Developer info?
				</h2>
				<div>
					<button
						onClick={handleConfirm}
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
		</div>
	)
}
