import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from 'framer-motion';
import Happy from "../happyMood/happy";
import Sad from "../sadMood/sad";
import Anger from "../angerMood/anger";
import Surprised from "../surprisedMood/surprised";
import Neutral from "../neutral/neutral";
import Fearful from "../fearfulMood/fearful";
import Disgusted from "../disgustedMood/disgusted";

const MoodWrapper = ({ mood }) => {
  const [prevMood, setPrevMood] = useState(null);
  
  useEffect(() => {
    if (mood) {
      setPrevMood(mood);
    }
  }, [mood]);

  const renderMoodComponent = () => {
    const currentMood = mood || prevMood || "neutral";
    
    switch (currentMood) {
      case "happy":
        return <Happy />;
      case "sad":
        return <Sad />;
      case "angry":
        return <Anger />;
      case "surprised":
        return <Surprised />;
      case "fearful":
        return <Fearful />;
      case "disgusted":
        return <Disgusted />;
      case "neutral":
      default:
        return <Neutral />;
    }
  };

  // Add mood info overlay text
  const getMoodInfo = () => {
    if (!mood) return null;
    
    switch (mood) {
      case "happy":
        return "Happiness detected! Your positive energy is contagious.";
      case "sad":
        return "It's okay to feel down sometimes. Take a moment for yourself.";
      case "angry":
        return "I sense some tension. Take a deep breath.";
      case "surprised":
        return "Wow! Something caught you off guard?";
      case "fearful":
        return "It's natural to feel cautious at times. You're safe here.";
      case "disgusted":
        return "Not a fan of what you're seeing? That's a valid response.";
      case "neutral":
        return "Calm and collected. A perfect state of mind.";
      default:
        return null;
    }
  };

  return (
    <div className="relative w-full h-full z-0">
      <AnimatePresence mode="wait">
        <motion.div
          key={mood || "default"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="w-full h-full"
        >
          {renderMoodComponent()}
        </motion.div>
      </AnimatePresence>
      
      {getMoodInfo() && (
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="absolute bottom-24 left-1/2 transform -translate-x-1/2 max-w-sm bg-black/30 backdrop-blur-md p-4 rounded-xl z-30 text-white font-mouldyCheese text-lg text-center"
        >
          {getMoodInfo()}
        </motion.div>
      )}
    </div>
  );
};

export default MoodWrapper;
