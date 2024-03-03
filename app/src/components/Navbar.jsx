import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import arrowLeft from "../images/arrowLeft.png";
import arrowRight from "../images/arrowRight.png";
import logout from "../images/logout.png";
import mail from "../images/mail.png";
import profile from "../images/profile.jpg";
import "../styles/navbar.css";
import Profile from "../pages/candidate/CandidateDetail";
import { useAuthContext } from "../context/authContext.jsx";

export default function Navbar() {
  const [expanded, setExpanded] = useState(false);
  const { isAuthenticated, logout } = useAuthContext();

  let navigate = useNavigate();
  const Logout = () => {//funcion para cerrar sesion y redirigir a la pagina de inicio 
    logout();
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

  return (
    <div className="sidenav" id="sidenav">
      <div className="inner-sidenav">
        <div className="flex justify-around">
          <span className="logo">IT TALENT</span>
        </div>
        <hr />
        <br />
        <div className="navbar-hoverer" id="navbar-hoverer"></div>
        <div className="navbar-current" id="navbar-current"></div>
        <Link
          to="/candidate/detail"
          onMouseEnter={() => move_hoverer(0)}
          onMouseDown={() => move_current(0)}
          className="link-container"
        >
          <span>ICON</span>
          <p>&nbsp;&nbsp;&nbsp;</p>
          <span>Profile</span>
        </Link>
        <Link
          to="/"
          onMouseEnter={() => move_hoverer(1)}
          onMouseDown={() => move_current(1)}
          className="link-container"
        >
          <span>ICON</span>
          <p>&nbsp;&nbsp;&nbsp;</p>
          <span>Trends</span>
        </Link>
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
        <Link
          to="/candidate/subscription"
          onMouseEnter={() => move_hoverer(3)}
          onMouseDown={() => move_current(3)}
          className="link-container"
        >
          <span>ICON</span>
          <p>&nbsp;&nbsp;&nbsp;</p>
          <span>Subscription</span>
        </Link>
        <Link
          to="/support"
          onMouseEnter={() => move_hoverer(4)}
          onMouseDown={() => move_current(4)}
          className="link-container"
        >
          <span>ICON</span>
          <p>&nbsp;&nbsp;&nbsp;</p>
          <span>Information</span>
        </Link>
        <Link
          to="/settings"
          onMouseEnter={() => move_hoverer(5)}
          onMouseDown={() => move_current(5)}
          className="link-container"
        >
          <span>ICON</span>
          <p>&nbsp;&nbsp;&nbsp;</p>
          <span>Settings</span>
        </Link>

        <Link to="/candidate/detail" className="profile-container">
          <div className="profile-pic-container">
            <img src={profile} className="profile-pic" />
          </div>
          <div className="profile-text">
            <h1>Name</h1>
            <h1>Surname</h1>
          </div>
        </Link>
        <Link to="/" className="mail">
          <img src={mail} />
        </Link>
        <Link to="/" className="logout">
          <img src={logout} />
          {/* TODO code of mail*/}
          <div className="mail-amount">
            <span>1</span>
          </div>
        </Link>
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
