import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuthContext } from "../../context/authContext";
import axios from 'axios';

import DataTable from '../../components/DataTable.jsx'
import Input from '../../components/Input.jsx'
import mainBackgroundRegisterLogin from "../../images/main-background2.jpg";
import MainButton from "../../components/mainButton.jsx";
import FavoriteButton from "../../components/history/FavoriteButton.jsx";




export default function AnalysisDashboard() {
    const textColor = ' var(--talent-white-text)'
    const textColor2 = 'var(--talent-highlight)'
    const borderColor = 'var(--talent-highlight)'
    const { analysisId } = useParams();
    const { isRepresentative } = useAuthContext();

    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [history, setHistory] = useState(null);


    const [dataArray, setDataArray] = useState([]);
    const apiURL = import.meta.env.VITE_BACKEND_URL;

    async function fetchDataFromEndpoint(analysisEndPoint) {
        try {
            const response = await axios.get(apiURL + analysisEndPoint);
            setError(false);
            return response.data.data;
        } catch (error) {
            setError(false);
            setErrorMessage('Unable to connect to the server. Please try again later.');
            console.error("Error al llamar al endpoint:", error);
            throw error;
        }
    }

    async function fetchHistory(currentAnalysisId) {
        try {
            const historyData = await getHistory(currentAnalysisId);
            setHistory(historyData);
        } catch (error) {
            console.error('Error fetching history:', error);
        }
    }

    useEffect(() => {
        fetchDataFromEndpoint("/analysis/github/" + analysisId)
            .then(data => {
                const newArray = data;
                const currentAnalysisId = data._id;
                setDataArray(newArray);
                fetchHistory(currentAnalysisId);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, [analysisId]);

    const languages = dataArray.globalTopLanguages ? dataArray.globalTopLanguages.map(item => item.language) : [];
    const tecnologies = dataArray.globalTechnologies ? dataArray.globalTechnologies.map(item => item) : [];

    function getHistory(currentAnalysisId) {
        const currentUserId = localStorage.getItem("userId");
        const uri = `/user/${currentUserId}/history`;
        return fetchDataFromEndpoint(uri)
            .then(data => {
                const filteredHistory = data.filter(item => item.analysisId === currentAnalysisId);
                return filteredHistory[0];
            })
            .catch(error => {
                console.log("Error while retrieving the history related to this analysis", error);
                throw error;
            });
    };


    return (
        <section className="text-white flex flex-row justify-center bg-fixed"
            style={{
                backgroundImage: `url(${mainBackgroundRegisterLogin})`,
                backgroundSize: "cover",
            }}>
            <div className="fixed top-6 left-0 mb-4 ml-6">
                {MainButton("Go back", `/analysis/list`, "")}
            </div>

            <div className="container flex flex-col items-center w-10/12 h-full">
                {/* CANDIDATE column */}

                <br></br>
                <div className="flex flex-col items-center w-8/12 mt-10">

                    {isRepresentative && history ? (<FavoriteButton history={history} toggleText />) : null}
                    <br></br>

                    <h6 className="text-3xl font-bold text-center text-white mt-5 mb-5  ">
                        GitHub Statistics
                    </h6>
                    <br></br>
                    <div className="h-full w-full flex flex-row items-center" style={{ fontSize: '1.0rem' }}>
                        <img src={dataArray.avatarUrl} alt="Imagen" className="rounded-full border w-80 ml-20" style={{ position: "relative", left: "0%", zIndex: "1" }} />
                        <div className="flex flex-col h-full w-full" style={{ position: "relative", left: "-10%" }}>
                            <div className="flex flex-row items-center h-14 pl-32 w-full" style={{ backgroundColor: "var(--talent-highlight-background)" }}>
                                <h2 style={{ fontSize: '1.5rem' }}>{dataArray.githubUsername}</h2>
                            </div>
                            <div className="flex flex-row items-center h-14 pl-32 w-full" style={{ backgroundColor: "var(--talent-dark-background)" }}>
                                {Input('Followers', dataArray.followers, false, "300px")}
                            </div>
                            <div className="flex flex-row items-center h-14 pl-32 w-full" style={{ backgroundColor: "var(--talent-dark-background)" }}>
                                {Input('Commits', dataArray && dataArray.contributions ? dataArray.contributions.totalCommits : 0, false, "300px")}
                            </div>
                            <div className="flex flex-row items-center h-14 pl-32 w-full" style={{ backgroundColor: "var(--talent-dark-background)" }}>
                                {Input('Pull Requests', dataArray && dataArray.contributions ? dataArray.contributions.totalPullRequests : 0, false, "300px")}
                            </div>

                        </div>
                    </div>
                    <br></br>
                </div>


                <div className="w-full p-1 rounded shadow-md flex flex-col mt-10 mb-10 ml-10"
                    style={{
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        marginLeft: "100",
                        marginRight: "100",
                        borderColor: borderColor,
                        borderWidth: "1px",
                    }}>
                    {errorMessage ? (
                        <div className="text-center text-white">
                            {errorMessage}
                        </div>
                    ) : (
                        <>
                            <br></br>
                            <h6 className="text-3xl font-bold text-center text-white mt-5 mb-5  ">
                                Top recent Repositories

                            </h6>
                            <br></br>
                            {errorMessage ? (
                                <div className="text-center text-white">
                                    {errorMessage}
                                </div>
                            ) : (
                                <div className="mt-2 w-11/12 self-center" style={{ backdropFilter: "blur(8px)" }}>
                                    <table className="w-full">
                                        <thead>
                                            <tr>
                                                <th className="datatable-header h-16">
                                                    <div className="datatable-header-text mr-3 ml-3">Name</div>
                                                </th>
                                                <th className="datatable-header">
                                                    <div className="datatable-header-text mr-3 ml-3">Stars</div>
                                                </th>
                                                <th className="datatable-header">
                                                    <div className="datatable-header-text mr-3 ml-3">Forks</div>
                                                </th>
                                                <th className="datatable-header">
                                                    <div className="datatable-header-text mr-3 ml-3">Languages</div>
                                                </th>
                                                <th className="datatable-header">
                                                    <div className="datatable-header-text mr-3 ml-3">Technologies</div>
                                                </th>
                                                <th className="datatable-header">
                                                    <div className="datatable-header-text mr-3 ml-3">Url</div>
                                                </th>
                                            </tr>
                                        </thead>

                                        <tbody className="datatable-body">
                                            {dataArray.topRepositories ? dataArray.topRepositories.map((item, index) => (
                                                <tr key={index}>
                                                    <td className="datatable-cell">
                                                        <br></br>
                                                        <div style={{ wordBreak: 'break-word', height: '35px', alignItems: 'center', justifyContent: 'center', paddingLeft: "20px", paddingBottom: "20px" }}>
                                                            {item.name}
                                                        </div>
                                                        <hr style={{ width: '110%' }}></hr>
                                                    </td>
                                                    <td className="datatable-cell">
                                                        <br></br>
                                                        <div style={{ wordBreak: 'break-word', height: '35px', alignItems: 'center', justifyContent: 'center', paddingLeft: "20px", paddingBottom: "20px" }}>
                                                            {item.stars}
                                                        </div>
                                                        <hr style={{ width: '110%' }}></hr>
                                                    </td>
                                                    <td className="datatable-cell">
                                                        <br></br>
                                                        <div style={{ wordBreak: 'break-word', height: '35px', alignItems: 'center', justifyContent: 'center', paddingLeft: "20px", paddingBottom: "20px" }}>
                                                            {item.forks}
                                                        </div>
                                                        <hr style={{ width: '110%' }}></hr>
                                                    </td>
                                                    <td className="datatable-cell">
                                                        <br></br>
                                                        <div style={{ wordBreak: 'break-word', height: '35px', alignItems: 'center', justifyContent: 'center', paddingLeft: "20px", paddingBottom: "20px" }}>
                                                            {item.languages.join(', ')}
                                                        </div>
                                                        <hr style={{ width: '110%' }}></hr>
                                                    </td>
                                                    <td className="datatable-cell">
                                                        <br></br>
                                                        <div style={{ wordBreak: 'break-word', height: '35px', alignItems: 'center', justifyContent: 'center', paddingLeft: "20px", paddingBottom: "20px" }}>
                                                            {item.technologies.join(', ')}
                                                        </div>
                                                        <hr style={{ width: '110%' }}></hr>
                                                    </td>
                                                    <td className="datatable-cell">
                                                        <br></br>
                                                        <div style={{ wordBreak: 'break-word', height: '35px', alignItems: 'center', justifyContent: 'center', paddingLeft: "20px", paddingBottom: "20px" }}>
                                                            <Link to={item.url}>
                                                                ICON
                                                            </Link>
                                                        </div>
                                                        <hr style={{ width: '100%' }}></hr>
                                                    </td>
                                                </tr>
                                            ))
                                                : null}
                                        </tbody>
                                    </table>
                                    <br></br>
                                    <div className="flex flex-row w-full justify-around mt-10 mb-10">
                                        <div className="flex flex-row justify-center pl-20">
                                            {Input('Repositories Contributes with Commits', dataArray && dataArray.contributions ? dataArray.contributions.totalRepositoriesContributedWithCommits : 0, false)}
                                        </div>
                                        <div className="flex flex-row justify-center pl-20">
                                            {Input('Repositories Contributes with Pull Requests', dataArray && dataArray.contributions ? dataArray.contributions.totalRepositoriesContributedWithPullRequests : 0, false)}
                                        </div>
                                    </div>
                                    <br></br>

                                </div>
                            )}

                        </>
                    )}
                </div>


                <div className="w-10/12 max-w-6xl  h-100 p-1  rounded shadow-md flex flex-col justify-between mt-10 mb-10 ml-10 mr-10"
                    style={{
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        marginLeft: "100",
                        marginRight: "100",
                        borderColor: borderColor,
                        borderWidth: "1px",
                    }}>
                    <br></br>
                    <h6 className="text-3xl font-bold text-center  text-white  mt-5 mb-5">
                        Experience
                    </h6>
                    <br></br>
                    {errorMessage ? (
                        <div className="text-center text-white">
                            {errorMessage}
                        </div>
                    ) : (
                        <>
                            <div className="flex flex-col items-center w-8/12 self-center">
                                <DataTable header={'Top 5 Used Languages'} contentArray={languages} />
                                <div className="mr-20 "></div>
                                <br></br>
                                <br></br>
                                <DataTable header={'Used Tecnologies'} contentArray={tecnologies} />
                            </div>
                        </>
                    )}
                    <br></br>

                </div>

            </div>
        </section >
    );
}
