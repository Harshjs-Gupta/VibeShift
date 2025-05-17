import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const InfoOverlay = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [currentTip, setCurrentTip] = useState(0);
  
  const tips = [
    "Face the camera clearly to detect your emotions accurately",
    "Try expressing different emotions to see how the background changes",
    "Use the settings button to customize detection settings",
    "Capture and share your mood using the camera button",
    "The background adapts to your current emotional state"
  ];

  const handleNextTip = () => {
    if (currentTip < tips.length - 1) {
      setCurrentTip(currentTip + 1);
    } else {
      setIsVisible(false);
    }
  };

  if (!isVisible) {
    return (
      <motion.button
        className="fixed top-6 left-6 z-40 p-3 rounded-full backdrop-blur-md transition-colors bg-white/10 hover:bg-white/20"
        onClick={() => setIsVisible(true)}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        whileHover={{ scale: 1.1 }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </motion.button>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        className="fixed top-20 left-1/2 z-40 w-full max-w-md transform -translate-x-1/2"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -50, opacity: 0 }}
      >
        <div className="p-5 mx-4 rounded-xl backdrop-blur-md dark-glass-effect">
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-xl text-white font-organical">Tip {currentTip + 1}/{tips.length}</h3>
            <button 
              onClick={() => setIsVisible(false)}
              className="p-1 rounded-full transition-colors hover:bg-white/10"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <motion.div
            key={currentTip}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-[60px] flex items-center"
          >
            <p className="text-lg text-white font-mouldyCheese">
              {tips[currentTip]}
            </p>
          </motion.div>
          
          <div className="flex justify-between items-center mt-4">
            <div className="flex space-x-1">
              {tips.map((_, index) => (
                <div 
                  key={index}
                  className={`h-1.5 rounded-full ${
                    index === currentTip ? 'w-6 bg-white' : 'w-2 bg-white/40'
                  } transition-all duration-300`}
                ></div>
              ))}
            </div>
            
            <button
              onClick={handleNextTip}
              className="px-4 py-1.5 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors text-sm font-medium"
            >
              {currentTip < tips.length - 1 ? 'Next Tip' : 'Got it!'}
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default InfoOverlay; 