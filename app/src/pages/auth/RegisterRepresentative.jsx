import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../context/authContext'
import mainBackgroundRegisterLogin from '../../images/main-background2.jpg'
import axios from 'axios'
import FormTextInput from '../../components/FormTextInput'
import MainButton from '../../components/mainButton'

export default function RegisterRepresentative() {
	const talentColor = 'var(--talent-highlight)'
	const { login } = useAuthContext()
	const [users, setUsers] = useState([])
	const [form, setForm] = useState({
		username: '',
		corporative_email: '',
		company_name: '',
		password: '',
		password2: '',
	})
	const [isCheckboxChecked, setIsCheckboxChecked] = useState(false)
	const [errors, setErrors] = useState({})
	const {
		username,
		corporative_email,
		company_name,
		phone_number,
		projectSocietyName,
		password,
		password2,
	} = form
	const [emailValid, setEmailValid] = useState(true)
	const [loading, setLoading] = useState(false)

	const enableValidation = import.meta.env.VITE_MAIL_VALIDATION_ENABLED === 'true' || false

	let navigate = useNavigate()

	function onInputChange(e) {
		const { name, value, checked } = e.target

		if (name === 'termsCheckbox') {
			setIsCheckboxChecked(checked)
		} else {
			setForm((prevForm) => ({ ...prevForm, [name]: value }))
		}

		setErrors((prevErrors) => ({ ...prevErrors, [name]: undefined }))
	}
	const handleCheckboxChange = (e) => {
		setIsCheckboxChecked(e.target.checked)
	}

	async function handleSubmit(e) {
		e.preventDefault()
		setEmailValid(true)

		if (!isCheckboxChecked) {
			setErrors({ termsCheckbox: 'You must accept the terms and conditions' })
			return
		}
		const validationErrors = validateForm()
		if (Object.keys(validationErrors).length > 0) {
			setErrors(validationErrors)
			return
		}

		let valid = true

		await fetchUsers()
		users.filter((user) => {
			if (user.email === form.corporative_email) {
				setErrors({ corporativeMail: 'This mail is already in use' })
				valid = false
				return
			}
		})
		users.filter((user) => {
			if (user.username === form.username) {
				setErrors({ username: 'This username is already in use' })
				valid = false
				return
			}
		})

		//email validation API
		if (enableValidation) {
			setLoading(true)
			const isValidEmail = await validateEmail(form.corporative_email)
			setLoading(false)
			if (!isValidEmail) {
				setEmailValid(false)
				return
			}
		}

		try {
			const response = await axios.post(
				import.meta.env.VITE_BACKEND_URL + '/user/representative',
				{
					...form,
					email: form.corporative_email,
					companyName: form.company_name,
					phone: form.phone_number,
					companySubscription: form.companySubscription
				}
			)

			const userDataFetch = await axios.post(
				import.meta.env.VITE_BACKEND_URL + '/user/login',
				form
			)
			setIsCheckboxChecked(false)
			const data = userDataFetch.data.data

			if (response.status === 200) {
				login(data.token, data.user.role, data.user._id)
				navigate('/representative/subscription')
			} else if (response.status === 400 || response.status === 409) {
				setErrors(response.data)
			}
		} catch (error) {
			if (error.response && error.response.status === 409) {
				setErrors(error.response.data)
			}
		}
	}
	function getRequiredFieldMessage(fieldName) {
		return `The ${fieldName} field is required`
	}
	async function fetchUsers() {
		try {
			const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user`, {
				headers: {
					'Content-type': 'application/json',
				},
			})
			setUsers(response.data.data)
		} catch (error) {
			console.error('Error fetching users:', error)
		}
	}

	React.useEffect(() => {
		fetchUsers()
	}, [])

	async function validateEmail(email) {
		const options = {
			method: 'GET',
			url: 'https://validect-email-verification-v1.p.rapidapi.com/v1/verify',
			params: {
				email: email,
			},
			headers: {
				'X-RapidAPI-Key': '7308b20086mshb693866b5675d9cp10aa6fjsn7830c3168107',
				'X-RapidAPI-Host': 'validect-email-verification-v1.p.rapidapi.com',
			},
		}

		try {
			const response = await axios.request(options)
			if (response.data.status === 'valid') {
				return true
			} else {
				return false
			}
		} catch (error) {
			if (error.response && error.response.status === 402) {
				console.error(
					'Se agotaron los créditos de la API de validación. El correo puede no ser auténtico.'
				)
				return true
			}
			console.error(error)
			return false
		}
	}
	function validateForm() {
		let errors = {}

		if (!form.username) {
			errors.username = getRequiredFieldMessage('username')
		} else if (form.username.length <= 3) {
			errors.username = 'The username field must be more than 3 characters'
		}

		if (!form.company_name) {
			errors.company_name = getRequiredFieldMessage('company name')
		} else if (form.company_name.length < 2 || form.company_name.length > 50) {
			errors.company_name =
				'The company name field must have be between 2 and 50 characters long'
		}

		if (!form.corporative_email) {
			errors.corporative_email = getRequiredFieldMessage('corporative email')
		} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.corporative_email)) {
			errors.corporative_email = 'The input must be an email'
		}
		if (!form.password) {
			errors.password = getRequiredFieldMessage('password')
		} else if (form.password !== form.password2) {
			errors.password2 = 'Password do not match'
		}
		if (!form.password2) {
			errors.password2 = getRequiredFieldMessage('repeat password')
		}
		if (form.phone_number && !/^\d{9}$/.test(form.phone_number)) {
			errors.phone_number = 'A phone number must consist of 9 digits exclusively'
		}
		if (
			form.projectSocietyName &&
			(form.projectSocietyName.length < 2 || form.projectSocietyName.length > 50)
		) {
			errors.projectSocietyName =
				'The Project Society Name must be between 2 and 50 characters long'
		}
		return errors
	}

	let mobile = false
	if (window.screen.width < 500) {
		mobile = true
	}

	return (
		<div
			className='h-screen flex flex-col justify-center bg-fixed home-container'
			style={{
				backgroundImage: `url(${mainBackgroundRegisterLogin})`,
				backgroundSize: 'cover',
				overflowY: 'scroll',
			}}>
			<div
				className='w-10/12 p-6 self-center rounded shadow-md flex flex-col justify-between'
				style={{
					backgroundColor: 'rgba(0, 0, 0, 0.5)',
					marginLeft: 'auto',
					marginRight: 'auto',
					marginTop: '50px',
					borderColor: talentColor,
					boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.3)',
					backdropFilter: 'blur(8px)',
					borderWidth: '1px',
				}}>
				<h2
					className='text-2xl font-bold text-center mb-4 text-white'
					style={{ marginTop: '-40px', marginBottom: '-10px' }}>
					Register as
				</h2>
				<hr className='border-1 w-70 mb-4' style={{ borderColor: talentColor }} />
				<div
					className='flex justify-center items-center space-x-4 mb-4'
					style={{ flexDirection: mobile ? 'column' : 'row' }}>
					<Link to='/register/candidate'>
						<h2
							className='text-2xl text-white hover:text-gray-600 px-6 py-3'
							style={{ marginTop: '-40px' }}>
							Candidate
						</h2>
					</Link>
					<h2 className='text-2xl' style={{ marginTop: '-40px', color: talentColor }}>
						Representative
					</h2>
				</div>
				{errors.errors && errors.errors[0] && errors.errors[0].detail && (
					<p className='text-red-500'>{errors.errors[0].detail}</p>
				)}
				<form onSubmit={(e) => handleSubmit(e)} className='flex flex-wrap -mx-3'>
					<div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
						<FormTextInput
							labelFor='Username'
							labelText='Username'
							placeholder='Enter your Username'
							name='username'
							value={username}
							onChange={(e) => onInputChange(e)}
							errors={errors}
							isMandatory
						/>
						<FormTextInput
							labelFor='Corporativeemail'
							labelText='Corporative Email'
							placeholder='Enter your Corporative Email'
							name='corporative_email'
							value={corporative_email}
							onChange={(e) => onInputChange(e)}
							type='email'
							errors={errors}
							isMandatory
						/>
						{loading && <p className='text-white'>Validating email...</p>}
						{!emailValid && <p className='text-red-500'>Please use a real email.</p>}
						{errors.corporativeMail && (
							<p className='text-red-500'>{errors.corporativeMail}</p>
						)}

						<FormTextInput
							labelFor='companyname'
							labelText='Company Name'
							placeholder='Enter your Company Name'
							name='company_name'
							value={company_name}
							onChange={(e) => onInputChange(e)}
							errors={errors}
							isMandatory
						/>
						<FormTextInput
							labelFor='ProjectSocietyName'
							labelText='Project Society Name'
							placeholder='Enter your Project Society Name'
							name='projectSocietyName'
							value={projectSocietyName}
							onChange={(e) => onInputChange(e)}
							errors={errors}
						/>
					</div>
					<div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
						<FormTextInput
							labelFor='Phonenumber'
							labelText='Phone number'
							placeholder='Enter your Phone number'
							name='phone_number'
							value={phone_number}
							onChange={(e) => onInputChange(e)}
							errors={errors}
						/>
						<FormTextInput
							labelFor='Password'
							labelText='Password'
							placeholder='Enter your Password'
							name='password'
							value={password}
							onChange={(e) => onInputChange(e)}
							type='password'
							errors={errors}
							isMandatory
						/>
						<FormTextInput
							labelFor='Password2'
							labelText='Repeat Password'
							placeholder='Enter your Password again'
							name='password2'
							value={password2}
							onChange={(e) => onInputChange(e)}
							type='password'
							errors={errors}
							isMandatory
						/>
						<div className='flex items-center justify-end'>
							<div
								className='text-md text-gray-500 mb-1 mr-2 text-right'
								style={{ marginTop: '20px', marginBottom: '0px' }}>
								<label className='inline-flex items-center'>
									<input
										type='checkbox'
										className='form-checkbox text-blue-500'
										onChange={handleCheckboxChange}
									/>
									<span className='ml-2'>
										Do you accept the terms and
										<br
											className='hidden lg:inline-block'
											style={{ marginRight: '-10px' }}
										/>
										conditions of use of the
										<br
											className='hidden lg:inline-block'
											style={{ marginRight: '-10px' }}
										/>
										processing of your data?
										<br
											className='hidden lg:inline-block'
											style={{ marginRight: '-10px' }}
										/>
										<a
											href='https://tu-enlace-externo.com'
											className='text-white hover:underline'
											target='_blank'
											rel='noopener noreferrer'>
											Read the conditions in here
											<svg
												className='h-6 w-6 inline-block'
												fill='none'
												viewBox='0 0 24 24'
												stroke='currentColor'>
												<path
													strokeLinecap='round'
													strokeLinejoin='round'
													strokeWidth='2'
													d='M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14'
												/>
											</svg>
										</a>
									</span>
								</label>
								{errors.termsCheckbox && (
									<p className='text-red-500'>{errors.termsCheckbox}</p>
								)}
							</div>
						</div>
					</div>

					<div className='flex-row space-x-24 m-auto mt-4'>
						<div
							className='flex items-center justify-center h-full'
							style={{ marginTop: '2rem' }}>
							<p className='text-md text-white mb-1 mr-2 text-center'>
								Already have an account?{' '}
								<Link
									to='/login'
									className='text-blue-500 hover:text-blue-700'
									style={{ marginRight: '2rem' }}>
									Log in now
								</Link>
							</p>
						</div>
						<div className='mt-4 mb-4'>{MainButton('Register', '/', handleSubmit)}</div>
					</div>
				</form>
			</div>
			<br></br>
		</div>
	)
}
