import React, { memo } from "react";
import "./Sidebar.css";

import { Translate } from "react-auto-translate";

import { useLocation, NavLink, useRouteMatch } from "react-router-dom";

function Sidebar({ profileData }) {
  // -----link nested routing of dashboard----

  // The `path` lets us build <Route> paths that are
  // relative to the parent route, while the `url` lets
  // us build relative links.
  let { url } = useRouteMatch();
  // -----------------------------------------

  // ------active option (css) state------
  let location = useLocation();

  const setIconClass = (tabName) => {
    if (location.pathname === tabName) {
      return "sidebar_menu_item_icon--active";
    } else {
      return "sidebar_menu_item_icon";
    }
  };
  // -------------------------------------

  let { fullName, plan, mobileCode, mobileNumber } = profileData;
  if (!fullName) {
    fullName = "User";
  }

  return (
    <div className="sidebar" data-testid="sidebar">
      <div className="sidebar_top_info_group">
        <div
          className="sidebar_profile_info"
          data-testid="sidebar_profile_info"
        >
          <div className="sidebar_image_container">
            <div className="sidebar_profile_image">
              <img src="" alt="" />
            </div>
            <button className="sidebar_profile_image_change_btn">
              <i className="fas fa-camera"></i>
            </button>
          </div>
          <div className="sidebar_user_details">
            <div className="sidebar_username">
              <Translate>Hello, {fullName}</Translate>
            </div>
            <div className="sidebar_plan">
              <div className="sidebar_plan_text">
                <Translate>Plan:</Translate>
              </div>
              <div className="sidebar_plan_value">
                <Translate>{plan}</Translate>
              </div>
            </div>
            <div className="sidebar_contact">
              <i className="fas fa-phone-alt"></i>{" "}
              <Translate>
                {mobileCode} {mobileNumber}
              </Translate>
            </div>
          </div>
        </div>
        <div className="sell_new_product_button_group">
          <button className="sell_new_product_button">
            <span className="sell_new_product_text">
              <Translate>Sell now</Translate>
            </span>
            <span
              style={{ marginLeft: "8px" }}
              className="sell_new_product_icon"
            >
              <i className="fas fa-store"></i>
            </span>
          </button>
          <button className="buy_new_product_button">
            <span className="sell_new_product_text">
              <Translate>Buy now</Translate>
            </span>
            <span
              style={{ marginLeft: "8px" }}
              className="sell_new_product_icon"
            >
              <i className="fas fa-shopping-cart"></i>
            </span>
          </button>
        </div>
      </div>
      <div className="menu_text_display">
        <Translate>MENU</Translate>
      </div>
      <div className="sidebar_menu" data-testid="sidebar_menu">
        <ul className="sidebar_menu_list">
          <li>
            <NavLink
              to={`${url}`}
              strict
              exact
              className="sidebar_menu_item"
              activeClassName="sidebar_menu_item--active"
            >
              <span className={setIconClass("/dashboard")}>
                <i className="fas fa-chart-area"></i>
              </span>
              <span className="sidebar_menu_overview">
                <Translate>Overview</Translate>
              </span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`${url}/profile`}
              className="sidebar_menu_item"
              activeClassName="sidebar_menu_item--active"
            >
              <span className={setIconClass("/dashboard/profile")}>
                <i className="fas fa-user"></i>
              </span>
              <span className="sidebar_menu_profile">
                <Translate>Profile {"&"} Info</Translate>
              </span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`${url}/following`}
              className="sidebar_menu_item"
              activeClassName="sidebar_menu_item--active"
            >
              <span className={setIconClass("/dashboard/following")}>
                <i className="fas fa-users"></i>
              </span>
              <span className="sidebar_menu_following">
                <Translate>Following</Translate>
              </span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`${url}/my-orders`}
              className="sidebar_menu_item"
              activeClassName="sidebar_menu_item--active"
            >
              <span className={setIconClass("/dashboard/my-orders")}>
                <i className="fas fa-shopping-basket"></i>
              </span>
              <span className="sidebar_menu_selling_now">
                <Translate>My orders</Translate>
              </span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`${url}/sales`}
              className="sidebar_menu_item"
              activeClassName="sidebar_menu_item--active"
            >
              <span className={setIconClass("/dashboard/sales")}>
                <i className="fas fa-history"></i>
              </span>
              <span className="sidebar_menu_history">
                <Translate>Sales {"&"} History</Translate>
              </span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`${url}/transactions`}
              className="sidebar_menu_item"
              activeClassName="sidebar_menu_item--active"
            >
              <span className={setIconClass("/dashboard/transactions")}>
                <i className="fas fa-rupee-sign"></i>
              </span>
              <span className="sidebar_menu_transactions">
                <Translate>Transactions</Translate>
              </span>
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="sidebar_logout" data-testid="sidebar_logout">
        <span>
          <i className="fas fa-power-off"></i>
        </span>
        <span style={{ marginLeft: "8px" }}>
          <Translate>Logout</Translate>
        </span>
      </div>
    </div>
  );
}

export default memo(Sidebar);
