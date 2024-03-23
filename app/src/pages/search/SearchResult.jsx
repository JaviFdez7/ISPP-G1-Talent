import React from "react";
import DataTableVertical from '../../components/DataTableVertical.jsx'
import axios from 'axios';
import profile from "../../images/profile.jpg";
import { useEffect, useState } from 'react';
import DropdownComponent from "../../components/DropDown.jsx";
import mainBackgroundRegisterLogin from "../../images/main-background2.jpg";
import MainButton from "../../components/mainButton.jsx";
import { Link } from "react-router-dom";



export default function SearchResult() {
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const apiURL = import.meta.env.VITE_BACKEND_URL;




const [teamData, setTeamData] = useState(null);

async function fetchDataFromEndpoint(representativeId) {
  try {
      const token = localStorage.getItem("access_token");
      const config = {
          headers: { Authorization: `${token}` }
      };
      const response = await axios.get(apiURL + "/team-creator/representative-user/" + representativeId, config);
      console.log("Response:", response.data); 
      setTeamData(response.data); 
      setError(false);
      return response.data; 
  } catch (error) {
    console.log(error.response.data.errors);
    setError(true);
    setErrorMessage('Unable to connect to the server. Please try again later.');
    console.error("Error al llamar al endpoint:", error);
    throw error;
  }
}

useEffect(() => {
  // Aquí puedes poner el representativeId que necesitas para llamar a fetchDataFromEndpoint
  const representativeId = localStorage.getItem("userId");
  fetchDataFromEndpoint(representativeId);
}, []);


return (
  <section className="text-white flex flex-row justify-center bg-fixed h-screen"
    style={{
      backgroundImage: `url(${mainBackgroundRegisterLogin})`,
      backgroundSize: "cover",
      overflowY:"scroll"
    }}>

    <div className="container flex flex-col items-center w-10/12 h-full ">
      {teamData && teamData[0].profiles.map((team, index) => (
        <div key={index}>
          <div className="flex justify-center w-full mt-10">
            <h6 className="text-3xl font-bold text-center text-white mt-5 mb-5">
              {/* Verifica si team.profileRequested es un array antes de intentar acceder a team.profileRequested[0].field */}
              Search result for Filter {index+1}
            </h6>
          </div>
          {/* Verifica si team.recommendedCandidates es un array antes de intentar llamar a map en él */}
          {Array.isArray(team.recommendedCandidates) && team.recommendedCandidates.map((candidate, candidateIndex) => (
            <div className="flex justify-center w-full"> 
              <DropdownComponent key={candidateIndex} name={candidate.github_username} imgSrc={profile}>
                <div className="flex flex-col items-center w-full ">
                  <DataTableVertical
                    data={[
                      {header: "Technologies", content: Array.isArray(candidate.technologies) ? candidate.technologies.join(', ') : ''},
                      {header: "Languages", content: Array.isArray(candidate.languages) ? candidate.languages.join(', ') : ''},
                      {header: "Field", content: Array.isArray(candidate.field) ? candidate.field.join(', ') : ''},
                      {header: "Years of Experience", content: candidate.yearsOfExperience},
                    ]}
                  />
                  <div className="flex mt-16 mb-0">
                    {MainButton("Add to team", `/searches/:searchId`, "")}
                    <Link to="/searches/searchId" className="ml-10" style={{ textDecoration: 'underline' }}>
                      View Analysis
                    </Link>
                  </div>  
                </div>
              </DropdownComponent>
            </div>
          ))}
        </div>
      ))}
      <div className="flex justify-center mt-10 mb-10">
        {MainButton("Back to Search", `/searches/search`, "")}
      </div>    
    </div>
  </section>
);
}
