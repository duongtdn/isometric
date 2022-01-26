"use strict"

import React, { useRef, useEffect, useState } from "react";

export default function({ width, height, offset, pen = "pencil", onCanvasReady, onSnapshotCreated }) {

  const canvas = useRef();
  useEffect(() => canvas.current && setupCanvasListeners(canvas.current) && onCanvasReady(canvas.current), [canvas]);

  const pos = useRef({x: 0, y: 0});

  const offsetRef = useRef(offset);
  useEffect(() => offsetRef.current = offset, [offset]);

  const [cursor, setCursor] = useState(cursorMode[pen]);

  const status = useRef("lock");

  const penRef = useRef(pen);
  useEffect(() => {
    penRef.current = pen;
    setCursor(cursorMode[pen]);
  }, [pen]);

  const operation = {
    pencil: draw,
    eraser: erase,
  };

  return (
    <canvas ref = {canvas}
            style = {{ border: "1px solid #686868", position: "absolute", left: 0, right: 0, cursor }}
            width = {width}
            height = {height}
    />
  );

  function setupCanvasListeners(canvas) {
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('touchmove', handleMouseMove);
    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('touchstart', startEditing);
    canvas.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('touchend', handleMouseUp);
    canvas.addEventListener('mouseleave', handleMouseUp);
    return true;
  }

  function handleMouseDown(e) {
    if (e.buttons !== 1) return;
    startEditing(e);
  }

  function startEditing(e) {
    e.preventDefault();
    setPosition(e);
    status.current = "editing";
    handleMouseMove(e);
  }

  function setPosition(e) {
    if (offsetRef.current) {
      pos.current = calculateMousePositionOverCanvas(e);
    }
  }

  function calculateMousePositionOverCanvas(e) {
    const clientX = e.touches? e.touches[0].clientX : e.clientX;
    const clientY = e.touches? e.touches[0].clientY : e.clientY;
    return {
      x: clientX - offsetRef.current.left,
      y: clientY - offsetRef.current.top,
    };
  }

  function handleMouseMove(e) {
    if (status.current !== "editing") return;
    const ctx = canvas.current.getContext("2d");

    operation[penRef.current] && operation[penRef.current](e, ctx);
  }

  function draw(e, ctx) {
    const position = calculateMousePositionOverCanvas(e);

    ctx.lineCap = 'round';
    ctx.strokeStyle = '#666';

    stroke(4, "0.2");
    stroke(2, "1");

    setPosition(e);

    function stroke(lineWidth, alpha) {
      ctx.lineWidth = lineWidth;
      ctx.globalAlpha = alpha;
      ctx.beginPath();
      ctx.moveTo(pos.current.x, pos.current.y);
      ctx.lineTo(position.x, position.y);
      ctx.closePath();
      ctx.stroke();
    }
  }

  function erase(e, ctx) {
    setPosition(e);
    ctx.clearRect(pos.current.x-10, pos.current.y-10, 20, 20); // todo: have penSize to replace hardcode
  }

  function handleMouseUp(e) {
    if (status.current !== "editing") return;
    status.current = "lock";
    const data = canvas.current.toDataURL();
    onSnapshotCreated(data);
  }

}

const cursorMode = {
  pencil: "crosshair",
  eraser: "not-allowed",
};
