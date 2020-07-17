import React, {
  useState,
  useRef,
  useEffect,
  memo,
  lazy,
  Suspense,
  useCallback,
} from "react";
import "./App.css";

import { BrowserRouter, Switch, Route } from "react-router-dom";

import FallbackLazy from "./components/FallbackLazy";
import ErrorBoundary from "./components/errorBoundary/ErrorBoundary";

import SideDrawer from "./components/layouts/sideDrawer/SideDrawer";
import BackdropDark from "./components/backdrop/BackdropDark";

const FileNotFound = lazy(() =>
  import("./components/layouts/fileNotFound/FileNotFound")
);
const FarmersSolution = lazy(() =>
  import("./components/farmersSolution/FarmersSolution")
);
const Header = lazy(() => import("./components/layouts/header/Header"));
const Home = lazy(() => import("./components/home/Home"));
const Dashboard = lazy(() => import("./components/dashboard/Dashboard"));
const Category = lazy(() => import("./components/category/Category"));
const Contact = lazy(() => import("./components/contact/Contact"));
const Offers = lazy(() => import("./components/offers/Offers"));
const Premium = lazy(() => import("./components/premium/Premium"));
const TopMessage = lazy(() => import("./components/layouts/header/TopMessage"));
const BreadCrumbs = lazy(() =>
  import("./components/layouts/breadCrumbs/BreadCrumbs")
);
const SearchPage = lazy(() => import("./components/searchPage/SearchPage"));

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
  let drawerToggleClickHandler = useCallback(() => {
    setIsDrawerOpen(() => {
      return { isDrawerOpen: !prevDrawerOpen };
    });
  }, [prevDrawerOpen]);

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
          <ErrorBoundary>
            <Suspense fallback={<FallbackLazy />}>
              <TopMessage />
            </Suspense>
          </ErrorBoundary>
          {/* Passing drawerToggleClickHandler prop uner the name drawerClickHandler */}
          <ErrorBoundary>
            <Suspense fallback={<FallbackLazy />}>
              <Header
                isSearchBarOpen={isSearchBarOpen}
                setIsSearchBarOpen={setIsSearchBarOpen}
                setMarginTop={setMarginTop}
                drawerClickHandler={drawerToggleClickHandler}
              />
            </Suspense>
          </ErrorBoundary>

          <div
            className="side_drawer_components"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            id="side_drawer_components"
          >
            <ErrorBoundary>
              <Suspense fallback={<FallbackLazy />}>
                <SideDrawer
                  setIsDrawerOpen={setIsDrawerOpen}
                  showDrawer={isDrawerOpen}
                  translatePercent={"-100%"}
                />
              </Suspense>
            </ErrorBoundary>
            {backDropDark}
          </div>
          <ErrorBoundary>
            <Suspense fallback={<FallbackLazy />}>
              <BreadCrumbs />
            </Suspense>
          </ErrorBoundary>
        </header>

        {/* Body comp */}
        <main className="body_main" style={{ marginTop: `${marginTop}` }}>
          <ErrorBoundary>
            <Suspense fallback={<FallbackLazy />}>
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
                  strict
                  path="/dashboard"
                  render={() => (
                    <Dashboard
                      {...props}
                      isSearchBarOpen={isSearchBarOpen}
                      setIsSearchBarOpen={setIsSearchBarOpen}
                    />
                  )}
                />
                <Route
                  strict
                  path="/farmersolution"
                  render={(props) => (
                    <FarmersSolution
                      {...props}
                      isSearchBarOpen={isSearchBarOpen}
                      setIsSearchBarOpen={setIsSearchBarOpen}
                    />
                  )}
                />
                <Route
                  strict
                  path="/offers"
                  render={(props) => (
                    <Offers
                      {...props}
                      isSearchBarOpen={isSearchBarOpen}
                      setIsSearchBarOpen={setIsSearchBarOpen}
                    />
                  )}
                />
                <Route
                  strict
                  path="/premium"
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
                  path="/contact"
                  render={(props) => (
                    <Contact
                      {...props}
                      isSearchBarOpen={isSearchBarOpen}
                      setIsSearchBarOpen={setIsSearchBarOpen}
                    />
                  )}
                />
                <Route
                  strict
                  path="/category"
                  render={(props) => (
                    <Category
                      {...props}
                      isSearchBarOpen={isSearchBarOpen}
                      setIsSearchBarOpen={setIsSearchBarOpen}
                    />
                  )}
                />
                <Route
                  strict
                  path="/search"
                  render={(props) => (
                    <SearchPage
                      {...props}
                      isSearchBarOpen={isSearchBarOpen}
                      setIsSearchBarOpen={setIsSearchBarOpen}
                    />
                  )}
                />
                <Route
                  render={(props) => (
                    <FileNotFound
                      {...props}
                      isSearchBarOpen={isSearchBarOpen}
                      setIsSearchBarOpen={setIsSearchBarOpen}
                    />
                  )}
                />
              </Switch>
            </Suspense>
          </ErrorBoundary>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default memo(App);
