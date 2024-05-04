import React, { useState, useEffect } from 'react'
import { Link, redirect, useNavigate } from 'react-router-dom'
import MainButton from '../../components/mainButton.jsx'
import mainBackgroundRegisterLogin from '../../images/main-background2.jpg'
import axios from 'axios'
import { useAuthContext } from '../../context/authContext'
import Swal from 'sweetalert2'

export default function RememberPassword() {
	const [form, setForm] = useState({
		usernameOrEmail: '',
	})
	const { usernameOrEmail } = form
	const [errors, setErrors] = useState({})

	const handleInputChange = (e) => {
		setForm({
			...form,
			[e.target.name]: e.target.value,
		})
		setErrors({})
	}
	const handleForgotPassword = async (e) => {
		e.preventDefault()
		const validationErrors = validateForm()

		if (Object.keys(validationErrors).length > 0) {
			setErrors(validationErrors)
			return
		}
		try {
			const response = await axios.post(
				import.meta.env.VITE_BACKEND_URL + '/user/forgot-password',
				{
					usernameOrEmail: usernameOrEmail,
					redirectUrlBase: import.meta.env.VITE_FRONTEND_URL + '/user/forgot-password',
				}
			)
			if (response.status == 200) {
				Swal.fire({
					icon: 'success',
					title: 'You have 15 minutes to change your password. If you dont receive the email, please check your spam folder',
					showConfirmButton: true,
					confirmButtonColor: 'var(--talent-highlight)',
					allowOutsideClick: false,
					background: 'var(--talent-secondary)',
					color: 'white',
					timer: 4500,
				})
			} else {
				Swal.fire({
					icon: 'error',
					title: 'Error',
					text: 'An error occurred, please try again later.',
					showConfirmButton: true,
					confirmButtonColor: 'var(--talent-highlight)',
					allowOutsideClick: false,
					background: 'var(--talent-secondary)',
					color: 'white',
					timer: 3500,
				})
			}
		} catch (error) {
			setErrors(error.response.data)
		}
	}

	function getRequiredFieldMessage(fieldName) {
		return `The ${fieldName} field is required`
	}

	function validateForm() {
		let errors = {}
		if (!form.usernameOrEmail) {
			errors.usernameOrEmail = getRequiredFieldMessage('username or email')
		}
		return errors
	}

	return (
		<div
			className='flex flex-col justify-center'
			style={{
				height: '100vh',
				backgroundAttachment: 'fixed',
				backgroundImage: `url(${mainBackgroundRegisterLogin})`,
				backgroundSize: 'cover',
			}}>
			<div
				className='h-100 rounded shadow-md flex flex-col justify-between'
				style={{
					backgroundColor: 'rgba(0, 0, 0, 0.5)',
					width: '100%',
					maxWidth: '48rem',
					padding: '2rem',
					margin: '1rem',
					marginLeft: 'auto',
					marginRight: 'auto',
					borderColor: 'var(--talent-secondary)',
					borderWidth: '1px',
				}}>
				<div>
					<h2
						className='font-bold text-center text-white'
						style={{
							fontSize: '4rem',
							marginTop: '2rem',
							marginBottom: '4rem',
						}}>
						Request to change password
					</h2>
					<form onSubmit={handleForgotPassword}>
						<div
							className='flex'
							style={{
								marginBottom: '1rem',
							}}>
							<label
								htmlFor='Username'
								className='block text-lg font-bold text-white self-center'
								style={{
									marginBottom: '1rem',
									marginRight: '2rem',
									marginLeft: '4rem',
								}}>
								Username or email
							</label>
							<div
								className='flex-grow'
								style={{
									marginRight: '8rem',
								}}>
								<input
									type='text'
									className=' leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
									style={{
										width: '100%',
										padding: '0.5rem 0.75rem',
									}}
									placeholder='Write your username or email'
									name='usernameOrEmail'
									value={usernameOrEmail}
									onChange={handleInputChange}
								/>
								{errors.usernameOrEmail && (
									<p className='text-red-500'>{errors.usernameOrEmail}</p>
								)}
								{errors &&
									errors.errors &&
									errors.errors[0] &&
									errors.errors[0].detail && (
										<p className='text-red-500'>{errors.errors[0].detail}</p>
									)}
							</div>
						</div>
						<div
							className='flex justify-center items-center'
							style={{ marginTop: '1rem' }}>
							<button type='submit'>
								{MainButton('Send email', '/', handleForgotPassword)}
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}
