import React from "react";
import "./MarqueeScroll.css";

function MarqueeScroll(props) {
  return (
    <div className="marquee_scroll_main_div">
      <div className="marquee_scroll_inner_div">
        <div className="marquee_scroll_heading">{props.heading}</div>
        <div className="marquee_scroll_content">
          {props.imageList.map((image) => (
            <img
              className="marquee_scroll_image"
              src={image.imgUrl}
              alt="our-partner"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default MarqueeScroll;
