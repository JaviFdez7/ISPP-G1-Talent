import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import FavoriteButton from '../../components/history/FavoriteButton.jsx'
import DeleteHistoryButton from '../../components/history/DeleteHistoryButton.jsx'
import { handleNetworkError } from '../TokenExpired.jsx'
import { useNavigate } from 'react-router-dom'

const AnalysisHistoryItem = ({ item, formattedDate, triggerUpdate }) => {
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
			console.log("dedeeweeeeeeeeee 12121212    ", response.data.data)

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
		<div className='p-4 mb-2 mt-2 history-list-element'>
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
				<div className='flex items-center justify-end'>
					<div className='flex mx-2'>
						<FavoriteButton history={item} />
					</div>
					<div className='flex mx-2'>
						<DeleteHistoryButton
							history={item}
							setErrorMessage={setErrorMessage}
						/>
					</div>
				</div>
			</div>
			{errorMessage && <div className='text-center text-red-600'>{errorMessage}</div>}
		</div>
	)
}

export default AnalysisHistoryItem
