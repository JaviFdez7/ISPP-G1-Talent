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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faArrowTrendUp,
	faCrown,
	faCircleInfo,
	faGear,
	faUsers,
	faMagnifyingGlassChart,
} from '@fortawesome/free-solid-svg-icons'

import { useLocation } from 'react-router-dom'

export default function Navbar() {
	const { subscription: authSubscription } = useAuthContext()
	const { subscription } = useAuthContext()
	const [expanded, setExpanded] = useState(false)
	const [userData, setUserData] = useState(null)
	const [notifications, setNotifications] = useState(0)
	const [nonRead, setNonRead] = useState(0)
	const [notificationsGuard, setNotificationsGuard] = useState(false)
	const { isAuthenticated, logout } = useAuthContext()
	const currentUserId2 = localStorage.getItem('userId')
	const location = useLocation()
	const opts = [
		{ Information: 0, Settings: 1 },
		{ Trends: 0, Subscription: 1, Information: 2, Settings: 3 },
		{
			Trends: 0,
			Analysis: 1,
			'Team Search': 2,
			Subscription: 3,
			Information: 4,
			Settings: 5,
		},
	]

	function getOptsNum(key) {
		let optsTemplate = 0
		if (isAuthenticated && userData && userData.role === 'Candidate') {
			optsTemplate = 1
		}
		if (isAuthenticated && userData && userData.role === 'Representative') {
			optsTemplate = 2
		}
	
		let res = opts[optsTemplate][key]
		if (res === undefined) {
			res = -1
		} else if (key !== 'Trends' && subscription !== 'Pro plan' && res > opts[optsTemplate]['Trends']) {
			res -= 1
		}
		return res
	}

	async function fetchNotificationsData() {
		try {
			if (isAuthenticated && userData && userData.role === 'Candidate') {
				const currentUserId = localStorage.getItem('userId')
				const token = localStorage.getItem('access_token')
				if (currentUserId && token) {
					const response = await axios.get(
						`${import.meta.env.VITE_BACKEND_URL}/user/${currentUserId}/notification`,
						{
							params: {
								userId: currentUserId,
							},
							headers: {
								'Content-type': 'application/json',
								Authorization: `${token}`,
							},
						}
					)
					setNotifications(response.data.data)
				}
			}
		} catch (error) {
			console.error('Error fetching notification data:', error.response.data.message)
		}
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
	}, [isAuthenticated, location.pathname])

	useEffect(() => {
		if (isAuthenticated && userData && userData.role === 'Candidate') {
			fetchNotificationsData()
			if (notificationsGuard) {
				setNotificationsGuard(false)
				setInterval(fetchNotificationsData, 60000)
			} else {
				setNotificationsGuard(true)
			}
		}
	}, [userData])

	useEffect(() => {
		if (!notifications) {
			return
		}

		let num = 0
		notifications.forEach((n) => {
			if (!n.seen) {
				num += 1
			}
		})
		setNonRead(num)
	}, [notifications])

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
			document.getElementById('sideNavButtonContainer').style.left = '285px'
			setExpanded(true)
		} else {
			document.getElementById('sidenav').style.left = '-325px'
			document.getElementById('arrow-img').src = arrowRight
			document.getElementById('sideNavButtonContainer').style.left = '325px'
			setExpanded(false)
		}
	}

	const subscription2 = isAuthenticated
		? userData && userData.role == 'Representative'
			? '/representative/subscription'
			: '/candidate/subscription'
		: '/login'
	if (authSubscription) {
		if (authSubscription === 'No subscription') {
			return null
		}
	}
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
				{userData && getOptsNum('Trends') !== -1 && subscription === 'Pro plan' && (
					<Link
						to='/trends'
						onMouseEnter={() => move_hoverer(getOptsNum('Trends'))}
						onMouseDown={() => move_current(getOptsNum('Trends'))}
						className='link-container'>
						<span>
							<FontAwesomeIcon icon={faArrowTrendUp} />
						</span>
						<p>&nbsp;&nbsp;&nbsp;</p>
						<span>Trends</span>
					</Link>
				)}
					{userData && getOptsNum('Analysis') !== -1 && (
						<Link
							to='/analysis/analyze'
							onMouseEnter={() => move_hoverer(getOptsNum('Analysis'))}
							onMouseDown={() => move_current(getOptsNum('Analysis'))}
							className='link-container'>
							<span>
								<FontAwesomeIcon icon={faMagnifyingGlassChart} />
							</span>
							<p>&nbsp;&nbsp;&nbsp;</p>
							<span>Analysis</span>
						</Link>
					)}
					{userData && getOptsNum('Team Search') !== -1 && (
						<Link
							to={`/searches/search`}
							onMouseEnter={() => move_hoverer(getOptsNum('Team Search'))}
							onMouseDown={() => move_current(getOptsNum('Team Search'))}
							className='link-container'>
							<span>
								<FontAwesomeIcon icon={faUsers} />
							</span>
							<p>&nbsp;&nbsp;&nbsp;</p>
							<span>Team search</span>
						</Link>
					)}
					{userData && getOptsNum('Subscription') !== -1 && (
						<Link
							to={subscription2}
							onMouseEnter={() => move_hoverer(getOptsNum('Subscription'))}
							onMouseDown={() => move_current(getOptsNum('Subscription'))}
							className='link-container'>
							<span>
								<FontAwesomeIcon icon={faCrown} />
							</span>
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
							<span>
								<FontAwesomeIcon icon={faCircleInfo} />
							</span>
							<p>&nbsp;&nbsp;&nbsp;</p>
							<span>Information</span>
						</Link>
					)}
				</>
				{isAuthenticated &&
					(userData && userData.role == 'Representative' ? (
						<div>
							<Link to='/representative/detail' className='profile-container'>
								<div className='profile-pic-container'>
									<img
										src={
											userData && userData.profilePicture
												? userData.profilePicture
												: profile
										}
										className='profile-pic'
										style={{
											objectFit: 'cover',
											objectPosition: 'center',
											widthper: '60px',
											height: '80px',
										}}
									/>
								</div>
								<div
									className='profile-text'
									style={{
										flex: 1,
										marginLeft: '10px',
										maxWidth: 'calc(100% - 110px)',
									}}>
									<h1
										style={{
											overflow: 'hidden',
											textOverflow: 'ellipsis',
											whiteSpace: 'nowrap',
										}}>
										{userData ? userData.username : ' - '}
									</h1>
									<h1
										className='text-gray-500'
										style={{
											overflow: 'hidden',
											textOverflow: 'ellipsis',
											whiteSpace: 'nowrap',
										}}>
										{userData ? userData.companyName : ' - '}
									</h1>
									<h1
										className='text-gray-500'
										style={{
											overflow: 'hidden',
											textOverflow: 'ellipsis',
											whiteSpace: 'nowrap',
										}}>
										{userData ? subscription : ' - '}
									</h1>
								</div>
							</Link>
							<button
								onClick={() => Logout(logout, navigate, userData.role)}
								className='logout'>
								<img src={logoutIcon} />
							</button>
						</div>
					) : (
						<div>
							<Link
								to='/candidate/detail'
								className='profile-container'
								style={{ display: 'flex', justifyContent: 'space-between' }}>
								<div className='profile-pic-container'>
									<img
										src={
											userData && userData.profilePicture
												? userData.profilePicture
												: profile
										}
										className='profile-pic'
										style={{
											objectFit: 'cover',
											objectPosition: 'center',
											widthper: '60px',
											height: '80px',
										}}
									/>
								</div>
								<div
									className='profile-text'
									style={{
										flex: 1,
										marginLeft: '10px',
										maxWidth: 'calc(100% - 110px)',
									}}>
									<h1
										style={{
											overflow: 'hidden',
											textOverflow: 'ellipsis',
											whiteSpace: 'nowrap',
										}}>
										{userData ? userData.fullName : ' - '}
									</h1>
									<h1
										className='text-gray-500'
										style={{
											overflow: 'hidden',
											textOverflow: 'ellipsis',
											whiteSpace: 'nowrap',
										}}>
										{userData ? subscription : ' - '}
									</h1>
								</div>
							</Link>
							<Link to='/candidate/notification/detail' className='mail'>
								<img src={mail} />
							</Link>
							<div className='mail-amount'>
								<span>{nonRead}</span>
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
