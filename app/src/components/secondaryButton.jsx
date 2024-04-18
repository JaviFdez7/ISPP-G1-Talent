import React from 'react'
import { Link } from 'react-router-dom'

export default function SecondaryButton(text, link, func = '', w = '115px', h = '65px') {
	let res = ''
	if (func === '') {
		res = (
			<Link to={link} className='flex flex-col button-container'>
				<div className='flex secondary-button-container'>
					<h4>{text}</h4>
				</div>
			</Link>
		)
	} else {
		res = (
			<button onClick={func} className='flex flex-col button-container'>
				<div className='flex secondary-button-container'>
					<h4>{text}</h4>
				</div>
			</button>
		)
	}

	return (
		<div className='flex justify-center items-center' style={{ width: w, height: h }}>
			{res}
		</div>
	)
}
