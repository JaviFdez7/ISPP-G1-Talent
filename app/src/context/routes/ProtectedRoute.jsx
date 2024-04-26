import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuthContext } from '../authContext.jsx'
import { useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'

export default function ProtectedRoute({
	children,
	roles,
	allowUnauthenticated = false,
	checkSubscription = true,
}) {
	const { isAuthenticated } = useAuthContext()
	const navigate = useNavigate()
	const { subscription } = useAuthContext()
	const location = useLocation()

	useEffect(() => {
		const fetchUserData = async () => {
			try {
				if (isAuthenticated) {
					const currentUserId = localStorage.getItem('userId')
					const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user`)
					const user = response.data.data.find((user) => user._id === currentUserId)

					if (!roles.includes(user.role)) {
						navigate('/')
					}
				}
			} catch (error) {
				console.error('Error fetching user data:', error)
			}
		}
		fetchUserData()
	}, [isAuthenticated, navigate, roles])

	if (!isAuthenticated && !allowUnauthenticated) {
		return <Navigate to='/login' />
	}

	useEffect(() => {
		if (checkSubscription && subscription) {
			if (
				subscription.subtype === 'No subscription' &&
				location.pathname !== '/representative/subscription'
			) {
				navigate('/representative/subscription')
			}
		}
	}, [subscription, checkSubscription, location.pathname, navigate])

	return children
}
