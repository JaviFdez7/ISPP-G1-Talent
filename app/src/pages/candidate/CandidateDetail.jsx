import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
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
          const user = response.data.find(user => user._id === currentUserId);
          setCandidate(user);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, [isAuthenticated]);

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <div
      className="flex flex-col bg-fixed"
      style={{
        backgroundImage: `url(${mainBackground})`,
        backgroundSize: "cover",
      }}
    >
      <div className="flex flex-row justify-center">
        <div
          className="flex flex-col items-center"
          style={{ width: "37%", padding: "4rem", marginTop: "5rem" }}
        >
          <img
            src={profile} //[candidate.profilePicture}
            className="rounded-full border border-gray-300"
            style={{ width: "25vw", height: "50vh" }}
          />
        </div>
        <div
          className="flex flex-col"
          style={{ width: "50%", padding: "5rem", marginRight: "8rem" }}
        >
          <div className="profile-name-text">
            <h2>
              {candidate && candidate.fullName ? candidate.fullName : " - "}
            </h2>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "0.5rem",
              fontSize: "26px",
              color: "white",
            }}
          >
            <div className="flex flex-col w-full">
              {Input("Username", candidate ? candidate.username : " - ", true)} {/* user.username */}
              <br></br>
              {Input("Email", candidate ? candidate.email : " - ", true)} {/* user.email */}
              <br></br>
              {Input("Phone", candidate ? candidate.phone : " - ", true)} {/* user.phone */}
            </div>

            <div className="text-white mt-8">
              <FontAwesomeIcon
                icon={faMapMarkerAlt}
                style={{ color: textColor2 }}
              />
              {candidate.residence} {candidate && candidate.address ? candidate.address : " Seville, Spain "}
            </div>
            <div
              className="flex flex-col"
              style={{ width: "50%", padding: "5rem", marginRight: "8rem" }}
            >
              {MainButton("Update", "", "")}
              {SecondaryButton("Logout", "/login", handleLogout)}
            </div>
          </div>
        </div>
      </div>
      <br></br>
      <h3 className="profile-title">Developer info</h3>
      <hr className="w-5/12 self-center"></hr>
      <br></br>
      <br></br>
      <br></br>
      <div className="flex flex-row justify-center">
        <div className="flex flex-col w-5/12 p-20">
          <DataTable
            header={"Latest Jobs"}
            contentArray={["TODO", "TODO", "..."]}
            editable={true}
            addLink=""
            editLink=""
          />
          <br></br>
          <DataTable
            header={"Popular repositories"}
            contentArray={["On your tutorials", "..."]}
          />
        </div>
        <div className="flex flex-col w-5/12 p-20">
          <DataTable header={"Preferences"} contentArray={["Work from home"]} />
          <br></br>
          <div className="w-full"
          >
            {Input("Github username", "martinnez123", false, true)} {/* candidate.githubUser */}
          </div>
          <br></br>
          <DataTable
            header={"Most popular tecnologies"}
            contentArray={["1. Java", "2. Python", "3. Other"]}
            editable={true}
            addLink=""
            editLink=""
          />
        </div>
      </div>
      <h3 className="profile-title">Work experience</h3>
      <hr className="w-5/12 self-center"></hr>
      <br></br>
      <br></br>
      <br></br>
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
          editable={true}
          addLink=""
          editLink=""
        />
      </div>
      <br></br>
      <br></br>
    </div>
  );
}
