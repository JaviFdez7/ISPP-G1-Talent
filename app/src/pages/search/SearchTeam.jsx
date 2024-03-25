import React from "react";
import DataTableVertical from '../../components/DataTableVertical.jsx'
import axios from 'axios';
import { useEffect, useState } from 'react';
import DropdownComponent from "../../components/DropDown.jsx";
import profile from "../../images/profile.jpg";
import mainBackgroundRegisterLogin from "../../images/main-background2.jpg";
import MainButton from "../../components/mainButton.jsx";
import { useAuthContext } from "../../context/authContext.jsx";



export default function SearchTeam() {

  const { isAuthenticated, logout } = useAuthContext();
  const [userData, setUserData] = useState(null);
  const candidates = ['Candidate1', 'Candidate2', 'Candidate3']; // lista de candidatos de equipo

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (isAuthenticated) {
          const currentUserId = localStorage.getItem("userId");
          const response = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/user`
          );
          const user = response.data.data.find((user) => user._id === currentUserId);
          setUserData(user);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, [isAuthenticated]);

    

    return (
      <section className="text-white flex flex-row justify-center bg-fixed h-screen"
        style={{
          backgroundImage: `url(${mainBackgroundRegisterLogin})`,
          backgroundSize: "cover",
          overflowY:"scroll"
        }}>

            <div className="container flex flex-col items-center w-10/12 h-full mb-10">                  
                   
                    <div className="flex flex-col items-center w-8/12 mt-10"> 
                        <h6  className="text-3xl font-bold text-center text-white mt-5 mb-5  ">
                             Your team
                        </h6>
                    </div>
                    <> 
                      {candidates.map((candidate, index) => (
                      <DropdownComponent  key={index} name={candidate} imgSrc={profile}>
                        <div className="flex flex-col items-center w-full ">
                            <DataTableVertical
                                data={[
                                  {header: "Technologies", content: "React"},
                                  {header: "Languages", content: "javascript, css, TypeScript"},
                                  {header: "Field", content: "Frontend"},
                                  {header: "Years of Experience", content: "3"},
                              ]}
                            />
                          <div className="  flex justify-center mt-16 mb-0">
                            {MainButton("Remove", `/searches/team`, "")}
                          </div>  
                        </div>
                    </DropdownComponent>
                    ))}
                   </>
                    <div className="  flex justify-center mt-16 mb-0">
                      {MainButton("Add candidate", `/searches/search`, "")}
                    </div>        
            </div>
        </section >
    );
}
