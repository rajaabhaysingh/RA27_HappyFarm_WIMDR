import React, { memo } from "react";
import "./TrippleInfoBanner.css";

function TrippleInfoBanner({ banner1, banner2, banner3 }) {
  return (
    <div className="tripple_info_main_div">
      <div className="tripple_info_banner_sub_div_one">
        <div
          style={{ background: `url(${banner1})` }}
          className="tripple_info_details_one"
        ></div>
      </div>
      {/* <div className="mid_spacer_tripple_banner"></div> */}
      <div className="tripple_info_banner_sub_div_two">
        <div
          style={{ background: `url(${banner2})` }}
          className="tripple_info_details_two"
        ></div>
      </div>
      {/* <div className="mid_spacer_tripple_banner"></div> */}
      <div className="tripple_info_banner_sub_div_three">
        <div
          style={{ background: `url(${banner3})` }}
          className="tripple_info_details_three"
        ></div>
      </div>
    </div>
  );
}

export default memo(TrippleInfoBanner);
