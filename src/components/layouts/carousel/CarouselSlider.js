import React from "react";
import "./CarouselSlider.css";

import "react-responsive-carousel/lib/styles/carousel.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

function CarouselSlider(props) {
  return (
    <div style={props.borderRadius} className="carousel_main_div">
      <Carousel
        autoPlay
        showThumbs={false}
        infiniteLoop
        showArrows
        stopOnHover={false}
        swipeable
        showStatus={false}
        showIndicators
      >
        {props.slides.map((slide) => (
          <div
            className="carousel_slide_container"
            key={slide.name}
            style={{
              backgroundImage: `url(${slide.imgUrl})`,
            }}
          ></div>
        ))}
      </Carousel>
    </div>
  );
}

export default CarouselSlider;
