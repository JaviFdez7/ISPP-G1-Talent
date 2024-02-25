import React from "react";

export default function Home(name, value) {
    return (
      <div className="input-container">
          <div className="input-container-name">
            <h1>{name}</h1>
          </div>
          <div className="input-container-value">
            <h1>{value}</h1>
          </div>
      </div>
    );
  }