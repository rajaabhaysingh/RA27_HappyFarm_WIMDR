import React from "react";
import { render } from "react-dom";
import "./index.css";

// Handling redux imports
import { Provider } from "react-redux";
import store from "./redux/store/Index";
import Splash from "./Splash";

render(
  <React.StrictMode>
    <Splash />
  </React.StrictMode>,
  document.getElementById("root")
);
