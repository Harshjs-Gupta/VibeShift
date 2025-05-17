"use client"
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import AudioPlaceholder from '../AudioPlaceholder';

export default function Neutral() {
  return (
    <div className="relative w-screen h-screen neutralBg">
      {/* Background overlay with more attractive gradient */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br via-transparent from-slate-700/30 to-slate-400/30"></div>
      
      {/* Animated particles with improved styling */}
      <div className="absolute inset-0 z-0">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/30"
            style={{
              width: Math.random() * 10 + 5,
              height: Math.random() * 10 + 5,
              filter: 'blur(1px)'
            }}
            initial={{ 
              x: Math.random() * window.innerWidth, 
              y: Math.random() * window.innerHeight,
              opacity: 0,
              scale: 0 
            }}
            animate={{ 
              x: [Math.random() * window.innerWidth, Math.random() * window.innerWidth],
              y: [Math.random() * window.innerHeight, Math.random() * window.innerHeight],
              opacity: [0, 0.4, 0],
              scale: [0, 1, 0]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 10 + Math.random() * 15,
              delay: i * 0.7,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
      
      {/* Main emoji with improved animation and positioning */}
      <motion.div
        className="absolute right-10 top-1/4 md:right-20 md:top-1/3"
        initial={{ y: 20, opacity: 0, scale: 0.8 }}
        animate={{ 
          y: [0, 8, 0], 
          opacity: 1,
          scale: 1,
          rotate: [-2, 2, -2]
        }}
        transition={{ 
          y: { repeat: Infinity, duration: 4, ease: "easeInOut" },
          rotate: { repeat: Infinity, duration: 5, ease: "easeInOut" },
          opacity: { duration: 1 },
          scale: { duration: 0.8 }
        }}
      >
        <Image 
          src={"https://em-content.zobj.net/source/apple/354/neutral-face_1f610.png"} 
          alt='neutral expression' 
          width={280}
          height={280}
          className='drop-shadow-2xl'
          priority
        />
      </motion.div>
      
      {/* Text content with better font styling and animation */}
      <motion.div 
        className='flex absolute left-10 top-1/4 flex-col space-y-5 max-w-xl'
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h1 
          className='text-5xl leading-tight text-white md:text-6xl font-organical'
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          In a Neutral State
        </motion.h1>
        
        <motion.div 
          className='mt-4 text-3xl font-mouldyCheese text-white/90'
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <p>Balance in all things.</p>
          <p>A calm center in a chaotic world.</p>
        </motion.div>
        
        {/* Decorative elements that add visual interest */}
        <motion.div
          className="relative h-1.5 w-48 mt-4 overflow-hidden rounded-full bg-gray-600/30"
          initial={{ width: 0 }}
          animate={{ width: 192 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <motion.div 
            className="absolute top-0 left-0 w-1/2 h-full bg-white"
            animate={{ 
              x: ['-100%', '200%'],
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 3,
              ease: "easeInOut" 
            }}
          />
        </motion.div>
      </motion.div>
      
      {/* Floating decorative elements */}
      <motion.div
        className="absolute top-20 left-20 w-32 h-32 rounded-full border border-white/20"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ 
          scale: 1, 
          opacity: 0.2,
          rotate: 360
        }}
        transition={{ 
          opacity: { duration: 1, delay: 1 },
          scale: { duration: 1, delay: 1 },
          rotate: { duration: 30, repeat: Infinity, ease: "linear" }
        }}
      />
      
      <motion.div
        className="absolute bottom-20 right-1/4 w-48 h-48 rounded-full border border-white/10"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ 
          scale: 1, 
          opacity: 0.1,
          rotate: -360
        }}
        transition={{ 
          opacity: { duration: 1, delay: 1.2 },
          scale: { duration: 1, delay: 1.2 },
          rotate: { duration: 40, repeat: Infinity, ease: "linear" }
        }}
      />
      
      {/* Glass card with inspiring quote */}
      <motion.div
        className="absolute left-10 bottom-20 p-6 max-w-xs rounded-xl backdrop-blur-md glass-effect"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.7 }}
      >
        <p className="text-lg text-white/90">
          &ldquo;Between stimulus and response there is a space. In that space is our power to choose our response.&rdquo;
        </p>
      </motion.div>
      
      <AudioPlaceholder type="neutral" />
    </div>
  )
}
