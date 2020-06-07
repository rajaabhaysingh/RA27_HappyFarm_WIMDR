import React from "react";
import "./Profile.css";

import { InfoCircleFilled } from "@ant-design/icons";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import ProfileBasicInfo from "./ProfileBasicInfo";

function Profile(props) {
  return (
    <div className="profile_main_div">
      <div className="profile_inner_div">
        <div className="profile_heading">Profile and Info</div>
        <div className="profile_description">
          <div className="profile_description_text">
            Edit/update your personal information and preferences here.
          </div>
          <div className="profile_description_info_icon">
            <InfoCircleFilled />
          </div>
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
              <Tab className="profile_tab">Preferences</Tab>
              <Tab className="profile_tab">Payments</Tab>
            </TabList>

            {/* profile panel -- basic info */}
            <TabPanel className="profile_panel">
              <ProfileBasicInfo profileData={props.profileData} />
            </TabPanel>
            <TabPanel className="profile_panel">Preferences</TabPanel>
            <TabPanel className="profile_panel">Payments</TabPanel>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default Profile;
