import React, { useState } from "react";
import "./ProdImageWithZoom.css";

const ProdImageWithZoom = ({ prodImages }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="prod_zoom_main">
      <div className="prod_zoom_thumb_container">
        {prodImages.map((thumb, index) => (
          <div
            onClick={() => setActiveIndex(index)}
            onMouseOver={() => setActiveIndex(index)}
            key={index}
            className={
              activeIndex === index
                ? "prod_zoom_thumb prod_zoom_thumb--active"
                : "prod_zoom_thumb"
            }
          >
            <img src={thumb} alt="" />
          </div>
        ))}
      </div>
      <div className="prod_zoom_main_img">
        <img src={prodImages[activeIndex]} alt="" />
      </div>
    </div>
  );
};

export default ProdImageWithZoom;
