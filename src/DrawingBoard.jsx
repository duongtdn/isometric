"use strict"

import React, { useState, useRef, useEffect } from "react";

import BackgroundCanvas from "./BackgroundCanvas";
import FrontCanvas from "./FrontCanvas";

export default function({ width, height, distance = 35, pen }) {

  const [offset, setOffset] = useState();

  const board = useRef();
  useEffect(() => board.current && updateOffset(board.current), [board]);

  return (
    <div ref = {board} style = {{position: "relative"}}>
      <BackgroundCanvas width = {width} height = {height} distance = {distance} />
      <FrontCanvas width = {width} height = {height} offset = {offset} pen = {pen} />
    </div>
  );

  function updateOffset(board) {
    setOffset({
      left: board.offsetLeft,
      top: board.offsetTop
    });
  }

}