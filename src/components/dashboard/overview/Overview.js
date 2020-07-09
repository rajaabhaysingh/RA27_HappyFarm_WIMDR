import React from "react";
import "./Overview.css";

function Overview() {
  return (
    <div className="overview_main_div">
      <div className="overview_inner_div">
        <div className="overview_heading">Overview</div>
        <div className="overview_description">
          <div className="overview_description_text">
            You can watch your account summary here.
          </div>
          <i className="fas fa-info-circle overview_info_icon"></i>
        </div>
      </div>
    </div>
  );
}

export default Overview;
