import React from "react";

import Input from "../components/Input"
import profile from '../images/profile.jpg';

export default function Profile() {
  return (
    <div className="">
        <div className="name-container">
            <div className="profile-pic-container-big">
                <img src={profile} className="profile-pic-big"/>
            </div>
            <div className="profile-name-text">
                <h2>Laura</h2>
                <h2>Martinez Ruiz</h2>
            </div>
        </div>
        <div className="data-container">
            {Input("Username","Martinaza")}
            {Input("Email","martinita@gmail.com")}
            {Input("Phone number","123456789")}
            {Input("Province","Sevilla")}
        </div>
    </div>
  );
}