import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const EmotionHistory = ({ currentMood }) => {
  const [history, setHistory] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    if (currentMood && history.length < 10) {
      setHistory(prev => [...prev, currentMood]);
    } else if (currentMood) {
      setHistory(prev => [...prev.slice(1), currentMood]);
    }
  }, [currentMood]);
  
  const getEmotionColor = (emotion) => {
    switch(emotion) {
      case 'happy': return 'bg-yellow-400';
      case 'sad': return 'bg-blue-500';
      case 'angry': return 'bg-red-500';
      case 'surprised': return 'bg-purple-500';
      case 'neutral': return 'bg-gray-400';
      case 'fearful': return 'bg-green-400';
      case 'disgusted': return 'bg-orange-500';
      default: return 'bg-gray-300';
    }
  };
  
  const getEmotionEmoji = (emotion) => {
    switch(emotion) {
      case 'happy': return '😊';
      case 'sad': return '😔';
      case 'angry': return '😠';
      case 'surprised': return '😲';
      case 'neutral': return '😐';
      case 'fearful': return '😨';
      case 'disgusted': return '🤢';
      default: return '❓';
    }
  };
  
  if (!history.length) return null;
  
  return (
    <>
      <motion.button
        onClick={() => setIsVisible(!isVisible)}
        className="fixed bottom-20 left-3 z-30 p-2 rounded-full dark-glass-effect"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      </motion.button>
      
      {isVisible && (
        <motion.div
          className="fixed bottom-20 left-14 z-30 p-4 dark-glass-effect rounded-xl"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
        >
          <div className="text-white text-sm font-medium mb-2">Emotion History</div>
          <div className="flex items-end space-x-1 h-20">
            {history.map((mood, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                transition={{ delay: index * 0.05 }}
              >
                <div className="text-xs mb-1">{getEmotionEmoji(mood)}</div>
                <motion.div 
                  className={`w-4 ${getEmotionColor(mood)} rounded-t-sm`}
                  style={{ 
                    height: `${(index + 5) * 4}px`, 
                    maxHeight: '80px',
                    minHeight: '10px'
                  }}
                  initial={{ height: 0 }}
                  animate={{ height: `${(index + 5) * 4}px` }}
                  transition={{ duration: 0.5 }}
                />
              </motion.div>
            ))}
          </div>
          <div className="mt-2 flex justify-between">
            <span className="text-white/70 text-xs">Earlier</span>
            <span className="text-white/70 text-xs">Now</span>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default EmotionHistory; 