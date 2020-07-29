import React, { memo } from "react";
import "./SpeechRecognition.css";

import PropTypes from "prop-types";
import SpeechRecognition from "react-speech-recognition";

const propTypes = {
  // Props injected by SpeechRecognition
  transcript: PropTypes.string,
  resetTranscript: PropTypes.func,
  browserSupportsSpeechRecognition: PropTypes.bool,
  startListening: PropTypes.func,
  stopListening: PropTypes.func,
};

const Dictaphone = ({
  transcript,
  resetTranscript,
  browserSupportsSpeechRecognition,
  startListening,
  stopListening,
  //   searchFromSpeech is prop received
  searchFromSpeech,
}) => {
  if (!browserSupportsSpeechRecognition) {
    return null;
  }

  // function used to first clear previous transcript and
  // then start new recognition
  // handleMouseDown can be invoked for both mobile and pc devices
  const handleMouseDown = () => {
    resetTranscript();
    startListening();
  };

  const handleMouseUp = () => {
    stopListening();
    if (transcript === "") transcript = "Couldn't recognise...";
    searchFromSpeech(transcript);
  };

  return (
    <div
      className="speech_recog_div"
      onTouchStart={() => handleMouseDown}
      onTouchEnd={() => handleMouseUp}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={stopListening}
    >
      <i className="fas fa-microphone"></i>
    </div>
  );
};

Dictaphone.propTypes = propTypes;

let options = {
  autoStart: false,
  continuous: false,
};

export default memo(SpeechRecognition(options)(Dictaphone));
