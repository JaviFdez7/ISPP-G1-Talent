import React from "react";

export default function Input(name, value, editable) {

    function expand() {
      for (var i of document.getElementsByClassName("input-value-highlighter")) {
        i.style.width = "5%";
        i.style.backgroundColor = "white";
      }
      document.getElementById("input-value-highlighter-" + name).style.width = "100%";
      document.getElementById("input-value-highlighter-" + name).style.backgroundColor = "var(--talent-highlight)";
    }

    return (
      <div>
        <div className="input-container">
            <div className="input-container-name">
              <h1>{name}</h1>
            </div>
            <div className="input-container-value">
              <input id={"input-"+name} type="text" value={value} disabled={!editable} onFocus={expand}></input>
              <hr className="input-value-highlighter" id={"input-value-highlighter-"+name}></hr>
            </div>
        </div>
      </div>
    );
  }