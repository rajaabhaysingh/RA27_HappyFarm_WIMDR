import React from "react";
import "./ProgressBar.css";

function ProgressBar({ done, textInfo }) {
  //   const [progress, setProgress] = useState({
  //     width: `${done === "0" ? 1 : done}%`,
  //   });

  // setting progress refreshTime
  //   setTimeout(() => {
  //     const progressDoneWrapper = {
  //       width: `${done === "0" ? 1 : done}%`,
  //     };

  //     setProgress(progressDoneWrapper);
  //     console.log("refreshed");
  //   }, parseFloat(refreshTime).toFixed(2));

  const progressDoneWrapper = {
    width: `${done}%`,
  };

  return (
    <div className="progress_bar_main_div">
      <div className="progress_div">
        <div style={progressDoneWrapper} className="progress_done"></div>
      </div>
      <div className="progress_percent">
        {done}% {textInfo}
      </div>
    </div>
  );
}

export default ProgressBar;
