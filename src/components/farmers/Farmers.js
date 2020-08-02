import React, { useEffect, useState, lazy, Suspense } from "react";
import "./Farmers.css";

import axios from "axios";

import FallbackLazy from "../FallbackLazy";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

import Placeholder from "../../res/categoryScroll/placeholder.svg";

// import FarmersList from "../layouts/farmerSlider/FarmerSliderList";
import FooterDetails from "../layouts/footer/FooterDetails";
const data = [
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

const FourCards = lazy(() => import("../layouts/fourCards/FourCards"));
const FarmerSlider = lazy(() => import("../layouts/farmerSlider/FarmerSlider"));
const TrippleInfoBanner = lazy(() =>
  import("../layouts/trippleInfoBanner/TrippleInfoBanner")
);
const Footer = lazy(() => import("../layouts/footer/Footer"));

const Farmers = () => {
  // ----- fetching data state mgmt -----
  const baseUrl = "https://abhijitpatil.pythonanywhere.com";

  const [FarmersList, setFarmersList] = useState([]);

  // dataFetcher
  const dataFetcher = async () => {
    let farmers = await axios
      .get("https://randomuser.me/api/?results=20")
      .catch((error) => {
        console.log(error);
      });
    setFarmersList(farmers.data.results);
  };

  // ------------------------------------

  useEffect(() => {
    dataFetcher();
  }, []);

  useEffect(() => {
    console.log();
  }, [FarmersList]);

  // handleFarmersSearch
  const [farmerSearch, setFarmerSearch] = useState("");

  const handleFarmersSearch = (e) => {
    e.preventDefault();
  };

  return (
    <div className="farmers_main_div">
      <div className="farmers_header">
        <div className="farmers_header_content">
          <img src={Placeholder} alt="" />
        </div>
        <div className="farmers_search_bar">
          <form className="farmers_search_form" onSubmit={handleFarmersSearch}>
            <input
              required
              value={farmerSearch}
              onChange={(e) => setFarmerSearch(e.target.value)}
              className="farmers_search_input"
              type="text"
              placeholder="Search farmers to view profile..."
            />
            <button className="farmers_search_btn">
              <i style={{ marginRight: "8px" }} className="fas fa-search"></i>{" "}
              Search
            </button>
          </form>
        </div>
      </div>
      <div className="farmers_stats">
        <ErrorBoundary>
          <Suspense fallback={<FallbackLazy />}>
            <FourCards data={data} pcGap="32px" mobileGap="16px" />
          </Suspense>
        </ErrorBoundary>
      </div>
      <div className="farmers_suggestions">
        {/* Farmer slider - active farmers */}
        <ErrorBoundary>
          <Suspense fallback={<FallbackLazy />}>
            <FarmerSlider
              farmersList={FarmersList}
              boldHeading="Farmer suggestions"
              normalHeading="in your area"
              viewAllLink="#"
            />
          </Suspense>
        </ErrorBoundary>
      </div>
      <div className="farmers_load_more"></div>
      {/* tripple banner */}
      <div className="farmers_tripple_banner">
        <ErrorBoundary>
          <Suspense fallback={<FallbackLazy />}>
            <TrippleInfoBanner />
          </Suspense>
        </ErrorBoundary>
      </div>
      {/* Farmer slider - active farmers */}
      <div className="farmers_suggestions">
        <ErrorBoundary>
          <Suspense fallback={<FallbackLazy />}>
            <FarmerSlider
              farmersList={FarmersList}
              boldHeading="Rising farmers"
              normalHeading="in your area"
              viewAllLink="#"
            />
          </Suspense>
        </ErrorBoundary>
      </div>
      <div className="farmers_footer">
        <ErrorBoundary>
          <Suspense fallback={<FallbackLazy />}>
            <Footer details={FooterDetails} />
          </Suspense>
        </ErrorBoundary>
      </div>
    </div>
  );
};

export default Farmers;
