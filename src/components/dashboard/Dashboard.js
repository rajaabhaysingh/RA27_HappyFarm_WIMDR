import React, { useState, memo, lazy, Suspense } from "react";
import "./Dashboard.css";

import ProfileData from "./profile/ProfileData";

import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import FallbackLazy from "../FallbackLazy";

const Sidebar = lazy(() => import("./Sidebar"));
const CentralContent = lazy(() => import("./CentralContent"));
const AdDashboard = lazy(() => import("./AdDashboard"));

function Dashboard({ isSearchBarOpen }) {
  // ------search should be open by default------
  // const searchBarBtn = document.getElementById("navbar_search_btn_group");

  // if (searchBarBtn && isSearchBarOpen && window.innerWidth < 1024) {
  //   setTimeout(() => {
  //     searchBarBtn.click();
  //   }, 1000);
  // }
  // --------------------------------------

  return (
    <div className="dashboard_main_div">
      <ErrorBoundary>
        <Suspense fallback={<FallbackLazy />}>
          <div className="dashboard_inner_div">
            <div className="dashboard_sidebar">
              <div className="dashboard_sidebar_main_div">
                <Sidebar profileData={ProfileData} />
              </div>
            </div>
            <div className="dashboard_center">
              <div className="dashboard_center_main_div">
                <CentralContent profileData={ProfileData} />
              </div>
            </div>
            <div className="dashboard_ad">
              <div className="dashboard_ad_main_div">
                <AdDashboard />
              </div>
            </div>
          </div>
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

export default memo(Dashboard);
