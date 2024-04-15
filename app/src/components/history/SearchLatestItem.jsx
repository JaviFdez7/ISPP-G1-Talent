import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { handleNetworkError } from '../TokenExpired.jsx'
import { useNavigate } from 'react-router-dom'

const SearchLatestItem = ({ item, formattedDate, triggerUpdate }) => {
	const [githubUsername, setGithubUsername] = useState(null)
	const [errorMessage, setErrorMessage] = useState(null)
	const apiURL = import.meta.env.VITE_BACKEND_URL
	const navigate = useNavigate()

	async function getGithubUsername(analysisId) {
		const uri = `/analysis/${analysisId}`
		const token = localStorage.getItem('access_token')
		try {
			const response = await axios.get(apiURL + uri, {
				headers: {
					Authorization: `${token}`,
				},
			})
			return response.data.data.githubUsername
		} catch (error) {
			handleNetworkError(error, navigate)
		}
	}
	useEffect(() => {
		getGithubUsername(item.analysisId).then((username) => {
			setGithubUsername(username)
			setErrorMessage(null)
		})
	}, [item.analysisId])

	return (
		<div className='p-4 rounded-lg bg-black bg-opacity-70 transition-colors duration-300 hover:bg-gray-700 mb-2 border-b border-t border-gray-900'>
			<div className='flex-col relative'>
				<Link className='block text-white' to={`/analysis/${githubUsername}`}>
					<div className='flex flex-col lg:flex-row justify-start items-center'>
						<div className='flex items-center'>
							<h6
								className='text-white py-1 px-2 rounded-lg mb-2'
								style={{ backgroundColor: 'var(--talent-highlight)' }}>
								{githubUsername}
							</h6>
							<h6 className='text-xl text-white ml-8'>{formattedDate}</h6>
						</div>
					</div>
				</Link>
			</div>
			{errorMessage && <div className='text-center text-red-600'>{errorMessage}</div>}
		</div>
	)
}

export default SearchLatestItem
