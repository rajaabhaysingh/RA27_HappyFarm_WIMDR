import React, { useState, useRef, useEffect } from "react";
import { Header } from "./components/layouts/header/Header";
// import { Dashboard } from "./components/dashboard/Dashboard";
import "./App.css";
import TopMessage from "./components/layouts/header/TopMessage";
import SideDrawer from "./components/layouts/sideDrawer/SideDrawer";
import BackdropDark from "./components/backdrop/BackdropDark";
import Home from "./components/home/Home";
import BreadCrumbs from "./components/layouts/breadCrumbs/BreadCrumbs";

const App = (props) => {
  // default backdrop alpha
  let alpha = 0.55;

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

    // handling touch parameters
    let touch = e.touches[0];
    let change = startingX - touch.clientX;

    // handling backdrop parameters
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
    }
  };

  // fun handleTouchEnd
  const handleTouchEnd = (e) => {
    let change = startingX - e.changedTouches[0].clientX;
    let threshold = window.innerWidth / 5;
    if (change < threshold) {
      sideDrawer.style.left = 0;
    } else {
      // perform backdrop click
      backdropClickHandler();
      // set left to 0 - dafault value
      sideDrawer.style.left = "0";
      sideDrawer.style.transition = "all 0.15s";
    }
  };

  // handling backdrop
  let backDropDark;
  if (isDrawerOpen) {
    backDropDark = <BackdropDark alpha={alpha} click={backdropClickHandler} />;
  }

  return (
    <div className="App">
      {/* Main header components */}
      <header className="header_main">
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

        <TopMessage />

        {/* BreadCrumbs */}
        <BreadCrumbs />
      </header>

      {/* Body comp */}
      <main className="body_main">
        {/* Homapage */}
        <Home />
        <div className="lorem">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis
            harum error delectus accusantium. Animi deserunt, quibusdam illo ab
            dolores dolorum quia fuga provident commodi ad quod amet
            voluptatibus vero dolorem.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis
            harum error delectus accusantium. Animi deserunt, quibusdam illo ab
            dolores dolorum quia fuga provident commodi ad quod amet
            voluptatibus vero dolorem.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis
            harum error delectus accusantium. Animi deserunt, quibusdam illo ab
            dolores dolorum quia fuga provident commodi ad quod amet
            voluptatibus vero dolorem.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis
            harum error delectus accusantium. Animi deserunt, quibusdam illo ab
            dolores dolorum quia fuga provident commodi ad quod amet
            voluptatibus vero dolorem.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis
            harum error delectus accusantium. Animi deserunt, quibusdam illo ab
            dolores dolorum quia fuga provident commodi ad quod amet
            voluptatibus vero dolorem.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis
            harum error delectus accusantium. Animi deserunt, quibusdam illo ab
            dolores dolorum quia fuga provident commodi ad quod amet
            voluptatibus vero dolorem.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis
            harum error delectus accusantium. Animi deserunt, quibusdam illo ab
            dolores dolorum quia fuga provident commodi ad quod amet
            voluptatibus vero dolorem.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis
            harum error delectus accusantium. Animi deserunt, quibusdam illo ab
            dolores dolorum quia fuga provident commodi ad quod amet
            voluptatibus vero dolorem.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis
            harum error delectus accusantium. Animi deserunt, quibusdam illo ab
            dolores dolorum quia fuga provident commodi ad quod amet
            voluptatibus vero dolorem.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis
            harum error delectus accusantium. Animi deserunt, quibusdam illo ab
            dolores dolorum quia fuga provident commodi ad quod amet
            voluptatibus vero dolorem.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis
            harum error delectus accusantium. Animi deserunt, quibusdam illo ab
            dolores dolorum quia fuga provident commodi ad quod amet
            voluptatibus vero dolorem.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis
            harum error delectus accusantium. Animi deserunt, quibusdam illo ab
            dolores dolorum quia fuga provident commodi ad quod amet
            voluptatibus vero dolorem.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis
            harum error delectus accusantium. Animi deserunt, quibusdam illo ab
            dolores dolorum quia fuga provident commodi ad quod amet
            voluptatibus vero dolorem.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis
            harum error delectus accusantium. Animi deserunt, quibusdam illo ab
            dolores dolorum quia fuga provident commodi ad quod amet
            voluptatibus vero dolorem.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis
            harum error delectus accusantium. Animi deserunt, quibusdam illo ab
            dolores dolorum quia fuga provident commodi ad quod amet
            voluptatibus vero dolorem.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis
            harum error delectus accusantium. Animi deserunt, quibusdam illo ab
            dolores dolorum quia fuga provident commodi ad quod amet
            voluptatibus vero dolorem.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis
            harum error delectus accusantium. Animi deserunt, quibusdam illo ab
            dolores dolorum quia fuga provident commodi ad quod amet
            voluptatibus vero dolorem.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis
            harum error delectus accusantium. Animi deserunt, quibusdam illo ab
            dolores dolorum quia fuga provident commodi ad quod amet
            voluptatibus vero dolorem.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis
            harum error delectus accusantium. Animi deserunt, quibusdam illo ab
            dolores dolorum quia fuga provident commodi ad quod amet
            voluptatibus vero dolorem.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis
            harum error delectus accusantium. Animi deserunt, quibusdam illo ab
            dolores dolorum quia fuga provident commodi ad quod amet
            voluptatibus vero dolorem.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis
            harum error delectus accusantium. Animi deserunt, quibusdam illo ab
            dolores dolorum quia fuga provident commodi ad quod amet
            voluptatibus vero dolorem.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis
            harum error delectus accusantium. Animi deserunt, quibusdam illo ab
            dolores dolorum quia fuga provident commodi ad quod amet
            voluptatibus vero dolorem.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis
            harum error delectus accusantium. Animi deserunt, quibusdam illo ab
            dolores dolorum quia fuga provident commodi ad quod amet
            voluptatibus vero dolorem.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis
            harum error delectus accusantium. Animi deserunt, quibusdam illo ab
            dolores dolorum quia fuga provident commodi ad quod amet
            voluptatibus vero dolorem.
          </p>
        </div>
      </main>
    </div>
  );
};

export default App;
