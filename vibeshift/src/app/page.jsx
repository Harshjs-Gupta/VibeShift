"use client";

import React, { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";
import { gsap } from "gsap";
import MoodWrapper from "../components/moodWrapper/MoodWrapper";
import LoadingScreen from "../components/LoadingScreen";
import SettingsPanel from "../components/SettingsPanel";
import SnapShareModal from "../components/SnapShareModal/SnapShareModal";
import Footer from "../components/Footer";
import InfoOverlay from "../components/InfoOverlay";
import StartScreen from "../components/StartScreen";
import EmotionHistory from "../components/EmotionHistory";
import ControlPanel from "../components/ControlPanel";

const FaceRecognition = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [currentMood, setCurrentMood] = useState(null);
  const [isVideoStarted, setIsVideoStarted] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isSnapShareOpen, setIsSnapShareOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [settings, setSettings] = useState({
    detectionInterval: 1000,
    showExpressions: true,
    showFaceDetection: true,
    webcamSize: "medium",
  });

  useEffect(() => {
    const loadModels = async () => {
      try {
        const MODEL_URL = "/models";
        await Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
          faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
          faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
          faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
        ]);
        setModelsLoaded(true);
      } catch (error) {
        console.error("Error loading models:", error);
      }
    };

    loadModels();
  }, []);

  useEffect(() => {
    if (isVideoStarted && !modelsLoaded) {
      console.log("Models are still loading...");
    }
  }, [isVideoStarted, modelsLoaded]);

  const startVideo = () => {
    setIsVideoStarted(true);
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
    setIsAnalyzing(true);
    const canvas = faceapi.createCanvasFromMedia(videoRef.current);
    canvas.style.position = "absolute";
    canvas.style.top = `${videoRef.current.offsetTop}px`;
    canvas.style.left = `${videoRef.current.offsetLeft}px`;
    canvasRef.current = canvas;
    document.getElementById('video-container').appendChild(canvas);

    const displaySize = {
      width: videoRef.current.width,
      height: videoRef.current.height,
    };
    faceapi.matchDimensions(canvas, displaySize);

    setInterval(async () => {
      if (!videoRef.current || !canvasRef.current) return;
      
      const detections = await faceapi
        .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
        .withFaceExpressions();

      const resizedDetections = faceapi.resizeResults(detections, displaySize);
      const ctx = canvasRef.current.getContext("2d");
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

      // Only draw if settings allow it
      if (settings.showFaceDetection) {
        faceapi.draw.drawDetections(canvasRef.current, resizedDetections);
      }
      
      if (settings.showExpressions) {
        faceapi.draw.drawFaceExpressions(canvasRef.current, resizedDetections);
      }

      if (resizedDetections.length > 0 && resizedDetections[0]?.expressions) {
        const mood = getDominantMood(resizedDetections[0].expressions);
        if (mood !== currentMood) {
          setCurrentMood(mood);
        }
      }
    }, settings.detectionInterval);
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
      ".mood-indicator",
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.8, ease: "elastic.out(1, 0.5)" }
    );
  }, [currentMood]);

  // Add this effect to handle mute/unmute
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  if (!isVideoStarted) {
    return <StartScreen onStart={startVideo} />;
  }

  if (isVideoStarted && !modelsLoaded) {
    return <LoadingScreen />;
  }

  // Get webcam dimensions based on settings
  const getWebcamDimensions = () => {
    switch(settings.webcamSize) {
      case "small": 
        return { width: 240, height: 180 };
      case "large": 
        return { width: 320, height: 240 };
      case "medium":
      default: 
        return { width: 280, height: 210 };
    }
  };

  const dimensions = getWebcamDimensions();

  return (
    <div className="overflow-scroll overflow-x-hidden relative w-full h-screen pattern-grid">
      {/* Background overlay */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-transparent via-transparent to-black/20"></div>
      
      {/* Info Overlay */}
      {isVideoStarted && modelsLoaded && <InfoOverlay />}
      
      {/* Central control panel */}
      <ControlPanel
        currentMood={currentMood}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenSnapShare={() => setIsSnapShareOpen(true)}
        isMuted={isMuted}
        onToggleMute={() => setIsMuted(!isMuted)}
      />

      {/* Video container with a nice frame */}
      <div 
        id="video-container" 
        className="absolute bottom-0 left-1/2 z-10 transform -translate-x-1/2 video-container"
        style={{ width: dimensions.width, height: dimensions.height }}
      >
        <video
          ref={videoRef}
          autoPlay
          muted={isMuted}
          width={dimensions.width}
          height={dimensions.height}
          onPlay={handleVideoPlay}
          className="rounded-lg shadow-2xl"
        />
        {isAnalyzing && (
          <div className="flex absolute top-4 left-4 items-center">
            <div className="mr-2 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            <span className="px-2 py-1 text-xs text-white rounded-full bg-black/50">Analyzing</span>
          </div>
        )}
      </div>
      
      {/* Settings panel */}
      <SettingsPanel 
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        onSettingsChange={setSettings}
      />
      
      {/* Snap Share Modal */}
      <SnapShareModal
        isOpen={isSnapShareOpen}
        onClose={() => setIsSnapShareOpen(false)}
        mood={currentMood}
      />
      
      {/* Emotion History */}
      <EmotionHistory currentMood={currentMood} />
      
      {/* Footer */}
      <Footer />
      
      {/* Background mood visualization */}
      <MoodWrapper mood={currentMood}/>
    </div>
  );
};

export default FaceRecognition;
