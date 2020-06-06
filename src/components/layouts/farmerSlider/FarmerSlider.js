import React from "react";
import "./FarmerSlider.css";
import { DoubleLeftOutlined, DoubleRightOutlined } from "@ant-design/icons";

import FarmerSliderItem from "./FarmerSliderItem";

function FarmerSlider(props) {
  return (
    <div className="farmer_slider_main_div">
      <div className="farmer_slider_inner_main_div">
        <div className="farmer_slider_header">
          <div className="farmer_slider_header_content">
            <div className="farmer_slider_header_heading">
              <span>
                <strong>{props.boldHeading} </strong>
              </span>
              <span>{props.normalHeading}</span>
            </div>
            <div className="farmer_slider_header_view_all">
              <button>View all</button>
            </div>
          </div>
        </div>
        <div className="farmer_slider_contents">
          <div className="farmer_slider_left_arrow">
            <DoubleLeftOutlined />
          </div>
          <div className="farmer_slider_container">
            {props.farmersList.map((farmer) => (
              <FarmerSliderItem
                key={farmer.id}
                name={farmer.name}
                place={farmer.place}
                dpUrl={farmer.dpUrl}
                rating={farmer.rating}
                profileUrl={farmer.profileUrl}
                productUrl={farmer.productUrl}
                isAd={farmer.isAd}
              />
            ))}
          </div>
          <div className="farmer_slider_right_arrow">
            <DoubleRightOutlined />
          </div>
        </div>
      </div>
    </div>
  );
}

export default FarmerSlider;
