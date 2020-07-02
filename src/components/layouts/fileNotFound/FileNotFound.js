import React from "react";
import "./FileNotFound.css";

import { useLocation } from "react-router-dom";

import ErrorImage from "../../../res/error/error_404.svg";

function FileNotFound() {
  let location = useLocation();

  return (
    <div className="file_not_found_main_div">
      <img src={ErrorImage} alt="" />
      <div className="file_not_found_info">
        <div className="file_not_found_info_text file_not_found_header">
          The page you're looking for couldn't be found.
        </div>
        <div className="file_not_found_info_text file_not_found_path">
          <code>
            <strong>({location.pathname})</strong>
          </code>{" "}
          was not found on our server.
        </div>
        <div className="file_not_found_info_text file_not_found_desc">
          Please check the URL and try again. This is all we know.
        </div>
      </div>
    </div>
  );
}

export default FileNotFound;
