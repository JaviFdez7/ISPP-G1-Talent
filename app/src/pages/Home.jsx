import React from "react";
import { Link } from "react-router-dom";
import mainBackground from "../images/main-background.jpg";
import Typewriter from "../components/typewriter.jsx";
import MainButton from "../components/mainButton.jsx";
import SecondaryButton from "../components/secondaryButton.jsx";

export default function Home() {
  return (
    <section
      className="h-screen flex flex-col justify-center bg-fixed home-container"
      style={{ backgroundImage: `url(${mainBackground})`, backgroundSize: "cover" }}
    >
      <div className="container mx-auto flex flex-col items-center text-center">
        <h1>
          <span className="blinker">| </span>
          <Typewriter text="Welcome to IT TALENT" delay={100} />
          <br/>
        </h1>
        <h2>
          Prepare for a <strong>revolution</strong>
          <br/>
          in hiring computer professionals
        </h2>
        <h3><strong>Join us now!</strong></h3>
        <div className="flex gap-24 mt-12">
          {MainButton("Register", "", "")}
          {SecondaryButton("Log in", "", "")}
        </div>
      </div>
    </section>
  );
}
