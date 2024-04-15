import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import MainButton from './mainButton'
import SecondaryButton from './secondaryButton'
import { useNavigate } from 'react-router-dom'
import Modal from 'react-modal'

const WorkExperienceList = ({ experience }) => {
	const [showModal, setShowModal] = useState(false)
	const [selectedId, setSelectedId] = useState(null)
	let navigate = useNavigate()

	function formatDate(date) {
		const options = { year: 'numeric', month: 'long', day: 'numeric' }
		return new Date(date).toLocaleDateString('en-US', options)
	}

	function deleteProffesionalExperience(id) {
		setSelectedId(id)
		setShowModal(true)
	}

	async function handleConfirm() {
		const token = localStorage.getItem('access_token')
		await fetch(import.meta.env.VITE_BACKEND_URL + `/professional-experience/${selectedId}/`, {
			method: 'DELETE',
			headers: {
				Authorization: `${token}`,
			},
		})
		navigate('/candidate/detail')
		setShowModal(false)
	}

	function handleCancel() {
		navigate('/candidate/detail')
		setShowModal(false)
	}

	return (
		<div
			className='w-9/12 self-center mx-auto'
			style={{ marginBottom: '3rem', marginTop: '3rem' }}>
			{experience.map((item, index) => (
				<div key={index} className='flex justify-between'>
					<div
						className='p-4 rounded-lg transition-colors duration-300 mb-2 border-b border-t mx-auto w-full'
						style={{
							backgroundColor: 'var(--talent-dark-background)',
							borderColor: 'var(--talent-highlight)',
							hover: { backgroundColor: 'var(--talent-secondary)' },
						}}>
						<div className='flex-col relative'>
							<Link
								className='block text-white'
								to={`/candidate/professional-experience/detail/${item._id}`}>
								<div className='flex flex-col lg:flex-row justify-start items-center'>
									<div className='flex items-center'>
										<h6
											className='text-white py-1 px-2 rounded-lg mb-2'
											style={{ backgroundColor: 'var(--talent-highlight)' }}>
											{item.professionalArea}
										</h6>
										<h6 className='text-xl text-white ml-8'>
											{item.companyName}
										</h6>
										<h6 className='text-xl text-white ml-8'>
											{formatDate(item.startDate)} -{' '}
											{formatDate(item.endDate)}
										</h6>
									</div>
								</div>
							</Link>
						</div>
					</div>
				</div>
			))}
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
			<div className='mt-4 flex justify-center'>
				<Link to='/candidate/professional-experience/create'>
					<button
						className='text-white py-2 px-4 rounded'
						style={{ backgroundColor: 'var(--talent-highlight)' }}>
						Create new work experience
					</button>
				</Link>
			</div>
		</div>
	)
}

export default WorkExperienceList
