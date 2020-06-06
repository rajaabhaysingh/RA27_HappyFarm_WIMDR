import React from "react";
import "./SideDrawerToggleButton.css";

function SideDrawerToggleButton(props) {
  return (
    <div className="toggle_button" onClick={props.click}>
      <div className="toggle_button_lines"></div>
      <div className="toggle_button_lines"></div>
      <div className="toggle_button_lines"></div>
    </div>
  );
}

export default SideDrawerToggleButton;
