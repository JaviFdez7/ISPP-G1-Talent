import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Input";
import profile from "../../images/profile.jpg";
import mainBackground from "../../images/main-background.jpg";
import LatestHistory from "../../components/LatestHistory";
import MainButton from "../../components/mainButton";
import SecondaryButton from "../../components/secondaryButton";
import axios from "axios";
import { useAuthContext } from "../../context/authContext";
import Logout from "../../components/swat/logout";

export default function RepresentativeDetail() {
  const { isAuthenticated, logout } = useAuthContext();
  const [userData, setUserData] = useState(null);
  let navigate = useNavigate();

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

  function createHistoryItem(id, date, name) {
    return {
      id,
      date: new Date(date),
      name,
    };
  }

  function sortAndFormatHistory(historyList) {
    historyList.sort((a, b) => b.date - a.date);
    return historyList.map((history) => ({
      id: history.id,
      date: history.date.toString(),
      name: history.name,
    }));
  }

  function getAnalysisHistory() {
    const analysisList = [
      createHistoryItem(1, "2024-02-28", "Analysis 1"),
      createHistoryItem(2, "2024-02-25", "Analysis 2"),
      createHistoryItem(3, "2024-02-27", "Analysis 3"),
    ];

    return sortAndFormatHistory(analysisList);
  }

  function getSearchHistory() {
    const searchList = [createHistoryItem(1, "2024-02-28", "Search 1")];

    return sortAndFormatHistory(searchList);
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
            {Input("Username", userData ? userData.username : " - ")}
            {Input("Company name", userData ? userData.companyName : " - ")}
            {Input("Phone number", userData ? userData.phone : " - ")}
            {Input("Corporative Email", userData ? userData.email : " - ")}
            {Input(
              "Project Society Name",
              userData ? userData.projectSocietyName : " - "
            )}
          </div>
          <div
            className="flex flex-col"
            style={{ width: "50%", padding: "5rem", marginRight: "8rem" }}
          >
            {MainButton("Update", "", "")}
            {SecondaryButton("Logout", "/login", () =>
              Logout(logout, navigate, "Representative")
            )}
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
        <LatestHistory
          header="Latest Analysis"
          data={getAnalysisHistory()}
          type="analysis"
          representativeId="1"
        />
        <LatestHistory
          header="Latest Search"
          data={getSearchHistory()}
          type="searches"
          representativeId="1"
        />
      </div>
    </div>
  );
}
