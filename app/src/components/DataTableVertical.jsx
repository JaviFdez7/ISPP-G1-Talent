import React from 'react'
import MainButton from './mainButton'
import { Link } from 'react-router-dom'

export default function DataTableVertical({
    data,
    editable = false,
    addLink,
    editLink,
    width = '',
    topCell = null,
}) {
    const cellHeight = '40px'
    const minCellWidth = '200px'

    let button = ''
    if (editable) {
        button = (
            <div className='flex flex-row justify-center'>
                {MainButton('Add', addLink, '', '50%')}
            </div>
        )
    }

    return (
        <div className='mt-2 mb-2 datatable-container flex justify-center'>
            <div className={width}>
                <table className='w-full'>
                    <tbody className='datatable-body '>
                        {topCell && (
                            <tr>
                                <td colSpan={2} className='datatable-cell' style={{ backgroundColor: 'var(--talent-highlight-background)' ,
									textAlign:'center', height: cellHeight, minWidth: minCellWidth }}>
									{topCell}
								</td>
                            </tr>
                        )}
                        {data.map((item, index) => (
                            <tr key={index}>
                                <th
                                    className='datatable-header '
                                    style={{
                                        borderTop: '0',
                                        height: cellHeight,
                                        minWidth: minCellWidth,
                                    }}>
                                    <div className='datatable-header-text mr-10 ml-10'>
                                        {item.header}
                                    </div>
                                </th>
                                <td
                                    className='datatable-cell '
                                    style={{ height: cellHeight, minWidth: minCellWidth }}>
                                    <div
                                        className='flex items-center justify-center mt-5 mr-10 '
                                        style={{
                                            wordBreak: 'normal',
                                            paddingLeft: '10px',
                                            paddingBottom: '20px',
                                        }}>
                                        {item.content}
                                        {editable && (
                                            <Link
                                                to={editLink + '/' + index}
                                                className='edit-button'>
                                                Edit
                                            </Link>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    {button}
                </table>
            </div>
        </div>
    )
}