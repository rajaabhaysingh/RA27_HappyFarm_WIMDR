import React, {
  useCallback,
  useState,
  memo,
  lazy,
  Suspense,
  useEffect,
} from "react";
import "./Header.css";

import { Translate } from "react-auto-translate";

import { NavLink, Link } from "react-router-dom";

import LogoLightBg from "../../../res/header/logo_light_bg.png";
import LogoDarkBg from "../../../res/header/logo_dark_bg.png";

import ErrorBoundary from "../../errorBoundary/ErrorBoundary";

import CatMenuData from "../menuTab/CatMenuData";
import ProductOptions from "../ProductOptions";

import SignedInLinks from "./SignedInLinks";
import SignedOutLinks from "./SignedOutLinks";

import DrawerToggleButton from "../sideDrawer/SideDrawerToggleButton";
import BackdropDark from "../../backdrop/BackdropDark";

const SearchBarPc = lazy(() => import("../searchBarPC/SearchBarPc"));
const MenuTab = lazy(() => import("../menuTab/MenuTab"));

const Header = ({
  lang,
  setLang,
  user,
  setUser,
  isSearchBarOpen,
  setIsSearchBarOpen,
  setMarginTop,
  drawerClickHandler,
  isSignedOutLinkOpen,
  setIsSignedOutLinkOpen,
}) => {
  // handleLanguageChange
  const handleLanguageChange = (e) => {
    setLang({
      defLang: lang.prefLang,
      prefLang: e.target.value,
    });
  };

  // -------CATEGORY LIST F(n)----------------
  let [isCatListOpen, setIsCatListOpen] = useState(false);

  let catListClickHandler = () => {
    setIsCatListOpen(true);
  };

  let catListClass = "cat_menu_container--hidden";

  if (isCatListOpen) {
    catListClass = "cat_menu_container--visible";
  }

  const handleCatListClose = useCallback(() => {
    setIsCatListOpen(false);
  }, []);

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

  //backdrop click handler
  const backdropClickHandler = () => {
    setIsSearchBarOpen(false);
  };

  // todo
  // ---handle header visiblity problem on screen resize---
  useEffect(() => {
    const windowSize = window.addEventListener("resize", () => {
      if (isCatListOpen) {
        setIsCatListOpen(false);
      }
    });
    return () => {
      window.removeEventListener("resize", windowSize);
    };
  }, [isCatListOpen]);
  // ------------------------------------------------------

  // ------HEADER SEARCH BTN FUNCTIONS--------
  let searchBarClass = "search_bar_container_mobile--visible";

  if (!isSearchBarOpen) {
    searchBarClass = "search_bar_container_mobile--hidden";
  }

  // detect click outside for searchBar PC-mode
  const renderCloseOnDocumentClick = useCallback(() => {
    const catList = document.getElementById("cat_menu_container--visible");

    if (catList && isCatListOpen) {
      window.addEventListener("click", function (e) {
        if (!catList.contains(e.target)) {
          setIsCatListOpen(false);
          console.log("closed");
        }
      });
    }
    if (catList && isCatListOpen) {
      window.addEventListener("touchstart", function (e) {
        if (!catList.contains(e.target)) {
          setIsCatListOpen(false);
        }
      });
    }
  }, [isCatListOpen]);

  // handle toggle search bar condition
  const handleSearchBtnClick = useCallback(() => {
    setIsSearchBarOpen(!isSearchBarOpen);
    if (window.innerWidth < 1024) {
      if (!isSearchBarOpen) {
        setMarginTop("91px");
      } else {
        setMarginTop("45px");
      }
    }
  }, [isSearchBarOpen, setMarginTop, setIsSearchBarOpen]);

  // --------------------------------------------------

  // renderSignedInOutLinks
  const renderSignedInOutLinks = () => {
    if (user.token) {
      return (
        <div id="signed_in_component" className="signed_in_component">
          <SignedInLinks user={user} setUser={setUser} />
        </div>
      );
    } else {
      return (
        <div id="signed_out_component" className="signed_out_component">
          <SignedOutLinks
            user={user}
            setUser={setUser}
            isSignedOutLinkOpen={isSignedOutLinkOpen}
            setIsSignedOutLinkOpen={setIsSignedOutLinkOpen}
          />
        </div>
      );
    }
  };

  return (
    <header className="header" data-testid="header">
      <nav className="container">
        {/* Initial spacer div */}
        <div className="spacer_start"></div>
        {/* Hamburger icon */}
        <button className="hamburger_icon" onClick={drawerClickHandler}>
          {/* passing the drawerClickHandler received in props to DrawerToggleButton */}
          <DrawerToggleButton />
        </button>
        {/* Homepage icon */}
        <div className="website_icon_container">
          <Link to="/" className="website_icon_link">
            <img
              src={window.innerWidth >= 1024 ? LogoLightBg : LogoDarkBg}
              alt="website-icon"
              className="website_icon"
            />
          </Link>
        </div>
        {/* Navbar menu options */}
        <div className="navbar_menu">
          <ul className="navbar_menu_list">
            <li className="navbar_menu_item">
              <NavLink
                to="/products"
                activeClassName="navbar_menu_item--active"
              >
                <div
                  className="navbar_categories"
                  onMouseEnter={catListClickHandler}
                  onClick={catListClickHandler}
                >
                  <span>
                    <Translate>Products</Translate>
                  </span>
                  <span className="navbar_categories_down_icon">
                    <i className="fas fa-caret-down"></i>
                  </span>
                </div>
              </NavLink>
            </li>
            <li className="navbar_menu_items_separator">
              <i className="fas fa-grip-lines-vertical"></i>
            </li>
            <li className="navbar_menu_item">
              <NavLink to="/farmers" activeClassName="navbar_menu_item--active">
                <span className="navbar_offers">
                  <Translate>Farmers</Translate>
                </span>
              </NavLink>
            </li>
            <li className="navbar_menu_items_separator">
              <i className="fas fa-grip-lines-vertical"></i>
            </li>
            <li className="navbar_menu_item">
              <NavLink
                to="/solutions"
                activeClassName="navbar_menu_item--active"
              >
                <span className="navbar_premium">
                  <Translate>Solution</Translate>
                </span>
              </NavLink>
            </li>
            <li className="navbar_menu_items_separator">
              <i className="fas fa-grip-lines-vertical"></i>
            </li>
            <li className="navbar_menu_item">
              <NavLink to="/offers" activeClassName="navbar_menu_item--active">
                <span className="navbar_farmers_solution">
                  <Translate>Offers</Translate>
                </span>
              </NavLink>
            </li>
            <li className="navbar_menu_items_separator">
              <i className="fas fa-grip-lines-vertical"></i>
            </li>
            <li className="navbar_menu_item">
              <NavLink to="/contact" activeClassName="navbar_menu_item--active">
                <span className="navbar_contact_help">
                  <Translate>Contact</Translate>
                </span>
              </NavLink>
            </li>
          </ul>
        </div>
        {/* Spacer mid */}
        <div className="spacer_mid"></div>
        {/* Sell with us button */}
        <div className="sell_with_us_button_group">
          <button className="sell_with_us_button">
            <Translate>Sell with us</Translate>
            <i className="fas fa-plus"></i>
          </button>
        </div>
        <select
          className="navbar_language_selector"
          value={lang.defLang}
          onChange={handleLanguageChange}
        >
          <option value="en">English</option>
          <option value="hi">हिन्दी</option>
          <option value="bn">বাংলা</option>
          <option value="ar">عربى</option>
          <option value="gu">ગુજરાતી</option>
          <option value="kn">ಕನ್ನಡ</option>
          <option value="ml">മലയാളം</option>
          <option value="mr">मराठी</option>
          <option value="pa">ਪੰਜਾਬੀ</option>
          <option value="sd">سنڌي</option>
          <option value="te">తెలుగు</option>
          <option value="ta">தமிழ்</option>
          <option value="ur">اردو</option>
        </select>
        {/* Profile dropdown div */}
        {renderSignedInOutLinks()}
        {/* Navbar end utilities (cart and notification icons) */}
        <div className="navbar_utilities">
          <ul className="navbar_utilities_list">
            <li className="navbar_utilities_item">
              <Link
                style={{ textDecoration: "none", color: "inherit" }}
                to="/cart"
              >
                <div className="navbar_lang_icon">
                  <i className="fas fa-shopping-basket"></i>
                </div>
              </Link>
            </li>
          </ul>
        </div>
        {/* Navbar  search button */}
        <div
          id="navbar_search_btn_container"
          className="navbar_search_btn_container"
        >
          <button
            onClick={handleSearchBtnClick}
            className="navbar_search_btn_group"
            id="navbar_search_btn_group"
          >
            <div className="navbar_search_btn">
              <i className="fas fa-search"></i>
            </div>
          </button>
        </div>

        {/* End spacer div */}
        <div className="spacer_end"></div>
      </nav>

      {/* ---cat menu--- */}
      {/* providing id as cat_menu_container--visible because of closeCatList */}
      <ErrorBoundary>
        <Suspense fallback={<div></div>}>
          <div
            id="cat_menu_container--visible"
            className={catListClass}
            onMouseLeave={handleCatListClose}
          >
            <MenuTab catList={CatMenuData} />
          </div>
          {/* ------------ */}

          {/* ---Searcbar div for mobile device--- */}
          {isSearchBarOpen && window.innerWidth >= 1024 && (
            <BackdropDark alpha={0.7} click={backdropClickHandler} />
          )}
          <div className={searchBarClass}>
            <div className="search_bar_mobile">
              {/* SearchBarAutoComplete */}
              <SearchBarPc
                isSearchBarOpen={isSearchBarOpen}
                setIsSearchBarOpen={setIsSearchBarOpen}
                productItems={ProductOptions}
              />
            </div>
          </div>
        </Suspense>
      </ErrorBoundary>
      {renderCloseOnDocumentClick()}
      {/* ------------------------------ */}
    </header>
  );
};

export default memo(Header);
