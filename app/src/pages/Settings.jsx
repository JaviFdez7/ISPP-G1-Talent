import React, { useState } from "react";

export default function Settings() {
  const [language, setLanguage] = useState("English");

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen"
      style={{ backgroundColor: "#454545", fontSize: "2em" }}
    >
      <div
        className="w-full max-w-2xl h-100 p-32 m-4 rounded shadow-md flex flex-col justify-between"
        style={{ backgroundColor: "#282828" }}
      >
        <h1
          className="text-6xl text-center mb-8"
          style={{ marginTop: "-80px",marginBottom: "50px", color: "#D4983D" }}
        >
          Settings
        </h1>
        <div className="flex items-center text-white my-8">
          <label htmlFor="language" className="mr-4">
            Language:
          </label>
          <select
            id="language"
            value={language}
            onChange={handleLanguageChange}
            style={{ color: "black" }}
          >
            <option value="English" style={{ color: "black" }}>
              English
            </option>
            <option value="Spanish" style={{ color: "black" }}>
              Español
            </option>
          </select>
        </div>
        <div className="flex justify-center items-center">
          <button
            className="text-white p-2 mt-4"
            style={{ backgroundColor: "#D4983D" }}
          >
            Delete Account
          </button>
        </div>
        <div className="flex justify-center" style={{  marginBottom: "-100px" }}>
          <p className="font-bold text-red-700">*</p>
          <p className="text-white">All your data will be deleted.</p>
        </div>
      </div>
    </div>
  );
}
