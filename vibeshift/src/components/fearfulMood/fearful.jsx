"use client"
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import AudioPlaceholder from '../AudioPlaceholder';

export default function Fearful() {
  return (
    <div className="overflow-hidden relative w-screen h-screen fearfulBg">
      {/* Animated particles */}
      <div className="absolute inset-0 z-0">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-8 h-8 rounded-full bg-green-400/10"
            initial={{ 
              x: Math.random() * window.innerWidth, 
              y: Math.random() * window.innerHeight,
              opacity: 0,
              scale: 0 
            }}
            animate={{ 
              x: [Math.random() * window.innerWidth, Math.random() * window.innerWidth],
              y: [Math.random() * window.innerHeight, Math.random() * window.innerHeight],
              opacity: [0, 0.3, 0],
              scale: [0, 1, 0]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 15 + Math.random() * 10,
              delay: i * 0.8
            }}
          />
        ))}
      </div>
      
      {/* Main emoji with animation */}
      <motion.div 
        className="absolute right-10 top-1/4 md:right-20 md:top-1/3"
        initial={{ y: 20, opacity: 0, scale: 0.8 }}
        animate={{ 
          y: [0, 10, 0], 
          opacity: 1,
          scale: 1,
          rotate: [-3, 3, -3]
        }}
        transition={{ 
          y: { repeat: Infinity, duration: 4, ease: "easeInOut" },
          rotate: { repeat: Infinity, duration: 6, ease: "easeInOut" },
          opacity: { duration: 1 },
          scale: { duration: 0.8 }
        }}
      >
        <Image 
          src={"https://em-content.zobj.net/source/apple/354/fearful-face_1f628.png"} 
          alt="fearful expression" 
          width={300}
          height={300}
          className="drop-shadow-2xl"
        />
      </motion.div>
      
      {/* Text content with animated entrance */}
      <motion.div 
        className="flex absolute left-10 top-1/4 flex-col space-y-5 max-w-xl"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h1 
          className="text-5xl font-semibold leading-tight text-white md:text-6xl font-organical"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          A Touch of Anxiety
        </motion.h1>
        
        <motion.div 
          className="mt-4 text-3xl font-mouldyCheese text-white/90"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <p>Sometimes our fears guide us to safety.</p>
          <p>A moment to pause and recenter.</p>
        </motion.div>
        
        {/* Animated wave decoration */}
        <motion.div
          className="absolute bottom-[-50px] left-0 right-0 h-20 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <motion.div 
            className="w-[200%] h-full bg-gradient-to-r from-green-300/30 to-emerald-600/30 rounded-t-full"
            animate={{ 
              x: [0, -500],
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 8,
              ease: "linear" 
            }}
          />
        </motion.div>
      </motion.div>
      
      <AudioPlaceholder type="fearful" />
    </div>
  )
} 