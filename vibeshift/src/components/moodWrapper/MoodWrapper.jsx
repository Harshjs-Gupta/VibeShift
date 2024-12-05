import React from "react";
import Happy from "../happyMood/happy";
import Sad from "../sadMood/sad";
import Anger from "../angerMood/anger";
import Surprised from "../surprisedMood/surprised";
import Neutral from "../neutral/neutral";


const MoodWrapper = ({ mood }) => {
  const renderMoodComponent = () => {
    switch (mood) {
      case "happy":
        return <Happy />;
      case "sad":
        return <Sad />;
      case "angry":
        return <Anger />;
      case "surprised":
        return <Surprised />;
      case "neutral":
      default:
        return <Neutral />;
    }
  };

  return <div className="z-0">{renderMoodComponent()}</div>;
};

export default MoodWrapper;
