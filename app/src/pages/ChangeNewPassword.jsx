import React, { useState } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import mainBackground from '../images/main-background.jpg'
import SecondaryButton from '../components/secondaryButton'
import MainButton from '../components/mainButton'
import Swal from 'sweetalert2'
import FormTextInput from '../components/FormTextInput'

export default function ChangeNewPassword() {
	const [form, setForm] = useState({
		newPassword: '',
		repeatedPassword: '',
	})

	const { token } = useParams()
	const [errors, setErrors] = useState({})
	let navigate = useNavigate()
	const { newPassword, repeatedPassword } = form

	function handleChange(e) {
		const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
		setForm({
			...form,
			[e.target.name]: value,
		})
		setErrors({})
	}

	async function handleChangeNewPassword(e) {
		e.preventDefault()
		const validationErrors = validateForm()
		if (Object.keys(validationErrors).length > 0) {
			setErrors(validationErrors)
			return
		}
		try {
			const response = await axios.post(
				`${import.meta.env.VITE_BACKEND_URL}/user/forgot-password/${token}`,

				form,
				{
					headers: {
						'Content-type': 'application/json',
						Authorization: token,
					},
				}
			)
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
			navigate('/login')
			Swal.fire({
				icon: 'success',
				title: 'Password updated successfully',
				showConfirmButton: false,
				background: 'var(--talent-secondary)',
				color: 'white',
				timer: 1500,
			})
		} catch (error) {
			setErrors(error.response.data)
		}
	}

	function getRequiredFieldMessage(fieldName) {
		return `The ${fieldName} field is required`
	}

	function validateForm() {
		let errors = {}
		if (!form.newPassword) {
			errors.newPassword = getRequiredFieldMessage('newPassword')
		} else if (form.newPassword.length < 8 || form.newPassword.length > 20) {
			errors.newPassword = 'The passwords fields must be between 8 and 20 characters'
		} else if (form.newPassword != form.repeatedPassword) {
			errors.repeatedPassword = 'Passwords do not match the new password'
		}
		if (!form.repeatedPassword) {
			errors.repeatedPassword = getRequiredFieldMessage('repeatedPassword')
		} else if (form.repeatedPassword.length < 8 || form.repeatedPassword.length > 20) {
			errors.repeatedPassword = 'The passwords fields must be between 8 and 20 characters'
		}
		return errors
	}

	return (
		<div
			className='flex flex-col min-h-screen'
			style={{
				backgroundImage: `url(${mainBackground})`,
				backgroundSize: 'cover',
				color: 'white',
				msOverflowY: 'scroll',
			}}>
			<div
				className='rounded shadow-md flex flex-col justify-between self-center p-4 mt-4 mb-4 '
				style={{
					backgroundColor: 'rgba(0, 0, 0, 0.5)',
					borderColor: 'var(--talent-secondary)',
					borderWidth: '1px',
					width: '40%',
					marginTop: '10%',
				}}>
				<div className='flex flex-row justify-center'>
					<div
						className='flex flex-col items-center mt-10'
						style={{ width: '90%', marginTop: '-5%' }}>
						<h2
							className='font-bold text-center text-white'
							style={{
								fontSize: '2rem',
								marginTop: '5%',
								marginBottom: '10%',
							}}>
							Change password
						</h2>
						<form onSubmit={(e) => handleChangeNewPassword(e)}>
							<div className='mb-4'>
								<FormTextInput
									labelFor='New Password'
									labelText='New Password'
									placeholder='Enter your New Password'
									name='newPassword'
									value={newPassword}
									onChange={(e) => handleChange(e)}
									type='password'
									errors={errors}
									isMandatory
								/>
							</div>

							<div className='mb-4'>
								<FormTextInput
									labelFor='Repeat Password'
									labelText='Repeat Password'
									placeholder='Enter your Repeat Password'
									name='repeatedPassword'
									value={repeatedPassword}
									onChange={(e) => handleChange(e)}
									type='password'
									errors={errors}
									isMandatory
								/>
							</div>
							{errors &&
								errors.errors &&
								errors.errors[0] &&
								errors.errors[0].detail && (
									<p className='text-red-500'>{errors.errors[0].detail}</p>
								)}
							<div
								className='flex align-center justify-center'
								style={{ marginTop: '17%' }}>
								{MainButton('Update', '/', handleChangeNewPassword)}
								{SecondaryButton('Cancel', '/', '')}
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	)
}
