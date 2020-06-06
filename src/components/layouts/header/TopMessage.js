import React from "react";
import "./TopMessage.css";

import { CrownOutlined, FireOutlined, BugOutlined } from "@ant-design/icons";

function TopMessage() {
  return (
    <div className="top_message_main_div">
      <div className="top_message_left">
        <FireOutlined />
        <span>
          <a href="/" style={{ marginLeft: "4px", color: "inherit" }}>
            Upcoming events
            <span style={{ marginLeft: "4px" }}></span>
          </a>
        </span>
      </div>
      <div className="top_message_center">
        <CrownOutlined />
        <span style={{ marginLeft: "4px" }}>
          <strong>Flat 40% off</strong> on subscribing Premium membership
        </span>
        <span style={{ marginLeft: "8px" }}>
          <a href="/" style={{ textDecoration: "underline", color: "inherit" }}>
            <strong>View benefits...</strong>
          </a>
        </span>
      </div>
      <div className="top_message_right">
        <BugOutlined />
        <span>
          <a href="/" style={{ color: "inherit", marginLeft: "4px" }}>
            Farmer's page
          </a>
        </span>
      </div>
    </div>
  );
}

export default TopMessage;
