import React from "react";
import "./SliderContent.css";
import Slide from "./Slide";

function SliderContent(props) {
  // Style wrapper of Slider content
  let sliderStyle = {
    transform: `translateX(-${props.translate}px)`,
    transition: `transform ease-in-out ${props.transition}s`,
    width: `${props.width}px`,
  };

  const className = props.sliderNum;

  return (
    <div style={sliderStyle} className={className}>
      {props.urls.map((slide) => (
        <Slide key={slide.name} url={slide.imgUrl} />
      ))}
    </div>
  );
}

export default SliderContent;
