import React from "react";

export default function DataTable({ header, contentArray }) {
    const textColor = '#ECECEC'
    const tableBorderColor = '#393939'
    const tableBackgroundColor = '#2B2D2F'
    const tableHeaderColor = '#1F1F1F'

    return (
        <div className="mt-4">
            <table className="w-full">
                <thead>
                    <tr>
                        <th className="py-2" style={{ color: textColor, borderWidth: '2px', borderColor: tableBorderColor, backgroundColor: tableHeaderColor }}>{header}</th>
                    </tr>
                </thead>
                <tbody>
                    {contentArray.map((item, index) => (
                        <tr key={index}>
                            <td style={{ color: textColor, borderWidth: '2px', borderColor: tableBorderColor, backgroundColor: tableBackgroundColor }}>{item}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
