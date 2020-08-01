import React, { memo } from "react";
import "./DoubleInfoBanner.css";

function TrippleInfoBanner({ banner1, banner2 }) {
  return (
    <div className="double_info_main_div">
      <div className="double_info_banner_sub_div_one">
        <div className="double_info_details_one">
          <img src={banner1} alt="" />
        </div>
      </div>
      <div className="double_info_banner_sub_div_two">
        <div className="double_info_details_two">
          <img src={banner2} alt="" />
        </div>
      </div>
    </div>
  );
}

export default memo(TrippleInfoBanner);
