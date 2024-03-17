import React, { useEffect, useState } from "react";
import SecondaryButton from "../../components/secondaryButton";
import mainBackgroundRegisterLogin from "../../images/main-background2.jpg";
import MainButton from "../../components/mainButton";


export default function CandidateProfessionalExperienceDetail({ }) {
  const talentColor = "var(--talent-highlight)";

  const [experience, setExperience] = useState({});

  const id = localStorage.getItem("experienceId");

  async function getExperienceById() {
    const response = await fetch(import.meta.env.VITE_BACKEND_URL + `/professional-experience/${id}/`, {
      method: "GET",
    });
    const data = await response.json();
    setExperience(data.data);
  }

  useEffect(() => {
    getExperienceById();
  }, [id]);

  return (
    <div
      className="flex flex-col justify-center"
      style={{
        height: "100vh",
        backgroundAttachment: "fixed",
        backgroundImage: `url(${mainBackgroundRegisterLogin})`,
        backgroundSize: "cover",
      }}
    >
      <div
        className="h-100 rounded shadow-md flex flex-col justify-between"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          width: "100%",
          maxWidth: "48rem",
          padding: "2rem",
          margin: "1rem",
          marginLeft: "auto",
          marginRight: "auto",
          borderColor: "var(--talent-highlight)",
          borderWidth: "1px",
        }}
      >
        <div>
          <h2
            className="font-bold text-center text-white"
            style={{
              fontSize: "3rem",
              marginTop: "2rem",
              marginBottom: "4rem",
            }}
          >
            Professional Experience Detail
          </h2>
          <div className="flex flex-wrap profile-info-text">
            <div className="w-full sm:w-1/2 p-4">
              <div className="p-4 border rounded" style={{
                borderColor: talentColor,
              }}>
                <p><strong>Start Date:</strong></p>
                <div className="flex flex-col w-full profile-info-text">
                  {new Date(experience.startDate).toLocaleDateString()}
                </div>
              </div>
              <br />
              <div className="p-4 border rounded" style={{
                borderColor: talentColor,
              }}>
                <p><strong>End Date:</strong></p>
                <div className="flex flex-col w-full profile-info-text">
                  {new Date(experience.endDate).toLocaleDateString()}
                </div>
              </div>
            </div>
            <div className="w-full sm:w-1/2 p-4" >
              <div className="p-4 border rounded" style={{
                borderColor: talentColor,
              }}>
                <p><strong>Company Name:</strong></p>
                <div className="flex flex-col w-full profile-info-text">
                  {experience.companyName}
                </div>
              </div>
              <br />
              <div className="p-4 border rounded" style={{
                borderColor: talentColor,
              }}>
                <p><strong>Professional Area:</strong></p>
                <div className="flex flex-col w-full profile-info-text">
                  {experience.professionalArea}
                </div>
              </div>
            </div>
            <div className="mt-8 self-center w-full">
              {SecondaryButton("Back", "/candidate/detail", "")}
              {MainButton("Update", "/candidate/professional-experience/edit", "")}
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}