import React, { memo, lazy, Suspense } from "react";
import "./SellingNow.css";

import { Translate } from "react-auto-translate";

import { useRouteMatch, Link } from "react-router-dom";

import FallbackLazy from "../../FallbackLazy";
import ErrorBoundary from "../../errorBoundary/ErrorBoundary";

import SellingNowData from "../overview/SellingNowData";

const SellingNowItem = lazy(() => import("../overview/SellingNowItem"));

const SellingNow = ({ profileData }) => {
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

  // renderProdOnSale
  const renderProdOnSale = (prodList) => {
    if (prodList) {
      return (
        <ErrorBoundary>
          <Suspense fallback={<FallbackLazy />}>
            {prodList.map((item) => (
              <SellingNowItem
                tstampToTime={tstampToTime}
                key={item.id}
                item={item}
              />
            ))}
          </Suspense>
        </ErrorBoundary>
      );
    } else {
      return (
        <div className="overview_no_prod_found">
          {" "}
          <Translate>No products found under this category.</Translate>
        </div>
      );
    }
  };

  return (
    <div className="selling_now_main_div">
      <div className="selling_now_inner_div">
        <div className="selling_now_add_new_product">
          <Link className="selling_now_add_new_product_link" to={`${url}/new`}>
            <Translate>Add new product on sale</Translate>{" "}
            <span style={{ width: "8px" }}></span>{" "}
            <i className="fas fa-plus"></i>
          </Link>
        </div>
        <div className="selling_now_type_group">
          <div className="selling_now_heading">
            <Translate>RETAIL PRODUCTS</Translate>
          </div>
          {renderProdOnSale(SellingNowData.retail)}
        </div>
        <div className="selling_now_type_group">
          <div className="selling_now_heading">
            <Translate>BULK PRODUCTS</Translate>
          </div>
          {renderProdOnSale(SellingNowData.bulk)}
        </div>
      </div>
    </div>
  );
};

export default memo(SellingNow);
