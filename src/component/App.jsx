"use strict"

import React, { useState, useRef, useEffect } from "react";

import DrawingBoard from "./DrawingBoard";
import storage from "../lib/storage";
import cache from "../lib/cache";

export default function() {

  useEffect(() => cache.clear(), []);

  const [pen, setPen] = useState("pencil");

  const canvasRef = useRef();

  useEffect(() => {
    document.addEventListener("keyup", handleKeyUp);
    return () => document.removeEventListener("keyup", handleKeyUp);
  }, []);

  return (
    <div className = "container">
      <h3 className="w3-text-blue">
        ISOMETRIC <label className="w3-text-black">|</label> <span className="w3-small w3-text-gray">Free to play</span>
        <label className="w3-small w3-text-blue-gray w3-right" style={{textAlign: "right"}}>
          Design by Duong Nguyen <br/>
          <a href = "https://github.com/duongtdn/isometric"> <i className="fab fa-github-alt"></i> Source code </a>
        </label>
      </h3>
      <div className="w3-bar w3-border w3-border-gray w3-round" style = {{margin: "8px 0"}}>

        <div>
          <button className="w3-button w3-bar-item" onClick = {undo}>
            <i className="fas fa-undo"></i>
          </button>
          <button className="w3-button w3-bar-item" onClick = {redo}>
            <i className="fas fa-redo"></i>
          </button>
        </div>

        <div>
          <button className="w3-button w3-bar-item" onClick = {e => setPen("pencil")}>
            <i className="fas fa-pencil-alt"></i> Pencil
          </button>
          <button className="w3-button w3-bar-item" onClick = {e => setPen("eraser")}>
            <i className="fas fa-eraser"></i> Eraser
          </button>
        </div>

        <div className="w3-right">
          <button className="w3-button w3-bar-item" onClick = {clear}>
            <i className="fas fa-file"></i> New
          </button>
          <button className="w3-button w3-bar-item" onClick = {save}>
            <i className="fas fa-save"></i> Save
          </button>
          <button className="w3-button w3-bar-item" onClick = {load}>
            <i className="fas fa-file-upload"></i> Load
          </button>
        </div>
      </div>
      <DrawingBoard pen = {pen} onCanvasReady = {onCanvasReady} onSnapshotCreated = {onSnapshotCreated} />
    </div>
  );

  function save() {
    const strDataURI = cache.get();
    storage.save(strDataURI);
  }

  function load() {
    const file = storage.load();
    if (file && file.data) {
      const strDataURI = file.data;
      drawDataURIOnCanvas(strDataURI);
      cache.put(strDataURI);
    }
  }

  function clear() {
    const canvas = canvasRef.current;
    canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
    cache.clear();
  }

  function onSnapshotCreated(data) {
    cache.put(data);
  }

  function onCanvasReady(canvas) {
    canvasRef.current = canvas;
  }

  function undo() {
    const strDataURI = cache.get("back");
    strDataURI && drawDataURIOnCanvas(strDataURI);
  }

  function redo() {
    const strDataURI = cache.get("forth");
    strDataURI && drawDataURIOnCanvas(strDataURI);
  }

  function drawDataURIOnCanvas(strDataURI) {
    const canvas = canvasRef.current;
    const img = new window.Image();
    img.addEventListener("load", () => {
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
    });
    img.setAttribute("src", strDataURI);
  }

  function handleKeyUp(e) {
    e.stopPropagation? e.stopPropagation() : e.cancelBubble = true;
    e.returnValue=false;
    if (e.ctrlKey && e.code === "KeyZ") {
      undo();
    }
    if (e.ctrlKey && e.code === "KeyY") {
      redo();
    }
    if (e.ctrlKey && e.altKey && e.code === "KeyS") {
      save();
    }
    if (e.ctrlKey && e.altKey && e.code === "KeyL") {
      load()
    }
    if (e.ctrlKey && e.altKey && e.code === "KeyN") {
      clear();
    }
  }

}