"use strict"

import React, { useState } from "react";

import DrawingBoard from "./DrawingBoard";

export default function() {

  const [pen, setPen] = useState("pencil");

  return (
    <div className = "container">
      <h3 className="w3-text-blue">
        ISOMETRIC <label className="w3-text-black">|</label> <span className="w3-small w3-text-gray">Free to play</span>
        <label className="w3-small w3-text-blue-gray w3-right" style={{textAlign: "right"}}>
          Design by Duong Nguyen <br/>
          <a href = "https://github.com/duongtdn"> <i className="fab fa-github-alt"></i> Source code </a>
        </label>
      </h3>
      <div className="w3-bar w3-border w3-border-gray w3-round" style = {{margin: "8px 0"}}>
        <button className="w3-button w3-bar-item" onClick = {e => setPen("pencil")}>
          <i className="fas fa-pencil-alt"></i> Pencil
        </button>
        <button className="w3-button w3-bar-item" onClick = {e => setPen("eraser")}>
          <i className="fas fa-eraser"></i> Eraser
        </button>
      </div>
      <DrawingBoard pen = {pen} />
    </div>
  );

}