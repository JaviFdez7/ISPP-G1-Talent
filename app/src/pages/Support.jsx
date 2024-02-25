import React from "react";

export default function Support() {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen text-white"
      style={{ backgroundColor: "#282828" }}
    >
      <h1 className="text-4xl mb-4" style={{ marginTop: "-100px" }}>
        Support
      </h1>
      <p>
        Welcome to Talent! If you have any issue regarding the application or
        you need
      </p>
      <p> attendance, contact us through talentservicetalent.com.</p>
      <h2 className="text-3xl mt-4 mb-2">Frequently asked Questions</h2>
      <div className="flex justify-center">
        <p className="font-bold" style={{ color: "#D4983D" }}>
          1. What is Talent?
        </p>
        <span className="mx-1"></span>
        <p>Talent is a web application that people from around</p>
      </div>
      <p>
        the world show their skilss at software development and that way
        representatives
      </p>
      <p>from any enterprise can easily find the fits for their teams</p>
      <div className="flex justify-center">
        <p className="font-bold" style={{ color: "#D4983D" }}>
          2. How do I analyze someone?
        </p>
        <span className="mx-1"></span>
        <p>Talent is provided with an anlysis section for</p>
      </div>
      <p>
        representatives. You can easily find a candidate's profile inputting
        their Github
      </p>
      <p>account name and, if necessary, a Github token.</p>
    </div>
  );
}
