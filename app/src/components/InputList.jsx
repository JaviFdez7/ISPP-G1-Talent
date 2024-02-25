import React from "react";

export default function InputList(name, values) {
    return (
      <div className="input-list-container">
          <div className="input-list-container-name">
            <h1>{name}</h1>
          </div>
          <div className="input-list-container-value">
            {values.map((i) =>
                <div>
                    <br></br>
                    <h1>{i}</h1>
                    <br></br>
                    <hr></hr>
                </div>)
            }
          </div>
      </div>
    );
  }