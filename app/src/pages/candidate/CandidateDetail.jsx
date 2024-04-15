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

export default function CandidateDetail() {
	const { isAuthenticated } = useAuthContext()
	const [candidate, setCandidate] = useState({})
	const [experience, setExperience] = useState([])
	const [analysis, setAnalysis] = useState(null)
	const [apikey, setApiKey] = useState('')
	const [errors, setErrors] = useState({})
	let navigate = useNavigate()
	const [showModal, setShowModal] = useState(false)

	const languages =
		analysis && analysis.globalTopLanguages
			? analysis.globalTopLanguages.map((item) => item.language)
			: []
	const tecnologies =
		analysis && analysis.globalTechnologies
			? analysis.globalTechnologies.map((item) => item)
			: []
	async function getSubscription(userId) {
		try {
			if (isAuthenticated) {
				const token = localStorage.getItem('access_token')
				if (userId && token) {
					const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/subscriptions/${userId}`,
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
					const subscription = response.data.data;
					const remainingUpdates = subscription.remainingUpdates;
					return remainingUpdates;
				}
			}
		} catch (error) {
			console.log('Error fetching notification data:', error.response.data.message)
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
			if (!candidate.subscriptionId || await getSubscription(candidate._id) <= 0) {
				Swal.fire({
					icon: 'warning',
					title: `You have reached your update limit for the ${candidate.subscriptionId.subtype} plan.`,
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
							candidate && candidate.profilePicture
								? candidate.profilePicture
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
			<br></br>
			<hr className='w-5/12 self-center'></hr>
			<br></br>
			<br></br>
			<div className='input-analysis-container' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
				<div
					className="flex"
					style={{
						marginBottom: "1rem",
						width: '100%',
						maxWidth: '600px',
					}}
				>
					<input
						type="password"
						className="leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
						style={{
							width: "100%",
							padding: "0.5rem 0.75rem",
						}}
						placeholder="Enter your Apikey of your Username of GitHub"
						name="apikey"
						value={apikey.apikey}
						onChange={(e) => onInputChange(e)}
					/>
					{errors.apikey && (
						<p className="text-red-500 text-xs italic">
							{errors.apikey}
						</p>
					)}
				</div>
				{errors && errors.errors && errors.errors[0] && errors.errors[0].detail && (
					<p className='text-red-500'>{errors.errors[0].detail}</p>
				)}
				<div className='mt-8'>
					{SecondaryButton(
						'Update Developer',
						'', () => setShowModal(true))}
				</div>
			</div>
			<br></br>
			<h3 className='profile-title'>Developer info</h3>
			<hr className='w-5/12 self-center'></hr>
			<br></br>
			<br></br>
			<div className='flex flex-col w-8/12 self-center'>
				<>
					<div className='flex flex-col items-center w-8/12 self-center'>
						<DataTable header={'Top 5 Used Languages'} contentArray={languages} />
						<div className='mr-20 '></div>
						<br></br>
						<br></br>
						<DataTable header={'Used Tecnologies'} contentArray={tecnologies} />
						<br></br>
						<br></br>
						<TopRepositoriesTable analysis={analysis} />
					</div>
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
