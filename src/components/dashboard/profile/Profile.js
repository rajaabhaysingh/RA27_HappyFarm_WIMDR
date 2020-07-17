import React, { memo, lazy, Suspense } from "react";
import "./Profile.css";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

import FallbackLazy from "../../FallbackLazy";
import ErrorBoundary from "../../errorBoundary/ErrorBoundary";

const ProfileBasicInfo = lazy(() => import("./ProfileBasicInfo"));
const Preferences = lazy(() => import("./Preferences"));

function Profile({ profileData }) {
  return (
    <div className="profile_main_div">
      <div className="profile_inner_div">
        <div className="profile_heading">Profile and Info</div>
        <div className="profile_description">
          <div className="profile_description_text">
            Edit/update your personal information and preferences here.
          </div>
          <i className="fas fa-info-circle profile_description_info_icon"></i>
        </div>
        <div className="profile_tab_container">
          <Tabs
            className="profile_tabs"
            defaultIndex={0}
            forceRenderTabPanel={false}
            disabledTabClassName="profile_tab--disabled"
            selectedTabClassName="profile_tab--selected"
            selectedTabPanelClassName="profile_panel--selected"
          >
            <TabList className="profile_tab_list">
              <Tab className="profile_tab">Basic Info</Tab>
              <Tab className="profile_tab">Settings {"&"} Preferences</Tab>
            </TabList>

            {/* profile panel -- basic info */}
            <TabPanel className="profile_panel">
              <ErrorBoundary>
                <Suspense fallback={<FallbackLazy />}>
                  <ProfileBasicInfo profileData={profileData} />
                </Suspense>
              </ErrorBoundary>
            </TabPanel>
            <TabPanel className="profile_panel">
              <ErrorBoundary>
                <Suspense fallback={<FallbackLazy />}>
                  <Preferences profileData={profileData} />
                </Suspense>
              </ErrorBoundary>
            </TabPanel>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default memo(Profile);
