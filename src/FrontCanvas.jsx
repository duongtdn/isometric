"use strict"

import React, { useRef, useEffect } from "react";

export default function({ width, height, offset, pen = "draw" }) {

  const canvas = useRef();
  useEffect(() => canvas.current && offset && setupCanvasListeners(canvas.current), [canvas, offset]);

  const pos = useRef({x: 0, y: 0});

  const penRef = useRef(pen);
  useEffect(() => {
    penRef.current = pen
  }, [pen]);

  return (
    <canvas ref = {canvas}
            style = {{ border: "1px solid #686868", position: "absolute", left: 0, right: 0 }}
            width = {width}
            height = {height}
    />
  );

  function setupCanvasListeners(canvas) {
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mousedown', setPosition);
  }

  function setPosition(e) {
    if (offset) {
      pos.current.x = e.clientX - offset.left;
      pos.current.y = e.clientY - offset.top;
    }
  }

  function handleMouseMove(e) {
    if (e.buttons !== 1) return;

    const ctx = canvas.current.getContext("2d");

    if (penRef.current === "draw") {
      draw(e, ctx);
    } else {
      clear(e, ctx);
    }

  }

  function draw(e, ctx) {

    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#c0392b';

    ctx.moveTo(pos.current.x, pos.current.y);
    setPosition(e);
    ctx.lineTo(pos.current.x, pos.current.y);

    ctx.stroke();
  }

  function clear(e, ctx) {
    setPosition(e);
    ctx.clearRect(pos.current.x, pos.current.y, 10, 10);

  }

}
