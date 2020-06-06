import React, { useState } from "react";
import "./Dashboard.css";

import { Sidebar } from "./Sidebar";
import CentralContent from "./CentralContent";

import ProfileData from "./profile/ProfileData";

export const Dashboard = () => {
  // ----------tab state mgmt-----------
  const [currentTabNo, setCurrentTabNo] = useState(1);

  // -----------------------------------

  return (
    <div className="dashboard_main_div">
      <div className="dashboard_inner_div">
        <div className="dashboard_sidebar">
          <div className="dashboard_sidebar_main_div">
            <Sidebar
              profileData={ProfileData}
              currentTabNo={currentTabNo}
              setCurrentTabNo={setCurrentTabNo}
            />
          </div>
        </div>
        <div className="dashboard_center">
          <div className="dashboard_center_main_div">
            <CentralContent
              profileData={ProfileData}
              currentTabNo={currentTabNo}
            />
          </div>
        </div>
        <div className="dashboard_ad">
          <div className="dashboard_ad_main_div"></div>
        </div>
      </div>
    </div>
  );
};
