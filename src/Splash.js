import React, { useState, Suspense, lazy, memo } from "react";
import "./Splash.css";

import FallbackLazy from "./components/FallbackLazy";
import ErrorBoundary from "./components/errorBoundary/ErrorBoundary";

import Logo from "./res/header/logo_144x144.png";

const App = lazy(() => import("./App"));

// import App from "./App";

function Splash() {
  const [isFlashVisible, setIsFlashVisible] = useState(true);

  let splashClassName = isFlashVisible
    ? "splash_component--visible"
    : "splash_component--hidden";

  setTimeout(() => {
    setIsFlashVisible(false);
  }, 5000);

  return (
    <div className="splash_main_div">
      <div className={splashClassName}>
        <img src={Logo} alt="" />
        <i className="fas fa-spin fa-spinner splash-spinner"></i>
      </div>

      <ErrorBoundary>
        <Suspense fallback={<FallbackLazy />}>
          <App />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

export default memo(Splash);
