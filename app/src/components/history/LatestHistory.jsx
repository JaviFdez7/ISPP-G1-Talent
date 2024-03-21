import React from "react";
import { Link } from "react-router-dom"
import MainButton from "../mainButton";
import AnalysisHistoryItem from "./AnalysisHistoryItem";

const LatestHistory = ({ header, data, type = "analysis" }) => {
    const paddedDataToShow = data.slice(0, 3); 

    const formatDateTime = (date) => {
        if (!date) return " - ";
        const options = { day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric' };
        return new Intl.DateTimeFormat('es', options).format(new Date(date));
    };
    return (
        <div className="text-white m-auto mb-3 history-table-container">
            <table className="history-table-container">
                <thead>
                    <tr className="history-table-header">
                        <th colSpan="2">{header}</th>
                    </tr>
                </thead>
                <tbody className="history-table-body">
                    {paddedDataToShow.map((item, index) => (
                        <AnalysisHistoryItem
                            item={item}
                            formattedDate={formatDateTime(item.date)}
                            type="searches"
                        />
                    ))}
                </tbody>
            </table>
            <div className="w-full flex flex-row justify-center mt-4">
                {MainButton("See all", `/${type}/list`, "")}
            </div>
        </div>
    );
};

export default LatestHistory;

const styles = {
    buttonContainer: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        marginTop: "2%",
        marginBottom: "2%"
    }
};