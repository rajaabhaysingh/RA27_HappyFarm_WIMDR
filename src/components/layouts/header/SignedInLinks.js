import React, { useState } from "react";
import "./SignedInLinks.css";
import { NavLink } from "react-router-dom";
import {
  LogoutOutlined,
  UserOutlined,
  AreaChartOutlined,
  ShoppingCartOutlined,
  HeartOutlined,
  StarOutlined,
} from "@ant-design/icons";
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
            <NavLink className="signed_in_my_profile" to="/">
              <div className="signed_in_icon signed_in_my_profile_icon">
                <UserOutlined />
              </div>
              <div className="signed_in_text signed_in_my_profile_text">
                My Account
              </div>
            </NavLink>
          </li>
          <li className="signed_in_item" onClick={handleOptionClick}>
            <NavLink className="signed_in_orders" to="/">
              <div className="signed_in_icon signed_in_orders_icon">
                <ShoppingCartOutlined />
              </div>
              <div className="signed_in_text signed_in_orders_text">Orders</div>
            </NavLink>
          </li>
          <li className="signed_in_item" onClick={handleOptionClick}>
            <NavLink className="signed_in_dashboard" to="/dashboard">
              <div className="signed_in_icon signed_in_dashboard_icon">
                <AreaChartOutlined />
              </div>
              <div className="signed_in_text signed_in_dashboard_text">
                Dashboard
              </div>
            </NavLink>
          </li>
          <li className="signed_in_item" onClick={handleOptionClick}>
            <NavLink className="signed_in_favourites" to="/">
              <div className="signed_in_icon signed_in_favourites_icon">
                <HeartOutlined />
              </div>
              <div className="signed_in_text signed_in_favourites_text">
                Favourites
              </div>
            </NavLink>
          </li>
          <li className="signed_in_item" onClick={handleOptionClick}>
            <NavLink className="signed_in_rewards" to="/">
              <div className="signed_in_icon signed_in_rewards_icon">
                <StarOutlined />
              </div>
              <div className="signed_in_text signed_in_rewards_text">
                Rewards
              </div>
            </NavLink>
          </li>
          <li className="signed_in_item" onClick={handleOptionClick}>
            <NavLink className="signed_in_sign_out" to="/">
              <div className="signed_in_icon signed_in_sign_out_icon">
                <LogoutOutlined />
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

export default SignedInLinks;
