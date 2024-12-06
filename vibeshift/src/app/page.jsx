"use client";

import React, { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";
import { gsap } from "gsap";
import MoodWrapper from "../components/moodWrapper/MoodWrapper";

const FaceRecognition = () => {
  const videoRef = useRef(null);
  const moodRef = useRef(null); // Reference for mood element
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [currentMood, setCurrentMood] = useState(null);

  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = "/models";
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
        faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
      ]);
      setModelsLoaded(true);
    };

    loadModels();
  }, []);

  useEffect(() => {
    if (modelsLoaded) {
      startVideo();
    }
  }, [modelsLoaded]);

  const startVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((err) => console.error("Error accessing webcam: ", err));
  };

  const handleVideoPlay = async () => {
    const canvas = faceapi.createCanvasFromMedia(videoRef.current);
    canvas.style.position = "absolute";
    canvas.style.top = `${videoRef.current.offsetTop}px`;
    canvas.style.left = `${videoRef.current.offsetLeft}px`;
    canvas.style.zIndex = "21";
    document.body.append(canvas);

    const displaySize = {
      width: videoRef.current.width,
      height: videoRef.current.height,
    };
    faceapi.matchDimensions(canvas, displaySize);

    setInterval(async () => {
      const detections = await faceapi
        .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
        .withFaceExpressions();

      const resizedDetections = faceapi.resizeResults(detections, displaySize);
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      faceapi.draw.drawDetections(canvas, resizedDetections);
      faceapi.draw.drawFaceExpressions(canvas, resizedDetections);

      if (resizedDetections.length > 0 && resizedDetections[0]?.expressions) {
        const mood = getDominantMood(resizedDetections[0].expressions);
        if (mood !== currentMood) {
          setCurrentMood(mood);
        }
      }
    }, 1000);
  };

  const getDominantMood = (expressions) => {
    return Object.keys(expressions).reduce((a, b) =>
      expressions[a] > expressions[b] ? a : b
    );
  };

  useEffect(() => {
    if (!currentMood) return;

    // GSAP animation
    gsap.fromTo(
      moodRef.current,
      { scale: 0 },
      { scale: 1, duration: 1 }
    );
  }, [currentMood]);

  return (
    <div className="overflow-x-hidden main-container overflow-y-hidden relative">
      <video
        ref={videoRef}
        autoPlay
        muted
        width="400"
        height="400"
        onPlay={handleVideoPlay}
        className="absolute z-10 bottom-10"
      />
      <div
        ref={moodRef}
        className="absolute z-20 text-white text-xl bg-black bg-opacity-50 px-4 py-2 rounded"
        style={{
          top: "50px", // Adjust this value to position the text correctly
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
       {currentMood}
      </div>
      <MoodWrapper mood={currentMood}/>
    </div>
  );
};

export default FaceRecognition;
