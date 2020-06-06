import React, { useState } from "react";
import "./SignedOutLinks.css";

import { LoginOutlined } from "@ant-design/icons";
import UserPlaceholder from "../../../res/header/user_placeholder.svg";

import Popup from "reactjs-popup";
import SignInUpReset from "../../auth/SignInUpReset";

function SignedOutLinks() {
  // -------Toggle user btn click F(n)----------------
  let [isSignedOutLinkOpen, setIsSignedOutLinkOpen] = useState(false);

  let userBtnClickHandler = () => {
    if (!isSignedOutLinkOpen) {
      setIsSignedOutLinkOpen(true);
    }
  };

  let signedOutListClass = "signed_out_list--hidden";

  if (isSignedOutLinkOpen) {
    signedOutListClass = "signed_out_list--visible";
  }

  // close popup

  const renderCloseOnDocumentClick = () => {
    const signedOutListDiv = document.getElementById("signed_out_main_div");

    if (signedOutListDiv && isSignedOutLinkOpen) {
      window.addEventListener("click", function (e) {
        if (!signedOutListDiv.contains(e.target)) {
          setIsSignedOutLinkOpen(false);
        }
      });
      window.addEventListener("touchstart", function (e) {
        if (!signedOutListDiv.contains(e.target)) {
          setIsSignedOutLinkOpen(false);
        }
      });
    }
  };
  // -----------------------------------------

  // ------handling form open/close----------
  const [isFormOpen, setIsFormOpen] = useState(false);

  const openForm = () => {
    setIsFormOpen(true);
    setIsSignedOutLinkOpen(false);
  };

  const closeForm = () => {
    setIsFormOpen(false);
  };
  // ----------------------------------------

  return (
    <div className="signed_out_main_div" id="signed_out_main_div">
      <div
        className="signed_out_profile_btn"
        onClick={userBtnClickHandler}
        onMouseOver={userBtnClickHandler}
      >
        <img
          className="signed_out_profile_image"
          src={UserPlaceholder}
          alt="user-profile"
        />
      </div>
      <div
        className="signed_out_dropdown_component"
        // onMouseLeave={handleSignedOutListClose}
      >
        <ul className={signedOutListClass}>
          <li className="signed_out_top_arrow_container">
            <div className="signed_out_top_arrow"></div>
          </li>

          <li className="signed_out_item" onClick={openForm}>
            <div className="signed_out_sign_in">
              <div className="signed_out_icon signed_out_sign_in_icon">
                <LoginOutlined />
              </div>
              <div className="signed_out_text signed_out_sign_in_text">
                Login / Sign-up
              </div>
            </div>
          </li>
        </ul>
        <Popup
          open={isFormOpen}
          modal
          closeOnDocumentClick
          lockScroll
          onClose={closeForm}
          contentStyle={{
            borderRadius: "8px",
          }}
        >
          <SignInUpReset onClose={closeForm} />
          {renderCloseOnDocumentClick()}
        </Popup>
      </div>
    </div>
  );
}

export default SignedOutLinks;
