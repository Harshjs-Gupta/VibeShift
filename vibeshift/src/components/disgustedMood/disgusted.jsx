"use client"
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import AudioPlaceholder from '../AudioPlaceholder';

export default function Disgusted() {
  return (
    <div className="relative disgustedBg w-screen h-screen overflow-hidden">
      {/* Animated bubbles */}
      <div className="absolute inset-0 z-0">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-orange-500/20"
            style={{
              width: Math.random() * 40 + 10,
              height: Math.random() * 40 + 10,
            }}
            initial={{ 
              x: Math.random() * 100, 
              y: Math.random() * 100 + window.innerHeight,
              opacity: 0,
            }}
            animate={{ 
              y: -100,
              opacity: [0, 0.3, 0],
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 10 + Math.random() * 15,
              delay: i * 1.2,
              ease: "easeOut"
            }}
          />
        ))}
      </div>
      
      {/* Main emoji with animation */}
      <motion.div 
        className="absolute right-10 md:right-20 top-1/3"
        initial={{ y: 20, opacity: 0, scale: 0.8 }}
        animate={{ 
          y: [0, -5, 0], 
          opacity: 1,
          scale: 1,
          rotate: [0, -2, 0]
        }}
        transition={{ 
          y: { repeat: Infinity, duration: 3, ease: "easeInOut" },
          rotate: { repeat: Infinity, duration: 4, ease: "easeInOut" },
          opacity: { duration: 1 },
          scale: { duration: 0.8 }
        }}
      >
        <Image 
          src={"https://em-content.zobj.net/source/apple/354/nauseated-face_1f922.png"} 
          alt="disgusted expression" 
          width={280}
          height={280}
          className="drop-shadow-2xl"
        />
      </motion.div>
      
      {/* Text content with animated entrance */}
      <motion.div 
        className="absolute top-1/4 left-10 max-w-xl space-y-5 flex flex-col"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h1 
          className="text-white text-5xl md:text-6xl font-semibold font-organical leading-tight"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          Not Your Favorite
        </motion.h1>
        
        <motion.div 
          className="font-mouldyCheese text-3xl text-white/90 mt-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <p>It&apos;s okay to dislike something.</p>
          <p>Trust your gut feelings.</p>
        </motion.div>
        
        {/* Decorative element */}
        <motion.div
          className="absolute -left-5 top-[-40px] opacity-20"
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        >
          <div className="w-32 h-32 rounded-full border-8 border-orange-300/40"></div>
        </motion.div>
      </motion.div>
      
      <AudioPlaceholder type="disgusted" />
    </div>
  )
} 