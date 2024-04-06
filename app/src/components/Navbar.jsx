import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import arrowLeft from '../images/arrowLeft.png'
import arrowRight from '../images/arrowRight.png'
import logoutIcon from '../images/logout.png'
import mail from '../images/mail.png'
import profile from '../images/profile.jpg'
import '../styles/navbar.css'
import Profile from '../pages/candidate/CandidateDetail'
import { useAuthContext } from '../context/authContext.jsx'
import axios from 'axios'
import Swal from 'sweetalert2'
import Logout from './swat/logout'

export default function Navbar() {
	const [expanded, setExpanded] = useState(false)
	const [userData, setUserData] = useState(null)
	const { isAuthenticated, logout } = useAuthContext()

	const opts = [
		{ Information: 0, Settings: 1 }, //Not logged
		{ Trends: 0, Subscription: 1, Information: 2, Settings: 3 }, //Candidate
		{
			Trends: 0,
			'My analysis': 1,
			'Team Search': 2,
			Subscription: 3,
			Information: 4,
			Settings: 5,
		}, //Representative
	]

	function getOptsNum(key) {
		let optsTemplate = 0 //Change for every case
		if (isAuthenticated && userData && userData.role === 'Candidate') {
			optsTemplate = 1
		}
		if (isAuthenticated && userData && userData.role === 'Representative') {
			optsTemplate = 2
		}

		let res = opts[optsTemplate][key]
		if (res === undefined) {
			res = -1
		}
		return res
	}

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
				console.error('Error fetching user data:', error)
			}
		}
		fetchUserData()
	}, [isAuthenticated])

	function move_hoverer(n) {
		let t = 130
		t += n * 64
		document.getElementById('navbar-hoverer').style.top = t + 'px'
	}

	function move_current(n) {
		let t = 130
		t += n * 64
		document.getElementById('navbar-current').style.top = t + 'px'
	}

	function toogleSideNav() {
		if (!expanded) {
			document.getElementById('sidenav').style.left = '-0px'
			document.getElementById('arrow-img').src = arrowLeft
			document.getElementById('sideNavButtonContainer').style.left = '325px'
			setExpanded(true)
		} else {
			document.getElementById('sidenav').style.left = '-325px'
			document.getElementById('arrow-img').src = arrowRight
			document.getElementById('sideNavButtonContainer').style.left = '325px'
			setExpanded(false)
		}
	}

	const subscription = isAuthenticated
		? userData && userData.role == 'Representative'
			? '/representative/subscription'
			: '/candidate/subscription'
		: '/login'

	return (
		<div className='sidenav' id='sidenav'>
			<div className='inner-sidenav'>
				<div className='flex justify-around'>
					<Link to='/'>
						<span className='logo'>IT TALENT</span>
					</Link>
				</div>
				<hr />
				<br />
				<div className='navbar-hoverer' id='navbar-hoverer'></div>
				<div className='navbar-current' id='navbar-current'></div>
				<>
					{userData && getOptsNum('Trends') !== -1 && (
						<Link
							to='/'
							onMouseEnter={() => move_hoverer(getOptsNum('Trends'))}
							onMouseDown={() => move_current(getOptsNum('Trends'))}
							className='link-container'>
							<span>ICON</span>
							<p>&nbsp;&nbsp;&nbsp;</p>
							<span>Trends</span>
						</Link>
					)}
					{userData && getOptsNum('My analysis') !== -1 && (
						<Link
							to='/analysis/analyze'
							onMouseEnter={() => move_hoverer(getOptsNum('My analysis'))}
							onMouseDown={() => move_current(getOptsNum('My analysis'))}
							className='link-container'>
							<span>ICON</span>
							<p>&nbsp;&nbsp;&nbsp;</p>
							<span>My analysis</span>
						</Link>
					)}
					{userData && getOptsNum('Team Search') !== -1 && (
						<Link
							to={`/searches/search`}
							onMouseEnter={() => move_hoverer(getOptsNum('Team Search'))}
							onMouseDown={() => move_current(getOptsNum('Team Search'))}
							className='link-container'>
							<span>ICON</span>
							<p>&nbsp;&nbsp;&nbsp;</p>
							<span>Team search</span>
						</Link>
					)}
					{userData && getOptsNum('Subscription') !== -1 && (
						<Link
							to={subscription}
							onMouseEnter={() => move_hoverer(getOptsNum('Subscription'))}
							onMouseDown={() => move_current(getOptsNum('Subscription'))}
							className='link-container'>
							<span>ICON</span>
							<p>&nbsp;&nbsp;&nbsp;</p>
							<span>Subscription</span>
						</Link>
					)}
				</>
				<>
					{getOptsNum('Information') !== -1 && (
						<Link
							to='/support'
							onMouseEnter={() => move_hoverer(getOptsNum('Information'))}
							onMouseDown={() => move_current(getOptsNum('Information'))}
							className='link-container'>
							<span>ICON</span>
							<p>&nbsp;&nbsp;&nbsp;</p>
							<span>Information</span>
						</Link>
					)}
					{getOptsNum('Settings') !== -1 && (
						<Link
							to='/settings'
							onMouseEnter={() => move_hoverer(getOptsNum('Settings'))}
							onMouseDown={() => move_current(getOptsNum('Settings'))}
							className='link-container'>
							<span>ICON</span>
							<p>&nbsp;&nbsp;&nbsp;</p>
							<span>Settings</span>
						</Link>
					)}
				</>
				{isAuthenticated &&
					(userData && userData.role == 'Representative' ? (
						// Mostrar contenido para representante
						<div>
							<Link to='/representative/detail' className='profile-container'>
								<div className='profile-pic-container'>
									<img src={profile} className='profile-pic' />
								</div>
								<div className='profile-text'>
									<h1>{userData ? userData.username : ' - '}</h1>
									<h1 className='text-gray-500'>
										{userData ? userData.companyName : ' - '}
									</h1>
								</div>
							</Link>
							<button
								onClick={() => Logout(logout, navigate, userData.role)}
								className='logout'>
								<img src={logoutIcon} />
								{/* TODO code of petitions left*/}
							</button>
						</div>
					) : (
						// Mostrar contenido para usuario autenticado pero no representante
						<div>
							<Link to='/candidate/detail' className='profile-container'>
								<div className='profile-pic-container'>
									<img src={profile} className='profile-pic' />
								</div>
								<div className='profile-text'>
									<h1>{userData ? userData.fullName : ' - '}</h1>
								</div>
							</Link>
							<Link to='/candidate/notification/detail' className='mail'>
								<img src={mail} />
							</Link>
							{/* TODO code of mail*/}
							<div className='mail-amount'>
								<span>1</span>
							</div>
							<button
								onClick={() => Logout(logout, navigate, userData.role)}
								className='logout'>
								<img src={logoutIcon} />
							</button>
						</div>
					))}
			</div>
			<div className='sideNavButtonContainer' id='sideNavButtonContainer'>
				<img
					id='arrow-img'
					src={arrowRight}
					onClick={toogleSideNav}
					className='sideNavButton'
				/>
			</div>
			<div className='sidenav-highlight'></div>
		</div>
	)
}
