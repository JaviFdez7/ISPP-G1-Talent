import React from "react";
import { Link } from "react-router-dom";

import DataTable from '../components/DataTable.jsx'


export default function AnalysisDashboard() {
    const textColor = '#ECECEC'
    const textColor2 = '#D4983D'
    const bgColor = "#282828"


    return (
        <section className="text-white body-font h-screen flex items-center justify-center" style={{backgroundColor: bgColor}}>
            <div className="container mx-auto flex flex-col items-center text-center">
                <div className="flex justify-between w-full">
                    {/* left column */}
                    <div className="flex flex-col justify-start items-center w-1/3 mx-2">
                        <h2 style={{ color: textColor }}>Add to favorites</h2>
                        <DataTable header={'Most used technologies'} contentArray={['TODO', 'TODO', '...']} />
                        <DataTable header={'Popular repositories'} contentArray={['TODO', '...']} />
                    </div>

                    {/* center column */}
                    <div className="flex flex-col justify-start items-center w-1/3 mx-2">
                        <img src="ruta-de-la-imagen.jpg" alt="Imagen" className="rounded-full border border-gray-300 w-24 h-24 mb-4" />
                        <h2 style={{ color: textColor }}>Candidate Name</h2>
                        <h2 style={{ color: textColor }}>candidate@gmail.com</h2>
                        <h2 style={{ color: textColor2 }}>preference</h2>
                        <DataTable header={'Latest Jobs'} contentArray={['TODO', 'TODO', '...']} />
                    </div>

                    {/* right column */}
                    <div className="flex flex-col justify-start items-center w-1/3 mx-2">
                        <h2 style={{ color: textColor }}>Seville, Spain</h2>
                        <DataTable header={'Commits'} contentArray={['TODO']} />
                        <DataTable header={'Pull Requests'} contentArray={['TODO']} />
                        <DataTable header={'Issues'} contentArray={['TODO']} />
                        <DataTable header={'Preference'} contentArray={['TODO']} />
                    </div>
                </div>
            </div>
        </section >
    );
}
