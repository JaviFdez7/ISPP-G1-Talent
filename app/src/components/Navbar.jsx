
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from 'react';
import arrowLeft from '../images/arrowLeft.png';
import arrowRight from '../images/arrowRight.png';
import logout from '../images/logout.png';
import mail from '../images/mail.png';
import profile from '../images/profile.jpg';
import '../styles/navbar.css'
import Profile from "../pages/candidate/CandidateDetail";

export default function Navbar() {

  const [expanded, setExpanded] = useState(false);

  let navigate = useNavigate();

  function toogleSideNav() {
    if (!expanded) {
        document.getElementById("sidenav").style.left = "-0px";
        document.getElementById("arrow-img").src = arrowLeft;
        document.getElementById("sideNavButtonContainer").style.left = "355px";
        setExpanded(true);
    }
    else {
        document.getElementById("sidenav").style.left = "-400px";
        document.getElementById("arrow-img").src = arrowRight;
        document.getElementById("sideNavButtonContainer").style.left = "405px";
        setExpanded(false);
    }
  }

  return (
    <div className="sidenav" id="sidenav">
        <div className="highlight-sidenav">
            <div className="inner-sidenav">
                <div className="flex justify-center">
                    <span className="logo">IT TALENT</span>
                </div>
                <hr/>
                <br/>
                <Link to="/candidate/detail" className="link-container">
                    <span>ICON</span>
                    <p>&nbsp;&nbsp;&nbsp;</p>
                    <span>Profile</span>
                </Link>
                <Link to="/" className="link-container">
                    <span>ICON</span>
                    <p>&nbsp;&nbsp;&nbsp;</p>
                    <span>Trends</span>
                </Link>
                <Link to="/" className="link-container">
                    <span>ICON</span>
                    <p>&nbsp;&nbsp;&nbsp;</p>
                    <span>My analysis</span>
                </Link>
                <Link to="/candidate/subscription" className="link-container">
                    <span>ICON</span>
                    <p>&nbsp;&nbsp;&nbsp;</p>
                    <span>Subscription</span>
                </Link>
                <Link to="/support" className="link-container">
                    <span>ICON</span>
                    <p>&nbsp;&nbsp;&nbsp;</p>
                    <span>Information</span>
                </Link>
                <Link to="/settings" className="link-container">
                    <span>ICON</span>
                    <p>&nbsp;&nbsp;&nbsp;</p>
                    <span>Settings</span>
                </Link>

                <Link to="/candidate/detail" className="profile-container">
                    <div className="profile-pic-container">
                        <img src={profile} className="profile-pic"/>
                    </div>
                    <div className="profile-text">
                        <h1>Name</h1>
                        <h1>Surname</h1>
                    </div>
                </Link>
                <Link to="/" className="mail">
                    <img src={mail}/>
                </Link>
                <Link to="/" className="logout">
                    <img src={logout}/>
                    {/* TODO code of mail*/}
                    <div className="mail-amount">
                        <span>1</span>
                    </div>
                </Link>

            </div>
        </div>
        <div className="sideNavButtonContainer" id="sideNavButtonContainer">
            <img id="arrow-img" src={arrowRight} onClick={toogleSideNav} className="sideNavButton"/>
        </div>
    </div>
  );
}
