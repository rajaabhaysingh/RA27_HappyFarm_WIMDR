import React from "react";
import "./Slide.css";

function Slide({ url }) {
  // Style wrapper of Slide content
  let slideStyle = {
    backgroundImage: `url("${url}")`,
  };

  return <div style={slideStyle} className="slide" />;
}

export default Slide;
