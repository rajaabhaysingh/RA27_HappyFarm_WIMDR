import React, { useState } from "react";
import DrawerToggleButton from "../sideDrawer/SideDrawerToggleButton";
import ChangeLangBtn from "../../../res/header/language_icon.svg";
import "./Header.css";
import {
  CaretDownFilled,
  PlusOutlined,
  ShoppingFilled,
  SearchOutlined,
  MinusOutlined,
} from "@ant-design/icons";
import Logo from "../../../res/header/logo.png";
import ProductOptions from "../ProductOptions";
import SearchBarPc from "../searchBarPC/SearchBarPc";
import CatMenuData from "../menuTab/CatMenuData";
import MenuTab from "../menuTab/MenuTab";

import { NavLink } from "react-router-dom";
import SignedInLinks from "./SignedInLinks";
import SignedOutLinks from "./SignedOutLinks";

import Popup from "reactjs-popup";

export const Header = (props) => {
  // -------CATEGORY LIST F(n)----------------
  let [isCatListOpen, setIsCatListOpen] = useState(false);

  let catListClickHandler = () => {
    setIsCatListOpen(true);
  };

  let catListClass = "cat_menu_container--hidden";

  if (isCatListOpen) {
    catListClass = "cat_menu_container--visible";
  }

  const handleCatListClose = () => {
    setIsCatListOpen(false);
  };

  // used (!isCatListOpen) as hack because correct state isn't updated
  // in runtime of following code
  if (!isCatListOpen) {
    const catListDiv = document.getElementById("cat_menu_container--visible");

    if (catListDiv) {
      window.addEventListener("click", function (e) {
        if (!catListDiv.contains(e.target)) {
          setIsCatListOpen(false);
        }
      });
    }
  }
  // -----------------------------------------

  // ------HEADER SEARCH BTN FUNCTIONS--------
  const scrollToSearchBar = () => {
    if (
      document.body.scrollTop !== 0 ||
      document.documentElement.scrollTop !== 0
    ) {
      window.scrollBy(0, -250);
      requestAnimationFrame(scrollToSearchBar);
    }
  };

  const handleSearchBtnClick = () => {
    if (window.innerWidth >= 1024) {
      scrollToSearchBar();
    }
  };
  // focus searchbar fun
  // -----------------------------------------

  // ------conditionally render mobile search bar------
  // const renderMobileSearchBar = () => {
  //   if (window.innerWidth < 1024) {
  //     return <SearchBarPc productItems={ProductOptions} />;
  //   } else {
  //     return <div>Please reload the page...</div>;
  //   }
  // };
  // --------------------------------------------------

  return (
    <header className="header" data-testid="header">
      <nav className="container">
        {/* Initial spacer div */}
        <div className="spacer_start"></div>
        {/* Hamburger icon */}
        <button className="hamburger_icon" onClick={props.drawerClickHandler}>
          {/* passing the drawerClickHandler received in props to DrawerToggleButton */}
          <DrawerToggleButton />
        </button>
        {/* Homepage icon */}
        <div className="website_icon_container">
          <NavLink to="/" className="website_icon_link">
            <img src={Logo} alt="website-icon" className="website_icon" />
          </NavLink>
        </div>
        {/* Navbar menu options */}
        <div className="navbar_menu">
          <ul className="navbar_menu_list">
            <li className="navbar_menu_item">
              <div
                className="navbar_categories"
                onMouseEnter={catListClickHandler}
                onClick={catListClickHandler}
              >
                <span>Categories</span>
                <span className="navbar_categories_down_icon">
                  <CaretDownFilled />
                </span>
              </div>
            </li>
            <li className="navbar_menu_items_separator">
              <MinusOutlined rotate="90" />
            </li>
            <li className="navbar_menu_item">
              <span className="navbar_offers">Offers</span>
            </li>
            <li className="navbar_menu_items_separator">
              <MinusOutlined rotate="90" />
            </li>
            <li className="navbar_menu_item">
              <span className="navbar_premium">Premium</span>
            </li>
            <li className="navbar_menu_items_separator">
              <MinusOutlined rotate="90" />
            </li>
            <li className="navbar_menu_item">
              <span className="navbar_farmers_solution">Farmer's Solution</span>
            </li>
            <li className="navbar_menu_items_separator">
              <MinusOutlined rotate="90" />
            </li>
            <li className="navbar_menu_item">
              <span className="navbar_contact_help">Contact</span>
            </li>
          </ul>
        </div>
        {/* Spacer mid */}
        <div className="spacer_mid"></div>
        {/* Sell with us button */}
        <div className="sell_with_us_button_group">
          <button className="sell_with_us_button">
            <div className="sell_with_us_text">Sell with us</div>
            <div className="sell_with_us_plus">
              <PlusOutlined />
            </div>
          </button>
        </div>
        {/* Profile dropdown div */}
        <div className="signed_in_component">
          <SignedInLinks />
        </div>
        {/* Profile dropdown div */}
        <div className="signed_out_component">
          <SignedOutLinks />
        </div>
        {/* Navbar end utilities (cart and notification icons) */}
        <div className="navbar_utilities">
          <ul className="navbar_utilities_list">
            <li className="navbar_utilities_item">
              <div className="navbar_cart_icon">
                <ShoppingFilled />
                <div className="navbar_notification_badge"></div>
              </div>
            </li>
            <li className="navbar_utilities_item">
              <div className="navbar_lang_icon">
                <img src={ChangeLangBtn} alt="change_language" />
              </div>
            </li>
          </ul>
        </div>
        {/* Navbar  search button */}
        <div
          id="navbar_search_btn_container"
          className="navbar_search_btn_container"
        >
          <Popup
            trigger={
              <button
                onClick={handleSearchBtnClick}
                className="navbar_search_btn"
              >
                <SearchOutlined />
              </button>
            }
            modal
            closeOnDocumentClick
            lockScroll={true}
            contentStyle={{
              borderRadius: "12px",
            }}
          >
            <div className="search_bar_pc">
              <SearchBarPc productItems={ProductOptions} />
            </div>
          </Popup>
        </div>
        {/* End spacer div */}
        <div className="spacer_end"></div>
      </nav>

      {/* ---cat menu--- */}
      {/* providing id as cat_menu_container--visible because of closeCatList */}
      <div
        id="cat_menu_container--visible"
        className={catListClass}
        onMouseLeave={handleCatListClose}
      >
        <MenuTab catList={CatMenuData} />
      </div>
      {/* ------------ */}

      {/* ---Searcbar div for mobile device--- */}
      <div className="search_bar_container">
        <div className="search_bar">
          {/* <SearchBarAutoComplete */}
          <SearchBarPc productItems={ProductOptions} />
        </div>
      </div>

      {/* ------------------------------ */}
    </header>
  );
};
