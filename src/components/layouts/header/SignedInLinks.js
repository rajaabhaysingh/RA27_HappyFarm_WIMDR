import React, { useState, memo } from "react";
import "./SignedInLinks.css";

import { NavLink } from "react-router-dom";

import UserPlaceholder from "../../../res/header/user_placeholder.svg";

function SignedInLinks() {
  // -------Toggle user btn click F(n)----------------
  let [isSignedLinkOpen, setIsSignedLinkOpen] = useState(false);

  let userBtnClickHandler = () => {
    if (!isSignedLinkOpen) {
      setIsSignedLinkOpen(true);
    }
  };

  let signedInListClass = "signed_in_list--hidden";

  if (isSignedLinkOpen) {
    signedInListClass = "signed_in_list--visible";
  }

  // close popup
  const renderCloseOnDocumentClick = () => {
    const signedInListDiv = document.getElementById("signed_in_main_div");

    if (signedInListDiv && isSignedLinkOpen) {
      window.addEventListener("click", function (e) {
        if (!signedInListDiv.contains(e.target)) {
          setIsSignedLinkOpen(false);
        }
      });
    }
    if (signedInListDiv && isSignedLinkOpen) {
      window.addEventListener("touchstart", function (e) {
        if (!signedInListDiv.contains(e.target)) {
          setIsSignedLinkOpen(false);
        }
      });
    }
  };

  // handle option click
  const handleOptionClick = () => {
    setIsSignedLinkOpen(false);
    // do something
    return;
  };

  // -----------------------------------------

  return (
    <div className="signed_in_main_div" id="signed_in_main_div">
      <div
        className="signed_in_profile_btn"
        onClick={userBtnClickHandler}
        onMouseOver={userBtnClickHandler}
      >
        <img
          className="signed_in_profile_image"
          src={UserPlaceholder}
          alt="user-profile"
        />
        <div className="signed_in_notification_badge"></div>
        {/* <div className="profile_dropdown_icon">
              <CaretDownFilled />
            </div> */}
      </div>

      <div
        className="signed_in_dropdown_component"
        // onMouseLeave={handleSignedInListClose}
      >
        <ul className={signedInListClass} id="signed_in_list--visible">
          <li className="signed_in_top_arrow_container">
            <div className="signed_in_top_arrow"></div>
          </li>
          <li className="signed_in_item" onClick={handleOptionClick}>
            <NavLink className="signed_in_my_profile" to="/dashboard/">
              <div className="signed_in_icon signed_in_my_profile_icon">
                <i className="fas fa-chart-area"></i>
              </div>
              <div className="signed_in_text signed_in_my_profile_text">
                Dashboard
              </div>
            </NavLink>
          </li>
          <li className="signed_in_item" onClick={handleOptionClick}>
            <NavLink className="signed_in_messages" to="/">
              <div className="signed_in_icon signed_in_message_icon">
                <i className="fas fa-envelope-open-text"></i>
              </div>
              <div className="signed_in_text signed_in_message_text">
                Messages
              </div>
            </NavLink>
          </li>
          <li className="signed_in_item" onClick={handleOptionClick}>
            <NavLink className="signed_in_favourites" to="/">
              <div className="signed_in_icon signed_in_favourites_icon">
                <i className="fas fa-heart"></i>
              </div>
              <div className="signed_in_text signed_in_favourites_text">
                Favourites
              </div>
            </NavLink>
          </li>
          <li className="signed_in_item" onClick={handleOptionClick}>
            <NavLink className="signed_in_rewards" to="/">
              <div className="signed_in_icon signed_in_rewards_icon">
                <i className="fas fa-star"></i>
              </div>
              <div className="signed_in_text signed_in_rewards_text">
                Rewards
              </div>
            </NavLink>
          </li>
          <li className="signed_in_item" onClick={handleOptionClick}>
            <NavLink className="signed_in_sign_out" to="/">
              <div className="signed_in_icon signed_in_sign_out_icon">
                <i className="fas fa-sign-out-alt"></i>
              </div>
              <div className="signed_in_text signed_in_sign_out_text">
                Sign-Out
              </div>
            </NavLink>
          </li>
        </ul>
        {renderCloseOnDocumentClick()}
      </div>
    </div>
  );
}

export default memo(SignedInLinks);
