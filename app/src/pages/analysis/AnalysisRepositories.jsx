import React from "react";

import MainButton from "../../components/mainButton.jsx";
import DataTable from '../../components/DataTable.jsx'
import mainBackgroundRegisterLogin from "../../images/main-background2.jpg";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';


export default function AnalysisDashboard() {
    const textColor = ' var(--talent-white-text)'
    const textColor2 = 'var(--talent-highlight)'
    const bgColor = 'var(--talent-secondary)'
    const borderColor = 'var(--talent-highlight)'
    const { analysisId } = useParams();


    const [dataArray, setDataArray] = useState([]);

    const apiURL = import.meta.env.VITE_BACKEND_URL;

    async function fetchDataFromEndpoint(analysisEndPoint) {
        try {
            const response = await axios.get(apiURL + analysisEndPoint);
            return response.data;
        } catch (error) {
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

    const names = dataArray.topRepositories ? dataArray.topRepositories.map(item => item.name) : [];
    const urls = dataArray.topRepositories ? dataArray.topRepositories.map(item => item.url) : [];
    const stars = dataArray.topRepositories ? dataArray.topRepositories.map(item => item.stars) : [];
    const forks = dataArray.topRepositories ? dataArray.topRepositories.map(item => item.forks) : [];
    const languages = dataArray.topRepositories 
     ? dataArray.topRepositories.map(item => item.languages.join(', ')) : [];
    const technologies = dataArray.topRepositories 
     ? dataArray.topRepositories.map(item => item.technologies.join(', ')) : [];

    return (
        <section className="text-white body-font h-screen flex items-center justify-center"
        style={{
          backgroundImage: `url(${mainBackgroundRegisterLogin})`,
          backgroundSize: "cover",
        }}>
            <div className="container mx-auto flex flex-col items-center text-center "  style={{ height: '100vh', overflowY: 'scroll' }}>
                <div className="flex justify-center  w-full">   
                    <div className="flex mt-10  ">
                        {MainButton("Go back", `/analysis/${analysisId}`, "")}
            
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
                             Top recent Repositories
                             
                        </h6>
                        <div className="flex flex-row items-berween ml-5 mb-10 mx-5  ">
                            <DataTable header={'Name'} contentArray={names} />
                            <DataTable header={'Stars'} contentArray={stars} />
                            <DataTable header={'Forks'} contentArray={forks} />
                            <DataTable header={'URL'} contentArray={urls} />
                            <DataTable header={'Languajes'} contentArray={languages} />
                            <DataTable header={'Technologies'} contentArray={technologies} />
                        </div>
                        
                    </div>
                    
                </div>
                
            </div>
        </section >
    );
}