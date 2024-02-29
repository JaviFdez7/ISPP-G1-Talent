import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import {faCode} from '@fortawesome/free-solid-svg-icons';
import {faBriefcase} from '@fortawesome/free-solid-svg-icons';
import {faCodeBranch} from '@fortawesome/free-solid-svg-icons';
import DataTable from '../../components/DataTable.jsx'
import mainBackgroundRegisterLogin from "../../images/main-backgroundregisterlogin.jpg";


export default function AnalysisDashboard() {
    const textColor = ' var(--talent-white-text)'
    const textColor2 = 'var(--talent-highlight)'
    const bgColor = 'var(--talent-secondary)'


    return (
        <section className="text-white body-font h-screen flex items-center justify-center"
        style={{
          backgroundImage: `url(${mainBackgroundRegisterLogin})`,
          backgroundSize: "cover",
        }}>
            <div className="container mx-auto flex flex-col items-center text-center">
                <div className="flex justify-between  w-full">
                    {/* CANDIDATE column */}
                    <div className="flex flex-col justify-center items-center w-1/3 mx-2 ml-20">
                    <h2 style={{ color: textColor }}>    <FontAwesomeIcon icon={faStar} style={{ color: textColor2 }}/>  Add to favorites</h2>
                    <img src="ruta-de-la-imagen.jpg" alt="Imagen" className="rounded-full border border-gray-300 w-24 h-24 mb-4 mt-4" />
                        <h2 style={{ color: textColor, fontSize: '1.5rem' }}>Candidate Name</h2>
                        <h2 style={{ color: textColor, fontSize: '1.2rem' }}>candidate@gmail.com</h2>  
                        <h2 style={{ color: textColor }}>  <FontAwesomeIcon icon={faMapMarkerAlt} style={{ color: textColor2 }} /> Seville, Spain</h2>
                    </div>

                    {/* left column */}
                    <div className="flex flex-col justify-start items-center w-1/3 mx-2 ml-20 mt-6 ">
                        <DataTable header=
                            { <div className="flex items-center">
                                <span className="ml-2">Most used technologies</span>
                                <FontAwesomeIcon icon={faCode} style={{ color: textColor2 }} className="ml-2"/>
                            </div>} 
                        contentArray={['Java', 'TODO', '...']} />

                        <DataTable header={'Prefered role'} contentArray={['Backend']} />
                    </div>

                     {/* center column */}
                    <div className="flex flex-col justify-start items-center w-1/3 mx-2 mt-6 ">
                        <DataTable header=
                            { <div className="flex items-center justify-center">
                                <span className="ml-2">Latest Jobs</span>
                                <FontAwesomeIcon icon={faBriefcase} style={{ color: textColor2 }} className="ml-2"/>
                            </div>} 
                        
                        contentArray={['Fujitsu', 'TODO', '...']} />
                        <DataTable header={'Preference'} contentArray={['Work from home']} />
                        
                    </div>

                     {/* right column */}
                    <div className="flex flex-col justify-start items-center w-1/3 mx-2 mr-40 mt-6">
                        <DataTable header=
                             { <div className="flex items-center justify-center">
                                <span className="ml-2">Popular Repositories</span>
                                <FontAwesomeIcon icon={faCodeBranch} style={{ color: textColor2 }} className="ml-2"/>
                             </div>} 
                        contentArray={['On Your Tutorials', 'TODO', '...']} />

                        <DataTable header={'Commits'} contentArray={['TODO']} />
                        <DataTable header={'Pull Requests'} contentArray={['TODO']} />
                        <DataTable header={'Issues'} contentArray={['TODO']} />
                    </div>
                </div>
            </div>
        </section >
    );
}
