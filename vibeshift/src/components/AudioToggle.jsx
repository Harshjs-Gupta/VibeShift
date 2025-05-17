import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const AudioToggle = () => {
  const [isMuted, setIsMuted] = useState(false);
  
  useEffect(() => {
    // Find all audio elements and set muted state
    const audioElements = document.querySelectorAll('audio');
    audioElements.forEach(audio => {
      audio.muted = isMuted;
    });
  }, [isMuted]);
  
  // Event listener for new audio elements that might be added later
  useEffect(() => {
    const handleNewAudio = (mutations) => {
      mutations.forEach(mutation => {
        mutation.addedNodes.forEach(node => {
          if (node.tagName === 'AUDIO') {
            node.muted = isMuted;
          }
        });
      });
    };
    
    const observer = new MutationObserver(handleNewAudio);
    observer.observe(document.body, { childList: true, subtree: true });
    
    return () => observer.disconnect();
  }, [isMuted]);
  
  return (
    <motion.button
      onClick={() => setIsMuted(!isMuted)}
      className="fixed top-6 left-6 z-40 p-3 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-colors"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      title={isMuted ? "Unmute sounds" : "Mute sounds"}
    >
      {isMuted ? (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" clipRule="evenodd" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
        </svg>
      )}
      
      {/* Sound wave animation when not muted */}
      {!isMuted && (
        <motion.div
          className="absolute -right-2 -top-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <div className="h-2 w-2 bg-white rounded-full" />
        </motion.div>
      )}
    </motion.button>
  );
};

export default AudioToggle; 