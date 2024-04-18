import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import mainBackgroundRegisterLogin from '../../images/main-background2.jpg'
import Select from '../../components/Select.jsx'
import AnalysisHistoryItem from '../../components/history/AnalysisHistoryItem.jsx'
import { handleNetworkError } from '../../components/TokenExpired'
import { useNavigate } from 'react-router-dom'

export default function AnalysisList() {
	const borderColor = 'var(--talent-secondary)'
	const [dataArray, setDataArray] = useState([])
	const [errorMessage, setErrorMessage] = useState('')
	const [filter, setFilter] = useState('All')
	const [triggerUpdate, setTriggerUpdate] = useState(false)
	let navigate = useNavigate()

	const apiURL = import.meta.env.VITE_BACKEND_URL

	async function fetchDataFromEndpoint(analysisEndPoint) {
		try {
			const response = await axios.get(apiURL + analysisEndPoint)
			return response.data.data
		} catch (error) {
			handleNetworkError(error, navigate)
		}
	}

	useEffect(() => {
		const currentUserId = localStorage.getItem('userId')
		let uri
		if (filter === 'All') {
			uri = `/user/${currentUserId}/history`
		} else if (filter === 'Favorites') {
			uri = `/user/${currentUserId}/favorites`
		} else {
			uri = `/user/${currentUserId}/not_favorites`
		}
		fetchDataFromEndpoint(uri)
			.then((data) => {
				const newArray = data.map((item) => item)
				newArray.sort((a, b) => new Date(b.date) - new Date(a.date))
				setDataArray(newArray)
			})
			.catch((error) => {
				console.error('Error fetching history data:', error)
			})
	}, [filter, triggerUpdate])

	const updateList = () => {
		setTriggerUpdate(!triggerUpdate)
	}
	const changeFilter = (newFilter) => {
		setFilter(newFilter)
	}
	const formatDate = (date) => {
		const dateObject = new Date(date)

		const options = {
			year: 'numeric',
			month: '2-digit',
			day: '2-digit',
			hour: '2-digit',
			minute: '2-digit',
			second: '2-digit',
		}

		return dateObject.toLocaleString('en-US', options)
	}

	return (
		<section
			className='text-white body-font h-screen flex items-center justify-center'
			style={{
				backgroundImage: `url(${mainBackgroundRegisterLogin})`,
				backgroundSize: 'cover',
			}}>
			<div
				className='container mx-auto flex flex-col items-center text-center '
				style={{ height: '100vh', overflowY: 'scroll' }}>
				<div className='flex justify-between  w-full'>
					<div
						className='w-10/12 max-w-6xl h-100 p-1 mx-auto rounded shadow-md flex flex-col justify-between mt-10'
						style={{
							backgroundColor: 'rgba(0, 0, 0, 0.5)',
							marginLeft: '100',
							marginRight: '100',
							borderColor: borderColor,
							borderWidth: '1px',
							backdropFilter: 'blur(8px)',
							boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.3)',
						}}>
						<h6 className='text-3xl font-bold text-center text-white -5 mb-5 mt-5 '>
							Analysis History
						</h6>
						{errorMessage && (
							<div className='text-center text-white'>{errorMessage}</div>
						)}

						<Select
							label='Choose a filter: '
							allValues={['All', 'Favorites', 'Non favorites']}
							defaultValue={filter}
							functionToApply={changeFilter}
						/>
						<div className='mt-4 ml-2 mr-2'>
							{dataArray.map((item, index) => {
								const formattedDate = formatDate(item.date)
								return (
									<AnalysisHistoryItem
										key={index}
										item={item}
										formattedDate={formattedDate}
										triggerUpdate={updateList}
									/>
								)
							})}
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
