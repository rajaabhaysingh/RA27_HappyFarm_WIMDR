import React, { memo } from "react";
import "./BackdropDark.css";

function BackdropDark({ alpha, click }) {
  // backdrop style wrapper
  const backdropWrapper = {
    background: `rgba(0, 0, 0, ${alpha})`,
  };
  return (
    <div
      style={backdropWrapper}
      id="backdrop"
      className="backdrop"
      onClick={click}
    ></div>
  );
}

export default memo(BackdropDark);
