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

export default function CandidateNotificationDetail() {

  const [notifications, setNotifications] = useState([])

	const { isAuthenticated, logout } = useAuthContext()

  React.useEffect(() => {
    const fetchNotificationsData = async () => {
      try {
        if (isAuthenticated) {
          const currentUserId = localStorage.getItem("userId");
          const token = localStorage.getItem("access_token");
          if (currentUserId && token) {
            const response = await axios.get(
              `${import.meta.env.VITE_BACKEND_URL}/user/${currentUserId}/notification`,
              {
                params: {
                  userId: currentUserId,
                },
                headers: {
                  'Content-type': 'application/json',
                  'Authorization': `${token}`,
                },
              }
            );
            setNotifications(response.data.data);
          }
        }
      } catch (error) {
        console.log("Error fetching notification data:", error.response.data.message);
      }
    }
    fetchNotificationsData();
  }, [isAuthenticated]);

  return (
    <div
      className="flex flex-col justify-center p-10"
      style={{
        height: "100vh",
        backgroundAttachment: "fixed",
        backgroundImage: `url(${mainBackground})`,
        backgroundSize: "cover",
      }}
    >
      <div
        className="h-full w-10/12 rounded shadow-md flex flex-col justify-between self-center p-4 m-4 mb-4"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          borderColor: "var(--talent-highlight)",
          borderWidth: "1px",
          backdropFilter: "blur(8px)",
        }}
      >

        <h1 className="text-5xl text-center text-white m-10">
          Notifications
        </h1>

        <div className="flex flex-col justify-between items-center" style={{overflowY: "scroll"}}>
          <DataTable
            header={""}
            contentArray={notifications ? notifications.sort(
              (a, b) => b.dateTime.localeCompare(a.dateTime))
              .map((n) => 
              (<div className="flex flex-row">
                <div className="w-4/5">
                  <p className="text-white font-bold">
                    {n.dateTime.slice(0, 10) + " " + n.dateTime.slice(11, 19)}
                  </p>
                  <br></br>
                  <p>
                    {n.message}
                  </p>
                </div>
                <div className="w-1/5">
                  {SecondaryButton("View profile", "/candidate/representative-view/" + n.representativeId)}
                </div>
              </div>)
              ) 
              
              : []}
            editable={false}
          />
        </div>

        
      </div>
    </div>
  )
}
