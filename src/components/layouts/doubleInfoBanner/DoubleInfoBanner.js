import React, { memo } from "react";
import "./DoubleInfoBanner.css";

function TrippleInfoBanner() {
  return (
    <div className="double_info_main_div">
      <div className="double_info_banner_sub_div_one">
        <div className="double_info_details_one"></div>
      </div>
      <div className="double_info_banner_sub_div_two">
        <div className="double_info_details_two"></div>
      </div>
    </div>
  );
}

export default memo(TrippleInfoBanner);
