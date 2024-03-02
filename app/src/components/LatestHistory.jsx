import React from "react";
import { Link } from "react-router-dom"
import MainButton from "./mainButton";

const LatestHistory = ({ header, data, type = "analysis", representativeId }) => {
    const paddedData = data.concat(Array.from({ length: 3 - data.length }, () => ({})));

    const formatDateTime = (date) => {
        if (!date) return " - ";
        const options = { day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric' };
        return new Intl.DateTimeFormat('es', options).format(new Date(date));
    };
    return (
        <div className="text-white m-auto mb-3" style={styles.container}>
            <table style={styles.table}>
                <thead>
                    <tr style={styles.header}>
                        <th colSpan="3">{header}</th>
                    </tr>
                </thead>
                <tbody>
                    {paddedData.map((item, index) => (
                        <tr key={index} >
                            <td style={styles.row}>{item.name || " - "}</td>
                            <td style={styles.row}>{formatDateTime(item.date)}</td>
                            <td style={styles.row}>{item.id ? <Link to={`/searches/${item.id}`} style={{ color: 'var(--talent-highlight)' }}>See details</Link> : " - "}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div style={styles.buttonContainer}>
                {MainButton("See all", `/${type}/history/${representativeId}`, "")}
            </div>
        </div>
    );
};

export default LatestHistory;

const styles = {
    table: {
        width: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        backdropFilter: "blur(8px)",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.3)",
    },
    header: {
        borderColor: "white",
        borderWidth: "1px",
        backgroundColor: "rgba(0, 0, 0, 0.9)"
    },
    row: {
        borderColor: "white",
        borderWidth: "1px",
        textAlign: "center",
    },
    container: {
        width: "100%",
        marginLeft: "5%",
        marginRight: "5%",
        marginBottom: "2%",
    },
    buttonContainer: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        marginTop: "2%",
        marginBottom: "2%"
    }
};