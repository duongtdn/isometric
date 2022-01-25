"use strict"

import React, { useRef, useEffect } from "react";

export default function({ width, height, distance }) {

  const canvas = useRef();
  useEffect(() => canvas.current && renderIsometricGrid(distance), [canvas]);

  return (
    <canvas ref = {canvas}
            style = {{ border: "1px solid #cacaca", position: "absolute", left: 0, right: 0 }}
            width = {width}
            height = {height}
    />
  );

  function renderIsometricGrid(distance) {
    const ctx = canvas.current.getContext("2d");

    const verticalShift = (distance/2) / Math.tan((Math.PI/180)*30);
    for (let i = 0; i < 100; i++) {
      ctx.save();
      ctx.translate(verticalShift * i, 0);
      ctx.rotate((Math.PI/180)*90);
      drawLine(ctx);
      ctx.restore();
    }

    for (let i = -100; i < 100; i++) {
      ctx.save();
      ctx.translate(0, distance * i);
      ctx.rotate((Math.PI/180)*30);
      drawLine(ctx);
      ctx.restore();
    }

    for (let i = -100; i < 100; i++) {
      ctx.save();
      ctx.translate(0, distance * i);
      ctx.rotate((Math.PI/180)*(-30));
      drawLine(ctx);
      ctx.restore();
    }
  }

  function drawLine(ctx) {
    ctx.beginPath();
    ctx.moveTo(0,0);
    ctx.lineTo(5000,0);
    ctx.closePath();
    ctx.lineWidth = 1;
    ctx.setLineDash([4,2]);
    ctx.strokeStyle = "#dfdfdf";
    ctx.stroke();
  }

}
