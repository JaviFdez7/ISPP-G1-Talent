import React, { useState } from 'react'
import { useAuthContext } from '../context/authContext.jsx'
import axios from 'axios'
import DataTable from '../components/DataTable.jsx'
import mainBackgroundRegisterLogin from '../images/main-background2.jpg'
import MainButton from '../components/mainButton.jsx'
import { handleNetworkError } from '../components/TokenExpired.jsx'
import { useNavigate } from 'react-router-dom'
import { Chart as ChartJS } from 'chart.js/auto'
import { Pie, Bar, Radar } from 'react-chartjs-2'

export default function Trends() {
	const borderColor = 'var(--talent-secondary)'

	const { isAuthenticated } = useAuthContext()
	const [trends, setTrends] = useState({})

	React.useEffect(() => {
		const fetchUserData = async () => {
			try {
				if (isAuthenticated) {
					const currentUserId = localStorage.getItem('userId')
					const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/trend`)
					const trends = response.data.data
					const token = localStorage.getItem('access_token')
					setTrends(trends)
				}
			} catch (error) {
				console.error('Error fetching user data:', error)
			}
		}
		fetchUserData()
	}, [isAuthenticated])

	let mobile = false
	if (window.screen.width < 500) {
		mobile = true
	}

	function randomNumberInRange(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min
	}

	function getListOfRandomColors(n) {
		const colors = []
		for (let i = 0; i < n; i++) {
			const randomColor = `rgb(${randomNumberInRange(0, 255) * 0.4}, ${randomNumberInRange(0, 255) * 0.4}, ${randomNumberInRange(0, 255) * 0.4})`
			colors.push(randomColor)
		}
		return colors
	}

	return (
		<section
			className='text-white flex flex-col items-center bg-fixed'
			style={{
				backgroundImage: `url(${mainBackgroundRegisterLogin})`,
				backgroundSize: 'cover',
			}}>
			<div
				className='container flex flex-col items-center w-10/12 h-full px-12 py-6 rounded shadow-md mt-20 mb-10'
				style={{
					backgroundColor: 'rgba(0, 0, 0, 0.5)',
					borderColor: borderColor,
					borderWidth: '1px',
				}}>
				<div
					className='flex justify-around w-full'
					style={{
						flexDirection: mobile ? 'column' : 'row',
					}}>
					<div
						className='w-full flex flex-col justify-around'
						style={{
							width: mobile ? '100%' : '30%',
						}}>
						<h6 className='text-2xl font-bold text-center text-white mt-6 mb-6'>
							Most Solicitated Technologies
						</h6>
						{trends.mostSolicitatedTechnologies && (
							<Pie
								data={{
									labels: trends.mostSolicitatedTechnologies.map(
										(item) => item[0]
									),
									datasets: [
										{
											label: '',
											data: trends.mostSolicitatedTechnologies.map(
												(item) => item[1]
											),
											backgroundColor: getListOfRandomColors(
												trends.mostSolicitatedTechnologies.length
											),
										},
									],
								}}></Pie>
						)}
					</div>
					{trends.mostSolicitatedTechnologies && (
						<div
							className='w-full flex flex-col justify-around mt-10'
							style={{ width: mobile ? '100%' : '30.00%' }}>
							<div className='analysis-data-container space-y-10'>
								<div>
									<p className='analysis-subtitle'>#1</p>
									<p className='analysis-name'>
										{
											trends.mostSolicitatedTechnologies.sort(
												(a, b) => b[1] - a[1]
											)[0][0]
										}
									</p>
								</div>
								{trends.mostSolicitatedTechnologies.length > 1 && (
									<div>
										<p className='analysis-subtitle'>#2</p>
										<p className='analysis-text'>
											{
												trends.mostSolicitatedTechnologies.sort(
													(a, b) => b[1] - a[1]
												)[1][0]
											}
										</p>
									</div>
								)}
								{trends.mostSolicitatedTechnologies.length > 2 && (
									<div>
										<p className='analysis-subtitle'>#3</p>
										<p className='analysis-text'>
											{
												trends.mostSolicitatedTechnologies.sort(
													(a, b) => b[1] - a[1]
												)[2][0]
											}
										</p>
									</div>
								)}
							</div>
						</div>
					)}
				</div>
				<div
					className='flex justify-around w-full'
					style={{
						flexDirection: mobile ? 'column' : 'row',
					}}>
					{trends.mostSolicitatedLanguages && (
						<div
							className='w-full flex flex-col justify-around mt-10'
							style={{ width: mobile ? '100%' : '30.00%' }}>
							<div className='analysis-data-container space-y-10'>
								<div>
									<p className='analysis-subtitle'>#1</p>
									<p className='analysis-name'>
										{
											trends.mostSolicitatedLanguages.sort(
												(a, b) => b[1] - a[1]
											)[0][0]
										}
									</p>
								</div>
								{trends.mostSolicitatedLanguages.length > 1 && (
									<div>
										<p className='analysis-subtitle'>#2</p>
										<p className='analysis-text'>
											{
												trends.mostSolicitatedLanguages.sort(
													(a, b) => b[1] - a[1]
												)[1][0]
											}
										</p>
									</div>
								)}
								{trends.mostSolicitatedLanguages.length > 2 && (
									<div>
										<p className='analysis-subtitle'>#3</p>
										<p className='analysis-text'>
											{
												trends.mostSolicitatedLanguages.sort(
													(a, b) => b[1] - a[1]
												)[2][0]
											}
										</p>
									</div>
								)}
							</div>
						</div>
					)}
					<div
						className='w-full flex flex-col justify-around'
						style={{
							width: mobile ? '100%' : '30%',
						}}>
						<h6 className='text-2xl font-bold text-center text-white mt-6 mb-6'>
							Most Solicitated Languages
						</h6>
						{trends.mostSolicitatedLanguages && (
							<Pie
								data={{
									labels: trends.mostSolicitatedLanguages.map((item) => item[0]),
									datasets: [
										{
											label: '',
											data: trends.mostSolicitatedLanguages.map(
												(item) => item[1]
											),
											backgroundColor: getListOfRandomColors(
												trends.mostSolicitatedLanguages.length
											),
										},
									],
								}}></Pie>
						)}
					</div>
				</div>
				<div
					className='flex justify-around w-full mt-10'
					style={{
						flexDirection: mobile ? 'column' : 'row',
					}}>
					<div
						className='w-full flex flex-col justify-around'
						style={{
							width: mobile ? '100%' : '30%',
						}}>
						<h6 className='text-2xl font-bold text-center text-white mt-6 mb-6'>
							Most Solicitated Fields
						</h6>
						{trends.mostSolicitatedFields && (
							<Pie
								data={{
									labels: trends.mostSolicitatedFields.map((item) => item[0]),
									datasets: [
										{
											label: '',
											data: trends.mostSolicitatedFields.map(
												(item) => item[1]
											),
											backgroundColor: getListOfRandomColors(
												trends.mostSolicitatedFields.length
											),
										},
									],
								}}></Pie>
						)}
					</div>
					{trends.mostSolicitatedFields && (
						<div
							className='w-full flex flex-col justify-around mt-10'
							style={{ width: mobile ? '100%' : '30.00%' }}>
							<div className='analysis-data-container space-y-10'>
								<div>
									<p className='analysis-subtitle'>#1</p>
									<p className='analysis-name'>
										{
											trends.mostSolicitatedFields.sort(
												(a, b) => b[1] - a[1]
											)[0][0]
										}
									</p>
								</div>
								{trends.mostSolicitatedFields.length > 1 && (
									<div>
										<p className='analysis-subtitle'>#2</p>
										<p className='analysis-text'>
											{
												trends.mostSolicitatedFields.sort(
													(a, b) => b[1] - a[1]
												)[1][0]
											}
										</p>
									</div>
								)}
								{trends.mostSolicitatedFields.length > 2 && (
									<div>
										<p className='analysis-subtitle'>#3</p>
										<p className='analysis-text'>
											{
												trends.mostSolicitatedFields.sort(
													(a, b) => b[1] - a[1]
												)[2][0]
											}
										</p>
									</div>
								)}
							</div>
						</div>
					)}
				</div>
			</div>
			<div
				className='container flex flex-col items-center w-10/12 h-full px-12 py-6 rounded shadow-md mt-20 mb-10'
				style={{
					backgroundColor: 'rgba(0, 0, 0, 0.5)',
					borderColor: borderColor,
					borderWidth: '1px',
				}}>
				<div
					className='flex justify-around w-full'
					style={{
						flexDirection: mobile ? 'column' : 'row',
					}}>
					<div
						className='w-full flex flex-col justify-around items-center'
						style={{
							width: mobile ? '100%' : '30%',
						}}>
						<h6 className='text-2xl font-bold text-center text-white mt-6 mb-6'>
							Most Used Languages
						</h6>
						{trends.mostUsedLanguages && (
							<Pie
								data={{
									labels: trends.mostUsedLanguages.map((item) => item[0]),
									datasets: [
										{
											label: '',
											data: trends.mostUsedLanguages.map((item) => item[1]),
											backgroundColor: getListOfRandomColors(
												trends.mostUsedLanguages.length
											),
										},
									],
								}}></Pie>
						)}
						{trends.mostUsedLanguages && (
							<div
								className='w-full flex flex-col justify-around mt-10'
								style={{ width: mobile ? '100%' : '80.00%' }}>
								<div className='analysis-data-container space-y-10'>
									<div>
										<p className='analysis-subtitle'>#1</p>
										<p className='analysis-name'>
											{
												trends.mostUsedLanguages.sort(
													(a, b) => b[1] - a[1]
												)[0][0]
											}
										</p>
									</div>
									{trends.mostUsedLanguages.length > 1 && (
										<div>
											<p className='analysis-subtitle'>#2</p>
											<p className='analysis-text'>
												{
													trends.mostUsedLanguages.sort(
														(a, b) => b[1] - a[1]
													)[1][0]
												}
											</p>
										</div>
									)}
									{trends.mostUsedLanguages.length > 2 && (
										<div>
											<p className='analysis-subtitle'>#3</p>
											<p className='analysis-text'>
												{
													trends.mostUsedLanguages.sort(
														(a, b) => b[1] - a[1]
													)[2][0]
												}
											</p>
										</div>
									)}
								</div>
							</div>
						)}
					</div>
					<div
						className='w-full flex flex-col justify-around items-center'
						style={{
							width: mobile ? '100%' : '30%',
						}}>
						<h6 className='text-2xl font-bold text-center text-white mt-6 mb-6'>
							Most Used Technologies
						</h6>
						{trends.mostUsedTechnologies && (
							<Pie
								data={{
									labels: trends.mostUsedTechnologies.map((item) => item[0]),
									datasets: [
										{
											label: '',
											data: trends.mostUsedTechnologies.map(
												(item) => item[1]
											),
											backgroundColor: getListOfRandomColors(
												trends.mostUsedTechnologies.length
											),
										},
									],
								}}></Pie>
						)}
						{trends.mostUsedTechnologies && (
							<div
								className='w-full flex flex-col justify-around mt-10'
								style={{ width: mobile ? '100%' : '80.00%' }}>
								<div className='analysis-data-container space-y-10'>
									<div>
										<p className='analysis-subtitle'>#1</p>
										<p className='analysis-name'>
											{
												trends.mostUsedTechnologies.sort(
													(a, b) => b[1] - a[1]
												)[0][0]
											}
										</p>
									</div>
									{trends.mostUsedTechnologies.length > 1 && (
										<div>
											<p className='analysis-subtitle'>#2</p>
											<p className='analysis-text'>
												{
													trends.mostUsedTechnologies.sort(
														(a, b) => b[1] - a[1]
													)[1][0]
												}
											</p>
										</div>
									)}
									{trends.mostUsedTechnologies.length > 2 && (
										<div>
											<p className='analysis-subtitle'>#3</p>
											<p className='analysis-text'>
												{
													trends.mostUsedTechnologies.sort(
														(a, b) => b[1] - a[1]
													)[2][0]
												}
											</p>
										</div>
									)}
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
			<div
				className='container flex flex-col items-center w-10/12 h-full px-12 py-6 rounded shadow-md mt-20 mb-10'
				style={{
					backgroundColor: 'rgba(0, 0, 0, 0.5)',
					borderColor: borderColor,
					borderWidth: '1px',
				}}>
				<div
					className='flex justify-around w-full items-center'
					style={{
						flexDirection: mobile ? 'column' : 'row',
					}}>
					<div
						className='w-full flex flex-col justify-around'
						style={{
							width: mobile ? '100%' : '30%',
						}}>
						<h6 className='text-2xl font-bold text-center text-white mt-6 mb-6'>
							Most Ocupated Fields
						</h6>
						{trends.mostOcupatedFields && (
							<Pie
								data={{
									labels: trends.mostOcupatedFields.map((item) => item[0]),
									datasets: [
										{
											label: '',
											data: trends.mostOcupatedFields.map((item) => item[1]),
											backgroundColor: getListOfRandomColors(
												trends.mostOcupatedFields.length
											),
										},
									],
								}}></Pie>
						)}
					</div>
					{trends.yearsOfExperienceMean && (
						<div
							className='analysis-data-container space-y-10 h-1/2 mt-10'
							style={{
								width: mobile ? '100%' : '25%',
							}}>
							<div className='flex flex-col'>
								<p className='analysis-subtitle'>Average Years Of Experience</p>
								<p className='analysis-name'>{trends.yearsOfExperienceMean}</p>
							</div>
						</div>
					)}
				</div>
			</div>
			<div
				className='container flex flex-col items-center w-10/12 h-full px-12 py-6 rounded shadow-md mt-20 mb-10'
				style={{
					backgroundColor: 'rgba(0, 0, 0, 0.5)',
					borderColor: borderColor,
					borderWidth: '1px',
				}}>
				<div
					className='flex justify-around w-full items-center'
					style={{
						flexDirection: mobile ? 'column' : 'row',
					}}>
					<div
						className='w-full flex flex-col justify-around'
						style={{
							width: mobile ? '100%' : '30%',
						}}>
						<h6 className='text-2xl font-bold text-center text-white mt-6 mb-6'>
							Most Popular Repositories
						</h6>
						{trends.topRepositories && (
							<Bar
								data={{
									labels: trends.topRepositories.map((item) => item.name),
									datasets: [
										{
											label: '',
											data: trends.topRepositories.map((item) => item.stars),
											backgroundColor: getListOfRandomColors(
												trends.topRepositories.length > 7
													? 7
													: trends.topRepositories.length
											),
										},
									],
								}}></Bar>
						)}
					</div>
					<div
						className='w-full flex flex-col justify-around'
						style={{
							width: mobile ? '100%' : '30%',
						}}>
						<h6 className='text-2xl font-bold text-center text-white mt-6 mb-6'>
							Most Forked Repositories
						</h6>
						{trends.topRepositories && (
							<Bar
								data={{
									labels: trends.topRepositories.map((item) => item.name),
									datasets: [
										{
											label: '',
											data: trends.topRepositories.map((item) => item.forks),
											backgroundColor: getListOfRandomColors(
												trends.topRepositories.length > 7
													? 7
													: trends.topRepositories.length
											),
										},
									],
								}}></Bar>
						)}
					</div>
				</div>
			</div>
		</section>
	)
}
