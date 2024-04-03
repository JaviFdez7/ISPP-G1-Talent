import React from 'react'

export default function TopRepositoriesTable({ analysis }) {
	const topRepositories =
		analysis && analysis.topRepositories ? analysis.topRepositories.map((item) => item) : []
	const header = 'Top Repositorios'
	const cellHeight = '100px'

	return (
		<div className='mt-2 datatable-container'>
			<table className='w-full'>
				<thead>
					<tr>
						<th className='datatable-header' colSpan={3} style={{ height: cellHeight }}>
							<div className='datatable-header-text mr-3 ml-3'>{header}</div>
						</th>
					</tr>
					<tr>
						<th className='datatable-header' style={{ width: '33.33%' }}>
							Name
						</th>
						<th className='datatable-header' style={{ width: '33.33%' }}>
							Languages
						</th>
						<th className='datatable-header' style={{ width: '33.33%' }}>
							Technologies
						</th>
					</tr>
				</thead>
			</table>
			<div style={{ maxHeight: '500px', overflowY: 'auto' }}>
				<table className='w-full'>
					<tbody className='datatable-body'>
						{topRepositories.map((repo, index) => (
							<React.Fragment key={index}>
								<tr
									style={{
										display: 'table',
										width: '100%',
										tableLayout: 'fixed',
									}}>
									<td className='datatable-cell text-center'>{repo.name}</td>
									<td className='datatable-cell text-center'>
										{repo.languages.join(', ')}
									</td>
									<td className='datatable-cell text-center'>
										{repo.technologies.join(', ')}
									</td>
								</tr>
								<tr
									style={{
										display: 'table',
										width: '100%',
										tableLayout: 'fixed',
									}}>
									<td>
										<hr style={{ width: '100%' }}></hr>
									</td>
									<td>
										<hr style={{ width: '100%' }}></hr>
									</td>
									<td>
										<hr style={{ width: '100%' }}></hr>
									</td>
								</tr>
							</React.Fragment>
						))}
					</tbody>
				</table>
			</div>
		</div>
	)
}
