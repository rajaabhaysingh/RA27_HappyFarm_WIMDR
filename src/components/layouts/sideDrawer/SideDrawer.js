import React, { memo } from "react";
import "./SideDrawer.css";

import { Translate } from "react-auto-translate";

import { NavLink } from "react-router-dom";

const SideDrawer = ({ showDrawer, setIsDrawerOpen }) => {
  let drawerClasses = ["side_drawer"];

  if (showDrawer) {
    drawerClasses = ["side_drawer", "drawer_open"];
  }

  const handleOnClick = () => {
    setIsDrawerOpen(false);
  };

  return (
    <nav
      // style={sideDrawerStyle}
      className={drawerClasses.join(" ")}
      id="side_drawer"
    >
      {/* sidebar header div */}
      <div className="side_drawer_header">
        <div className="side_drawer_back_button">
          <div className="side_drawer_back_icon">
            <i className="fas fa-seedling"></i>
          </div>
          <div className="side_drawer_back_text"></div>
        </div>
        <div className="side_drawer_header_spacer"></div>
        <div className="side_drawer_change_language">
          <div className="side_drawer_change_language_icon">
            <i className="fas fa-cog"></i>
          </div>
          <div className="side_drawer_change_language_text">
            <Translate>Settings</Translate>
          </div>
        </div>
      </div>
      {/* sidebar sell with us button */}
      <div className="side_drawer_sell_with_us_btn_container">
        <button className="side_drawer_sell_with_us_btn">
          <Translate>Sell with us</Translate> <i className="fas fa-plus"></i>
        </button>
      </div>
      <div className="side_drawer_menu_list">
        <ul onClick={handleOnClick}>
          <li className="side_drawer_menu_item">
            <NavLink
              className="side_drawer_item_link"
              to="/"
              activeClassName="side_drawer_link_active"
              exact
            >
              <div className="side_drawer_menu_items_logo">
                <i className="fas fa-home"></i>
              </div>
              <Translate>Home</Translate>
            </NavLink>
          </li>
          <li>
            <NavLink
              className="side_drawer_item_link"
              to="/products"
              activeClassName="side_drawer_link_active"
              exact
            >
              <div className="side_drawer_menu_items_logo">
                <i className="fas fa-th"></i>
              </div>
              <Translate>Products</Translate>
            </NavLink>
          </li>
          <li>
            <NavLink
              className="side_drawer_item_link"
              to="/dashboard"
              activeClassName="side_drawer_link_active"
              exact
            >
              <div className="side_drawer_menu_items_logo">
                <i className="fas fa-chart-area"></i>
              </div>
              <Translate>Dashboard</Translate>
            </NavLink>
          </li>
          <li>
            <NavLink
              className="side_drawer_item_link"
              to="/messages"
              activeClassName="side_drawer_link_active"
              exact
            >
              <div className="side_drawer_menu_items_logo">
                <i className="fas fa-envelope-open-text"></i>
              </div>
              <Translate>Messages</Translate>
            </NavLink>
          </li>
          <li>
            <NavLink
              className="side_drawer_item_link"
              to="/farmers"
              activeClassName="side_drawer_link_active"
              exact
            >
              <div className="side_drawer_menu_items_logo">
                <i className="fas fa-users"></i>
              </div>
              <Translate>Farmers</Translate>
            </NavLink>
          </li>
          <li>
            <NavLink
              className="side_drawer_item_link"
              to="/solutions"
              activeClassName="side_drawer_link_active"
              exact
            >
              <div className="side_drawer_menu_items_logo">
                <i className="fas fa-tractor"></i>
              </div>
              <Translate>Agro Solution</Translate>
            </NavLink>
          </li>
          <li>
            <NavLink
              className="side_drawer_item_link"
              to="/offers"
              activeClassName="side_drawer_link_active"
              exact
            >
              <div className="side_drawer_menu_items_logo">
                <i className="fas fa-tags"></i>
              </div>
              <Translate>Offers</Translate>
            </NavLink>
          </li>
          <li>
            <NavLink
              className="side_drawer_item_link"
              to="/premium"
              activeClassName="side_drawer_link_active"
              exact
            >
              <div className="side_drawer_menu_items_logo">
                <i className="fas fa-award"></i>
              </div>
              <Translate>Premium</Translate>
            </NavLink>
          </li>
          <li>
            <NavLink
              className="side_drawer_item_link"
              to="/faqs_help"
              activeClassName="side_drawer_link_active"
              exact
            >
              <div className="side_drawer_menu_items_logo">
                <i className="fas fa-question-circle"></i>
              </div>
              <Translate>FAQs {"&"} Help</Translate>
            </NavLink>
          </li>
        </ul>
      </div>
      {/* sidebar menu list 2 */}
      <div className="side_drawer_menu_list">
        <ul onClick={handleOnClick}>
          <li>
            <NavLink
              className="side_drawer_item_link"
              to="/contact"
              activeClassName="side_drawer_link_active"
              exact
            >
              <div className="side_drawer_menu_items_logo">
                <i className="fas fa-headset"></i>
              </div>
              <Translate>Contact</Translate>
            </NavLink>
          </li>
          <li>
            <NavLink
              className="side_drawer_item_link"
              to="/about_us"
              activeClassName="side_drawer_link_active"
              exact
            >
              <div className="side_drawer_menu_items_logo">
                <i className="fas fa-info-circle"></i>
              </div>
              <Translate>About Us</Translate>
            </NavLink>
          </li>
          <li>
            <NavLink
              className="side_drawer_item_link"
              to="/notifications"
              activeClassName="side_drawer_link_active"
              exact
            >
              <div className="side_drawer_menu_items_logo">
                <i className="fas fa-bell"></i>
              </div>
              <Translate>Notification</Translate>
            </NavLink>
          </li>
          <li>
            <NavLink
              className="side_drawer_item_link"
              to="/legal"
              activeClassName="side_drawer_link_active"
              exact
            >
              <div className="side_drawer_menu_items_logo">
                <i className="fas fa-stamp"></i>
              </div>
              <Translate>Legal</Translate>
            </NavLink>
          </li>
        </ul>
      </div>
      {/* sidebar body spacer */}
      <div className="side_drawer_body_spacer"></div>
      {/* footer div */}
      <div className="footer">
        <button>
          <div className="side_drawer_footer_icon_android">
            <i className="fab fa-google-play"></i>
          </div>
          <div className="footer_text">
            <Translate>Download App</Translate>
          </div>
          <div className="side_drawer_footer_icon_ios">
            <i className="fab fa-app-store"></i>
          </div>
        </button>
      </div>
    </nav>
  );
};

export default memo(SideDrawer);
