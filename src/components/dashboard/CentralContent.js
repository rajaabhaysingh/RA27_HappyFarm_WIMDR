import React, { lazy, Suspense, memo } from "react";
import "./CentralContent.css";

import { Router, Switch, Route, useRouteMatch } from "react-router-dom";

import FallbackLazy from "../FallbackLazy";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

import TransactionData from "./transactions/TransactionData";
import OverviewData from "./overview/OverviewData";
import SellingNowData from "./overview/SellingNowData";
import MyOrdersData from "./overview/MyOrdersData";

const FileNotFound = lazy(() => import("../layouts/fileNotFound/FileNotFound"));
const Overview = lazy(() => import("./overview/Overview"));
const Profile = lazy(() => import("./profile/Profile"));
const SalesHistory = lazy(() => import("./salesHistory/SalesHistory"));
const Following = lazy(() => import("./following/Following"));
const MyOrders = lazy(() => import("./myOrders/MyOrders"));
const Transactions = lazy(() => import("./transactions/Transactions"));

function CentralContent({ profileData }) {
  // The `path` lets us build <Route> paths that are
  // relative to the parent route, while the `url` lets
  // us build relative links.
  let { path } = useRouteMatch();

  return (
    <div className="central_content_main_div">
      {/* {renderTab(currentTabNo)} */}
      <ErrorBoundary>
        <Suspense fallback={<FallbackLazy />}>
          <Switch>
            <Route exact strict path={path}>
              <Overview
                SellingNowData={SellingNowData}
                MyOrdersData={MyOrdersData}
                OverviewData={OverviewData}
                profileData={profileData}
              />
            </Route>
            <Route exact path={`${path}/profile`}>
              <Profile profileData={profileData} />
            </Route>
            <Route exact path={`${path}/following`}>
              <Following profileData={profileData} />
            </Route>
            <Route exact path={`${path}/my-orders`}>
              <MyOrders profileData={profileData} />
            </Route>
            <Route exact path={`${path}/sales-history`}>
              <SalesHistory profileData={profileData} />
            </Route>
            <Route exact path={`${path}/transactions`}>
              <Transactions
                profileData={profileData}
                transactionData={TransactionData}
              />
            </Route>
            <Route path={`${path}/*`}>
              <FileNotFound />
            </Route>
          </Switch>
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

export default memo(CentralContent);
