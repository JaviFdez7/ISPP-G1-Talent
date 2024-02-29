import React from "react";
import MainButton from "./mainButton";
import { Link } from "react-router-dom";

export default function DataTable({ header, contentArray, editable=false, addLink, editLink }) {
    const cellHeight = '70px';


    let head = "";
    if (header === "") {
        head = "";
    } else {
        head = (
            <thead>
                <tr>
                    <th className="datatable-header" style={{ height: cellHeight}}>
                        <div className="datatable-header-text">{header}</div>
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
        <div className="mt-4 datatable-container">
            <table className="w-full ">
                {head}
                <tbody className="datatable-body">
                    {contentArray.map((item, index) => (
                        <tr key={index}>
                            <td className="datatable-cell" style={{height: cellHeight}}>
                                <br></br>
                                <div style={{paddingBottom: "10px", paddingLeft: "20px"}}>
                                    {item}
                                    <Link to={editLink+"/"+index} className="edit-button">
                                        Edit
                                    </Link>
                                </div>
                                <hr className="w-full"></hr>
                            </td>
                        </tr>
                    ))}
                </tbody>
                {button}
            </table>
        </div>
    );
}
