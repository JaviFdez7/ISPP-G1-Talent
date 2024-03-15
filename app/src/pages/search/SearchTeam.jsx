import React from "react";
import DataTableVertical from '../../components/DataTableVertical.jsx'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DropdownComponent from "../../components/DropDown.jsx";

import mainBackgroundRegisterLogin from "../../images/main-background2.jpg";
import MainButton from "../../components/mainButton.jsx";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../context/authContext.jsx";



export default function AnalysisDashboard() {

  const { isAuthenticated, logout } = useAuthContext();
  const [userData, setUserData] = useState(null);


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (isAuthenticated) {
          const currentUserId = localStorage.getItem("userId");
          const response = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/user`
          );
          console.log(response.data.data)
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

            <div className="container flex flex-col items-center w-10/12 h-full">
                    {/* CANDIDATE column */}
                    
                   
                    <div className="flex flex-col items-center w-8/12 mt-10"> 
                        <h6  className="text-3xl font-bold text-center text-white mt-5 mb-5  ">
                             Your team
                        </h6>
                    </div>
                    

                    <DropdownComponent name='Candidate1'>
                      <div className="flex flex-col items-center w-full ">
                          <DataTableVertical
                              data={[
                                  {header: "Especialidad", content: "Frontend"},
                                  {header: "Technologies", content: "React"},
                                  {header: "Languages", content: "javascript, css, TypeScript"},
                                  {header: "Lifestyle", content: "Telecommuting"},
                              ]}
                          />
                          <Link to="/" className="text-white underline mt-10">
                              View analysis
                          </Link>
                      </div>
                  </DropdownComponent>

                  <DropdownComponent name='Candidate2'>
                      <div className="flex flex-col items-center w-full ">
                          <DataTableVertical
                              data={[
                                  {header: "Especialidad", content: "Frontend"},
                                  {header: "Technologies", content: "React"},
                                  {header: "Languages", content: "javascript, css, TypeScript"},
                                  {header: "Lifestyle", content: "Telecommuting"},
                              ]}
                          />
                          <Link to="/" className="text-white underline mt-10">
                              View analysis
                          </Link>
                      </div>
                  </DropdownComponent>
       

                    

                    
                    <div className="  flex justify-center mt-16 mb-0">
                      {MainButton("Add candidate", `/analysis/list`, "")}
                    </div>        
            </div>
        </section >
    );
}
