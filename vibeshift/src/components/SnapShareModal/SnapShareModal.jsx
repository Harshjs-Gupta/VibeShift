import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import html2canvas from 'html2canvas';

const SnapShareModal = ({ isOpen, onClose, mood }) => {
  const [capturedImage, setCapturedImage] = useState(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const captureRef = useRef(null);
  
  if (!isOpen) return null;
  
  const handleCapture = async () => {
    if (!captureRef.current) return;
    
    setIsCapturing(true);
    
    try {
      const canvas = await html2canvas(document.body, {
        allowTaint: true,
        useCORS: true,
        logging: false,
        scale: 1,
      });
      
      const image = canvas.toDataURL('image/png');
      setCapturedImage(image);
      setIsCapturing(false);
    } catch (error) {
      console.error('Error capturing screenshot:', error);
      setIsCapturing(false);
    }
  };
  
  const handleDownload = () => {
    if (!capturedImage) return;
    
    const link = document.createElement('a');
    link.href = capturedImage;
    link.download = `vibeshift-${mood || 'mood'}-${Date.now()}.png`;
    link.click();
    
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };
  
  const handleShare = async () => {
    if (!capturedImage || !navigator.share) return;
    
    try {
      const blob = await fetch(capturedImage).then(res => res.blob());
      const file = new File([blob], `vibeshift-${mood || 'mood'}.png`, { type: 'image/png' });
      
      await navigator.share({
        title: 'My VibeShift Mood',
        text: `Check out my current mood: ${mood}!`,
        files: [file],
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };
  
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div ref={captureRef} className="relative w-full max-w-lg p-6 bg-white rounded-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 text-gray-500 hover:text-gray-700"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <h2 className="mb-4 text-2xl font-organical text-center text-gray-800">
          Capture Your Mood
        </h2>
        
        {!capturedImage ? (
          <div className="p-4 mb-6 text-center bg-gray-100 rounded-lg">
            <p className="mb-4 text-lg font-mouldyCheese text-gray-600">
              Take a snapshot of your current {mood} mood to save or share with friends!
            </p>
            <button
              onClick={handleCapture}
              disabled={isCapturing}
              className="px-6 py-3 font-medium text-white transition-colors rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:opacity-50"
            >
              {isCapturing ? 'Capturing...' : 'Capture Mood'}
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="overflow-hidden border-2 border-purple-200 rounded-lg">
              <img src={capturedImage} alt="Captured mood" className="object-cover w-full" />
            </div>
            
            <div className="flex flex-wrap justify-center gap-3">
              <button
                onClick={handleDownload}
                className="flex items-center px-4 py-2 font-medium text-white transition-all rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:shadow-lg"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download
              </button>
              
              {navigator.share && (
                <button
                  onClick={handleShare}
                  className="flex items-center px-4 py-2 font-medium text-white transition-all rounded-full bg-gradient-to-r from-pink-500 to-rose-500 hover:shadow-lg"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                  Share
                </button>
              )}
              
              <button
                onClick={() => setCapturedImage(null)}
                className="flex items-center px-4 py-2 font-medium text-gray-700 transition-all border-2 rounded-full hover:bg-gray-100"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Retake
              </button>
            </div>
          </div>
        )}
        
        {showSuccess && (
          <motion.div
            className="absolute bottom-4 left-0 right-0 mx-auto w-4/5 p-2 text-center text-green-800 bg-green-100 rounded-full"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
          >
            Image saved successfully!
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default SnapShareModal; 