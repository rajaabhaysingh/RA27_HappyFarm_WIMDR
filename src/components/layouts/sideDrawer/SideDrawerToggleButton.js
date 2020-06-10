import React, { memo } from "react";
import "./SideDrawerToggleButton.css";

function SideDrawerToggleButton({ click }) {
  return (
    <div className="toggle_button" onClick={click}>
      <div className="toggle_button_lines"></div>
      <div className="toggle_button_lines"></div>
      <div className="toggle_button_lines"></div>
    </div>
  );
}

export default memo(SideDrawerToggleButton);
