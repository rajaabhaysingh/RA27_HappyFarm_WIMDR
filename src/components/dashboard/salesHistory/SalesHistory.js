import React, { lazy, Suspense } from "react";
import "./SalesHistory.css";

import { Switch, Route, useRouteMatch } from "react-router-dom";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

import FallbackLazy from "../../FallbackLazy";
import ErrorBoundary from "../../errorBoundary/ErrorBoundary";

const SellingNow = lazy(() => import("./SellingNow"));
const History = lazy(() => import("./History"));
const FileNotFound = lazy(() =>
  import("../../layouts/fileNotFound/FileNotFound")
);
const SalesDetails = lazy(() => import("./SalesDetails"));
const AddNewProduct = lazy(() => import("./AddNewProduct"));

function SellHistory({ profileData }) {
  // The `path` lets us build <Route> paths that are
  // relative to the parent route, while the `url` lets
  // us build relative links.
  let { path } = useRouteMatch();

  return (
    <div className="sales_main_div">
      <div className="sales_inner_div">
        <div className="sales_heading">Sales {"&"} History</div>
        <div className="sales_description">
          <div className="sales_description_text">
            Manage and view your sales here.
          </div>
          <i className="fas fa-info-circle sales_description_info_icon"></i>
        </div>
        <Switch>
          <Route exact path={path}>
            <div className="sales_tab_container">
              <Tabs
                className="sales_tabs"
                defaultIndex={0}
                forceRenderTabPanel={false}
                disabledTabClassName="sales_tab--disabled"
                selectedTabClassName="sales_tab--selected"
                selectedTabPanelClassName="sales_panel--selected"
              >
                <TabList className="sales_tab_list">
                  <Tab className="sales_tab">Selling now</Tab>
                  <Tab className="sales_tab">History</Tab>
                </TabList>

                {/* profile panel -- basic info */}
                <TabPanel className="sales_panel">
                  <ErrorBoundary>
                    <Suspense fallback={<FallbackLazy />}>
                      <SellingNow profileData={profileData} />
                    </Suspense>
                  </ErrorBoundary>
                </TabPanel>
                <TabPanel className="sales_panel">
                  <ErrorBoundary>
                    <Suspense fallback={<FallbackLazy />}>
                      <History profileData={profileData} />
                    </Suspense>
                  </ErrorBoundary>
                </TabPanel>
              </Tabs>
            </div>
          </Route>
          <Route exact path={`${path}/new`}>
            <ErrorBoundary>
              <Suspense fallback={<FallbackLazy />}>
                <AddNewProduct profileData={profileData} />
              </Suspense>
            </ErrorBoundary>
          </Route>
          <Route exact path={`${path}/:historyId`}>
            <ErrorBoundary>
              <Suspense fallback={<FallbackLazy />}>
                <SalesDetails />
              </Suspense>
            </ErrorBoundary>
          </Route>
          <Route path={`${path}/*`}>
            <FileNotFound />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default SellHistory;
