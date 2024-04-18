import React, { useEffect, useState } from 'react'

const WorkExperienceList = ({ experience }) => {
	function formatDate(date) {
		const options = { year: 'numeric', month: 'long', day: 'numeric' }
		return new Date(date).toLocaleDateString('en-US', options)
	}
	const [mobile, setMobile] = useState(window.screen.width < 500)

	useEffect(() => {
		const handleResize = () => {
			setMobile(window.screen.width < 500)
		}

		window.addEventListener('resize', handleResize)
		return () => {
			window.removeEventListener('resize', handleResize)
		}
	}, [])

	return (
		<div
			className='w-9/12 self-center mx-auto'
			style={{ marginBottom: '3rem', marginTop: '3rem' }}>
			{experience.map((item, index) => (
				<div key={index} className='flex justify-between m-2'>
					<div className='p-4 mb-2 mx-auto w-full experience-list-element'>
						<div className='flex-col relative'>
							<div className='flex justify-start items-center'>
								<div
									className={`flex ${mobile ? 'flex-col' : 'flex-row'} items-center`}>
									<h6
										className='text-white py-1 px-2 rounded-lg'
										style={{ backgroundColor: 'var(--talent-highlight)' }}>
										{item.professionalArea}
									</h6>
									<h6 className='text-white ml-8'>{item.companyName}</h6>
									<h6 className='text-white ml-8'>
										{formatDate(item.startDate)} - {formatDate(item.endDate)}
									</h6>
								</div>
							</div>
						</div>
					</div>
				</div>
			))}
		</div>
	)
}

export default WorkExperienceList
