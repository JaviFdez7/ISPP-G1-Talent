import React from "react";

import Input from "../../components/Input"
import InputList from "../../components/InputList"
import profile from '../../images/profile.jpg';

export default function Profile() {
  return (
    <div className="flex flex-col">
        <div className="flex flex-row justify-center">
            <div className="w-5/12 p-16 flex flex-col mt-10">
                <img src={profile}/>
            </div>
            <div className="flex flex-col w-6/12 p-20">
                <div className="profile-name-text">
                    <h2>Laura</h2>
                    <h2>Martinez Ruiz</h2>
                </div>
                <div className="flex flex-col mt-10 w-10/12">
                    {Input("Username","Martinaza")}
                    {Input("Email","martinita@gmail.com")}
                    {Input("Phone number","123456789")}
                    {Input("Province","Sevilla")}
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
                {InputList("Latest jobs", ["Fujitsu","Ayesa","..."])}
                <br></br>
                {InputList("Popular repositories", ["On your tutorials","..."])}
            </div>
            <div className="flex flex-col w-5/12 p-20">
                {Input("Preferences", "Work from home")}
                <br></br>
                {Input("Github username", "martinnez123")}
                <br></br>
                {InputList("Most popular tecnologies", ["1. Java","2. Python", "3. Other"])}
            </div>
        </div>
        <h3 className="profile-title">Work experience</h3>
        <hr className="w-5/12 self-center"></hr>
        <br></br>
        <br></br>
        <br></br>
        <div className="w-9/12 self-center">
            {InputList("", ["Fujitsu - Scraping development project","Ayesa - Main team manager on web app development", "..."])}
        </div>
        <br></br>
        <br></br>
    </div>
  );
}