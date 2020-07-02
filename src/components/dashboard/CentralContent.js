import React, { lazy, Suspense, memo } from "react";
import "./CentralContent.css";

import FallbackLazy from "../FallbackLazy";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

import TransactionData from "./transactions/TransactionData";

const Overview = lazy(() => import("./overview/Overview"));
const Profile = lazy(() => import("./profile/Profile"));
const SalesHistory = lazy(() => import("./salesHistory/SalesHistory"));
const Following = lazy(() => import("./following/Following"));
const MyOrders = lazy(() => import("./myOrders/MyOrders"));
const Transactions = lazy(() => import("./transactions/Transactions"));

function CentralContent({ profileData, currentTabNo }) {
  // -----central part rendering logic-----
  const renderTab = (tab_no) => {
    switch (tab_no) {
      case 0:
        return (
          <ErrorBoundary>
            <Suspense fallback={<FallbackLazy />}>
              <Overview profileData={profileData} />
            </Suspense>
          </ErrorBoundary>
        );
      case 1:
        return (
          <ErrorBoundary>
            <Suspense fallback={<FallbackLazy />}>
              <Profile profileData={profileData} />
            </Suspense>
          </ErrorBoundary>
        );

      case 2:
        return (
          <ErrorBoundary>
            <Suspense fallback={<FallbackLazy />}>
              <Following profileData={profileData} />
            </Suspense>
          </ErrorBoundary>
        );

      case 3:
        return (
          <ErrorBoundary>
            <Suspense fallback={<FallbackLazy />}>
              <MyOrders profileData={profileData} />
            </Suspense>
          </ErrorBoundary>
        );

      case 4:
        return (
          <ErrorBoundary>
            <Suspense fallback={<FallbackLazy />}>
              <SalesHistory profileData={profileData} />
            </Suspense>
          </ErrorBoundary>
        );

      case 5:
        return (
          <ErrorBoundary>
            <Suspense fallback={<FallbackLazy />}>
              <Transactions
                profileData={profileData}
                transactionData={TransactionData}
              />
            </Suspense>
          </ErrorBoundary>
        );

      default:
        return <div style={{ color: "#CC0000" }}>Unexpected error...</div>;
    }
  };
  // --------------------------------------

  return (
    <div className="central_content_main_div">{renderTab(currentTabNo)}</div>
  );
}

export default memo(CentralContent);
