import React, { useContext, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Input from '../../components/Input'
import profile from '../../images/profile.jpg'
import mainBackgroundRegisterLogin from '../../images/main-background2.jpg'
import MainButton from '../../components/mainButton'
import SecondaryButton from '../../components/secondaryButton'
import axios from 'axios'
import { useAuthContext } from '../../context/authContext'
import Swal from 'sweetalert2'
import FormTextInput from '../../components/FormTextInput'

export default function CandidateProfessionalExperienceEdit() {
	const today = new Date()

	const formattedToday = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`
	const { isAuthenticated } = useAuthContext()
	const [form, setform] = useState({
		startDate: '',
		endDate: formattedToday,
		companyName: '',
		professionalArea: '',
		userId: localStorage.getItem('userId'),
	})

	let navigate = useNavigate()
	const [errors, setErrors] = useState({})

	const { startDate, endDate, companyName, professionalArea, userId } = form
	let date = new Date(endDate)
	let formattedDate = date.toISOString().slice(0, 10)

	function handleChange(e) {
		if (e.target.name === 'endDate') {
			return
		}
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
					const currentexperienceId = localStorage.getItem('experienceId')
					if (currentexperienceId) {
						const response = await axios.get(
							`${import.meta.env.VITE_BACKEND_URL}/professional-experience/${currentexperienceId}`
						)
						setform(response.data.data)
					}
				}
			} catch (error) {
				console.error('Error fetching user data:', error)
			}
		}
		fetchExperienceData()
	}, [isAuthenticated])

	//8)creamos la funcion que se encarga de llamar al metodo de la API REST de editar
	async function editProffesionalExperience(e) {
		e.preventDefault()
		const currentExperienceId = localStorage.getItem('experienceId')
		const token = localStorage.getItem('access_token')
		const validationErrors = validateForm()

		if (Object.keys(validationErrors).length > 0) {
			setErrors(validationErrors)
			return
		}

		try {
			const response = await axios.patch(
				`${import.meta.env.VITE_BACKEND_URL}/professional-experience/${currentExperienceId}`,
				form,
				{
					headers: {
						'Content-type': 'application/json',
						Authorization: token,
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
				title: 'Professional Experience updated successfully',
				showConfirmButton: false,
				background: 'var(--talent-secondary)',
				color: 'white',
				timer: 1500,
			})
		} catch (error) {
			if (error.response && error.response.status === 400) {
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
		return `The ${fieldName} field is required`
	}

	function validateForm() {
		let errors = {}

		if (!form.startDate) {
			errors.startDate = getRequiredFieldMessage('startDate')
		} else {
			const startDate = new Date(form.startDate)
			const endDate = new Date(form.endDate)
			if (startDate > endDate) {
				errors.startDate = 'Start Date cannot be after the EndDate'
			}

			const year1970 = new Date('1970-01-01')
			if (startDate < year1970) {
				errors.startDate = 'Start Date cannot be before 1970'
			}
		}
		if (!form.companyName) {
			errors.companyName = getRequiredFieldMessage('companyName')
		} else if (form.companyName.length <= 3) {
			errors.companyName = 'The company Name field must have more than 3 characters'
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
		if (!form.professionalArea || !validProfessionalAreas.includes(form.professionalArea)) {
			errors.professionalArea = 'Invalid professional area'
		}
		return errors
	}
	console.log(form.endDate)

  return (
    <div
      className="flex flex-col justify-center"
      style={{
        height: "100vh",
        backgroundAttachment: "fixed",
        backgroundImage: `url(${mainBackgroundRegisterLogin})`,
        backgroundSize: "cover",
      }}
    >
      <div
        className="h-full w-10/12 rounded shadow-md flex flex-col justify-between self-center p-4 mt-4 mb-4"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          borderColor: "var(--talent-highlight)",
          borderWidth: "1px",
        }}
      >
        <div>
          <h2
            className="font-bold text-center text-white"
            style={{
              fontSize: "2rem",
              marginTop: "2rem",
              marginBottom: "4rem",
            }}
          >
            Add work experience
          </h2>
          <form className="w-full flex flex-col" onSubmit={(e) => handleSubmit(e)}>
            <div className="w-10/12 flex flex-col mb-4 self-center">
              <label
                htmlFor="StartDate"
                className="block text-lg font-bold text-white"
              >
                StartDate
              </label>
              <div className="flex-grow">
                <input
                  type="date" w-full
                  className="leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  style={{
                    width: "100%",
                    padding: "0.5rem 0.75rem",
                  }}
                  name="startDate"
                  value={startDate}
                  onChange={(e) => onInputChange(e)}
                />
                {errors.startDate && (
                  <p className="text-red-500 text-xs italic">
                    {errors.startDate}
                  </p>
                )}
              </div>
            </div>
            <div className="w-10/12 flex flex-col mb-4 self-center">
              <label
                htmlFor="EndDate"
                className="block text-lg font-bold text-white"
              >
                EndDate
              </label>
              <div className="flex-grow">
                <input
                  type="text"
                  className=" leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  style={{
                    width: "100%",
                    padding: "0.5rem 0.75rem",
                  }}
                  placeholder="Write your endDate"
                  name="endDate"
                  value={endDate}
                  onChange={(e) => onInputChange(e)}
                  disabled
                />
                {errors.endDate && (
                  <p className="text-red-500 text-xs italic">
                    {errors.endDate}
                  </p>
                )}
              </div>
            </div>
            <div className="w-10/12 flex flex-col mb-4 self-center">
              <label
                htmlFor="CompanyName"
                className="block text-lg font-bold text-white"
              >
                Company or Project Name
              </label>
              <div className="flex-grow">
                <input
                  type="text"
                  className=" leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  style={{
                    width: "100%",
                    padding: "0.5rem 0.75rem",
                  }}
                  placeholder="Write your companyName"
                  name="companyName"
                  value={companyName}
                  onChange={(e) => onInputChange(e)}
                />
                {errors.companyName && (
                  <p className="text-red-500 text-xs italic">
                    {errors.companyName}
                  </p>
                )}
              </div>
            </div>
            <div className="w-10/12 flex flex-col mb-4 self-center">
              <label
                htmlFor="ProfessionalArea"
                className="block text-lg font-bold text-white"
              >
                Professional Area
              </label>
              <div className="flex-grow">
                <select
                  className=" leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
    z              style={{
                    width: "100%",
                    padding: "0.5rem 0.75rem",
                    overflowY: "scroll"
                  }}
                  name="professionalArea"
                  value={professionalArea}
                  onChange={(e) => onInputChange(e)}
                >
                  <option value="">Select your professional area</option>
                  <option value="Web application">Web application</option>
                  <option value="Mobile application">Mobile application</option>
                  <option value="Frontend">Frontend</option>
                  <option value="DevOps">DevOps</option>
                  <option value="Backend">Backend</option>
                  <option value="Operating systems">Operating systems</option>
                  <option value="Data science">Data science</option>
                  <option value="Artificial intelligence">Artificial intelligence</option>
                  <option value="Security">Security</option>
                  <option value="Other">Other </option>
                </select>
                {errors.professionalArea && (
                  <p className="text-red-500 text-xs italic">
                    {errors.professionalArea}
                  </p>
                )}
              </div>
            </div>
          </form>
        </div>
        {errors.errors && errors.errors[0] && errors.errors[0].detail && (
          <p className="text-red-500">{errors.errors[0].detail}</p>
        )}
        <div className='flex align-center justify-center'>
          {MainButton('Update', '/candidate/detail', () => console.log('Update button clicked'))}
          {SecondaryButton('Cancel', '/candidate/detail', '')}
        </div>
      </div>
    </div>
  );
}
