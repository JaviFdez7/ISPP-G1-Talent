import React, { useState } from 'react'

export default function DropdownComponent({ name, children, defaultOpen = false }) {
	const [isOpen, setIsOpen] = useState(defaultOpen)

	return (
		<div
			className='w-auto h-100 p-1 rounded shadow-md flex flex-col justify-between mt-10 '
			style={{
				backgroundColor: 'rgba(0, 0, 0, 0.5)',
				borderColor: 'orange',
				borderWidth: '1px',
			}}>
			<div className='flex flex-col items-center'>
				<h2
					className='text-2xl font-bold text-center text-white mt-5 mb-5 cursor-pointer'
					style={{ borderBottom: '1px solid orange', userSelect: 'none' }}
					onClick={() => setIsOpen(!isOpen)}>
					<div className='flex items-center ml-20 mr-20'>
						<span>{name}</span>
						<span>{isOpen ? '▲' : '▼'}</span>
					</div>
				</h2>
				{isOpen && <div className='flex-row justify-center w-auto mb-10 '>{children}</div>}
			</div>
		</div>
	)
}
