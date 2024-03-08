import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import arrowLeft from "../images/arrowLeft.png";
import arrowRight from "../images/arrowRight.png";
import logoutIcon from "../images/logout.png";
import mail from "../images/mail.png";
import profile from "../images/profile.jpg";
import "../styles/navbar.css";
import Profile from "../pages/candidate/CandidateDetail";
import { useAuthContext } from "../context/authContext.jsx";
import axios from "axios";
import Swal from "sweetalert2";

export default function Navbar() {
  const [expanded, setExpanded] = useState(false);
  const [userData, setUserData] = useState(null);
  const { isAuthenticated, logout } = useAuthContext();

  let navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (isAuthenticated) {
          const currentUserId = localStorage.getItem("userId");
          const response = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/user`
          );
          const user = response.data.find((user) => user._id === currentUserId);
          setUserData(user);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, [isAuthenticated]);

  const Logout = () => {
    Swal.fire({
      title: "Are you sure you want to log out?",
      showDenyButton: true,
      confirmButtonText: "Yes",
      denyButtonText: `No`,
      confirmButtonColor: "var(--talent-highlight)",
      denyButtonColor: "var(--talent-black)",
      background: "var(--talent-secondary)",
      color: "white",
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
        navigate("/");
        Swal.fire({
          title: "Closed session",
          icon: "success",
          background: "var(--talent-secondary)",
          color: "white",
          confirmButtonColor: "var(--talent-highlight)",
        });
      } else if (result.isDenied) {
        if (userData && userData.role === "Representative") {
          navigate("/representative/detail");
        } else if (userData && userData.role === "Candidate") {
          navigate("/candidate/detail");
        }
      }
    });
  };

  function move_hoverer(n) {
    let t = 165;
    t += n * 68;
    document.getElementById("navbar-hoverer").style.top = t + "px";
  }

  function move_current(n) {
    let t = 165;
    t += n * 68;
    document.getElementById("navbar-current").style.top = t + "px";
  }

  function toogleSideNav() {
    if (!expanded) {
      document.getElementById("sidenav").style.left = "-0px";
      document.getElementById("arrow-img").src = arrowLeft;
      document.getElementById("sideNavButtonContainer").style.left = "405px";
      setExpanded(true);
    } else {
      document.getElementById("sidenav").style.left = "-400px";
      document.getElementById("arrow-img").src = arrowRight;
      document.getElementById("sideNavButtonContainer").style.left = "405px";
      setExpanded(false);
    }
  }
  
  const subscription = isAuthenticated ? ( userData && userData.role == "Representative" ? "/representative/subscription" : "/candidate/subscription") : "/login";
  

  return (
    <div className="sidenav" id="sidenav">
      <div className="inner-sidenav">
        <div className="flex justify-around">
          <Link to="/">
            <span className="logo">IT TALENT</span>
          </Link>
        </div>
        <hr />
        <br />
        <div className="navbar-hoverer" id="navbar-hoverer"></div>
        <div className="navbar-current" id="navbar-current"></div>
        {isAuthenticated && (
          <>
            <Link
              to="/"
              onMouseEnter={() => move_hoverer(0)}
              onMouseDown={() => move_current(0)}
              className="link-container"
            >
              <span>ICON</span>
              <p>&nbsp;&nbsp;&nbsp;</p>
              <span>Trends</span>
            </Link>
            {isAuthenticated && userData && userData.role === "Representative" && (
              <Link
                to="/analysis/analyze"
                onMouseEnter={() => move_hoverer(2)}
                onMouseDown={() => move_current(2)}
                className="link-container"
              >
                <span>ICON</span>
                <p>&nbsp;&nbsp;&nbsp;</p>
                <span>My analysis</span>
              </Link>
            )}
            <Link
              to={subscription}
              onMouseEnter={() => move_hoverer(3)}
              onMouseDown={() => move_current(3)}
              className="link-container"
            >
              <span>ICON</span>
              <p>&nbsp;&nbsp;&nbsp;</p>
              <span>Subscription</span>
            </Link>
          </>
        )}

        {isAuthenticated ? (
          <>
            <Link
              to="/support"
              onMouseEnter={() => move_hoverer(3)}
              onMouseDown={() => move_current(3)}
              className="link-container"
            >
              <span>ICON</span>
              <p>&nbsp;&nbsp;&nbsp;</p>
              <span>Information</span>
            </Link>
            <Link
              to="/settings"
              onMouseEnter={() => move_hoverer(4)}
              onMouseDown={() => move_current(4)}
              className="link-container"
            >
              <span>ICON</span>
              <p>&nbsp;&nbsp;&nbsp;</p>
              <span>Settings</span>
            </Link>
          </>
        ) : (
          <>
            <Link
              to="/support"
              onMouseEnter={() => move_hoverer(0)}
              onMouseDown={() => move_current(0)}
              className="link-container"
            >
              <span>ICON</span>
              <p>&nbsp;&nbsp;&nbsp;</p>
              <span>Information</span>
            </Link>
            <Link
              to="/settings"
              onMouseEnter={() => move_hoverer(1)}
              onMouseDown={() => move_current(1)}
              className="link-container"
            >
              <span>ICON</span>
              <p>&nbsp;&nbsp;&nbsp;</p>
              <span>Settings</span>
            </Link>
          </>
        )}
        {isAuthenticated ? (
          userData && userData.role == "Representative" ? (
            // Mostrar contenido para representante
            <div>
              <Link to="/representative/detail" className="profile-container">
                <div className="profile-pic-container">
                  <img src={profile} className="profile-pic" />
                </div>
                <div className="profile-text">
                  <h1>{userData ? userData.username : " - "}</h1>
                  <h1 className="text-gray-500">
                    {userData ? userData.companyName : " - "}
                  </h1>
                </div>
              </Link>
              <button onClick={Logout} className="logout">
                <img src={logoutIcon} />
                {/* TODO code of petitions left*/}
              </button>
            </div>
          ) : (
            // Mostrar contenido para usuario autenticado pero no representante
            <div>
              <Link to="/candidate/detail" className="profile-container">
                <div className="profile-pic-container">
                  <img src={profile} className="profile-pic" />
                </div>
                <div className="profile-text">
                  <h1>{userData ? userData.fullName : " - "}</h1>
                </div>
              </Link>
              <Link to="/" className="mail">
                <img src={mail} />
              </Link>
              <button onClick={Logout} className="logout">
                <img src={logoutIcon} />
                {/* TODO code of mail*/}
                <div className="mail-amount">
                  <span>1</span>
                </div>
              </button>
            </div>
          )
        ) : null}
      </div>
      <div className="sideNavButtonContainer" id="sideNavButtonContainer">
        <img
          id="arrow-img"
          src={arrowRight}
          onClick={toogleSideNav}
          className="sideNavButton"
        />
      </div>
      <div className="sidenav-highlight"></div>
    </div>
  );
}
