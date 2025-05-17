import React, { useState } from 'react';

const SettingsPanel = ({ isOpen, onClose, settings, onSettingsChange }) => {
  const [localSettings, setLocalSettings] = useState(settings);
  
  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    
    setLocalSettings({
      ...localSettings,
      [name]: newValue,
    });
  };
  
  const handleSave = () => {
    onSettingsChange(localSettings);
    onClose();
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="glass-effect dark:dark-glass-effect w-full max-w-md p-6 rounded-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-organical text-white">Settings</h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="space-y-4">
          <div className="space-y-1">
            <label className="block text-white text-sm font-medium">
              Detection Interval (ms)
            </label>
            <input
              type="range"
              name="detectionInterval"
              min="500"
              max="2000"
              step="100"
              value={localSettings.detectionInterval}
              onChange={handleChange}
              className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-sm text-white/60">
              <span>Faster (500ms)</span>
              <span>{localSettings.detectionInterval}ms</span>
              <span>Slower (2000ms)</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="showExpressions"
              name="showExpressions"
              checked={localSettings.showExpressions}
              onChange={handleChange}
              className="w-4 h-4 accent-purple-500"
            />
            <label htmlFor="showExpressions" className="text-white">
              Show Expression Labels
            </label>
          </div>
          
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="showFaceDetection"
              name="showFaceDetection"
              checked={localSettings.showFaceDetection}
              onChange={handleChange}
              className="w-4 h-4 accent-purple-500"
            />
            <label htmlFor="showFaceDetection" className="text-white">
              Show Face Detection Box
            </label>
          </div>
          
          <div className="space-y-1">
            <label className="block text-white text-sm font-medium">
              Webcam Size
            </label>
            <select
              name="webcamSize"
              value={localSettings.webcamSize}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-white/10 text-white rounded-lg focus:ring-2 focus:ring-purple-500"
            >
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
          </div>
        </div>
        
        <div className="flex justify-end mt-6 space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-white/10 rounded-lg text-white hover:bg-white/20 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg text-white font-medium hover:opacity-90 transition-opacity"
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel; 