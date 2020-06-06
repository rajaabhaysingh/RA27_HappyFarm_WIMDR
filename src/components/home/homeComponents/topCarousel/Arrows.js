import React from "react";
import "./Arrows.css";
import rightArrow from "../../../../res/carousel/arrowRight.svg";
import leftArrow from "../../../../res/carousel/arrowLeft.svg";

function Arrows({ direction, handleClick }) {
  // Style wrapper of arrows
  let arrowStyle;

  direction === "right"
    ? (arrowStyle = { right: "15px" })
    : (arrowStyle = { left: "15px" });

  let arrowImageStyle = {
    transform: `translateX(${direction === "left" ? "0" : "0"}px)`,
  };

  return (
    <div style={arrowStyle} className="arrows" onClick={handleClick}>
      {direction === "right" ? (
        <img style={arrowImageStyle} src={rightArrow} alt="rightArrow" />
      ) : (
        <img style={arrowImageStyle} src={leftArrow} alt="leftArrow" />
      )}
    </div>
  );
}

export default Arrows;
