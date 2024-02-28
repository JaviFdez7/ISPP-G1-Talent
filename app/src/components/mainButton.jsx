import React from "react";
import { Link } from "react-router-dom";

export default function MainButton(text, link, func) {

    let res = "";
    if (func === "") {
        res = (
            <Link to={link} className="flex flex-col button-container">
                <div className="flex main-button-container">
                    <h4>{text}</h4>
                </div>
                <div className="main-button-highlight"></div>
            </Link>
        );
    } else {
        res =  (
            <button onClick={func} className="flex flex-col button-container">
                <div className="flex main-button-container">
                    <h4>{text}</h4>
                </div>
                <div className="main-button-highlight"></div>
            </button>
        );
    }

    return(
        <div className="flex justify-center items-center button">
            {res}
        </div>
    );
}