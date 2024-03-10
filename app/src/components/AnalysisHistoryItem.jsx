import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';

const apiURL = import.meta.env.VITE_BACKEND_URL;

async function getGithubUsername(analysisId) {
    const uri = `/analysis/${analysisId}`;
    try {
        const response = await axios.get(apiURL + uri);
        return response.data.githubUsername;
    } catch (error) {
        console.error("Error al llamar al endpoint:", error);
        throw error;
    }
}

const AnalysisHistoryItem = ({ item, formattedDate }) => {
    const [githubUsername, setGithubUsername] = useState(null);

    useEffect(() => {
        getGithubUsername(item.analysisId).then(username => {
            setGithubUsername(username);
        });
    }, [item.analysisId]);

    return (
        <div className="p-4 rounded-lg bg-black bg-opacity-70 transition-colors duration-300 hover:bg-gray-700 mb-2 border-b border-t border-gray-900">
            <Link className="block text-white" to={`/analysis/${githubUsername}`}>
                <div className="flex flex-col lg:flex-row justify-start items-start">
                    <h6 className="text-white py-1 px-2 rounded-lg mb-2" style={{ backgroundColor: "var(--talent-highlight)" }}>{githubUsername}</h6>
                    <h6 className="text-xl text-white ml-8">{formattedDate}</h6>
                </div>
            </Link>
        </div>
    );
}

export default AnalysisHistoryItem;