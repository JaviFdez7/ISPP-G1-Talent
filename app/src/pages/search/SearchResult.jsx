import React from "react";
import DataTableVertical from '../../components/DataTableVertical.jsx'
import axios from 'axios';
import profile from "../../images/profile.jpg";
import { useEffect, useState } from 'react';
import DropdownComponent from "../../components/DropDown.jsx";
import mainBackgroundRegisterLogin from "../../images/main-background2.jpg";
import MainButton from "../../components/mainButton.jsx";
import { Link, useParams } from "react-router-dom";



export default function SearchResult() {
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const apiURL = import.meta.env.VITE_BACKEND_URL;
  const { searchId } = useParams();




const [teamData, setTeamData] = useState(null);

async function fetchDataFromEndpoint(searchId) {
  try {
    const token = localStorage.getItem("access_token");
    const config = {
      headers: { Authorization: `${token}` }
    };
    const response = await axios.get(apiURL + "/team-creator/" + searchId, config);
    setTeamData(response.data); 
    setError(false);
    return response.data; 
  }catch (error) {
    if (error.message && error.message.includes('Network Error')) {
      setErrorMessage('Unable to connect to the server. Please make sure the server is running and accepting connections.');
    } else if (error.response) {
      if (error.response.status === 500) {
        setErrorMessage('Internal server error. Please try again later.');
      } else {
        setErrorMessage('An unknown error occurred. Please try again later.');
      }
    } else {
      setErrorMessage('An unknown error occurred. Please try again later.');
    }
    setError(true);
  }
}

useEffect(() => {
  fetchDataFromEndpoint(searchId);
}, [searchId]);

useEffect(() => {
  if (error) {
    console.log(errorMessage);
  }
}, [error, errorMessage]);


return (
  <section className="text-white flex flex-row justify-center bg-fixed h-screen"
    style={{
      backgroundImage: `url(${mainBackgroundRegisterLogin})`,
      backgroundSize: "cover",
      overflowY:"scroll"
    }}>
    

    <div className="container flex flex-col items-center w-10/12 h-full ">
    
      {teamData && teamData.profiles.map((team, index) => (
        <div key={index}>
          <div className="flex justify-center w-full mt-10">
            <h6 className="text-3xl font-bold text-center text-white mt-5 mb-5">
              Search result for Filter {index+1}
            </h6>
          </div>
          {Array.isArray(team.recommendedCandidates) && team.recommendedCandidates.length > 0 ? (
            team.recommendedCandidates.map((candidate, candidateIndex) => (
              <div className="flex justify-center w-full"> 
                <DropdownComponent key={candidateIndex} name={candidate.github_username}>
                  <div className="flex flex-col items-center justify-center w-full mr-5 ">
                    <DataTableVertical
                      data={[
                        {header: "Technologies", content: Array.isArray(candidate.technologies) ? candidate.technologies.join(', ') : ''},
                        {header: "Languages", content: Array.isArray(candidate.languages) ? candidate.languages.join(', ') : ''},
                        {header: "Field", content: Array.isArray(candidate.field) ? candidate.field.join(', ') : ''},
                        {header: "Years of Experience", content: candidate.yearsOfExperience},
                      ]}
                    />
                    <div className="flex mt-16 mb-0">
                      <Link to="/searches/searchId" className="ml-10" style={{ textDecoration: 'underline' }}>
                        View Analysis
                      </Link>
                    </div>  
                  </div>
                </DropdownComponent>
              </div>
            ))
          ) : (
            <h6 className="text-2xl font-bold text-center text-white mt-5 mb-5">
            No results for the search, please try different filters
          </h6>
          )}
        </div>
      ))}
      
      <div className="flex justify-center mt-10 mb-10">
        {MainButton("Back to Search", `/searches/search`, "")}
      </div>  
      {error && <p>{errorMessage}</p>}  
    </div>
  </section>
);
}
