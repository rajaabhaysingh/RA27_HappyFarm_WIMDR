import React from "react";
import "./HaltScreen.css";

import { useLocation } from "react-router-dom";

import Logo from "../../res/header/logo_light_bg.png";

function HaltScreen() {
  let location = useLocation();

  return (
    <div className="halt_main_div">
      <img src={Logo} alt="" />
      <div className="halt_info">
        <div className="halt_info_text halt_header">
          We do not support this feature in current development mode.
        </div>
        <div className="halt_info_text halt_path">
          <code>
            <strong>({location.pathname})</strong>
          </code>{" "}
          will be available in working - build.
        </div>
        <div className="halt_info_text halt_desc">
          Please wait for stable release to enjoy this feature.
        </div>
      </div>
    </div>
  );
}

export default HaltScreen;
