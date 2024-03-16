import React from "react";
import MainButton from "./mainButton";
import { Link } from "react-router-dom";

export default function DataTable({ header, contentArray, editable=false, addLink, editLink }) {
    const cellHeight = '100px';
    const minCellWidth = '142px';


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
                        <tr key={index}>
                            <td className="datatable-cell" style={{height: cellHeight}}>
                                <br></br>
                                <div style={{wordBreak: 'break-word', height: '80%', alignItems: 'center',justifyContent: 'center', paddingLeft: "16px"}}>
                                    {item}
                                </div>
                                <hr className="w-full"></hr>
                            </td>
                            {editable && (
                                <td className="datatable-cell" style={{height: cellHeight}}>
                                    <br></br>
                                    <div style={{wordBreak: 'break-word', height: '80%', alignItems: 'center',justifyContent: 'center', paddingLeft: "16px"}}>
                                        <Link to={editLink + "/" + index} className="edit-button">
                                            Edit
                                        </Link>
                                    </div>
                                    <hr style={{width: '110%', transform: 'translateX(-5%)'}}></hr>
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
                {button}
            </table>
        </div>
    );
}
