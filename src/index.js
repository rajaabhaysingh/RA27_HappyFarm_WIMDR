import React, { lazy, Suspense } from "react";
import { render } from "react-dom";
import "./index.css";

// Handling redux imports
import { Provider } from "react-redux";
import store from "./redux/store/Index";

import FallbackLazy from "./components/FallbackLazy";
import ErrorBoundary from "./components/errorBoundary/ErrorBoundary";

const App = lazy(() => import("./App"));

render(
  <React.StrictMode>
    <Provider store={store}>
      <ErrorBoundary>
        <Suspense fallback={<FallbackLazy />}>
          <App />
        </Suspense>
      </ErrorBoundary>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
