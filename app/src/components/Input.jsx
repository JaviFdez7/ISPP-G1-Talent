import React from "react";

export default function Input({name="", value="", editable=false, placeholder="", onChange="", formName="", width="100%", col=false}={}) {

  if (formName === "") {
    formName = name;
  }

  let n_width = "45%";
  let v_width = "55%";
  if (col) {
    n_width = "100%";
    v_width = "100%";
  }

    function expand() {
      for (var i of document.getElementsByClassName("input-value-highlighter")) {
        i.style.width = "5%";
        i.style.backgroundColor = "white";
      }
      document.getElementById("input-value-highlighter-" + name).style.width = "100%";
      document.getElementById("input-value-highlighter-" + name).style.backgroundColor = "var(--talent-highlight)";
    }

    return (
        <div className="input-container" style={{width: width, flexDirection: col ? "column" : "row"}}>
            <div className="input-container-name" style={{width: n_width}}>
              <h1>{name}</h1>
            </div>
            <div className="input-container-value" style={{width: v_width}}>
              <input id={"input-"+name} type="text" disabled={!editable} onFocus={expand} placeholder={placeholder} onChange={onChange} name={formName} value={value}></input>
              <hr className="input-value-highlighter" id={"input-value-highlighter-"+name}></hr>
            </div>
        </div>
    );
  }