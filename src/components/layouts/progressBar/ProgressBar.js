import React, { memo } from "react";
import "./ProgressBar.css";

function ProgressBar({ done, textInfo, symbol }) {
  const progressDoneWrapper = {
    width: `${done}%`,
  };

  return (
    <div className="progress_bar_main_div">
      <div className="progress_div">
        <div style={progressDoneWrapper} className="progress_done"></div>
      </div>
      <div className="progress_percent">
        {done}
        {symbol} {textInfo}
      </div>
    </div>
  );
}

export default memo(ProgressBar);
