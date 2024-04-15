import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import SearchFavoriteButton  from '../../components/history/SearchFavoriteButton.jsx'
import { handleNetworkError } from '../TokenExpired.jsx'
import { useNavigate } from 'react-router-dom'
import DeleteHistorySearchButton from './DeleteHistorySearchButton.jsx'

const SearchHistoryItem = ({ item, formattedDate, triggerUpdate }) => {
	const [teamCreator, setTeamCreator] = useState(null)
	const [errorMessage, setErrorMessage] = useState(null)
	const apiURL = import.meta.env.VITE_BACKEND_URL
	const navigate = useNavigate()

	async function getGithubUsername(userId) {
		const uri = `/user/${userId}/team_creator/history`
		const token = localStorage.getItem('access_token')
		try {
			const response = await axios.get(apiURL + uri, {
				headers: {
					Authorization: `${token}`,
				},
			})
			return response.data.data
		} catch (error) {
			handleNetworkError(error, navigate)
		}
	}
	useEffect(() => {
		getGithubUsername(item.userId).then((teamCreators) => {
			teamCreators.map((teamCreator) => {
				setTeamCreator(teamCreator.teamCreatorId);
			});
			setErrorMessage(null);
		});
	}, [item.userId]);

	return (
		<div className='p-4 rounded-lg bg-black bg-opacity-70 transition-colors duration-300 hover:bg-gray-700 mb-2 border-b border-t border-gray-900'>
			<div className='flex-col relative'>
				<Link className='block text-white' to={`/searches/${teamCreator}`}>
					<div className='flex flex-col lg:flex-row justify-start items-center'>
						<div className='flex items-center'>
							<h6 className='text-xl text-white ml-8'>{formattedDate}</h6>
						</div>
					</div>
				</Link>
				<div className='flex items-center justify-end'>
					<div className='flex mx-2'>
						<SearchFavoriteButton history={item} />
					</div>
					<div className='flex mx-2'>
						<DeleteHistorySearchButton
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

export default SearchHistoryItem
