import React, { useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Input from '../../components/Input'
import profile from '../../images/profile.jpg'
import mainBackground from '../../images/main-background2.jpg'
import LatestHistory from '../../components/history/LatestHistory'
import SecondaryButton from '../../components/secondaryButton'
import axios from 'axios'
import { useAuthContext } from '../../context/authContext'

export default function RepresentativeDetail() {
	const { isAuthenticated } = useAuthContext()
	const [userData, setUserData] = useState({})
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
					const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user`)
					const user = response.data.data.find((user) => user._id === currentUserId)
					setUserData(user)
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
				console.error('Error fetching history data:', error)
			}
		}
		fetchAnalysisHistoryData()
	}, [])

	function sortAndFormatHistory(historyList) {
		historyList.sort((a, b) => b.date - a.date)
		return historyList.map((history) => ({
			date: history.date.toString(),
		}))
	}

	function sortAndFormatHistory(historyList) {
		historyList.sort((a, b) => b.date - a.date)
		return historyList.map((history) => ({
			date: history.date.toString(),
		}))
	}

	console.log('dededede' + userData.profilePicture)
	return (
		<div
			className='flex flex-col'
			style={{
				backgroundImage: `url(${mainBackground})`,
				backgroundSize: 'cover',
				overflowY: 'scroll',
				height: '100vh',
			}}>
			<div className='flex flex-row justify-center items-center profile-header w-10/12 mt-20'>
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
			<br></br>
			<br></br>
			<div className='flex flex-col justify-center w-8/12 self-center'>
				<LatestHistory
					header='Latest Analysis'
					data={analysisHistoryData}
					type='analysis'
				/>
				<br></br>
				<br></br>
			</div>
		</div>
	)
}
