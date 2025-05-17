import React, { useEffect, useState } from 'react';

const AudioPlaceholder = ({ type }) => {
  const [hasError, setHasError] = useState(false);
  
  // Audio mappings to public URLs for different moods
  const audioSources = {
    happy: "https://cdn.pixabay.com/download/audio/2021/08/09/audio_69db51b0f7.mp3?filename=happy-ukulele-612s-21283.mp3",
    sad: "https://cdn.pixabay.com/download/audio/2022/03/19/audio_db693b8981.mp3?filename=sad-piano-153f-91659.mp3",
    angry: "https://cdn.pixabay.com/download/audio/2022/08/23/audio_eee5239a62.mp3?filename=intense-43318.mp3",
    surprised: "https://cdn.pixabay.com/download/audio/2023/03/06/audio_71a9a5d2c1.mp3?filename=cinematic-surprise-transition-146461.mp3",
    fearful: "https://cdn.pixabay.com/download/audio/2021/12/23/audio_6ce91aebff.mp3?filename=horror-background-atmosphere-scary-ghost-sound-scary-ambient-89638.mp3",
    disgusted: "https://cdn.pixabay.com/download/audio/2022/02/21/audio_da3e2da43e.mp3?filename=yuck-85645.mp3",
    neutral: "https://cdn.pixabay.com/download/audio/2022/03/10/audio_096d2c845f.mp3?filename=ambient-piano-amp-strings-10711.mp3"
  };
  
  useEffect(() => {
    // Check if local audio file exists
    const checkLocalAudio = async () => {
      try {
        const response = await fetch(`/audio/${type}.mp3`);
        if (!response.ok) {
          setHasError(true);
        } else {
          setHasError(false);
        }
      } catch {
        // Any error means we should use the fallback
        setHasError(true);
      }
    };
    
    checkLocalAudio();
  }, [type]);
  
  if (hasError) {
    return (
      <audio 
        src={audioSources[type] || audioSources.neutral} 
        autoPlay 
        loop
      />
    );
  }
  
  return <audio src={`/audio/${type}.mp3`} autoPlay loop />;
};

export default AudioPlaceholder; 