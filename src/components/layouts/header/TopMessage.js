import React, { memo } from "react";
import "./TopMessage.css";

import { Translate } from "react-auto-translate";

function TopMessage() {
  return (
    <div className="top_message_main_div">
      <div className="top_message_left">
        <i className="fas fa-fire-alt"></i>
        <span>
          <a href="/" style={{ marginLeft: "4px", color: "inherit" }}>
            <Translate>Upcoming events</Translate>
            <span style={{ marginLeft: "4px" }}></span>
          </a>
        </span>
      </div>
      <div className="top_message_center">
        <i className="fas fa-crown"></i>
        <span style={{ marginLeft: "4px" }}>
          <strong>
            <Translate>Flat 40% off</Translate>
          </strong>{" "}
          <Translate>on subscribing Premium membership</Translate>
        </span>
        <span style={{ marginLeft: "8px" }}>
          <a href="/" style={{ textDecoration: "underline", color: "inherit" }}>
            <strong>
              <Translate>View benefits...</Translate>
            </strong>
          </a>
        </span>
      </div>
      <div className="top_message_right">
        <i className="fas fa-tractor"></i>
        <span>
          <a href="/" style={{ color: "inherit", marginLeft: "4px" }}>
            <Translate>Farmer's page</Translate>
          </a>
        </span>
      </div>
    </div>
  );
}

export default memo(TopMessage);
