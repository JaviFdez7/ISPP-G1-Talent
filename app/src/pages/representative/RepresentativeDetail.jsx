import React from "react";

import Input from "../../components/Input";
import InputList from "../../components/InputList";
import profile from "../../images/profile.jpg";
import mainBackground from "../../images/main-background.jpg";

export default function RepresentativeDetail() {
  return (
    <div
      className="flex flex-col"
      style={{
        backgroundImage: `url(${mainBackground})`,
        backgroundSize: "cover",
      }}
    >
      <div className="flex flex-row justify-center">
        <div
          className="flex flex-col items-center mt-10"
          style={{ width: "41.6667%", padding: "4rem" }}
        >
          <img
            src={profile}
            className="rounded-full border border-gray-300 mb-4"
            style={{ width: "15vw", height: "30vh" }}
          />
          <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Change Photo
          </button>
        </div>
        <div
          className="flex flex-col"
          style={{ width: "50%", padding: "5rem", marginRight: "8rem" }}
        >
          <div className="flex flex-col mt-10 w-10/12">
            {Input("Username", "empresaurus")}
            {Input("Company name", "Marismas SA")}
            {Input("Phone number", "123456789")}
            {Input("Corporative Email", "fujitora2@gmail.com")}
            {Input("Address", "False Street")}
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
          {InputList("Latest jobs", ["Fujitsu", "Ayesa", "..."])}
          <br></br>
          {InputList("Popular repositories", ["On your tutorials", "..."])}
        </div>
        <div className="flex flex-col w-5/12 p-20">
          {Input("Preferences", "Work from home")}
          <br></br>
          {Input("Github username", "martinnez123")}
          <br></br>
          {InputList("Most popular tecnologies", [
            "1. Java",
            "2. Python",
            "3. Other",
          ])}
        </div>
      </div>
    </div>
  );
}
