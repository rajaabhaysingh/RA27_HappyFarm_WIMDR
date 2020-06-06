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
  };

  // fun handleTouchEnd
  const handleTouchEnd = (e) => {
    var change = startingX - e.changedTouches[0].clientX;
    var threshold = window.innerWidth / 5;
    if (change < threshold) {
      sideDrawer.style.left = 0;
      sideDrawer.style.transition = "all ease-in 0.4s";
    } else {
      // perform backdrop click
      backdropClickHandler();
      // set left to 0 - dafault value
      sideDrawer.style.left = "0";
      sideDrawer.style.transition = "all ease-in 0.4s";
    }
  };

  // handling backdrop
  let backDropDark;
  if (isDrawerOpen) {
    backDropDark = <BackdropDark alpha={alpha} click={backdropClickHandler} />;
  }

  return (
    <BrowserRouter>
      <div className="App">
        {/* Main header components */}
        <header className="header_main">
          <TopMessage />
          {/* Passing drawerToggleClickHandler prop uner the name drawerClickHandler */}
          <Header drawerClickHandler={drawerToggleClickHandler} />

          <div
            className="side_drawer_components"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            id="side_drawer_components"
          >
            <SideDrawer showDrawer={isDrawerOpen} translatePercent={"-100%"} />
            {backDropDark}
          </div>
          <BreadCrumbs />
        </header>

        {/* Body comp */}
        <main className="body_main">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/dashboard/" component={Dashboard} />
            <Route exact path="/farmersolution/" component={FarmersSolution} />
            <Route exact path="/offers/" component={Offers} />
            <Route exact path="/premium/" component={Premium} />
            <Route exact path="/contact/" component={Contact} />
            <Route exact path="/category/" component={Category} />
          </Switch>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;
