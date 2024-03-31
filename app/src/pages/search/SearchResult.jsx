import React from 'react'
import DataTableVertical from '../../components/DataTableVertical.jsx'
import axios from 'axios'
import profile from '../../images/profile.jpg'
import { useEffect, useState } from 'react'
import DropdownComponent from '../../components/DropDown.jsx'
import mainBackgroundRegisterLogin from '../../images/main-background2.jpg'
import MainButton from '../../components/mainButton.jsx'
import { Link, useParams } from 'react-router-dom'

export default function SearchResult() {
	const [error, setError] = useState(false)
	const [errorMessage, setErrorMessage] = useState('')
	const apiURL = import.meta.env.VITE_BACKEND_URL
	const { searchId } = useParams()

	const [teamData, setTeamData] = useState(null)

	async function fetchDataFromEndpoint(searchId) {
		try {
			const token = localStorage.getItem('access_token')
			const config = {
				headers: { Authorization: `${token}` },
			}
			const response = await axios.get(apiURL + '/team-creator/' + searchId, config)
			setTeamData(response.data)
			setError(false)
			return response.data
		} catch (error) {
			if (error.message && error.message.includes('Network Error')) {
				setErrorMessage(
					'Unable to connect to the server. Please make sure the server is running and accepting connections.'
				)
			} else if (error.response) {
				if (error.response.status === 500) {
					setErrorMessage('Internal server error. Please try again later.')
				} else {
					setErrorMessage('An unknown error occurred. Please try again later.')
				}
			} else {
				setErrorMessage('An unknown error occurred. Please try again later.')
			}
			setError(true)
		}
	}

	useEffect(() => {
		fetchDataFromEndpoint(searchId)
	}, [searchId])

	useEffect(() => {
		if (error) {
			console.log(errorMessage)
		}
	}, [error, errorMessage])

	return (
		<section
			className='text-white flex flex-row justify-center bg-fixed h-screen'
			style={{
				backgroundImage: `url(${mainBackgroundRegisterLogin})`,
				backgroundSize: 'cover',
				overflowY: 'scroll',
			}}>
			<div className='container flex flex-col items-center w-10/12 h-full '>
				{teamData &&
					teamData.profiles.map((team, index) => (
						<DropdownComponent key={index} name={`Search Result ${index + 1}`}>
							<div className='flex flex-col items-center w-full' key={index}>
								<div>
									<h6 className='text-2xl font-bold text-center text-white mt-5 mb-5'>
										Filter Parameters
									</h6>
									<DataTableVertical
										data={[
											{
												header: 'Technologies',
												content: team.profileRequested.technologies
													? team.profileRequested.technologies.join(', ')
													: '',
											},
											{
												header: 'Languages',
												content: team.profileRequested.languages
													? team.profileRequested.languages.join(', ')
													: '',
											},
											{
												header: 'Field',
												content: team.profileRequested.field
													? team.profileRequested.field
													: '',
											},
											{
												header: 'Years of Experience',
												content: team.profileRequested.yearsOfExperience,
											},
										]}
									/>
								</div>
								{Array.isArray(team.recommendedCandidates) &&
								team.recommendedCandidates.length > 0 ? (
									team.recommendedCandidates.map((candidate, candidateIndex) => (
										<div key={candidateIndex}>
											<h6 className='text-1xl font-bold text-center text-white mt-5 mb-5'>
												Filtered Candidate {candidateIndex + 1}
											</h6>
											<DataTableVertical
												data={[
													{
														header: 'Github username',
														content: candidate.github_username,
													},
													{
														header: 'Technologies',
														content: Array.isArray(
															candidate.technologies
														)
															? candidate.technologies.join(', ')
															: '',
													},
													{
														header: 'Languages',
														content: Array.isArray(candidate.languages)
															? candidate.languages.join(', ')
															: '',
													},
													{
														header: 'Field',
														content: Array.isArray(candidate.field)
															? candidate.field.join(', ')
															: '',
													},
													{
														header: 'Years of Experience',
														content: candidate.yearsOfExperience,
													},
												]}
											/>
											<div
												style={{
													display: 'flex',
													justifyContent: 'center',
													alignItems: 'center',
												}}>
												{/*<Link to={`/analysis/${candidate.github_username}`} className="mt-10" style={{ textDecoration: 'underline' }}>
                    View Analysis
                </Link>*/}
											</div>
										</div>
									))
								) : (
									<h6 className='text-2xl font-bold text-center text-white mt-5 mb-5'>
										No results for the search, please try different filters
									</h6>
								)}
							</div>
						</DropdownComponent>
					))}

				<div className='flex justify-center mt-10 mb-10'>
					{MainButton('Back to Search', `/searches/search`, '')}
				</div>
				{error && <p>{errorMessage}</p>}
			</div>
		</section>
	)
}
