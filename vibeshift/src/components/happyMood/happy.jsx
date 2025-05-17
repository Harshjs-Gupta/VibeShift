"use client";
import React from 'react';
import smiley from "@/assets/images/smiley.png";
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function Happy() {
  return (
    <div className="overflow-hidden relative w-screen h-screen happyBg">
      {/* Animated emoji particles */}
      <div className="absolute inset-0 z-0">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-12 h-12 text-4xl"
            initial={{ 
              x: Math.random() * 100, 
              y: Math.random() * 100,
              opacity: 0,
              scale: 0 
            }}
            animate={{ 
              x: [Math.random() * window.innerWidth, Math.random() * window.innerWidth],
              y: [Math.random() * window.innerHeight, Math.random() * window.innerHeight],
              opacity: [0, 0.7, 0],
              scale: [0, 1.5, 0]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 10 + Math.random() * 20,
              delay: i * 0.3
            }}
          >
            {["😊", "😄", "🌟", "✨", "🎉"][Math.floor(Math.random() * 5)]}
          </motion.div>
        ))}
      </div>
      
      {/* Main smiley face image with animation */}
      <motion.div 
        className="flex absolute right-10 items-center h-full"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Image 
          src={smiley} 
          alt='smiley' 
          className='object-contain w-auto max-w-lg h-full'
          priority
        />
      </motion.div>
      
      {/* Text content with animated entrance */}
      <motion.div 
        className='flex absolute left-10 top-1/4 flex-col space-y-5 max-w-xl'
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <motion.h1 
          className='text-5xl font-semibold text-black md:text-6xl font-organical'
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          It&apos;s Seems Like You&apos;re Happy!
        </motion.h1>
        <motion.div 
          className='text-3xl font-mouldyCheese text-black/80'
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <p>Smile in the mirror. Do that every morning and you&apos;ll</p>
          <p>start to see a big difference in your life.</p>
        </motion.div>
        
        {/* Animated quote decoration */}
        <motion.div 
          className="absolute -top-10 -left-10 font-serif text-8xl text-black/20"
          initial={{ rotate: -10, opacity: 0 }}
          animate={{ rotate: 0, opacity: 0.2 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          &quot;
        </motion.div>
      </motion.div>
      
      <audio src="/audio/happy.mp3" type="audio/mp3" autoPlay loop></audio>
      
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r to-transparent pointer-events-none from-yellow-300/20"></div>
    </div>
  )
}
