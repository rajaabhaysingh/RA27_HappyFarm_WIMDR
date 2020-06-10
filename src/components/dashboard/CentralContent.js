import React, { lazy, Suspense, memo } from "react";
import "./CentralContent.css";

import FallbackLazy from "../FallbackLazy";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

const Profile = lazy(() => import("./profile/Profile"));
const SalesHistory = lazy(() => import("./salesHistory/SalesHistory"));
const Following = lazy(() => import("./following/Following"));
const MyOrders = lazy(() => import("./myOrders/MyOrders"));
const Transactions = lazy(() => import("./transactions/Transactions"));

function CentralContent({ profileData, currentTabNo }) {
  // -----central part rendering logic-----
  const renderTab = (tab_no) => {
    switch (tab_no) {
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
              <Transactions profileData={profileData} />
            </Suspense>
          </ErrorBoundary>
        );

      default:
        return <div style={{ color: "#990000" }}>Unexpected error...</div>;
    }
  };
  // --------------------------------------

  return (
    <div className="central_content_main_div">{renderTab(currentTabNo)}</div>
  );
}

export default memo(CentralContent);
