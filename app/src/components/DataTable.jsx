import React from 'react'
import MainButton from './mainButton'
import { Link } from 'react-router-dom'

export default function DataTable({
	header,
	contentArray,
	editable = false,
	addLink = '',
	editLink = '',
	idArray = [],
	idName = '',
}) {
	const cellHeight = '100px'
	const minCellWidth = '142px'

    let head = "";
    if (header === "") {
        head = "";
    } else {
        head = (
            <thead>
                <tr>
                    <th className="datatable-header" style={{ height: cellHeight, minWidth: minCellWidth}}>
                        <div className="datatable-header-text mr-3 ml-3">{header}</div>
                    </th>
                    {editable && (
                        <th className="datatable-header" style={{ height: cellHeight}}>

                        </th>
                    )}
                </tr>
            </thead>
        );
    }

    let button = "";
    if (editable) {
        button = (
                <div className="flex flex-row justify-center">
                    {MainButton("Add", addLink, "", "50%")}
                </div>
            );
    }

    return (
        <div className="mt-2 datatable-container">
            <table className="w-full  ">
                {head}
                <tbody className="datatable-body ">
                    {contentArray.map((item, index) => (
                    <>
                        <tr key={index}>
                            <td className="datatable-cell text-center">
                                <br></br>
                                {item}
                            </td>
                            {editable && (
                                <td className="pl-2 pr-2 text-center">
                                    <br></br>
                                    <Link to={editLink} className="edit-button"
                                    onClick={() => localStorage.setItem(idName, idArray[index])}>
                                        Edit
                                    </Link>
                                </td>
                            )}
                        </tr>
                        <tr>
                            <td>
                                <hr style={{width: '100%'}}></hr>
                            </td>
                            {editable && (
                                <td>
                                    <hr style={{width: '105%', transform: 'translateX(-5%)'}}></hr>
                                </td>
                            )}

                        </tr>
                    </>
                    ))}
                </tbody>
            </table>
            {button}
        </div>
    );
}
