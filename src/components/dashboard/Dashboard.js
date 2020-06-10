import React, { useState, memo, lazy, Suspense } from "react";
import "./Dashboard.css";

import ProfileData from "./profile/ProfileData";

import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import FallbackLazy from "../FallbackLazy";

const Sidebar = lazy(() => import("./Sidebar"));
const CentralContent = lazy(() => import("./CentralContent"));

function Dashboard({ isSearchBarOpen }) {
  // close search bar by default in dashboard
  const searchBarBtn = document.getElementById("navbar_search_btn_group");

  if (searchBarBtn && isSearchBarOpen && window.innerWidth < 1024) {
    searchBarBtn.click();
  }

  // ----------tab state mgmt-----------
  const [currentTabNo, setCurrentTabNo] = useState(1);

  // -----------------------------------

  return (
    <div className="dashboard_main_div">
      <ErrorBoundary>
        <Suspense fallback={<FallbackLazy />}>
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
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

export default memo(Dashboard);
