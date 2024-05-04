import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import mainBackground from '../../images/main-background.jpg'
import MainButton from '../../components/mainButton'
import SecondaryButton from '../../components/secondaryButton'
import axios from 'axios'
import { useAuthContext } from '../../context/authContext'
import Swal from 'sweetalert2'
import { useParams } from 'react-router-dom'
import { handleNetworkError } from '../../components/TokenExpired'

export default function CandidateProfessionalExperienceEdit() {
	const { isAuthenticated } = useAuthContext()
	const { id } = useParams()

	const [form, setform] = useState({
		startDate: '',
		endDate: '',
		companyName: '',
		professionalArea: '',
		userId: localStorage.getItem('userId'),
	})

	let navigate = useNavigate()
	const [errors, setErrors] = useState({})

	const { startDate, endDate, companyName, professionalArea, userId } = form

	function handleChange(e) {
		const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
		setform({
			...form,
			[e.target.name]: value,
		})
		setErrors({})
	}

	useEffect(() => {
		const fetchExperienceData = async () => {
			try {
				if (isAuthenticated) {
					if (id) {
						const response = await axios.get(
							`${import.meta.env.VITE_BACKEND_URL}/professional-experience/${id}`
						)
						const { startDate, endDate, companyName, professionalArea } =
							response.data.data
						setform({
							startDate: new Date(startDate).toISOString().split('T')[0],
							endDate: new Date(endDate).toISOString().split('T')[0],
							companyName,
							professionalArea,
							userId: localStorage.getItem('userId'),
						})
					}
				}
			} catch (error) {
				console.error('Error fetching user data:', error)
			}
		}
		fetchExperienceData()
	}, [isAuthenticated])

	async function editProffesionalExperience(e) {
		e.preventDefault()
		const token = localStorage.getItem('access_token')
		const validationErrors = validateForm()

		if (Object.keys(validationErrors).length > 0) {
			setErrors(validationErrors)
			return
		}

		try {
			const response = await axios.patch(
				`${import.meta.env.VITE_BACKEND_URL}/professional-experience/${id}`,
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
			Swal.fire({
				icon: 'success',
				title: 'Professional experience updated successfully',
				showConfirmButton: false,
				background: 'var(--talent-secondary)',
				color: 'white',
				timer: 1500,
			})
			navigate(`/candidate/professional-experience/detail/${id}`)
			Swal.fire({
				icon: 'success',
				title: 'Professional Experience updated successfully',
				showConfirmButton: false,
				background: 'var(--talent-secondary)',
				color: 'white',
				timer: 1500,
			})
		} catch (error) {
			handleNetworkError(error, navigate)
		}
	}

	function getRequiredFieldMessage(fieldName) {
		return `The ${fieldName} field is required`
	}

	function validateForm() {
		let errors = {}
		if (!form.startDate) errors.startDate = getRequiredFieldMessage('startDate')
		else {
			const startDate = new Date(form.startDate)
			const endDate = new Date(form.endDate)
			const currentDate = new Date()
			if (startDate > endDate) errors.startDate = 'Start Date cannot be after the EndDate'

			if (endDate > currentDate) errors.endDate = 'End Date cannot be after the current date'

			const year1970 = new Date('1970-01-01')
			if (startDate < year1970 || endDate < year1970)
				errors.startDate = 'Start Date cannot be before 1970 or after the current date'
		}
		if (!form.endDate) errors.endDate = getRequiredFieldMessage('endDate')

		if (!form.companyName) errors.companyName = getRequiredFieldMessage('companyName')
		else if (form.companyName.length <= 3 || form.companyName.length > 35) {
			errors.companyName = 'The company name field must have be between 2 and 35 characters long'
		}

		const validProfessionalAreas = [
			'Web application',
			'Mobile application',
			'Frontend',
			'DevOps',
			'Backend',
			'Operating systems',
			'Data science',
			'Artificial intelligence',
			'Security',
			'Other',
		]
		if (!form.professionalArea || !validProfessionalAreas.includes(form.professionalArea))
			errors.professionalArea = 'Invalid professional area'

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
				}}>
				<div>
					<h2
						className='font-bold text-center text-white'
						style={{
							fontSize: '2rem',
							marginTop: '2rem',
							marginBottom: '4rem',
						}}>
						Update work experience
					</h2>
					<form
						className='w-full flex flex-col'
						onSubmit={(e) => editProffesionalExperience(e)}>
						<div className='w-10/12 flex flex-col mb-4 self-center'>
							<label
								htmlFor='StartDate'
								className='block text-lg font-bold text-white'>
								StartDate
							</label>
							<div className='flex-grow'>
								<input
									type='date'
									className='leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
									style={{
										width: '100%',
										padding: '0.5rem 0.75rem',
									}}
									name='startDate'
									value={startDate}
									onChange={(e) => handleChange(e)}
								/>
								{errors.startDate && (
									<p className='text-red-500 text-xs italic'>
										{errors.startDate}
									</p>
								)}
							</div>
						</div>
						<div className='w-10/12 flex flex-col mb-4 self-center'>
							<label htmlFor='EndDate' className='block text-lg font-bold text-white'>
								EndDate
							</label>
							<div className='flex-grow'>
								<input
									type='date'
									className='leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
									style={{
										width: '100%',
										padding: '0.5rem 0.75rem',
									}}
									name='endDate'
									value={endDate}
									onChange={(e) => handleChange(e)}
								/>
								{errors.endDate && (
									<p className='text-red-500 text-xs italic'>{errors.endDate}</p>
								)}
							</div>
						</div>
						<div className='w-10/12 flex flex-col mb-4 self-center'>
							<label
								htmlFor='CompanyName'
								className='block text-lg font-bold text-white'>
								Company or Project Name
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
								/>
								{errors.companyName && (
									<p className='text-red-500 text-xs italic'>
										{errors.companyName}
									</p>
								)}
							</div>
						</div>
						<div className='w-10/12 flex flex-col mb-4 self-center'>
							<label
								htmlFor='ProfessionalArea'
								className='block text-lg font-bold text-white'>
								Professional Area
							</label>
							<div className='flex-grow'>
								<select
									className=' leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
									z
									style={{
										width: '100%',
										padding: '0.5rem 0.75rem',
										overflowY: 'scroll',
									}}
									name='professionalArea'
									value={professionalArea}
									onChange={(e) => handleChange(e)}>
									<option value=''>Select your professional area</option>
									<option value='Web application'>Web application</option>
									<option value='Mobile application'>Mobile application</option>
									<option value='Frontend'>Frontend</option>
									<option value='DevOps'>DevOps</option>
									<option value='Backend'>Backend</option>
									<option value='Operating systems'>Operating systems</option>
									<option value='Data science'>Data science</option>
									<option value='Artificial intelligence'>
										Artificial intelligence
									</option>
									<option value='Security'>Security</option>
									<option value='Other'>Other </option>
								</select>
								{errors.professionalArea && (
									<p className='text-red-500 text-xs italic'>
										{errors.professionalArea}
									</p>
								)}
							</div>
						</div>
					</form>
				</div>
				{errors.errors && errors.errors[0] && errors.errors[0].detail && (
					<p className='text-red-500'>{errors.errors[0].detail}</p>
				)}
				<div className='flex align-center justify-center'>
					{MainButton(
						'Update',
						`/professional-experience/${id}/`,
						editProffesionalExperience
					)}
					{SecondaryButton('Cancel', '/candidate/detail', '')}
				</div>
			</div>
		</div>
	)
}
