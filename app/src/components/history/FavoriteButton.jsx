import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faS, faStar } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'

const FavoriteButton = ({ history, toggleText = false }) => {
	const [isFavorite, setIsFavorite] = useState(history.favorite)
	const [errorMessage, setErrorMessage] = useState(null)
	const favOn = 'var(--talent-highlight)'
	const favOff = 'gray'

	const apiURL = import.meta.env.VITE_BACKEND_URL

	async function changeFavorites(userId) {
		const uri = `/user/${userId}/history/${history._id}/favorite`
		try {
			const response = await axios.patch(apiURL + uri)
			setErrorMessage(null)
			return response
		} catch (error) {
			setErrorMessage('Unable to connect to the server. Please try again later.')
			console.error('Error changing history favorite state:', error)
			throw error
		}
	}

	const handleToggleFavorite = () => {
		setIsFavorite(!isFavorite)
		const userId = localStorage.getItem('userId')
		changeFavorites(userId)
	}

	return (
		<button
			onClick={handleToggleFavorite}
			className='flex items-center text-white transition-colors duration-300 hover:text-yellow-300 bg-transparent border-none rounded-full p-2'>
			<div className='bg-transparent hover:bg-gray-500 hover:bg-opacity-50 rounded-lg duration-300 p-2'>
				<FontAwesomeIcon icon={faStar} style={{ color: isFavorite ? favOn : favOff }} />
			</div>
			{toggleText && <span className='ml-2'>Add to favorites</span>}
			{errorMessage && <div className='text-center text-red-600'>{errorMessage}</div>}
		</button>
	)
}

export default FavoriteButton
