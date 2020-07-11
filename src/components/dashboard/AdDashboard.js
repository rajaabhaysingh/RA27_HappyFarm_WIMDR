import React from "react";
import "./AdDashboard.css";

import Upgrade from "../../res/ad/upgrade.svg";

import AdDashboardData from "./AdDashboardData";

const AdDashboard = () => {
  return (
    <div className="ad_dash_main_div">
      <div className="ad_dash_top">
        <div className="ad_dash_main_bnr">
          <img className="ad_dash_main_ad" src={AdDashboardData.bnr} alt="" />
        </div>
        <div className="ad_dash_str_bnr">
          <img className="ad_dash_sub_ad" src={AdDashboardData.str} alt="" />
        </div>
      </div>
      <div className="ad_dash_spacer"></div>
      <div className="ad_dash_bottom">
        <img className="ad_dash_upgrade_img" src={Upgrade} alt="" />
        <div className="ad_dash_upgrade_text">{AdDashboardData.desc}</div>
        <ul className="ad_dash_feature_list">
          {AdDashboardData.pts.map((point) => (
            <li key={point.p}>- {point.p}</li>
          ))}
        </ul>
        <button className="ad_dash_upgrade_btn">UPGRADE</button>
      </div>
    </div>
  );
};

export default AdDashboard;
