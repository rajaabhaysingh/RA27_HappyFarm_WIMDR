import React, { useState } from "react";
import "./SideDrawer.css";
import {
  ArrowLeftOutlined,
  GlobalOutlined,
  PlusOutlined,
  HomeOutlined,
  AuditOutlined,
  BellOutlined,
  InfoCircleOutlined,
  PhoneOutlined,
  QuestionCircleOutlined,
  StarOutlined,
  PercentageOutlined,
  UserOutlined,
  MessageOutlined,
  AppstoreOutlined,
  AndroidFilled,
  AppleFilled,
  AreaChartOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";

import { NavLink } from "react-router-dom";

const SideDrawer = (props) => {
  let drawerClasses = ["side_drawer"];

  if (props.showDrawer) {
    drawerClasses = ["side_drawer", "drawer_open"];
  }

  const handleOnClick = () => {
    props.setIsDrawerOpen(false);
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
            <ArrowLeftOutlined />
          </div>
          <div className="side_drawer_back_text">Logo here</div>
        </div>
        <div className="side_drawer_header_spacer"></div>
        <div className="side_drawer_change_language">
          <div className="side_drawer_change_language_icon">
            <GlobalOutlined />
          </div>
          <div className="side_drawer_change_language_text">English</div>
        </div>
      </div>
      {/* sidebar sell with us button */}
      <div className="side_drawer_sell_with_us_btn_container">
        <button className="side_drawer_sell_with_us_btn">
          Sell with us <PlusOutlined />
        </button>
      </div>
      {/* divider div */}
      {/* <div className="side_drawer_divider"></div> */}
      {/* sidebar menu list 1*/}
      <div className="side_drawer_menu_list">
        <ul>
          <li className="side_drawer_menu_item" onClick={handleOnClick}>
            <NavLink className="side_drawer_item_link" to="/">
              <div className="side_drawer_menu_items_logo">
                <HomeOutlined />
              </div>
              Home
            </NavLink>
          </li>
          <li onClick={handleOnClick}>
            <NavLink className="side_drawer_item_link" to="/">
              <div className="side_drawer_menu_items_logo">
                <AppstoreOutlined />
              </div>
              Products
            </NavLink>
          </li>
          <li onClick={handleOnClick}>
            <NavLink className="side_drawer_item_link" to="/dashboard/">
              <div className="side_drawer_menu_items_logo">
                <AreaChartOutlined />
              </div>
              Dashboard
            </NavLink>
          </li>
          <li onClick={handleOnClick}>
            <NavLink className="side_drawer_item_link" to="/">
              <div className="side_drawer_menu_items_logo">
                <MessageOutlined />
              </div>
              Messages
            </NavLink>
          </li>
          <li onClick={handleOnClick}>
            <NavLink className="side_drawer_item_link" to="/">
              <div className="side_drawer_menu_items_logo">
                <UsergroupAddOutlined />
              </div>
              Farmers
            </NavLink>
          </li>
          <li onClick={handleOnClick}>
            <NavLink className="side_drawer_item_link" to="/">
              <div className="side_drawer_menu_items_logo">
                <UserOutlined />
              </div>
              Agro Solution
            </NavLink>
          </li>
          <li onClick={handleOnClick}>
            <NavLink className="side_drawer_item_link" to="/">
              <div className="side_drawer_menu_items_logo">
                <PercentageOutlined />
              </div>
              Offers
            </NavLink>
          </li>
          <li onClick={handleOnClick}>
            <NavLink className="side_drawer_item_link" to="/">
              <div className="side_drawer_menu_items_logo">
                <StarOutlined />
              </div>
              Premium
            </NavLink>
          </li>
          <li onClick={handleOnClick}>
            <NavLink className="side_drawer_item_link" to="/">
              <div className="side_drawer_menu_items_logo">
                <QuestionCircleOutlined />
              </div>
              FAQs {"&"} Help
            </NavLink>
          </li>
        </ul>
      </div>
      {/* divider div */}
      {/* <div className="side_drawer_divider"></div> */}
      {/* sidebar menu list 2 */}
      <div className="side_drawer_menu_list">
        <ul>
          <li onClick={handleOnClick}>
            <NavLink className="side_drawer_item_link" to="/">
              <div className="side_drawer_menu_items_logo">
                <PhoneOutlined rotate={90} />
              </div>
              Contact
            </NavLink>
          </li>
          <li onClick={handleOnClick}>
            <NavLink className="side_drawer_item_link" to="/">
              <div className="side_drawer_menu_items_logo">
                <InfoCircleOutlined />
              </div>
              About Us
            </NavLink>
          </li>
          <li onClick={handleOnClick}>
            <NavLink className="side_drawer_item_link" to="/">
              <div className="side_drawer_menu_items_logo">
                <BellOutlined />
              </div>
              Notification
            </NavLink>
          </li>
          <li onClick={handleOnClick}>
            <NavLink className="side_drawer_item_link" to="/">
              <div className="side_drawer_menu_items_logo">
                <AuditOutlined />
              </div>
              Legal
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
            <AndroidFilled />
          </div>
          <div className="footer_text">Download App</div>
          <div className="side_drawer_footer_icon_ios">
            <AppleFilled />
          </div>
        </button>
      </div>
    </nav>
  );
};

export default SideDrawer;
