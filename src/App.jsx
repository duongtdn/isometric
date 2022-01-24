"use strict"

import React, { useState } from "react";

import DrawingBoard from "./DrawingBoard";

export default function() {

  const [pen, setPen] = useState("pencil");

  return (
    <div className = "container">
      <h3> ISOMETRIC </h3>
      <div className="w3-bar w3-border w3-border-gray w3-round" style = {{margin: "8px 0"}}>
        <button className="w3-button w3-bar-item" onClick = {e => setPen("pencil")}>
          <i className="fas fa-pencil-alt"></i> Pencil
        </button>
        <button className="w3-button w3-bar-item" onClick = {e => setPen("eraser")}>
          <i className="fas fa-eraser"></i> Eraser
        </button>
      </div>
      <DrawingBoard width = "1200px" height = "700px" pen = {pen} />
    </div>
  );

}