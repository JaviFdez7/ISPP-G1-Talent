import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DataTable from '../../components/DataTable.jsx'
import mainBackgroundRegisterLogin from "../../images/main-background2.jpg";
import MainButton from "../../components/mainButton.jsx";


export default function AnalysisDashboard() {
    const textColor = ' var(--talent-white-text)'
    const textColor2 = 'var(--talent-highlight)'
    const bgColor = 'var(--talent-secondary)'
    const borderColor = 'var(--talent-highlight)'
    const { analysisId } = useParams();

    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const [dataArray, setDataArray] = useState([]);

    const apiURL = import.meta.env.VITE_BACKEND_URL;

    async function fetchDataFromEndpoint(analysisEndPoint) {
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
        fetchDataFromEndpoint("/analysis/github/"+analysisId)
            .then(data => {
                const newArray = data
                setDataArray(newArray);
            })
            .catch(error => {
                // Manejar el error si ocurre
            });
    }, [analysisId]);

    const languages = dataArray.globalTopLanguages ? dataArray.globalTopLanguages.map(item => item) : [];
    const tecnologies = dataArray.globalTechnologies ? dataArray.globalTechnologies.map(item => item) : [];





    return (
        <section className="text-white body-font h-screen flex items-center justify-center"
        style={{
          backgroundImage: `url(${mainBackgroundRegisterLogin})`,
          backgroundSize: "cover",
        }}>
            <div className="container mx-auto flex flex-col items-center text-center "  style={{ height: '100vh', overflowY: 'scroll' }}>
                <div className="flex justify-between  w-full">
                    {/* CANDIDATE column */}
                    
                    <div className="flex flex-col  items-center w-1/3 mx-2 ml-20 mt-40">
                        <h2 style={{ color: textColor }}>    <FontAwesomeIcon icon={faStar} style={{ color: textColor2 }}/>  Add to favorites</h2>
                        <img src={dataArray.avatarUrl} alt="Imagen" className="rounded-full border border-gray-300 w-24 h-24 mb-4 mt-4" />
                            <h2 style={{ color: textColor, fontSize: '1.5rem' }}>{dataArray.githubUsername}</h2>
                    </div>
                    <div className="fixed bottom-0 left-0 mb-4 ml-32">
                        {MainButton("Go back", `/analysis/list`, "")}
                    </div>
                    

                    <div className="w-full max-w-6xl  p-1  rounded shadow-md flex flex-col mt-10 mb-10 ml-10"
                        style={{
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        marginLeft: "100",
                        marginRight: "100",
                        borderColor: borderColor,
                        borderWidth: "1px",
                        }}>
                        <h6  className="text-3xl font-bold text-center text-white mt-5 mb-5  ">
                             GitHub Statistics
                             
                        </h6>
                        {errorMessage ? (
                            <div className="text-center text-white">
                                {errorMessage}
                            </div>
                        ) : (
                            <>
                                <div className="flex flex-row  items-center ml-16 mb-10  ">
                                    <DataTable header={'Follorwers'} contentArray={[dataArray.followers]} />
                                    <DataTable header={'Commits'} contentArray={
                                        dataArray && dataArray.contributions ? [dataArray.contributions.totalCommits] : []
                                        } />
                                    <DataTable header={'Pull Requests'} 
                                        contentArray={dataArray && dataArray.contributions ? [dataArray.contributions.totalPullRequests] : []
                                        } />
                                </div>
                                <div className="flex flex-row  items-center   mx-auto  mb-10 ml-18  ">
                                    <DataTable header={'Repositories Contributes with Commits'} contentArray={
                                        dataArray && dataArray.contributions ? [dataArray.contributions.totalRepositoriesContributedWithCommits ] : []
                                    } />
                                </div>
                                <div className="flex flex-row  items-center  mx-auto  mb-10 ml-18  ">
                                    <DataTable header={'Repositories Contributes with Pull Requests'} contentArray={
                                        dataArray && dataArray.contributions ? [dataArray.contributions.totalRepositoriesContributedWithPullRequests ] : []
                                    } />
                                </div>
                                <Link to={`/analysis/${analysisId}/repositories`} className="text-white">
                                    <h6 className="text-2xl text-center text-white mb-10">
                                        Top recent repositories <FontAwesomeIcon icon={faExternalLinkAlt} className="ml-2" />
                                    </h6>
                                </Link>
                            </>
                        )}
                    </div>
                    

                    <div className="w-full max-w-6xl  h-100 p-1  rounded shadow-md flex flex-col justify-between mt-10 mb-10 ml-10 mr-10"
                        style={{
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        marginLeft: "100",
                        marginRight: "100",
                        borderColor: borderColor,
                        borderWidth: "1px",
                        }}>
                        <h6  className="text-3xl font-bold text-center  text-white  mt-5 mb-5">
                             Experience
                        </h6>
                        {errorMessage ? (
                            <div className="text-center text-white">
                                {errorMessage}
                            </div>
                        ) : (
                        <>
                            <div className="flex flex-row items-between  ml-16 mb-10 ">
                                <DataTable header={'Top 5 Used Languages'} contentArray={languages} />
                                <div className="mr-20 "> </div> 
                                <DataTable header={'Used Tecnologies'} contentArray={tecnologies} />
                            </div>
                            <div className="mb-10 "> </div> 
                        </>
                        )}
                        
                    
                    </div>
                    
                </div>
            </div>
        </section >
    );
}
