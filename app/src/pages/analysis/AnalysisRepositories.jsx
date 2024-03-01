import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import MainButton from "../../components/mainButton.jsx";
import DataTable from '../../components/DataTable.jsx'
import mainBackgroundRegisterLogin from "../../images/main-background2.jpg";


export default function AnalysisDashboard() {
    const textColor = ' var(--talent-white-text)'
    const textColor2 = 'var(--talent-highlight)'
    const bgColor = 'var(--talent-secondary)'
    const borderColor = 'var(--talent-highlight)'


    return (
        <section className="text-white body-font h-screen flex items-center justify-center"
        style={{
          backgroundImage: `url(${mainBackgroundRegisterLogin})`,
          backgroundSize: "cover",
        }}>
            <div className="container mx-auto flex flex-col items-center text-center "  style={{ height: '100vh', overflowY: 'scroll' }}>
                <div className="flex justify-center  w-full">   
                    <div className="flex mt-10  ">
                        {MainButton("Go back", "/analysis/:analisysId", "")}
            
                    </div>
                    <div className="w-full max-w-6xl  p-1  rounded shadow-md flex flex-col mt-10 mb-10 ml-10"
                        style={{
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        marginLeft: "100",
                        marginRight: "100",
                        borderColor: borderColor,
                        borderWidth: "1px",
                        maxHeight: "80vh",
                        }}>
                        <h6  className="text-3xl font-bold text-center text-white mt-5 mb-5  ">
                             Top recent Repositories
                             
                        </h6>
                        <div className="flex flex-row  items-berween ml-16 mb-10  ">
                            <DataTable header={'Name'} contentArray={['TODO','TODO']} />
                            <DataTable header={'URL'} contentArray={['TODO.COM', 'TODO.COM']} />
                            <DataTable header={'Stars'} contentArray={['5', '3']} />
                            <DataTable header={'Forks'} contentArray={['6','9']} />
                            <DataTable header={'Top 3 languajes'} contentArray={['TODO,TODO,TODO', 'TODO,TODO,TODO']} />
                            <DataTable header={'Technologies'} contentArray={['TODO,TODO,TODO,TODO', 'TODO,TODO,TODO,TODO, TODO, TODO']} />
                        </div>
                        
                    </div>
                    
                </div>
                
            </div>
        </section >
    );
}