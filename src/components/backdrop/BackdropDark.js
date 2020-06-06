import React from "react";
import "./BackdropDark.css";

export default function BackdropDark(props) {
  // backdrop style wrapper
  const backdropWrapper = {
    background: `rgba(0, 0, 0, ${props.alpha})`,
  };
  return (
    <div
      style={backdropWrapper}
      id="backdrop"
      className="backdrop"
      onClick={props.click}
    ></div>
  );
}
