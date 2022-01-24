"use strict"

import React, { useRef, useEffect, useState } from "react";

export default function({ width, height, offset, pen = "pencil" }) {

  const canvas = useRef();
  useEffect(() => canvas.current && offset && setupCanvasListeners(canvas.current), [canvas, offset]);

  const pos = useRef({x: 0, y: 0});

  const [cursor, setCursor] = useState(cursorMode[pen]);

  const penRef = useRef(pen);
  useEffect(() => {
    penRef.current = pen;
    setCursor(cursorMode[pen]);
  }, [pen]);

  const operation = {
    pencil: draw,
    eraser: erase,
  }

  return (
    <canvas ref = {canvas}
            style = {{ border: "1px solid #686868", position: "absolute", left: 0, right: 0, cursor }}
            width = {width}
            height = {height}
    />
  );

  function setupCanvasListeners(canvas) {
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mousedown', handleMouseDown);
  }

  function handleMouseDown(e) {
    setPosition(e);
    handleMouseMove(e);
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

    operation[penRef.current] && operation[penRef.current](e, ctx);
  }

  function draw(e, ctx) {

    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#666';

    ctx.moveTo(pos.current.x, pos.current.y);
    setPosition(e);
    ctx.lineTo(pos.current.x, pos.current.y);

    ctx.stroke();
  }

  function erase(e, ctx) {
    setPosition(e);
    ctx.clearRect(pos.current.x-10, pos.current.y-10, 20, 20); // todo: have penSize to replace hardcode
  }

}

const cursorMode = {
  pencil: "crosshair",
  eraser: "not-allowed",
};
