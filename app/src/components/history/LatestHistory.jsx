import React from 'react'
import { Link } from 'react-router-dom'
import MainButton from '../mainButton'
import AnalysisLatestItem from './AnalysisLatestItem'

const LatestHistory = ({ header, data, type = 'analysis' }) => {
	const paddedDataToShow = data
		.sort((a, b) => {
			return new Date(b.date) - new Date(a.date)
		})
		.slice(0, 3)

	const formatDateTime = (date) => {
		if (!date) return ' - '
		const options = {
			day: 'numeric',
			month: 'numeric',
			year: 'numeric',
			hour: 'numeric',
			minute: 'numeric',
		}
		return new Intl.DateTimeFormat('es', options).format(new Date(date))
	}
	return (
		<div className='text-white m-auto mb-3 history-table-container'>
			<table className='history-table-container'>
				<thead>
					<tr>
						<th className='history-table-header' colSpan='2'>
							{header}
						</th>
					</tr>
				</thead>
				<tbody className='history-table-body'>
					{paddedDataToShow.map((item, index) => (
						<AnalysisLatestItem
							item={item}
							formattedDate={formatDateTime(item.date)}
							type='searches'
						/>
					))}
				</tbody>
			</table>
			<div className='mt-4 ml-2 mr-2'>
				{paddedDataToShow.length === 0 ? (
					<div className='w-full flex flex-row justify-center'>
						Your analysis history is empty
					</div>
				) : (
					<div className='w-full flex flex-row justify-center mt-4'>
						{MainButton('See all', `/${type}/list`, '')}
					</div>
				)}
			</div>
		</div>
	)
}

export default LatestHistory

const styles = {
	buttonContainer: {
		width: '100%',
		display: 'flex',
		justifyContent: 'center',
		marginTop: '2%',
		marginBottom: '2%',
	},
}
