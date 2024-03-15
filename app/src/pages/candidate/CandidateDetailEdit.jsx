import React, { useContext, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Input from '../../components/Input'
import profile from '../../images/profile.jpg'
import mainBackground from '../../images/main-background.jpg'
import MainButton from '../../components/mainButton'
import SecondaryButton from '../../components/secondaryButton'
import axios from 'axios'
import { useAuthContext } from '../../context/authContext'

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
		const token = localStorage.getItem('token')
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
				console.error('Error: User not found')
				return
			}
			if (response.status === 400) {
				console.error('Error: No data to update')
				return
			}
			if (response.status === 401) {
				console.error('Error: Unauthorized')
				return
			}
			navigate('/candidate/detail')
			console.log('Edit user: has editado el proyecto con exito')
		} catch (error) {
			console.error('Error updating user:', error)
		}
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
								<label htmlFor='Username' className='text-sm font-bold text-white'>
									Username
								</label>
								<input
									type='text'
									className='w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
									placeholder='Write a Username'
									name='username'
									value={username}
									onChange={(e) => handleChange(e)}
								/>
							</div>
							<div className='mb-4'>
								<label htmlFor='email' className='text-sm font-bold text-white'>
									Email
								</label>
								<input
									type='text'
									className='w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
									placeholder='Write an Email'
									name='email'
									value={email}
									onChange={(e) => handleChange(e)}
								/>
							</div>
              <div className='mb-4'>
								<label htmlFor='phone' className='text-sm font-bold text-white'>
									Phone
								</label>
								<input
									type='text'
									className='w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
									placeholder='Write a Phone'
									name='phone'
									value={phone}
									onChange={(e) => handleChange(e)}
								/>
							</div>
							<div className='mb-4'>
								<label
									htmlFor='fullName'
									className='text-sm font-bold text-white'>
									Full Name
								</label>
								<input
									type='text'
									className='w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
									placeholder='Write a Full Name'
									name='fullName'
									value={fullName}
									onChange={(e) => handleChange(e)}
								/>
							</div>
							<div className='mb-4'>
								<label
									htmlFor='githubUser'
									className='text-sm font-bold text-white'>
									Github User
								</label>
								<input
									type='text'
									className='w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
									placeholder='Write a Github User'
									name='githubUser'
									value={githubUser}
									onChange={(e) => handleChange(e)}
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
