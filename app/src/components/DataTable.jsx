import React from "react";

export default function DataTable({ header, contentArray }) {
    const textColor = 'white'
    const tableBorderColor = 'var(--talent-darker)'
    const tableBackgroundColor = 'var(--talent-secondary)'
    const tableHeaderColor = '#1F1F1F'
    const cellPadding = '8px';
    const cellWidth = '250px';
    const borderWidth = '3px';

    return (
        <div className="mt-4">
            <table className="w-full ">
                <thead>
                    <tr>
                        <th className="py-2" style={{ color: textColor, borderWidth, borderColor: tableBorderColor, backgroundColor: tableHeaderColor, padding: cellPadding,  width: cellWidth }}>{header}</th>
                    </tr>
                </thead>
                <tbody>
                    {contentArray.map((item, index) => (
                        <tr key={index}>
                            <td style={{ color: textColor, borderWidth, borderColor: tableBorderColor, backgroundColor: tableBackgroundColor, padding: cellPadding,  width: cellWidth }}>{item}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
