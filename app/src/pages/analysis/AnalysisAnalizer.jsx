import { useState, useEffect } from 'react'
import MainButton from '../../components/mainButton.jsx'
import SecondaryButton from '../../components/secondaryButton.jsx'
import Input from '../../components/Input.jsx'
import '../../styles/palette.css'
import mainBackgroundRegisterLogin from '../../images/main-backgroundregisterlogin.jpg'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { handleNetworkError } from '../../components/TokenExpired'

export default function Analyzer() {
	const textColor = 'white'
	const borderColor = 'var(--talent-secondary)'
	const asteriskColor = 'var(--talent-highlight-background)'
	const navigate = useNavigate()
	const ruta = import.meta.env.VITE_BACKEND_URL
	const [loading, setLoading] = useState(false)
	const [loadingMessage, setLoadingMessage] = useState('')

	useEffect(() => {
		if (loading) {
			setLoadingMessage('Loading...')
		} else {
			setLoadingMessage('')
		}
	}, [loading])

	const [form, setForm] = useState({
		githubUser: '',
		githubToken: '',
	})

	const [errors, setErrors] = useState({})

	const { githubUser, githubToken } = form

	function onInputChange(e) {
		setForm({
			...form,
			[e.target.name]: e.target.value,
		})
		setErrors({})
	}
	const [errorMessage, setErrorMessage] = useState(null);

	async function getAnalysisByName(githubUser) {
		const currentUserId = localStorage.getItem('userId')
		const uri = `/analysis`
		try {
			const response = await axios.get(ruta + uri)
			const existingAnalysis = response.data.data.find(item => item.githubUsername === githubUser);
			if (existingAnalysis) {
				return existingAnalysis._id;
			} else {
				// Maneja el caso en que no se encuentra el análisis
				return null;
			}
		} catch (error) {
			setErrorMessage('Unable to connect to the server. Please try again later.')
			console.error('Error while saving  history of current analysis: ', error)
			throw error
		}
	}

	async function saveAnalysisHistory(currentAnalysisId) {
		const currentUserId = localStorage.getItem('userId')
		const uri = `/user/${currentUserId}/history`
		try {
			const response = await axios.post(ruta + uri, { analysisId: currentAnalysisId })
			return response.data.data
		} catch (error) {
			setErrorMessage('Unable to connect to the server. Please try again later.')
			console.error('Error while saving  history of current analysis: ', error)
			throw error
		}
	}

	async function updateAnalysisHistory(currentAnalysisId) {
		const currentUserId = localStorage.getItem('userId')
		const history = await getHistory(currentAnalysisId)
		if (history) {
			const historyId = history._id
			const uri = `/user/${currentUserId}/history/${historyId}`
			try {
				const currentDate = new Date().toISOString()
				const isFavorite = history.favorite
				const response = await axios.patch(ruta + uri, {
					date: currentDate,
					favorite: isFavorite,
					userId: currentUserId,
					analysisId: currentAnalysisId,
				})
				return response.data.data
			} catch (error) {
				setErrorMessage('Unable to connect to the server. Please try again later.')
				console.error('Error while saving  history of current analysis: ', error)
				throw error
			}
		} else {
			saveAnalysisHistory(currentAnalysisId)
		}
	}

	async function getHistory(currentAnalysisId) {
		const currentUserId = localStorage.getItem('userId')
		const uri = `/user/${currentUserId}/history`
		try {
			const response = await axios.get(ruta + uri)
			const data = response.data.data
			const filteredHistory = data.filter((item) => item.analysisId === currentAnalysisId)
			return filteredHistory[0]
		
		} catch (error) {
			throw error
		}
	}

	async function getAnalysis() {
		const token = localStorage.getItem('access_token')
		try {
			const userResponse = await fetch(`${ruta}/analysis/github/${form.githubUser}`, {
				headers: {
					Authorization: `${token}`,
				},
			})
			if (userResponse.ok) {
				const userData = await userResponse.json()
				updateAnalysisHistory(userData.data._id)
				setLoadingMessage('')
				navigate('/analysis/' + form.githubUser)
				return userData
			}
		} catch (error) {
			console.error('An error occurred:', error)
			return null
		}
	}

	async function postAnalysis() {
		const token = localStorage.getItem('access_token')
		try {
			const response = await fetch(`${ruta}/analysis`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `${token}`,
				},
				body: JSON.stringify({
					username: form.githubUser,
					apikey: form.githubToken,
				}),
			})
	
			setLoading(false)
			if (response.status == 400) {
				setErrors({
					githubUser: (
						<span style={{ color: 'var(--talent-highlight)', fontSize: '15px' }}>
							{'--->'}This user does not exist in Github
						</span>
					),
				})
			}
			if (!response.ok) {
				console.error('An error occurred:', await response.text())
				return null
			}
	
			navigate('/analysis/' + form.githubUser)
			return response
		} catch (error) {
			setLoadingMessage('Unable to connect to the server. Please try again later.')
			handleNetworkError(error, navigate)
			return null
		}
	}

	async function handleSubmit(e) {
		e.preventDefault()
	
		if (!form.githubUser) {
			setErrors({
				githubUser: form.githubUser ? (
					''
				) : (
					<span style={{ color: 'var(--talent-highlight)', fontSize: '15px' }}>
						Github User is required
					</span>
				),
			})
			return
		}
	
		setLoading(true)
		const existingAnalysis = await getAnalysisByName(form.githubUser);
		if (existingAnalysis === null || existingAnalysis === undefined) {
			await postAnalysis();
		} else {
			const history = await getHistory(existingAnalysis);

			if (history === null || history === undefined) {
				await saveAnalysisHistory(existingAnalysis);
				await getAnalysis();
			} else {
				await getAnalysis();
			}
		}
	}

	let mobile = false
	if (window.screen.width < 500) {
		mobile = true
	}

	return (
		<div
			className='h-screen flex flex-col justify-center bg-fixed'
			style={{
				backgroundImage: `url(${mainBackgroundRegisterLogin})`,
				backgroundSize: 'cover',
			}}>
			<div
				className='w-10/12 h-10/12 p-6 self-center rounded shadow-md flex flex-col justify-between'
				style={{
					backgroundColor: 'rgba(0, 0, 0, 0.5)',
					marginLeft: '100',
					marginRight: '100',
					borderColor: borderColor,
					borderWidth: '1px',
				}}>
				<div>
					<h2 className='text-2xl font-bold text-center mb-4 text-white'>
						Enter the required data from the candidate you want to analyze and wait to
						get your results!
					</h2>
					{loadingMessage && (
						<div className='text-center text-white'>{loadingMessage}</div>
					)}
					<form onSubmit={handleSubmit}>
						<div className='input-analysis-container '>
							{Input({
								name: 'Github User',
								value: githubUser,
								editable: true,
								placeholder: 'Enter candidate GitHub username',
								onChange: (e) => onInputChange(e),
								formName: 'githubUser',
								col: mobile,
							})}
							{errors.githubUser && (
								<p className='text-red-500 text-xs italic'>{errors.githubUser}</p>
							)}
							{errors.errors && errors.errors[0] && errors.errors[0].detail && (
								<p className='text-red-500'>{errors.errors[0].detail}</p>
							)}
						</div>

						<div className='input-analysis-container '>
							{Input({
								name: 'Github Token (Optional)',
								value: githubToken,
								editable: true,
								placeholder: 'Enter candidate GitHub token ',
								onChange: (e) => onInputChange(e),
								formName: 'githubToken',
								col: mobile,
							})}
							
							{errors.githubToken && (
								<p className='text-red-500 text-xs italic'>{errors.githubToken}</p>
							)}
						</div>

						<h2 className='text-center text-white mt-10'>
							Remember that the analyzed data will remain stored in the website. Be
							catious who you are analyzing and ensure you obtain their permission
							beforehand.
						</h2>

						<div className='flex flex-row justify-around mt-8'>
							{MainButton('Analyze', '', handleSubmit)}
							{SecondaryButton('Cancel', '/representative/detail', '')}
							{SecondaryButton('Analyses list', '/analysis/list', '')}
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}
