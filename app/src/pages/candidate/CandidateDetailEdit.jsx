import React, { useContext, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Input from '../../components/Input'
import profile from '../../images/profile.jpg'
import mainBackground from '../../images/main-background.jpg'
import MainButton from '../../components/mainButton'
import SecondaryButton from '../../components/secondaryButton'
import axios from 'axios'
import { useAuthContext } from '../../context/authContext'
import Swal from "sweetalert2";
import FormTextInput from "../../components/FormTextInput";




export default function CandidateDetailEdit() {
	const { isAuthenticated } = useAuthContext()

	const [userData, setUserData] = useState({
		username: '',
		email: '',
		phone: '',
		fullName: '',
		githubUser: '',
	})
	const [profilePicture, setProfilePicture] = useState(profile)

	let navigate = useNavigate()

	//3)desplegamos los errores del formulario
	const [errors, setErrors] = useState({})

	// 4) creamos las instancias de los atributos de la entidad SIN RELACION MtM
	const { username, email, phone, fullName, githubUser } = userData

	//5)creamos la funcion que se encargara de actualizar el estado de la entidad
	function handleChange(e) {
		const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
		setUserData({
			...userData,
			[e.target.name]: value,
		})
		//limpiamos los errores
		setErrors({})
	}

	useEffect(() => {
		const fetchUserData = async () => {
			try {
				if (isAuthenticated) {
					const currentUserId = localStorage.getItem('userId')
					const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user`)
					const user = response.data.data.find((user) => user._id === currentUserId)
					setUserData(user)
				}
				setProfilePicture(user.profilePicture)
			} catch (error) {
				console.error('Error fetching user data:', error)
			}
		}
		fetchUserData()
	}, [isAuthenticated])

	const handleProfilePictureChange = (e) => {
		const file = e.target.files[0]
		if (file) {
			const reader = new FileReader()
			reader.onloadend = () => {
				setProfilePicture(reader.result)
			}
			reader.readAsDataURL(file)
		}
	}

	//8)creamos la funcion que se encarga de llamar al metodo de la API REST de editar
	async function editUser(e) {
		e.preventDefault()
		const currentUserId = localStorage.getItem('userId')
		const token = localStorage.getItem('access_token')
		const validationErrors = validateForm();

		if (Object.keys(validationErrors).length > 0) {
			setErrors(validationErrors);
			return;
		}

		try {
			const response = await axios.patch(
				`${import.meta.env.VITE_BACKEND_URL}/user/candidate/${currentUserId}`,
				userData,
				{
					headers: {
						'Content-type': 'application/json',
						'Authorization': token,
					},
				}
			)
			//9)validamos los los campos de los errores
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
				title: 'User updated successfully',
				showConfirmButton: false,
				timer: 1500,
			})
		} catch (error) {
			if(error.response.status === 400) {
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

	function getRequiredFieldMessage(fieldName) {
		return `The ${fieldName} field is required`;
	  }
	
	function validateForm() {
		let errors = {};
		if (!userData.username) {
			errors.username = getRequiredFieldMessage('user name');
		} else if (userData.username.length <= 3) {
			errors.username = "The username field must be more than 3 characters";
		}
		if (!userData.email) {
			errors.email = getRequiredFieldMessage('email');
		} else if (
			!/^\w+([.-]?\w+)*@(gmail|hotmail|outlook)\.com$/.test(userData.email)
		) {
			errors.email = "The email field must be from Gmail, Outlook or Hotmail";
		}
		if (!userData.githubUser) {
			errors.githubUser = getRequiredFieldMessage('github User');
		}
		if (!userData.fullName) {
			errors.fullName = getRequiredFieldMessage('fullName');
		}
		if (userData.phone && !/^(\+34|0034|34)?[ -]*(6|7|9)[ -]*([0-9][ -]*){8}$|^(\+1|001|1)?[ -]*408[ -]*([0-9][ -]*){7}$/.test(userData.phone)) {
			//para añadir mas numeros de otros paises se pone 34|0034|34| y detras los numeros de telefono 34|0034|34|+1|001|1 para EEUU
			errors.phone =
				"The phone field must be a valid Spanish phone number or a valid American phone number";
		}
		return errors;
	}


	return (
		<div
			className='flex flex-col'
			style={{
				backgroundImage: `url(${mainBackground})`,
				backgroundSize: 'cover',
			}}>
			<div className='flex flex-row justify-center'>
				<div
					className='flex flex-col items-center mt-10'
					style={{ width: '41.6667%', padding: '4rem' }}>
					<img
						src={profilePicture}
						className='rounded-full border border-gray-300 mb-4'
						style={{ width: '25vw', height: '50vh' }}
					/>
					<label htmlFor='profilePicture' className='btn text-slate-50'>
						Cambiar foto de perfil
					</label>
					<input
						type='file'
						id='profilePicture'
						name='profilePicture'
						accept='image/*'
						onChange={handleProfilePictureChange}
						style={{ display: 'none' }} // Esto oculta el input de archivo predeterminado
					/>{' '}
				</div>
				<form onSubmit={(e) => editUser(e)}>
					<div
						className='flex flex-col'
						style={{ width: '50%', padding: '5rem', marginRight: '8rem' }}>
						<div className='flex flex-col mt-10 w-10/12'>
							<div className='mb-4'>
								<FormTextInput
									labelFor="Username"
									labelText="User name"
									placeholder="Enter your User name"
									name="username"
									value={username}
									onChange={(e) => handleChange(e)}
									errors={errors}
									isMandatory
								/>
							</div>
							<div className='mb-4'>
								<FormTextInput
									labelFor="Email"
									labelText="Email"
									placeholder="Enter your email"
									name="email"
									value={email}
									onChange={(e) => handleChange(e)}
									errors={errors}
									isMandatory
								/>
							</div>
							<div className='mb-4'>
								<FormTextInput
									labelFor="Phone"
									labelText="Phone"
									placeholder="Enter your phone"
									name="phone"
									value={phone}
									onChange={(e) => handleChange(e)}
									errors={errors}
								/>
							</div>
							<div className='mb-4'>
								<FormTextInput
									labelFor="FullName"
									labelText="FullName"
									placeholder="Enter your fullName"
									name="fullName"
									value={fullName}
									onChange={(e) => handleChange(e)}
									errors={errors}
									isMandatory
								/>
							</div>
							<div className='mb-4'>
								<FormTextInput
									labelFor="GithubUser"
									labelText="Github User"
									placeholder="Enter your github User"
									name="githubUser"
									value={githubUser}
									onChange={(e) => handleChange(e)}
									errors={errors}
									isMandatory
								/>
							</div>
						</div>
					</div>
					{errors && errors.errors && errors.errors[0] && errors.errors[0].detail && (
						<p className="text-red-500">{errors.errors[0].detail}</p>
					)}
					<div className='flex space-x-4'>
						{MainButton('Update', '/candidate/detail', () => console.log('Update button clicked'))}
						{SecondaryButton('Cancel', '/candidate/detail', '')}
					</div>
				</form>
			</div>
			<br></br>
		</div>
	)
}
