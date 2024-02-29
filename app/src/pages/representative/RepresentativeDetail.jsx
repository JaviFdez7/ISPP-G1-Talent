import React from "react";

import Input from "../../components/Input";
import InputList from "../../components/InputList";
import profile from "../../images/profile.jpg";
import mainBackground from "../../images/main-background.jpg";
import LatestHistory from "../../components/LatestHistory";

export default function RepresentativeDetail() {

  function getAnalysisHistory() {
    //TODO fetch real de historiales
    const analysisHistory1 = {
      id: 1,
      date: new Date("2024-02-28"),
      name: "Analysis 1"
    };
  
    const analysisHistory2 = {
      id: 2,
      date: new Date("2024-02-25"),
      name: "Analysis 2"
    };
  
    const analysisHistory3 = {
      id: 3,
      date: new Date("2024-02-27"),
      name: "Analysis 3"
    };

    const analysisList = [analysisHistory1, analysisHistory2, analysisHistory3];
    analysisList.sort((a, b) => b.date - a.date);
  
    return analysisList.map(history => ({
      id: history.id,
      date: history.date.toString(),
      name: history.name
    }));
  }

  function getSearchHistory() {
    //TODO fetch real de historiales
    const searchHistory1 = {
      id: 1,
      date: new Date("2024-02-28"),
      name: "Search 1"
    };
    
    const searchList = [searchHistory1];
    searchList.sort((a, b) => b.date - a.date);
  
    return searchList.map(history => ({
      id: history.id,
      date: history.date.toString(),
      name: history.name
    }));
  }

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
            style={{ width: "25vw", height: "50vh" }}
          />
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
      <h3 className="profile-title">Latest Actions</h3>
      <hr className="w-5/12 self-center"></hr>
      <br></br>
      <br></br>
      <br></br>
      <div className="flex flex-row justify-center">
        <LatestHistory header="Latest Analysis" data={getAnalysisHistory()} type="analysis" representativeId="1"/>
        <LatestHistory header="Latest Search" data={getSearchHistory()} type="searches" representativeId="1"/>
      </div>
    </div>
  );
}
