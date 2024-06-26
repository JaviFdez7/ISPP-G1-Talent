import React, { useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Input from '../../components/Input'
import profile from '../../images/profile.jpg'
import mainBackground from '../../images/main-background2.jpg'
import LatestHistory from '../../components/history/LatestHistory'
import SecondaryButton from '../../components/secondaryButton'
import axios from 'axios'
import { useAuthContext } from '../../context/authContext'
import LatestHistorySearch from '../../components/history/LatestHistorySearch'
import { handleNetworkError } from '../../components/TokenExpired'

export default function RepresentativeDetail() {
	const { isAuthenticated } = useAuthContext()
	const [userData, setUserData] = useState({})
	const [remainingSearches, setRemainingSearches] = useState(0)
	const [analysisHistoryData, setAnalysisHistoryData] = useState([
		{
			id: 1,
			date: '2024-03-10',
			name: 'Sample Analysis',
		},
	])
	const [searchHistoryData, setSearchHistoryData] = useState([
		{
			id: 1,
			date: '2024-03-10',
			name: 'Sample Search',
		},
	])
	let navigate = useNavigate()

	useEffect(() => {
		const fetchUserData = async () => {
			try {
				if (isAuthenticated) {
					const currentUserId = localStorage.getItem('userId')
					const token = localStorage.getItem('access_token')
					const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user`)
					const user = response.data.data.find((user) => user._id === currentUserId)
					setUserData(user)

					const subsciptionUser = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/subscriptions/${user._id}`,
					{
						headers: {
							'Content-type': 'application/json',
							Authorization: token,
						},
					}
					)
					setRemainingSearches(subsciptionUser.data.data.remainingSearches)
				}
			} catch (error) {
				console.error('Error fetching user data:', error.response.data.errors[0].detail)
				handleNetworkError(error, navigate)
			}
		}
		fetchUserData()
	}, [isAuthenticated])

	useEffect(() => {
		const fetchAnalysisHistoryData = async () => {
			try {
				if (isAuthenticated) {
					const currentUserId = localStorage.getItem('userId')
					const uri = `/user/${currentUserId}/history`
					const response = await axios.get(import.meta.env.VITE_BACKEND_URL + uri)
					const historyArray = response.data.data.map((item) => item)
					sortAndFormatHistory(historyArray)
					setAnalysisHistoryData(historyArray)
				}
			} catch (error) {
				console.error('Error fetching history data:', error.response.data.errors[0].detail)
				if (
					error.response.data.errors[0].detail ===
					'Error when getting the analysis by ID: jwt expired'
				) {
					console.error('Error fetching history data:', error)
				}
			}
		}
		fetchAnalysisHistoryData()
	}, [])

	useEffect(() => {
		const fetchSearchHistoryData = async () => {
			try {
				if (isAuthenticated) {
					const currentUserId = localStorage.getItem('userId')
					const uri = `/user/${currentUserId}/team_creator/history`
					const response = await axios.get(import.meta.env.VITE_BACKEND_URL + uri)
					const historySearchArray = response.data.data.map((item) => item)
					sortAndFormatHistory(historySearchArray)
					setSearchHistoryData(historySearchArray)
				}
			} catch (error) {
				console.error(
					'Error fetching history datadasdsadsadsa:',
					error.response.data.errors[0].detail
				)
				if (
					error.response.data.errors[0].detail ===
					'Error when getting the analysis by ID: jwt expired'
				) {
					console.error('Error fetching history data:', error)
				}
			}
		}
		fetchSearchHistoryData()
	}, [])

	function sortAndFormatHistory(historyList) {
		historyList.sort((a, b) => b.date - a.date)
		return historyList.map((history) => ({
			date: history.date.toString(),
		}))
	}

	return (
		<div
			className='flex flex-col bg-fixed'
			style={{
				backgroundImage: `url(${mainBackground})`,
				backgroundSize: 'cover',
				overflowY: 'scroll',
				height: '100vh',
			}}>
			<div
				className='flex flex-row justify-center items-center profile-header w-10/12 mt-20'
				style={{ marginLeft: '8%' }}>
				<div className='flex flex-col items-center'>
					<img
						src={
							userData && userData.profilePicture ? userData.profilePicture : profile
						}
						className='rounded-full border border-gray-300 profile-img'
						style={{
							objectFit: 'cover',
							objectPosition: 'center',
							width: '300px',
							height: '300px',
						}}
					/>
				</div>
				<div className='flex flex-col mt-10 w-fit'>
					<div className='profile-name-text text-center'>
						<h2>{userData && userData.username ? userData.username : ' - '}</h2>
					</div>
					<div className='flex flex-col w-full profile-info-text'>
						{Input({
							name: 'Company name',
							value: userData ? userData.companyName : ' - ',
							editable: false,
						})}
						<br></br>
						{Input({
							name: 'Phone number',
							value: userData ? userData.phone : ' - ',
							editable: false,
						})}
						<br></br>
						{Input({
							name: 'Corporative Email',
							value: userData ? userData.email : ' - ',
							editable: false,
						})}
						<br></br>
						{Input({
							name: 'Project Society Name',
							value: userData ? userData.projectSocietyName : ' - ',
							editable: false,
						})}
					</div>

					<div className='mt-8 self-center'>
						{SecondaryButton(
							'Update',
							`/representative/detail/edit/${userData._id}`,
							''
						)}
					</div>
				</div>
			</div>
			<br></br>
			<h3 className='profile-title'>Latest Actions</h3>
			<hr className='w-5/12 self-center'></hr>
			<br></br>
			<h2 className='text-white text-center' style={{ fontSize: '1.25em' }}>
				{remainingSearches !== null && remainingSearches !== undefined && `You have `}
				{remainingSearches !== null && remainingSearches !== undefined && (
					<span style={{ color: 'var(--talent-highlight)' }}>{remainingSearches}</span>
				)}
				{remainingSearches !== null &&
					remainingSearches !== undefined &&
					` remaining ${remainingSearches === 1 ? 'search' : 'searches'}`}
			</h2>
			<br></br>
			<br></br>
			<div className='flex flex-col justify-center w-8/12 self-center'>
				<LatestHistory
					header='Latest Analysis'
					data={analysisHistoryData}
					type='analysis'
				/>
				<br></br>
			</div>
			<div className='flex flex-col justify-center w-8/12 self-center'>
				<LatestHistorySearch
					header='Latest Search'
					data={searchHistoryData}
					type='searches'
				/>
				<br></br>
				<br></br>
			</div>
		</div>
	)
}
