import React from "react";
import MainButton from "./mainButton";
import { Link } from "react-router-dom";

export default function DataTableVertical({ data, editable=false, addLink, editLink }) {
    const cellHeight = '80px';
    const minCellWidth = '142px';

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
                <tbody className="datatable-body ">
                    {data.map((item, index) => (
                        <tr key={index}>
                            <th className="datatable-header" style={{ borderTop: '0', height: cellHeight, minWidth: minCellWidth}}>
                                <div className="datatable-header-text mr-3 ml-3">{item.header}</div>
                            </th>
                            <td className="datatable-cell " style={{height: cellHeight, minWidth: minCellWidth}}>
                                <div className="flex items-center justify-center mt-5" style={{wordBreak: 'break-word', paddingLeft: "20px", paddingBottom: "20px"}}>
                                    {item.content}
                                    {editable && (
                                    <Link to={editLink + "/" + index} className="edit-button">
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
    );
}