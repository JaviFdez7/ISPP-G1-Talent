import React, { useEffect, useState } from "react";
import { useAuthContext } from "../context/authContext";
import mainBackground from "../images/main-background.jpg";
import Typewriter from "../components/typewriter.jsx";
import MainButton from "../components/mainButton.jsx";
import SecondaryButton from "../components/secondaryButton.jsx";
import axios from "axios"

export default function Home() {
  const { isAuthenticated } = useAuthContext();
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (isAuthenticated) {
          const currentUserId = localStorage.getItem("userId");
          const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user`);
          const user = response.data.find(user => user._id === currentUserId);
          setUserName(user.username);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, [isAuthenticated]);

  return (
    <div
      className="flex flex-col justify-start bg-fixed home-container"
      style={{ backgroundImage: `url(${mainBackground})`, backgroundSize: "cover" }}
    >
      <div className="container mx-auto flex flex-col items-center text-center mt-20">
        <h1>
          <span className="blinker">| </span>
          <Typewriter text="Welcome to IT TALENT" delay={100} />
          <br />
        </h1>
        <br></br>
        <br></br>
        <br></br>
        <h2>
          Prepare for a <strong>revolution</strong>
          <br />
          in hiring computer professionals
        </h2>
        <h3><strong>Join us now!</strong></h3>

        <div>
          {isAuthenticated ? (
            <h2>
              Welcome {userName}!
            </h2>
          ) : (
            <div className="flex gap-24 mt-12">
              {MainButton("Register", "/register/candidate", "")}
              {SecondaryButton("Log in", "/login", "")}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
