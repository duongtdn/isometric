"use strict"

import React, { useState, useRef, useEffect } from "react";

import BackgroundCanvas from "./BackgroundCanvas";
import FrontCanvas from "./FrontCanvas";

export default function({ distance = 35, pen }) {

  const [offset, setOffset] = useState();
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const board = useRef();
  useEffect(() => board.current && updateOffset(), [board]);

  useEffect(() => {
    window.addEventListener("scroll", updateOffset);
    return () => window.removeEventListener("scroll", updateOffset);
  }, []);

  useEffect(() => resizeCanvas(), []);

  return (
    <div ref = {board} style = {{position: "relative"}}>
      {
        width && height?
          <div>
            <BackgroundCanvas width = {width} height = {height} distance = {distance} />
            <FrontCanvas width = {width} height = {height} offset = {offset} pen = {pen} />
          </div>
        : null
      }
    </div>
  );

  function updateOffset() {
    if (board.current) {
      const boardBoundingRect = board.current.getBoundingClientRect();
      setOffset({
        left: boardBoundingRect.left,
        top: boardBoundingRect.top
      });
    }
  }

  function resizeCanvas() {
    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    setWidth(vw-50);  // here the magic number 50 because the margin of stylesheet, todo: remove this magic number
    setHeight(vw-50);
    updateOffset();
  }

}