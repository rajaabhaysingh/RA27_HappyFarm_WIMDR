import React from "react";
import "./CentralContent.css";

import Profile from "./profile/Profile";
import SellHistory from "./sellHistory/SellHistory";

function CentralContent(props) {
  // -----central part rendering logic-----
  const renderTab = (tab_no) => {
    switch (tab_no) {
      case 1:
        return <Profile profileData={props.profileData} />;

      case 2:
        return <SellHistory />;

      case 3:
        return <SellHistory />;

      case 4:
        return <SellHistory />;

      case 5:
        return <SellHistory />;

      default:
        return <div style={{ color: "#990000" }}>Unexpected error...</div>;
    }
  };
  // --------------------------------------

  return (
    <div className="central_content_main_div">
      {renderTab(props.currentTabNo)}
    </div>
  );
}

export default CentralContent;
