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

export default function CandidateDetail() {
	const { isAuthenticated } = useAuthContext()
	const [candidate, setCandidate] = useState({})
	const [experience, setExperience] = useState([])
	const [analysis, setAnalysis] = useState(null)
	const [apikey, setApiKey] = useState('')
	const [errors, setErrors] = useState({})

	const languages =
		analysis && analysis.globalTopLanguages
			? analysis.globalTopLanguages.map((item) => item.language)
			: []
	const tecnologies =
		analysis && analysis.globalTechnologies
			? analysis.globalTechnologies.map((item) => item)
			: []

	const updateAnalysis = async () => {
		try {
			const body = apikey ? { apikey: apikey } : {}
			const token = localStorage.getItem('access_token')
			const response = await axios.patch(
				`${import.meta.env.VITE_BACKEND_URL}/analysis/${candidate._id}`,
				body,
				{
					headers: {
						Authorization: token,
					},
				}
			)
			console.log('response222', response)
			console.log('response11111111111', response.data)

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
			if (!response.ok) {
				setErrors(response.data)
				return
			}
			setAnalysis(response.data.data)
			navigate('/candidate/detail')
			Swal.fire({
				icon: 'success',
				title: 'Candidate updated successfully',
				showConfirmButton: false,
				background: 'var(--talent-secondary)',
				color: 'white',
				timer: 1500,
			})
		} catch (error) {
			console.error('Error updating analysis:', error)
			console.error('Error updating analysis:', error.response.data.errors[0].detail)
		}
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
			<div className='input-analysis-container' style={{ marginLeft: "20%" }}>
				{Input({
					name: 'Apikey (OPTIONAL)',
					value: apikey,
					editable: true,
					placeholder: 'Enter your apikey of your Username of GitHub',
					onChange: (e) => onInputChange(e),
					formName: 'apikey',
				})}
			</div>
			{errors && errors.errors && errors.errors[0] && errors.errors[0].detail && (
					<p className='text-red-500' style={{marginLeft:"22%"}}>{errors.errors[0].detail}</p>
				)}

			<div className='mt-8 self-center'>
				{SecondaryButton(
					'Update Developer',
					``, updateAnalysis)}
			</div>
			<br></br>
			<h3 className='profile-title'>Developer info</h3>
			<hr className='w-5/12 self-center'></hr>
			<br></br>
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
		</div>
	)
}
