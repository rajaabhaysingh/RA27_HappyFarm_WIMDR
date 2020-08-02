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

import { Translator } from "react-auto-translate";

import { BrowserRouter, Switch, Route } from "react-router-dom";

import FallbackLazy from "./components/FallbackLazy";
import ErrorBoundary from "./components/errorBoundary/ErrorBoundary";

import SideDrawer from "./components/layouts/sideDrawer/SideDrawer";
import BackdropDark from "./components/backdrop/BackdropDark";

// --------- messages handling---------
import { USER_CONNECTED } from "./components/messages/Events";
// ------------------------------------

const FileNotFound = lazy(() =>
  import("./components/layouts/fileNotFound/FileNotFound")
);
const FarmersSolution = lazy(() =>
  import("./components/farmersSolution/FarmersSolution")
);
const Header = lazy(() => import("./components/layouts/header/Header"));
const Home = lazy(() => import("./components/home/Home"));
const Dashboard = lazy(() => import("./components/dashboard/Dashboard"));
const Products = lazy(() => import("./components/products/Products"));
const Farmers = lazy(() => import("./components/farmers/Farmers"));
const Solutions = lazy(() => import("./components/solutions/Solutions"));
const Contact = lazy(() => import("./components/contact/Contact"));
const Offers = lazy(() => import("./components/offers/Offers"));
const Premium = lazy(() => import("./components/premium/Premium"));
const TopMessage = lazy(() => import("./components/layouts/header/TopMessage"));
const BreadCrumbs = lazy(() =>
  import("./components/layouts/breadCrumbs/BreadCrumbs")
);
const Messages = lazy(() => import("./components/messages/Messages"));
const Cart = lazy(() => import("./components/cart/Cart"));
const Favourites = lazy(() => import("./components/favourites/Favourites"));

// for language translation part
// This is just an example of how you could wire this to localStorage
const cacheProvider = {
  get: (language, key) =>
    ((JSON.parse(localStorage.getItem("translations")) || {})[key] || {})[
      language
    ],
  set: (language, key, value) => {
    const existing = JSON.parse(localStorage.getItem("translations")) || {
      [key]: {},
    };
    existing[key] = { ...existing[key], [language]: value };
    localStorage.setItem("translations", JSON.stringify(existing));
  },
};

const App = (props) => {
  // ----- language translation part -----
  const [lang, setLang] = useState({
    defLang: "en",
    prefLang: "en",
  });
  // -------------------------------------

  // ---------handling messaging----------

  const [socket, setSocket] = useState(null);
  const [user, setUser] = useState({
    id: undefined,
    token: undefined,
  });

  // ------- setting user property in state --------
  const settingUser = useCallback(
    (user) => {
      socket.emit(USER_CONNECTED, user);
      setUser({ user });
    },
    [USER_CONNECTED, user]
  );

  // -------------------------------------

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
      <Translator
        cacheProvider={cacheProvider}
        to={lang.prefLang}
        from={lang.defLang}
        googleApiKey="AIzaSyC9qu--9R3WiQi62kY7kgp_wG2p17jpmu4"
      >
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
                  lang={lang}
                  setLang={setLang}
                  user={user}
                  setUser={setUser}
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
                        user={user}
                        setUser={setUser}
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
                        user={user}
                        setUser={setUser}
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
                        user={user}
                        setUser={setUser}
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
                        user={user}
                        setUser={setUser}
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
                        user={user}
                        setUser={setUser}
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
                        user={user}
                        setUser={setUser}
                        isSearchBarOpen={isSearchBarOpen}
                        setIsSearchBarOpen={setIsSearchBarOpen}
                      />
                    )}
                  />
                  <Route
                    strict
                    path="/products"
                    render={(props) => (
                      <Products
                        {...props}
                        user={user}
                        setUser={setUser}
                        isSearchBarOpen={isSearchBarOpen}
                        setIsSearchBarOpen={setIsSearchBarOpen}
                      />
                    )}
                  />
                  <Route
                    strict
                    path="/farmers"
                    render={(props) => (
                      <Farmers
                        {...props}
                        user={user}
                        setUser={setUser}
                        isSearchBarOpen={isSearchBarOpen}
                        setIsSearchBarOpen={setIsSearchBarOpen}
                      />
                    )}
                  />
                  <Route
                    strict
                    path="/solutions"
                    render={(props) => (
                      <Solutions
                        {...props}
                        user={user}
                        setUser={setUser}
                        isSearchBarOpen={isSearchBarOpen}
                        setIsSearchBarOpen={setIsSearchBarOpen}
                      />
                    )}
                  />
                  <Route
                    strict
                    path="/messages"
                    render={(props) => (
                      <Messages
                        {...props}
                        socket={socket}
                        setSocket={setSocket}
                        user={user}
                        setUser={setUser}
                        settingUser={settingUser}
                        isSearchBarOpen={isSearchBarOpen}
                        setIsSearchBarOpen={setIsSearchBarOpen}
                      />
                    )}
                  />
                  <Route
                    strict
                    path="/cart"
                    render={(props) => (
                      <Cart
                        {...props}
                        user={user}
                        setUser={setUser}
                        isSearchBarOpen={isSearchBarOpen}
                        setIsSearchBarOpen={setIsSearchBarOpen}
                      />
                    )}
                  />
                  <Route
                    strict
                    path="/favourites"
                    render={(props) => (
                      <Favourites
                        {...props}
                        user={user}
                        setUser={setUser}
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
      </Translator>
    </BrowserRouter>
  );
};

export default memo(App);
