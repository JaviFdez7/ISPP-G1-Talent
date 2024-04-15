import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import MainButton from '../components/mainButton'
import SecondaryButton from '../components/secondaryButton'

const NotificationListItem = ({ n, deleteNotification }) => {
	return (
		<div className='flex flex-row'>
			<div className='w-1/5'>{!n.seen && <p className='text-white font-bold'>New!</p>}</div>
			<div className='w-3/5'>
				<p className='text-white font-bold'>
					{n.dateTime.slice(0, 10) + ' ' + n.dateTime.slice(11, 19)}
				</p>
				<br></br>
				<p>{n.message}</p>
			</div>
			<div className='w-1/5'>
				{MainButton('View profile', '/candidate/representative-view/' + n.representativeId)}
			</div>
			<div className='w-1/5'>
				{SecondaryButton('Dismiss', '', () => deleteNotification(n._id))}
			</div>
		</div>
	)
}

export default NotificationListItem
