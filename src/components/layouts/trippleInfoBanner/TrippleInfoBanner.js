import React from "react";
import "./TrippleInfoBanner.css";

function TrippleInfoBanner() {
  return (
    <div className="tripple_info_main_div">
      <div className="tripple_info_banner_sub_div_one">
        <div className="tripple_info_details_one"></div>
      </div>
      {/* <div className="mid_spacer_tripple_banner"></div> */}
      <div className="tripple_info_banner_sub_div_two">
        <div className="tripple_info_details_two"></div>
      </div>
      {/* <div className="mid_spacer_tripple_banner"></div> */}
      <div className="tripple_info_banner_sub_div_three">
        <div className="tripple_info_details_three"></div>
      </div>
    </div>
  );
}

export default TrippleInfoBanner;
