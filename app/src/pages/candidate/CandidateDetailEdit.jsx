import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import profile from '../../images/profile.jpg'
import mainBackground from '../../images/main-background.jpg'
import MainButton from '../../components/mainButton'
import SecondaryButton from '../../components/secondaryButton'
import axios from 'axios'
import { useAuthContext } from '../../context/authContext'
import Swal from 'sweetalert2'
import { useParams } from 'react-router-dom'

export default function CandidateDetailEdit() {
	const { isAuthenticated } = useAuthContext()
	const { id } = useParams()
	const [userData, setUserData] = useState({
		phone: '',
		fullName: '',
		profilePicture: profile,
	})

	let navigate = useNavigate()
	const [errors, setErrors] = useState({})

	const { phone, fullName, profilePicture } = userData

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
					const token = localStorage.getItem('access_token')
					const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user`)
					const user = response.data.data.find((user) => user._id === id)
					setUserData(user)
				}
			} catch (error) {
				console.error('Error fetching user data:', error)
			}
		}
		fetchUserData()
	}, [isAuthenticated, id])

	const handleProfilePictureChange = (e) => {
		const url = e.target.value;
		setUserData(prevUserData => ({ ...prevUserData, profilePicture: url }));
	};

	async function editUser(e) {
		e.preventDefault()
		const token = localStorage.getItem('access_token')
		const validationErrors = validateForm()

		if (Object.keys(validationErrors).length > 0) {
			setErrors(validationErrors)
			return
		}

		if (!isValidURL(userData.profilePicture) || !isValidImageURL(userData.profilePicture)) {
			Swal.fire({
				icon: 'error',
				title: 'Invalid URL',
				text: 'The provided URL is not valid. Please ensure it starts with http:// or https:// and is a valid image URL.',
				showConfirmButton: false,
				background: 'var(--talent-secondary)',
				color: 'white',
				timer: 2000,
			});
			return;
		}

		try {
			const response = await axios.patch(
				`${import.meta.env.VITE_BACKEND_URL}/user/candidate/${id}`,
				userData,
				{
					headers: {
						'Content-type': 'application/json',
						Authorization: token,
					},
				}
			)
			const profilePictureResponse = await axios.patch(
				`${import.meta.env.VITE_BACKEND_URL}/user/candidate/${id}/profile-picture`,
				{ profilePicture },
				{
					headers: {
						'Content-type': 'application/json',
						Authorization: token,
					},
				}
			)
			setUserData({ ...userData, profilePicture: profilePictureResponse.data })

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
					background: 'var(--talent-secondary)',
					color: 'white',
					confirmButtonColor: 'var(--talent-highlight)',
				})
				navigate('/login')
			} else if (
				(error.response.data.errors[0].detail =
					'You cant update your profile until next month')
			) {
				Swal.fire({
					icon: 'error',
					title: 'You can not update your profile until next month',
					timer: 1500,
					showConfirmButton: false,
					background: 'var(--talent-secondary)',
					color: 'white',
					confirmButtonColor: 'var(--talent-highlight)',
				})
			}
		}
	}


	function getRequiredFieldMessage(fieldName) {
		return `The ${fieldName} field is required`
	}

	function validateForm() {
		let errors = {}
		if (!userData.fullName) {
			errors.fullName = getRequiredFieldMessage('fullName')
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

	const ProfilePicture = ({ profilePicture, handleProfilePictureChange }) => {
		const [localProfilePicture, setLocalProfilePicture] = useState(profilePicture);
	  
		const handleBlur = () => {
			handleProfilePictureChange({ target: { value: localProfilePicture } });
		  };
	  
		const handleChange = (e) => {
		  setLocalProfilePicture(e.target.value);
		};
	  
		return (
		  <div className='flex flex-col items-center space-y-4'>
			<img
			  src={localProfilePicture}
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
			<input
			  type='text'
			  id='profilePicture'
			  name='profilePicture'
			  placeholder='Enter image URL'
			  onChange={handleChange}
			  onBlur={handleBlur}
			  value={localProfilePicture}
			/>
			<button onClick={handleClearProfilePicture} style={{ color: 'white' }}>
			  Clear
			</button>
		  </div>
		);
	  };
	const handleClearProfilePicture = () => {
		setUserData({ ...userData, profilePicture: '' })
	}

	function isValidURL(string) {
		try {
			new URL(string);
			return true;
		} catch (_) {
			return false;  
		}
	}
	
	function isValidImageURL(url) {
		return url.match(/\.(jpeg|jpg|gif|png)$/) != null
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
						Update candidate details
					</h2>
					<form
						className='w-full flex flex-col'
						style={{ marginBottom: '5%' }}
						onSubmit={(e) => editUser(e)}>
						<div>
							<ProfilePicture
								profilePicture={profilePicture}
								handleProfilePictureChange={handleProfilePictureChange}
							/>
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
								htmlFor='FullName'
								className='block text-lg font-bold text-white'>
								FullName <span style={{ color: 'var(--talent-highlight)' }}>*</span>
							</label>
							<div className='flex-grow'>
								<input
									type='text'
									className=' leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
									style={{
										width: '100%',
										padding: '0.5rem 1.5rem',
									}}
									placeholder='Write your fullName'
									name='fullName'
									value={fullName}
									onChange={(e) => handleChange(e)}
									isMandatory
								/>
								{errors.fullName && (
									<p className='text-red-500 text-xs italic'>{errors.fullName}</p>
								)}
							</div>
						</div>
					</form>
				</div>
				{errors && errors.errors && errors.errors[0] && errors.errors[0].detail && (
					<p className='text-red-500'>{errors.errors[0].detail}</p>
				)}
				<div className='flex align-center justify-center'>
					{MainButton('Update', '/candidate/detail', editUser)}
					{SecondaryButton('Change Password', `/candidate/${id}/password`, '')}
					{SecondaryButton('Cancel', '/candidate/detail', '')}
				</div>
			</div>
		</div>
	)
}
