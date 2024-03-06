import React from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import DataTable from '../../components/DataTable.jsx'
import mainBackgroundRegisterLogin from "../../images/main-background2.jpg";
import MainButton from "../../components/mainButton.jsx";


export default function AnalysisDashboard() {
    const textColor = ' var(--talent-white-text)'
    const textColor2 = 'var(--talent-highlight)'
    const bgColor = 'var(--talent-secondary)'
    const borderColor = 'var(--talent-highlight)'

    const [dataArray, setDataArray] = useState([]);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const apiURL = import.meta.env.VITE_BACKEND_URL;

    async function fetchDataFromEndpoint(analysisEndPoint) {
        setError(true);
        try {
            const response = await axios.get(apiURL + analysisEndPoint);
            setError(false);
            return response.data;
        } catch (error) {
            setError(false);
            setErrorMessage('Unable to connect to the server. Please try again later.');
            console.error("Error al llamar al endpoint:", error);
            throw error;
        }
    }

    useEffect(() => {
        fetchDataFromEndpoint("/analysis")
            .then(data => {
                const newArray = data.map(item => item.githubUsername);
                setDataArray(newArray);
            })
            .catch(error => {
                // Manejar el error si ocurre
            });
    }, []);


    return (
        <section className="text-white body-font h-screen flex items-center justify-center"
        style={{
          backgroundImage: `url(${mainBackgroundRegisterLogin})`,
          backgroundSize: "cover",
        }}>
            <div className="flex ml-10 gap-60 mt-16" style={{position: 'fixed', top: '0', left: '0'}}    >
              {MainButton("Go back", "/analysis/analyze", "")}
            </div>
            <div className="container mx-auto flex flex-col items-center text-center "  style={{ height: '100vh', overflowY: 'scroll' }}>
                <div className="flex justify-between  w-full">
                    

                    <div className="w-full max-w-6xl h-100 p-1 mx-auto rounded shadow-md flex flex-col justify-between mt-10"
                        style={{
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        marginLeft: "100",
                        marginRight: "100",
                        borderColor: borderColor,
                        borderWidth: "1px",

                        }}>
                        <h6  className="text-3xl font-bold text-center text-white -5 mb-5  " >
                            Analysis Listing
                             
                        </h6>
                        {errorMessage && (
                        <div className="text-center text-white">
                            {errorMessage}
                        </div>
                        )}
                        
                        {dataArray.map((item, index) => (
                            <div key={index} style={{ padding: '0 90px' }}>
                                <Link 
                                    style={{ borderTop: index !== 0 ? '1px solid orange' : 'none', display: 'block' }} 
                                    to={`/analysis/${item}`} 
                                    className="text-white"
                                >
                                    <h6 className="text-2xl text-center text-white mb-5 mt-5">
                                        {item}
                                    </h6>
                                </Link>
                            </div>
                        ))}
                        
                        
                    </div>

                    
                </div>
            </div>
        </section >
    );
}
