import React, { useEffect, useState } from "react";

export default function DialogWindow(props) {

  return (
    <div className={"dialog-window-container"}>
      <div className="dialog-window-header">
        <h5>{props.header}</h5>
      </div>
      <div className="dialog-window-content">{props.children}</div>
    </div>
  );
}

