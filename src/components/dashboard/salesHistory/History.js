import React from "react";
import "./History.css";

import { Translate } from "react-auto-translate";

import { useRouteMatch, Link } from "react-router-dom";

import HistoryData from "./HistoryData";

const History = () => {
  // The `path` lets us build <Route> paths that are
  // relative to the parent route, while the `url` lets
  // us build relative links.
  let { url } = useRouteMatch();
  // tstampToTime
  const tstampToTime = (ts) => {
    const tsDate = new Date(ts * 1000);
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return (
      tsDate.getDate() +
      " " +
      months[tsDate.getMonth()] +
      " " +
      tsDate.getFullYear() +
      ",  " +
      tsDate.getHours() +
      ":" +
      tsDate.getMinutes() +
      ":" +
      tsDate.getSeconds()
    );
  };

  return (
    <div className="sale_his_main_div">
      <div className="sale_his_inner_div">
        <div className="sale_his_heading">
          <Translate>SALES HISTORY</Translate>
        </div>
        <div className="sale_his_labels">
          <span className="sale_his_name--heading">
            {" "}
            <Translate>Name</Translate>{" "}
          </span>
          <span className="sale_his_qty--heading">
            {" "}
            <Translate>Qty</Translate>{" "}
          </span>
          <span className="sale_his_time--heading">
            {" "}
            <Translate>Time</Translate>{" "}
          </span>
          <span className="sale_his_link--heading">
            {" "}
            <Translate>Details</Translate>{" "}
          </span>
        </div>
        <ul className="sale_his_container">
          {HistoryData.data.map((data) => (
            <li className="sale_his_item" key={data.id}>
              <span className="sale_his_name">
                <Translate>{data.nm}</Translate>
              </span>
              <span className="sale_his_qty">
                <Translate>
                  {data.qty} {data.qtU}
                </Translate>
              </span>
              <span className="sale_his_time">{tstampToTime(data.dt)}</span>
              <Link className="sale_his_link" to={`${url}/${data.id}`}>
                <Translate>View Details</Translate>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default History;
