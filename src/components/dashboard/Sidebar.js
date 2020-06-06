import React from "react";
import "./Sidebar.css";

import {
  PlusOutlined,
  HistoryOutlined,
  UserOutlined,
  ShoppingCartOutlined,
  BankOutlined,
  UserSwitchOutlined,
  PoweroffOutlined,
  PhoneFilled,
  CameraFilled,
} from "@ant-design/icons";

export const Sidebar = (props) => {
  // ------active option (css) state------
  const setBtnClass = (tab) => {
    if (tab === props.currentTabNo) {
      return "sidebar_menu_item--active";
    } else {
      return "sidebar_menu_item";
    }
  };

  const setIconClass = (tab) => {
    if (tab === props.currentTabNo) {
      return "sidebar_menu_item_icon--active";
    } else {
      return "sidebar_menu_item_icon";
    }
  };
  // -------------------------------------

  let { fullName, plan, mobileCode, mobileNumber } = props.profileData;
  if (!fullName) {
    fullName = "User";
  }

  return (
    <div className="sidebar" data-testid="sidebar">
      <div className="sidebar_profile_info" data-testid="sidebar_profile_info">
        <div className="sidebar_profile_image">
          <img src="" alt="" />
        </div>
        <button className="sidebar_profile_image_change_btn">
          <CameraFilled />
        </button>
        <div className="sidebar_username">Hello, {fullName}</div>
        <div className="sidebar_plan">
          <div className="sidebar_plan_text">Plan:</div>
          <div className="sidebar_plan_value">{plan}</div>
        </div>
        <div className="sidebar_contact">
          <PhoneFilled rotate={90} /> {mobileCode} {mobileNumber}
        </div>
      </div>
      <div
        className="sell_new_product_button_group"
        data-testid="sell_new_product_button_group"
      >
        <button className="sell_new_product_button">
          <span className="sell_new_product_text">Sell new product</span>
          <span style={{ marginLeft: "8px" }} className="sell_new_product_icon">
            <PlusOutlined />
          </span>
        </button>
      </div>
      <div className="menu_text_display">MENU</div>
      <div className="sidebar_menu" data-testid="sidebar_menu">
        <ul className="sidebar_menu_list">
          <li
            className={setBtnClass(1)}
            onClick={() => {
              props.setCurrentTabNo(1);
            }}
          >
            <span className={setIconClass(1)}>
              <UserOutlined />
            </span>
            <span className="sidebar_menu_profile">Profile</span>
          </li>
          <li
            className={setBtnClass(2)}
            onClick={() => {
              props.setCurrentTabNo(2);
            }}
          >
            <span className={setIconClass(2)}>
              <UserSwitchOutlined />
            </span>
            <span className="sidebar_menu_following">Following</span>
          </li>
          <li
            className={setBtnClass(3)}
            onClick={() => {
              props.setCurrentTabNo(3);
            }}
          >
            <span className={setIconClass(3)}>
              <ShoppingCartOutlined />
            </span>
            <span className="sidebar_menu_selling_now">Selling now</span>
          </li>
          <li
            className={setBtnClass(4)}
            onClick={() => {
              props.setCurrentTabNo(4);
            }}
          >
            <span className={setIconClass(4)}>
              <HistoryOutlined />
            </span>
            <span className="sidebar_menu_history">History</span>
          </li>
          <li
            className={setBtnClass(5)}
            onClick={() => {
              props.setCurrentTabNo(5);
            }}
          >
            <span className={setIconClass(5)}>
              <BankOutlined />
            </span>
            <span className="sidebar_menu_transactions">Transactions</span>
          </li>
        </ul>
      </div>
      <div className="sidebar_logout" data-testid="sidebar_logout">
        <span>
          <PoweroffOutlined />
        </span>
        <span style={{ marginLeft: "8px" }}>Logout</span>
      </div>
    </div>
  );
};
