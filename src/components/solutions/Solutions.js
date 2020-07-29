import React, { useState, lazy, Suspense } from "react";
import "./Solutions.css";

import { Switch, Route, Link, useRouteMatch } from "react-router-dom";

import Placeholder from "../../res/categoryScroll/placeholder.svg";

import FallbackLazy from "../FallbackLazy";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

import FooterDetails from "../layouts/footer/FooterDetails";
import PlacesAutocompleteAlt from "../layouts/placesAutocompleteAlt/PlacesAutocompleteAlt";
import AdCategoryData1 from "../layouts/adCategoryGrid/AdCategoryData1";
import AdCategoryData2 from "../layouts/adCategoryGrid/AdCategoryData2";

const dataSet = [
  {
    id: "xd34",
    imgUrl: Placeholder,
    heading: "34,000",
    desc: "lorem toggle onClick search bar visibility and bottom margin - ",
  },
  {
    id: "3c44c",
    imgUrl: Placeholder,
    heading: "34,000",
    desc:
      "lorem toggle onClick search bar visibility and bottom margin - button pop-up",
  },
  {
    id: "u65y54",
    imgUrl: Placeholder,
    heading: "34,000",
    desc: "lorem toggle onClick search bar visibility and ",
  },
  {
    id: "4t4tvx",
    imgUrl: Placeholder,
    heading: "34,000",
    desc:
      "lorem toggle onClick search bar visibility and bottom search bar ppc button pop-up",
  },
];

const noticeData = [
  {
    id: "b34g6c",
    content:
      "lorem toggle onClick search bar visibility and bottom search bar ppc button pop-uplorem toggle onClick search bar visibility and bottom search bar ppc button pop-up",
    time: 1593549018,
  },
  {
    id: "y45g55",
    content:
      "lorem toggle onClick search bar visibility and bottom search bar ppc button pop-uplorem toggle onClick search bar visibility and bottom search bar ppc button pop-up",
    time: 1593359018,
  },
  {
    id: "ft34f34",
    content:
      "lorem toggle onClick search bar visibility and bottom search bar ppc button pop-uplorem toggle onClick search bar visibility and bottom search bar ppc button pop-up",
    time: 1593540918,
  },
  {
    id: "4t3f4f",
    content:
      "lorem toggle onClick search bar visibility and bottom search bar ppc button pop-uplorem toggle onClick search bar visibility and bottom search bar ppc button pop-up",
    time: 1593544918,
  },
  {
    id: "34rd4r",
    content:
      "lorem toggle onClick search bar visibility and bottom search bar ppc button pop-uplorem toggle onClick search bar visibility and bottom search bar ppc button pop-up",
    time: 1593544918,
  },
  {
    id: "g6yf4",
    content:
      "lorem toggle onClick search bar visibility and bottom search bar ppc button pop-uplorem toggle onClick search bar visibility and bottom search bar ppc button pop-up",
    time: 1593544918,
  },
];

const FourCards = lazy(() => import("../layouts/fourCards/FourCards"));
const Footer = lazy(() => import("../layouts/footer/Footer"));
const TrippleInfoBanner = lazy(() =>
  import("../layouts/trippleInfoBanner/TrippleInfoBanner")
);
const Notice = lazy(() => import("./Notice"));
const AdCategoryGrid = lazy(() =>
  import("../layouts/adCategoryGrid/AdCategoryGrid")
);
const AgroServices = lazy(() => import("./AgroServices"));

const Solutions = () => {
  const data = dataSet;
  const notice = noticeData;

  let { path, url } = useRouteMatch();

  const [address, setAddress] = useState("");
  const [lat, setLat] = useState(undefined);
  const [long, setLong] = useState(undefined);

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
    <Switch>
      <Route exact strict path={path}>
        <div className="solution_main_div">
          <div className="solution_header">
            <img src="" alt="" />
          </div>
          <div className="solution_body">
            <div className="solution_body_top">
              <div className="solution_body_left">
                <div className="solution_loc_container">
                  <label
                    className="solution_loc_label"
                    htmlFor="solution_loc_imput"
                  >
                    Enter location to filter content...
                  </label>
                  <div className="solution_loc_autocomplete">
                    <PlacesAutocompleteAlt
                      address={address}
                      setAddress={setAddress}
                      setLat={setLat}
                      setLong={setLong}
                      placeholder="Default location: All India..."
                    />
                  </div>
                </div>
                <div className="solution_infographics">
                  <ErrorBoundary>
                    <Suspense fallback={<FallbackLazy />}>
                      <FourCards data={data} pcGap="16px" mobileGap="16px" />
                    </Suspense>
                  </ErrorBoundary>
                </div>
                <div className="solution_info_section">
                  <div className="solution_info_header">
                    Agricultural Services
                  </div>
                  <div className="solution_info_content">
                    <ErrorBoundary>
                      <Suspense fallback={<FallbackLazy />}>
                        <AgroServices />
                      </Suspense>
                    </ErrorBoundary>
                  </div>
                </div>
              </div>
              <div className="solution_body_right">
                <div className="solution_notice_board">
                  <div className="solution_notice_header">Notice board</div>
                  <div className="solution_notice_content">
                    {notice.map((item, index) => (
                      <Link
                        to={`${url}/${item.id}`}
                        key={item.id}
                        className="solution_notice_item"
                      >
                        <strong>{index + 1}</strong>. {item.content}
                        <br />
                        <strong>
                          <i
                            style={{ marginRight: "4px" }}
                            className="fas fa-clock"
                          ></i>
                          <em>{tstampToTime(item.time)}</em>
                        </strong>
                      </Link>
                    ))}
                  </div>
                </div>
                <div className="solution_contact_info"></div>
              </div>
            </div>
            {/* ad category */}
            <div className="solution_ad_cat ">
              <AdCategoryGrid dataList={AdCategoryData1} />
            </div>
            {/* ad category */}
            <div className="solution_ad_cat ">
              <AdCategoryGrid dataList={AdCategoryData2} />
            </div>
            <div className="solution_tripple_banner">
              <TrippleInfoBanner />
            </div>
            {/* ad category */}
            <div className="solution_ad_cat ">
              <AdCategoryGrid dataList={AdCategoryData1} />
            </div>
            {/* ad category */}
            <div className="solution_ad_cat ">
              <AdCategoryGrid dataList={AdCategoryData2} />
            </div>
            <div className="solution_tripple_banner">
              <TrippleInfoBanner />
            </div>
            {/* ad category */}
            <div className="solution_ad_cat ">
              <AdCategoryGrid dataList={AdCategoryData1} />
            </div>
            {/* ad category */}
            <div className="solution_ad_cat ">
              <AdCategoryGrid dataList={AdCategoryData2} />
            </div>
          </div>
          <div className="solution_footer">
            <ErrorBoundary>
              <Suspense fallback={<FallbackLazy />}>
                <Footer details={FooterDetails} />
              </Suspense>
            </ErrorBoundary>
          </div>
        </div>
      </Route>
      <Route path={`${path}/:solutionId`}>
        <Notice />
      </Route>
    </Switch>
  );
};

export default Solutions;
