import React from "react";

import Input from "../../components/Input";
import InputList from "../../components/InputList";
import profile from "../../images/profile.jpg";

export default function RepresentativeDetail() {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-center">
        <div className="w-3/12 p-16 flex flex-col mt-10">
          <img src={profile} />
          <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Change Photo
          </button>
        </div>
        <div className="flex flex-col w-5/12 p-20">
          <div className="profile-name-text">
            <h2>Latest analysis</h2>
          </div>
          <table className="table-auto text-white">
            <thead>
              <tr>
                <th className="px-4 py-2">Username</th>
                <th className="px-4 py-2">Fecha analisis</th>
                <th className="px-4 py-2">Show analysis</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-4 py-2">Candidate Matino</td>
                <td className="border px-4 py-2">18/02/2024</td>
                <td className="border px-4 py-2">Show analysis</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Candidate Matino</td>
                <td className="border px-4 py-2">18/02/2024</td>
                <td className="border px-4 py-2">Show analysis</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Candidate Matino</td>
                <td className="border px-4 py-2">18/02/2024</td>
                <td className="border px-4 py-2">Show analysis</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Candidate Matino</td>
                <td className="border px-4 py-2">18/02/2024</td>
                <td className="border px-4 py-2">Show analysis</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="flex flex-col w-5/12 p-20">
          <div className="profile-name-text">
            <h2 className="text-5xl">Latest recommendations</h2>
          </div>
          <table className="table-auto text-white">
            <thead>
              <tr>
                <th className="px-4 py-2">Tipo de desarrollador</th>
                <th className="px-4 py-2">Fecha analisis</th>
                <th className="px-4 py-2">Show recommendation</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-4 py-2">Game Developer</td>
                <td className="border px-4 py-2">18/02/2024</td>
                <td className="border px-4 py-2">Show recommendation</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Game Developer</td>
                <td className="border px-4 py-2">18/02/2024</td>
                <td className="border px-4 py-2">Show recommendation</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
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
      <h3 className="profile-title">Work experience</h3>
      <hr className="w-5/12 self-center"></hr>
      <br></br>
      <br></br>
      <br></br>
      <div className="w-9/12 self-center">
        {InputList("", [
          "Fujitsu - Scraping development project",
          "Ayesa - Main team manager on web app development",
          "...",
        ])}
      </div>
      <br></br>
      <br></br>
    </div>
  );
}
