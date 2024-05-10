import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import mainBackground from '../../images/main-background.jpg'
import MainButton from '../../components/mainButton'
import SecondaryButton from '../../components/secondaryButton'
import axios from 'axios'
import { useAuthContext } from '../../context/authContext'
import Swal from 'sweetalert2'
import profile from '../../images/profile.jpg'

export default function RepresentativeDetailEdit() {
	const { isAuthenticated } = useAuthContext()

	const [userData, setUserData] = useState({
		companyName: '',
		phone: '',
		projectSocietyName: '',
		profilePicture: null,
		profilePictureURL: '',
	})
	let navigate = useNavigate()
	const { id } = useParams()
	const [errors, setErrors] = useState({})
	const { companyName, phone, projectSocietyName, profilePicture } = userData

	function handleChange(e) {
		const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
		setUserData({
			...userData,
			[e.target.name]: value,
		})
		setErrors({})
	}

	useEffect(() => {
		const fetchUserData = async () => {
			try {
				if (isAuthenticated) {
					const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user`)
					const user = response.data.data.find((user) => user._id === id)
					user.profilePictureURL = `/profileImages/${user._id}.png`

					setUserData(user)
				}
			} catch (error) {
				console.error('Error fetching user data:', error)
			}
		}
		fetchUserData()
	}, [isAuthenticated])

	async function editUser(e) {
		e.preventDefault()
		const token = localStorage.getItem('access_token')
		const validationErrors = validateForm()

		if (Object.keys(validationErrors).length > 0) {
			setErrors(validationErrors)
			return
		}

		if (userData.profilePicture && userData.profilePicture.name) {
			let extension = userData.profilePicture.name.split('.')[1].trim()

			if (['jpg', 'png', 'jpeg'].includes(extension) === false) {
				Swal.fire({
					icon: 'error',
					title: 'Invalid URL',
					text: 'The provided file is not a supported image type. Please ensure it has the jpeg, png, or jpg extension.',
					showConfirmButton: false,
					background: 'var(--talent-secondary)',
					color: 'white',
					timer: 2000,
				})
				return
			}
		}

		try {
			const user = { ...userData, profilePicture: null, profilePictureURL: '' }
			const response = await axios.patch(
				`${import.meta.env.VITE_BACKEND_URL}/user/representative/${id}`,
				userData,
				{
					headers: {
						'Content-type': 'application/json',
						Authorization: token,
					},
				}
			)

			if (userData.profilePicture && userData.profilePicture.name) {
				const fd = new FormData()
				fd.append('profilePicture', userData.profilePicture)

				const profilePictureResponse = await axios.post(
					`${import.meta.env.VITE_BACKEND_URL}/user/candidate/${id}/profile-picture`,
					fd,
					{
						headers: {
							Authorization: token,
						},
					}
				)
				// setProfilePicture(profilePictureResponse.data)
			}

			if (response.status === 404) {
				setErrors(response.data)
				return
			}
			if (response.status === 400) {
				setErrors(response.data)
				return
			}
			if (response.status === 401) {
				setErrors(response.data)
				return
			}
			navigate('/representative/detail')
			Swal.fire({
				icon: 'success',
				title: 'Representative updated successfully',
				showConfirmButton: false,
				background: 'var(--talent-secondary)',
				color: 'white',
				timer: 1500,
			})
		} catch (error) {
			if (
				error.response.status === 401 ||
				error.response.data.errors[0].detail ===
					'Error when getting the analysis by ID: jwt expired'
			) {
				Swal.fire({
					icon: 'error',
					title: 'Token expired',
					text: 'Please login again to continue',
					timer: 1500,
					showConfirmButton: false,
				})
				navigate('/login')
			}
		}
	}

	const ProfilePicture = ({}) => {
		const handleChangePicture = (e) => {
			if (e.target.files && e.target.files[0]) {
				if (e.target.files[0].type.startsWith('image')) {
					setUserData({
						...userData,
						profilePicture: e.target.files[0],
						profilePictureURL: URL.createObjectURL(e.target.files[0]),
					})
				} else {
					console.error('Unsupported file type.')
				}
			}
		}

		return (
			<div className='flex flex-col items-center space-y-4'>
				<img
					src={userData.profilePictureURL}
					alt={userData.name}
					className='rounded-full border border-gray-300 profile-img'
					style={{
						objectFit: 'cover',
						objectPosition: 'center',
						width: '230px',
						height: '230px',
						marginLeft: '90px',
					}}
				/>
				<label htmlFor='profilePicture' className='btn text-white'>
					Change profile photo
				</label>
				<div>
					<input
						className='self-center'
						type='file'
						name='profilePicture'
						accept='.png,.jpg,.jpeg'
						onChange={handleChangePicture}></input>
					<button onClick={handleClearProfilePicture} style={{ color: 'white' }}>
						Clear
					</button>
				</div>
			</div>
		)
	}

	const handleClearProfilePicture = () => {
		setUserData({ ...userData, profilePicture: null, profilePictureURL: '' })
	}

	function getRequiredFieldMessage(fieldName) {
		return `The ${fieldName} field is required`
	}

	function validateForm() {
		let errors = {}

		if (!userData.companyName) {
			errors.companyName = getRequiredFieldMessage('company name')
		} else if (userData.companyName.length < 2 || userData.companyName.length > 35) {
			errors.companyName =
				'The company name field must have be between 2 and 35 characters long'
		}
		if (
			userData.projectSocietyName &&
			(userData.projectSocietyName.length < 2 || userData.projectSocietyName.length > 35)
		) {
			errors.projectSocietyName =
				'The Project Society Name must be between 2 and 35 characters long'
		}
		if (
			userData.phone &&
			!/^(\+34|0034|34)?[ -]*(6|7|9)[ -]*([0-9][ -]*){8}$|^(\+1|001|1)?[ -]*408[ -]*([0-9][ -]*){7}$/.test(
				userData.phone
			)
		) {
			errors.phone =
				'The phone field must be a valid Spanish phone number like +34|0034|34| 666666666 or 666 666 666 or  and +1|001|1 408 666 6666 for USA'
		}
		return errors
	}

	return (
		<div
			className='flex flex-col justify-center'
			style={{
				height: '100vh',
				backgroundAttachment: 'fixed',
				backgroundImage: `url(${mainBackground})`,
				backgroundSize: 'cover',
			}}>
			<div
				className='h-full w-10/12 rounded shadow-md flex flex-col justify-between self-center p-4 mt-4 mb-4'
				style={{
					backgroundColor: 'rgba(0, 0, 0, 0.5)',
					borderColor: 'var(--talent-secondary)',
					borderWidth: '1px',
					width: '83.3333%',
					overflowY: 'scroll',
				}}>
				<div>
					<h2
						className='font-bold text-center text-white'
						style={{
							fontSize: '2rem',
							marginTop: '2rem',
							marginBottom: '4rem',
						}}>
						Edit Representative Details
					</h2>
					<form
						className='w-full flex flex-col'
						style={{ marginBottom: '5%' }}
						onSubmit={(e) => editUser(e)}>
						<div>
							<ProfilePicture />
						</div>
						<div className='w-10/12 flex flex-col mb-4 self-center'>
							<label
								htmlFor='CompanyName'
								className='block text-lg font-bold text-white'>
								Company or Project Name{' '}
								<span style={{ color: 'var(--talent-highlight)' }}>*</span>
							</label>
							<div className='flex-grow'>
								<input
									type='text'
									className=' leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
									style={{
										width: '100%',
										padding: '0.5rem 0.75rem',
									}}
									placeholder='Write your companyName'
									name='companyName'
									value={companyName}
									onChange={(e) => handleChange(e)}
									isMandatory
								/>
								{errors.companyName && (
									<p className='text-red-500 text-xs italic'>
										{errors.companyName}
									</p>
								)}
							</div>
						</div>
						<div className='w-10/12 flex flex-col mb-4 self-center'>
							<label htmlFor='Phone' className='block text-lg font-bold text-white'>
								Phone
							</label>
							<div className='flex-grow'>
								<input
									type='text'
									className=' leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
									style={{
										width: '100%',
										padding: '0.5rem 1.5rem',
									}}
									placeholder='Write your Phone'
									name='phone'
									value={phone}
									onChange={(e) => handleChange(e)}
								/>
								{errors.phone && (
									<p className='text-red-500 text-xs italic'>{errors.phone}</p>
								)}
							</div>
						</div>

						<div className='w-10/12 flex flex-col mb-4 self-center'>
							<label
								htmlFor='ProjectSocietyName'
								className='block text-lg font-bold text-white'>
								Company or Project Name
							</label>
							<div className='flex-grow'>
								<input
									type='text'
									className=' leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
									style={{
										width: '100%',
										padding: '0.5rem 1.5rem',
									}}
									placeholder='Write your Project Society Name'
									name='projectSocietyName'
									value={projectSocietyName}
									onChange={(e) => handleChange(e)}
								/>
								{errors.projectSocietyName && (
									<p className='text-red-500 text-xs italic'>
										{errors.projectSocietyName}
									</p>
								)}
							</div>
						</div>
					</form>
					{errors && errors.errors && errors.errors[0] && errors.errors[0].detail && (
						<p className='text-red-500'>{errors.errors[0].detail}</p>
					)}
					<div className='flex align-center justify-center'>
						{MainButton('Update', '/representative/detail', editUser)}
						{SecondaryButton('Change Password', `/representative/${id}/password`, '')}
						{SecondaryButton('Cancel', '/representative/detail', '')}
					</div>
				</div>
			</div>
		</div>
	)
}
