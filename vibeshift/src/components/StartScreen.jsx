import React from 'react';
import { motion } from 'framer-motion';

const StartScreen = ({ onStart }) => {
  return (
    <div className="relative flex flex-col items-center justify-center h-screen overflow-hidden bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      {/* Animated particles */}
      <div className="absolute inset-0 z-0">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 20 + 5,
              height: Math.random() * 20 + 5,
              background: `rgba(255, 255, 255, ${Math.random() * 0.3 + 0.1})`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 20 + 10,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>
      
      {/* Logo animation */}
      <motion.div
        className="relative z-10 mb-16 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="inline-block"
          animate={{ 
            rotate: [0, 2, 0, -2, 0],
            scale: [1, 1.05, 1, 1.05, 1] 
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 8,
            ease: "easeInOut" 
          }}
        >
          <h1 className="px-6 py-2 text-6xl font-organical text-white mb-4 drop-shadow-lg">
            VibeShift
          </h1>
        </motion.div>
        
        <motion.p 
          className="text-xl font-mouldyCheese text-white/80 max-w-md mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          Discover how your facial expressions transform your digital environment
        </motion.p>
      </motion.div>
      
      {/* Start button with animation */}
      <motion.button 
        onClick={onStart}
        className="relative z-10 px-10 py-5 bg-white rounded-full font-semibold text-xl text-purple-600 shadow-lg hover:shadow-xl transition-all duration-300"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <span className="relative z-10">Start Experience</span>
        <motion.div 
          className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-300 to-pink-300 opacity-0"
          animate={{ opacity: [0, 0.5, 0] }}
          transition={{ 
            repeat: Infinity, 
            duration: 2,
            ease: "easeInOut" 
          }}
        />
      </motion.button>
      
      {/* Feature highlights */}
      <motion.div
        className="absolute bottom-8 left-0 right-0 flex justify-center space-x-8 px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        {[
          { icon: "😊", text: "Emotion Detection" },
          { icon: "🎨", text: "Dynamic UI" },
          { icon: "📱", text: "Shareable Moments" }
        ].map((feature, index) => (
          <motion.div 
            key={index}
            className="flex flex-col items-center"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.2 }}
          >
            <div className="text-2xl mb-2">{feature.icon}</div>
            <p className="text-white text-sm font-medium">{feature.text}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default StartScreen; 