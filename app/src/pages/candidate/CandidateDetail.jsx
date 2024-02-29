import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Input from "../../components/Input";
import profile from "../../images/profile.jpg";
import mainBackground from "../../images/main-background2.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import DataTable from "../../components/DataTable.jsx";

export default function CandidateDetail() {
  const textColor2 = "#D4983D";

  const [candidate, setCandidate] = useState([]);

  const [user, setUser] = useState([]);

  let navegate = useNavigate();
  //2) pillamos la id de la tarea
  const { id } = useParams();

  //3) hacemos peticion a la API para obtener la tarea
  async function getCandidateById() {
    const response = await fetch(`http://localhost:3000/api/v1/user/${id}/`, {
      method: "GET",
    });
    const data = await response.json();
    setUser(data);
    setCandidate(data);
  }

  //4)llamamos a la funcion en el useEfect
  useEffect(() => {
    getCandidateById();
  }, [id]);

  //implementacion del metodo DELETE de la API REST para borrar una tarea
  async function deleteCandidate() {
    await fetch(`http://localhost:3000/api/v1/user/experience/${id}/`, {
      method: "DELETE",
    });
    navegate("/");
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
          style={{ width: "50%", padding: "5rem", marginRight: "8rem"}}
        >
          <div className="profile-name-text">
            <h2>
              Laura Martinez Ruiz
              {candidate.fullName}
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
              {Input("Username", "Martinaza ", true)} {/* user.username */}
              {Input("Email", "martinita@gmail.com ", true)} {/* user.email */}
              {Input("Phone", "123456789 ", true)} {/* user.phone */}
            </div>
            <div className="text-white mt-8">
              <FontAwesomeIcon
                icon={faMapMarkerAlt}
                style={{ color: textColor2 }}
              />
              {candidate.residence} Seville, Spain
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
