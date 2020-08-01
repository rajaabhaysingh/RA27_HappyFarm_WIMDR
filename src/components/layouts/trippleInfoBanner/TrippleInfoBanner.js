import React, { memo } from "react";
import "./TrippleInfoBanner.css";

function TrippleInfoBanner({ banner1, banner2, banner3 }) {
  return (
    <div className="tripple_info_main_div">
      <div className="tripple_info_banner_sub_div_one">
        <div className="tripple_info_details_one">
          <img src={banner1} alt="" />
        </div>
      </div>
      {/* <div className="mid_spacer_tripple_banner"></div> */}
      <div className="tripple_info_banner_sub_div_two">
        <div className="tripple_info_details_two">
          <img src={banner2} alt="" />
        </div>
      </div>
      {/* <div className="mid_spacer_tripple_banner"></div> */}
      <div className="tripple_info_banner_sub_div_three">
        <div className="tripple_info_details_three">
          <img src={banner3} alt="" />
        </div>
      </div>
    </div>
  );
}

export default memo(TrippleInfoBanner);
