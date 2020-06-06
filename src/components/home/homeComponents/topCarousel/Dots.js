import React from "react";
import "./Dots.css";

function Dot({ active }) {
  // Active dot wrapper
  const activeDot = {
    background: `${active ? "#dddddd" : "#ffffff"}`,
    // border: `${active ? "2px solid #ffffff" : "1px solid #ffffff"}`,
    width: `${active ? "16" : "0"}px`,
    borderRadius: `${active ? "5px" : "50%"}`,
  };
  return <span style={activeDot} className="individual_dot"></span>;
}

function Dots({ slides, activeIndex }) {
  return (
    <div className="carousel_dots">
      {slides.map((slide, i) => {
        return <Dot key={i} active={activeIndex === i} />;
      })}
    </div>
  );
}

export default Dots;
