import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Input from '../../components/Input'
import profile from '../../images/profile.jpg'
import mainBackground from '../../images/main-background2.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'
import DataTable from '../../components/DataTable.jsx'
import axios from 'axios'
import { useAuthContext } from '../../context/authContext'
import MainButton from '../../components/mainButton'
import SecondaryButton from '../../components/secondaryButton'
import NotificationListItem from '../../components/NotificationListItem.jsx'
import Modal from 'react-modal'

export default function CandidateNotificationDetail() {
	const [notifications, setNotifications] = useState([])
	const [showModal, setShowModal] = useState(false)
	const [selectedId, setSelectedId] = useState(null)

	const { isAuthenticated, logout } = useAuthContext()

	React.useEffect(() => {
		const fetchNotificationsData = async () => {
			try {
				if (isAuthenticated) {
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
		fetchNotificationsData()
	}, [isAuthenticated])

	React.useEffect(() => {
		if (notifications) {
			notifications.forEach((n) => {
				if (!n.seen) {
					setSeenNotification(n._id)
				}
			})
		}
	}, [notifications])

	const setSeenNotification = async (notificationId) => {
		try {
			if (isAuthenticated) {
				const currentUserId = localStorage.getItem('userId')
				const token = localStorage.getItem('access_token')
				if (currentUserId && token) {
					const response = await axios.patch(
						`${import.meta.env.VITE_BACKEND_URL}/user/${currentUserId}/notification/${notificationId}`,
						{
							id: notificationId,
							userId: currentUserId,
							seen: true,
						},
						{
							headers: {
								Authorization: `${token}`,
								'Content-type': 'application/json',
							},
						}
					)
				}
			}
		} catch (error) {
			console.error('Error setting notification data:', error.response.data.message)
		}
	}

	const deleteNotificationsData = async (notificationId) => {
		try {
			if (isAuthenticated) {
				const currentUserId = localStorage.getItem('userId')
				const token = localStorage.getItem('access_token')
				if (currentUserId && token) {
					const response = await axios.delete(
						`${import.meta.env.VITE_BACKEND_URL}/user/${currentUserId}/notification/${notificationId}`,
						{
							params: {
								userId: currentUserId,
							},
							headers: {
								Authorization: `${token}`,
							},
						}
					)

					setNotifications(notifications.filter((n) => n._id !== notificationId))
				}
			}
		} catch (error) {
			console.error('Error fetching notification data:', error.response.data.message)
		}
	}

	function getNotificationsList(notifications) {
		let n1 = notifications
			.filter((n) => !n.seen)
			.sort((a, b) => b.dateTime.localeCompare(a.dateTime))
			.map((n) => <NotificationListItem n={n} deleteNotification={deleteNotification} />)

		let n2 = notifications
			.filter((n) => n.seen)
			.sort((a, b) => b.dateTime.localeCompare(a.dateTime))
			.map((n) => <NotificationListItem n={n} deleteNotification={deleteNotification} />)

		return n1.concat(n2)
	}

	function deleteNotification(id) {
		setSelectedId(id)
		setShowModal(true)
	}

	return (
		<div
			className='flex flex-col justify-center p-10'
			style={{
				height: '100vh',
				backgroundAttachment: 'fixed',
				backgroundImage: `url(${mainBackground})`,
				backgroundSize: 'cover',
			}}>
			<div
				className='h-full w-10/12 rounded shadow-md flex flex-col justify-start self-center p-4 m-4 mb-4'
				style={{
					backgroundColor: 'rgba(0, 0, 0, 0.5)',
					borderColor: 'var(--talent-secondary)',
					borderWidth: '1px',
					backdropFilter: 'blur(8px)',
				}}>
				<h1 className='text-5xl text-center text-white m-10'>Notifications</h1>

				<div
					className='flex flex-col justify-between items-center h-max'
					style={{ overflowY: 'scroll' }}>
					<DataTable
						header={''}
						contentArray={notifications ? getNotificationsList(notifications) : []}
						editable={false}
					/>
				</div>
				<Modal
					isOpen={showModal}
					onRequestClose={() => setShowModal(false)}
					contentLabel='Delete Confirmation'
					style={{
						content: {
							width: '40%',
							height: '20%',
							margin: 'auto',
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'center',
							alignItems: 'center',
							backgroundColor: 'var(--talent-secondary)',
							borderRadius: '10px',
							color: 'white',
						},
					}}>
					<h2 style={{ marginBottom: '3%' }}>
						Are you sure you want to delete this notification?
					</h2>
					<div>
						<button
							onClick={() => {
								deleteNotificationsData(selectedId)
								setShowModal(false)
							}}
							style={{
								marginRight: '10px',
								padding: '10px',
								backgroundColor: 'var(--talent-highlight)',
								color: 'white',
								border: 'none',
								borderRadius: '5px',
							}}>
							Yes
						</button>
						<button
							onClick={() => setShowModal(false)}
							style={{
								padding: '10px',
								backgroundColor: 'var(--talent-black)',
								color: 'white',
								border: 'none',
								borderRadius: '5px',
							}}>
							No
						</button>
					</div>
				</Modal>
			</div>
		</div>
	)
}
