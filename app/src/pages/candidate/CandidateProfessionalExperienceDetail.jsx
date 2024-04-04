import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SecondaryButton from '../../components/secondaryButton'
import mainBackgroundRegisterLogin from '../../images/main-background2.jpg'
import MainButton from '../../components/mainButton'
import Modal from 'react-modal'
import { useParams } from 'react-router-dom'
import { handleNetworkError } from '../../components/TokenExpired'

export default function CandidateProfessionalExperienceDetail({}) {
	const talentColor = 'var(--talent-highlight)'

	const [experience, setExperience] = useState({})
	const [showModal, setShowModal] = useState(false)
	let navigate = useNavigate()
	const { id } = useParams()

	async function getExperienceById() {
		const response = await fetch(
			import.meta.env.VITE_BACKEND_URL + `/professional-experience/${id}/`,
			{
				method: 'GET',
			}
		)
		const data = await response.json()
		setExperience(data.data)
	}

	useEffect(() => {
		getExperienceById()
	}, [id])

	async function handleConfirm() {
		const token = localStorage.getItem('access_token')
		try {
			await fetch(import.meta.env.VITE_BACKEND_URL + `/professional-experience/${id}/`, {
				method: 'DELETE',
				headers: {
					Authorization: `${token}`,
				},
			})
			navigate('/candidate/detail')
			setShowModal(false)
		} catch (error) {
			handleNetworkError(error, navigate)
		}
	}

	function handleCancel() {
		navigate('/candidate/detail')
		setShowModal(false)
	}

	function deleteProffesionalExperience() {
		setShowModal(true)
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
				className='h-full w-10/12 rounded shadow-md flex flex-col justify-between self-center p-4 mt-4 mb-4'
				style={{
					backgroundColor: 'rgba(0, 0, 0, 0.5)',
					borderColor: 'var(--talent-highlight)',
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
						Professional Experience Detail
					</h2>
					<div className='flex flex-wrap profile-info-text'>
						<div className='w-full sm:w-1/2 p-4'>
							<div
								className='p-4 border rounded'
								style={{
									borderColor: talentColor,
								}}>
								<p>
									<strong>Start Date:</strong>
								</p>
								<div className='flex flex-col w-full profile-info-text'>
									{new Date(experience.startDate).toLocaleDateString()}
								</div>
							</div>
							<br />
							<div
								className='p-4 border rounded'
								style={{
									borderColor: talentColor,
								}}>
								<p>
									<strong>End Date:</strong>
								</p>
								<div className='flex flex-col w-full profile-info-text'>
									{new Date(experience.endDate).toLocaleDateString()}
								</div>
							</div>
						</div>
						<div className='w-full sm:w-1/2 p-4'>
							<div
								className='p-4 border rounded'
								style={{
									borderColor: talentColor,
								}}>
								<p>
									<strong>Company Name:</strong>
								</p>
								<div className='flex flex-col w-full profile-info-text'>
									{experience.companyName}
								</div>
							</div>
							<br />
							<div
								className='p-4 border rounded'
								style={{
									borderColor: talentColor,
								}}>
								<p>
									<strong>Professional Area:</strong>
								</p>
								<div className='flex flex-col w-full profile-info-text'>
									{experience.professionalArea}
								</div>
							</div>
						</div>
						<div className='mt-8 self-center w-full flex flex-row justify-center'>
							{SecondaryButton('Back', '/candidate/detail', '')}
							{MainButton(
								'Update',
								`/candidate/professional-experience/edit/${experience._id}`,
								''
							)}
							{/*{SecondaryButton("Delete", "/", deleteProffesionalExperience)}*/}
						</div>
					</div>
				</div>
			</div>
			<Modal
				isOpen={showModal}
				onRequestClose={handleCancel}
				contentLabel='Delete Confirmation'
				style={{
					content: {
						width: '40%',
						height: '20%',
						margin: 'auto',
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						alignItems: 'center',
						backgroundColor: 'var(--talent-secondary)',
						borderRadius: '10px',
						color: 'white',
					},
				}}>
				<h2 style={{ marginBottom: '3%' }}>
					Are you sure you want to delete this professional experience?
				</h2>
				<div>
					<button
						onClick={handleConfirm}
						style={{
							marginRight: '10px',
							padding: '10px',
							backgroundColor: 'var(--talent-highlight)',
							color: 'white',
							border: 'none',
							borderRadius: '5px',
						}}>
						Yes
					</button>
					<button
						onClick={handleCancel}
						style={{
							padding: '10px',
							backgroundColor: 'var(--talent-black)',
							color: 'white',
							border: 'none',
							borderRadius: '5px',
						}}>
						No
					</button>
				</div>
			</Modal>
		</div>
	)
}
