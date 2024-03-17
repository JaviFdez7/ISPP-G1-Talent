import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/Input";
import profile from "../../images/profile.jpg";
import mainBackground from "../../images/main-background2.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import DataTable from "../../components/DataTable.jsx";
import axios from "axios"
import { useAuthContext } from "../../context/authContext";
import MainButton from "../../components/mainButton";
import SecondaryButton from "../../components/secondaryButton";
import Logout from '../../components/swat/logout';

export default function CandidateDetail() {
  const { isAuthenticated, logout } = useAuthContext();
  const textColor2 = "#D4983D";
  const [candidate, setCandidate] = useState([]);
  let navigate = useNavigate();

  React.useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (isAuthenticated) {
          const currentUserId = localStorage.getItem("userId");
          const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user`);
          const user = response.data.data.find(user => user._id === currentUserId);
          setCandidate(user);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, [isAuthenticated]);

  return (
    <div
      className="flex flex-col bg-fixed"
      style={{
        backgroundImage: `url(${mainBackground})`,
        backgroundSize: "cover",
      }}
    >
      <div className="flex flex-row justify-center items-center profile-header w-10/12 mt-20">
        <div className="flex flex-col items-center">
          <img
            src={profile} //[candidate.profilePicture}
            className="rounded-full border border-gray-300 profile-img"
          />
        </div>
        <div className="flex flex-col mt-10 w-fit">
          <div className="profile-name-text text-center">
            <h2>
              {candidate && candidate.fullName ? candidate.fullName : " - "}
            </h2>
          </div>
            <div className="flex flex-col w-full profile-info-text">
              {Input("Username", candidate ? candidate.username : " - ", false)} {/* user.username */}
              <br></br>
              {Input("Email", candidate ? candidate.email : " - ", false)}
              <br></br>
              {Input("Phone", candidate ? candidate.phone : " - ", false)} {/* user.phone */}
              <div className="text-white mt-8">
                <FontAwesomeIcon
                  icon={faMapMarkerAlt}
                  style={{ color: textColor2 }}
                  />
                {candidate.residence} {candidate && candidate.address ? candidate.address : " Seville, Spain "}
            </div>
            </div>
            <div className="mt-8 self-center">
              {SecondaryButton("Update", "", "")}
            </div>

        </div>
      </div>
      <br></br>
      <h3 className="profile-title">Developer info</h3>
      <hr className="w-5/12 self-center"></hr>
      <br></br>
      <br></br>
      <br></br>
      <div className="flex flex-col w-8/12 self-center">
        <DataTable
          header={"Latest Jobs"}
          contentArray={["TODO", "TODO", "..."]}
          editable={false}
          addLink=""
          editLink=""
        />
        <br></br>
        <br></br>
        <DataTable
          header={"Popular repositories"}
          contentArray={["On your tutorials", "..."]}
        />
        <br></br>
        <br></br>
        <DataTable header={"Preferences"} contentArray={["Work from home"]} />
        <br></br>
        <br></br>
        <div className="w-full"
        >
          {Input("Github username", "martinnez123", false, true)} {/* candidate.githubUser */}
        </div>
        <br></br>
        <br></br>
        <DataTable
          header={"Most popular tecnologies"}
          contentArray={["1. Java", "2. Python", "3. Other"]}
          editable={false}
          addLink=""
          editLink=""
        />
        <br></br>
        <br></br>
      </div>
      <h3 className="profile-title">Work experience</h3>
      <hr className="w-5/12 self-center"></hr>
      <div
        className="w-9/12 self-center"
        style={{ marginBottom: "3rem", marginTop: "3rem" }}
      >
        <DataTable
          header={""}
          contentArray={[
            "Fujitsu - Scraping development project",
            "Ayesa - Main team manager on web app development",
            "...",
          ]}
          editable={false}
          addLink=""
          editLink=""
        />
      </div>
      <br></br>
      <br></br>
    </div>
  );
}
