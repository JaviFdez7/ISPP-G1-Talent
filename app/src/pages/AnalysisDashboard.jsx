import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
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
                    <h2 style={{ color: textColor }}>    <FontAwesomeIcon icon={faStar} style={{ color: textColor2 }}/>  Add to favorites</h2>
                        <DataTable header={'Most used technologies'} contentArray={['TODO', 'TODO', '...']} />
                        <DataTable header={'Popular repositories'}  contentArray={['TODO', 'TODO', '...']} />
                        
                    </div>

                    {/* center column */}
                    <div className="flex flex-col justify-start items-center w-1/3 mx-2">
                        <img src="ruta-de-la-imagen.jpg" alt="Imagen" className="rounded-full border border-gray-300 w-24 h-24 mb-4" />
                        <h2 style={{ color: textColor, fontSize: '1.5rem' }}>Candidate Name</h2>
                        <h2 style={{ color: textColor, fontSize: '1.2rem' }}>candidate@gmail.com</h2>
                        <h2 style={{ color: textColor2, fontSize: '1.2rem' }}>preference</h2>
                        <DataTable header={'Latest Jobs'} contentArray={['TODO', 'TODO', '...']} />
                    </div>

                    {/* right column */}
                    <div className="flex flex-col justify-start items-center w-1/3 mx-2">
                        <h2 style={{ color: textColor }}>  <FontAwesomeIcon icon={faMapMarkerAlt} style={{ color: textColor2 }} /> Seville, Spain</h2>
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
