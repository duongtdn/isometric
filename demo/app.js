"use strict"

import React, { useState, useEffect } from "react";
import { render } from "react-dom";

import DrawingBoard from "../src/DrawingBoard";

const App = () => {

  const [pen, setPen] = useState("draw");

  return (
    <div className = "container">
      <div> ISOMETRIC </div>
      <div>
        <button onClick = {saveImage}>Save</button>
        <button onClick = {e => setPen("draw")}>Draw</button>
        <button onClick = {e => setPen("eraser")}>Eraser</button>
      </div>
      <DrawingBoard width = "1200px" height = "700px" pen = {pen} />
    </div>
  );

  function saveImage() {
    // const canvas = board.current;
    // const image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    // window.location.href=image;
  }

};

render(<App />, document.getElementById("root"));
