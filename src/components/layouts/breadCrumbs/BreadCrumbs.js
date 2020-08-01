import React, { useEffect } from "react";
import "./BreadCrumbs.css";

import { useRouteMatch } from "react-router-dom";

function BreadCrumbs() {
  // const [breadCrumb, setBreadCrumb] = useState("Home");

  let { urll } = useRouteMatch();

  useEffect(() => {
    // setBreadCrumb(urll);
  }, [urll]);

  let url = window.location.href;
  url = url.replace("http://", "");
  url = url.replace("https://", "");
  url = url.replace("farmted.000webhostapp.com", "Home");
  url = url.replace("localhost:3000", "Home");
  url = url.replace("localhost:3001", "Home");
  url = url.replace("/", " ► ");
  url = url.replace("/", " ► ");
  url = url.replace("/", " ► ");
  url = url.replace("/", " ► ");
  url = url.replace("/", " ► ");
  url = url.replace("/", " ► ");
  url = url.replace("/", " ► ");
  url = url.replace("/", " ► ");

  return (
    <div className="breadcrumbs_main_div">
      <div className="breadcrumbs_inner_main_div">{url}</div>
    </div>
  );
}

export default BreadCrumbs;
