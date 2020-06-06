import React from "react";
import "./DoubleInfoBanner.css";

function DoubleInfoBanner() {
  return (
    <div className="double_info_banner_container">
      <div className="double_info_banner">
        <div className="double_info_details double_info_details_left"></div>
      </div>
      <div className="double_info_banner">
        <div className="double_info_details double_info_details_right"></div>
      </div>
    </div>
  );
}

export default DoubleInfoBanner;
