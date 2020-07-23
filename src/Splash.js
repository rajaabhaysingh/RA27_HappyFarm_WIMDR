import React, { useState, useEffect, Suspense, lazy, memo } from "react";
import "./Splash.css";

import FallbackLazy from "./components/FallbackLazy";
import ErrorBoundary from "./components/errorBoundary/ErrorBoundary";

import Logo from "./res/header/logo_144x144.png";

const App = lazy(() => import("./App"));

function Splash() {
  const [isFirstRender, setIsFirstRender] = useState(true);

  // renderSplash
  const renderSplash = () => {
    if (isFirstRender) {
      return (
        <div className="splash_component--visible">
          <img src={Logo} alt="" />
          <i className="fas fa-spin fa-spinner splash-spinner"></i>
        </div>
      );
    }
  };

  setTimeout(() => {
    setIsFirstRender(false);
  }, 1000);

  useEffect(() => {}, [isFirstRender]);

  // renderMainContent
  const renderMainContent = () => {
    return (
      <div style={isFirstRender ? { display: "none" } : { display: "block" }}>
        <ErrorBoundary>
          <Suspense fallback={<FallbackLazy />}>
            <App />
          </Suspense>
        </ErrorBoundary>
      </div>
    );
  };

  return (
    <div className="splash_main_div">
      {isFirstRender && renderSplash()}
      {renderMainContent()}
    </div>
  );
}

export default memo(Splash);
