import React, { useState, useRef, useEffect } from "react";
import "./App.css";

import { Header } from "./components/layouts/header/Header";
import Home from "./components/home/Home";
import { Dashboard } from "./components/dashboard/Dashboard";
import { FarmersSolution } from "./components/farmersSolution/FarmersSolution";
import Category from "./components/category/Category";
import Contact from "./components/contact/Contact";
import Offers from "./components/offers/Offers";
import Premium from "./components/premium/Premium";

import TopMessage from "./components/layouts/header/TopMessage";
import SideDrawer from "./components/layouts/sideDrawer/SideDrawer";
import BackdropDark from "./components/backdrop/BackdropDark";
import BreadCrumbs from "./components/layouts/breadCrumbs/BreadCrumbs";
import { BrowserRouter, Switch, Route } from "react-router-dom";

const App = (props) => {
  // default backdrop TRANSARENCY
  let alpha = 0.75;

  // Initial drawer state
  let [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const prevDrawerStateRef = useRef();

  useEffect(() => {
    prevDrawerStateRef.current = isDrawerOpen;
  });

  let prevDrawerOpen = prevDrawerStateRef.current;

  // toggles isDrawerOpen state of component
  let drawerToggleClickHandler = () => {
    setIsDrawerOpen(() => {
      return { isDrawerOpen: !prevDrawerOpen };
    });
  };

  //backdrop click handler
  const backdropClickHandler = () => {
    setIsDrawerOpen(false);
  };

  // touch and swipe events function
  // side_drawer is in child component as of now
  const sideDrawer = document.getElementById("side_drawer");

  let startingX = null;

  // fun handleTouchStart
  const handleTouchStart = (e) => {
    startingX = e.touches[0].clientX;
  };

  // fun handleTouchMove
  const handleTouchMove = (e) => {
    const backdrop = document.getElementById("backdrop");

    if (backdrop) {
      // DEFINING touch parameters
      let touch = e.touches[0];
      let change = startingX - touch.clientX;

      // handling backdrop TRANSPARENCY parameters
      let getScreenWidth = window.innerWidth;
      if (getScreenWidth > 428) {
        // calculate on 300px
        let swipeRange = getScreenWidth / 2;
        alpha = (touch.clientX / swipeRange) * 0.5;
      } else {
        // calculate on 70% of screen width
        let swipeRange = 0.5 * getScreenWidth;
        alpha = (touch.clientX / swipeRange) * 0.5;
      }

      // if swipes right in home screen - do nothing
      if (change < 0) {
        return;
      } else {
        backdrop.style.background = `rgba(0, 0, 0, ${alpha})`;
        sideDrawer.style.left = "-" + change + "px";
        sideDrawer.style.transition = "all 0s";
      }
    }
  };

  // fun handleTouchEnd
  const handleTouchEnd = (e) => {
    var change = startingX - e.changedTouches[0].clientX;
    var threshold = window.innerWidth / 5;
    if (change < threshold) {
      sideDrawer.style.left = 0;
      sideDrawer.style.transition = "all ease-in 0.15s";
    } else {
      // perform backdrop click
      backdropClickHandler();
      // set left to 0 - dafault value
      sideDrawer.style.left = "0";
      sideDrawer.style.transition = "all ease-in 0.15s";
    }
  };

  // handling backdrop
  let backDropDark;
  if (isDrawerOpen) {
    backDropDark = <BackdropDark alpha={alpha} click={backdropClickHandler} />;
  }

  // ------set margin and isSearchBarOpen-------
  const [isSearchBarOpen, setIsSearchBarOpen] = useState(
    window.innerWidth < 1024 ? true : false
  );

  const [marginTop, setMarginTop] = useState(
    window.innerWidth < 1024 ? "91px" : "0px"
  );
  // -------------------------------------------

  return (
    <BrowserRouter>
      <div className="App">
        {/* Main header components */}
        <header className="header_main">
          <TopMessage />
          {/* Passing drawerToggleClickHandler prop uner the name drawerClickHandler */}
          <Header
            isSearchBarOpen={isSearchBarOpen}
            setIsSearchBarOpen={setIsSearchBarOpen}
            setMarginTop={setMarginTop}
            drawerClickHandler={drawerToggleClickHandler}
          />

          <div
            className="side_drawer_components"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            id="side_drawer_components"
          >
            <SideDrawer
              setIsDrawerOpen={setIsDrawerOpen}
              showDrawer={isDrawerOpen}
              translatePercent={"-100%"}
            />
            {backDropDark}
          </div>
          <BreadCrumbs />
        </header>

        {/* Body comp */}
        <main className="body_main" style={{ marginTop: `${marginTop}` }}>
          <Switch>
            <Route
              exact
              path="/"
              render={(props) => (
                <Home
                  {...props}
                  isSearchBarOpen={isSearchBarOpen}
                  setIsSearchBarOpen={setIsSearchBarOpen}
                />
              )}
            />
            <Route
              exact
              path="/dashboard/"
              render={() => (
                <Dashboard
                  isSearchBarOpen={isSearchBarOpen}
                  setIsSearchBarOpen={setIsSearchBarOpen}
                />
              )}
            />
            <Route
              exact
              path="/farmersolution/"
              render={(props) => (
                <FarmersSolution
                  {...props}
                  isSearchBarOpen={isSearchBarOpen}
                  setIsSearchBarOpen={setIsSearchBarOpen}
                />
              )}
            />
            <Route
              exact
              path="/offers/"
              render={(props) => (
                <Offers
                  {...props}
                  isSearchBarOpen={isSearchBarOpen}
                  setIsSearchBarOpen={setIsSearchBarOpen}
                />
              )}
            />
            <Route
              exact
              path="/premium/"
              render={(props) => (
                <Premium
                  {...props}
                  isSearchBarOpen={isSearchBarOpen}
                  setIsSearchBarOpen={setIsSearchBarOpen}
                />
              )}
            />
            <Route
              exact
              path="/contact/"
              render={(props) => (
                <Contact
                  {...props}
                  isSearchBarOpen={isSearchBarOpen}
                  setIsSearchBarOpen={setIsSearchBarOpen}
                />
              )}
            />
            <Route
              exact
              path="/category/"
              render={(props) => (
                <Category
                  {...props}
                  isSearchBarOpen={isSearchBarOpen}
                  setIsSearchBarOpen={setIsSearchBarOpen}
                />
              )}
            />
          </Switch>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;
