import React from 'react';

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-r from-violet-500 to-purple-600">
      <div className="flex flex-col items-center">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-t-transparent border-white rounded-full animate-spin mb-4"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 bg-white rounded-full opacity-30 animate-pulse"></div>
          </div>
        </div>
        
        <h2 className="text-white font-organical text-3xl mt-6 mb-2">Loading VibeShift</h2>
        <p className="text-white/70 text-lg max-w-sm text-center">
          Preparing face recognition models to analyze your mood...
        </p>
        
        {/* Loading progress bar */}
        <div className="w-64 h-1.5 bg-white/20 rounded-full mt-8 overflow-hidden">
          <div className="h-full bg-white loading-progress-bar"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen; 