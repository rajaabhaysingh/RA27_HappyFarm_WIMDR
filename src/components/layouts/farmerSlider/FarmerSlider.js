import React, { memo, lazy, Suspense } from "react";
import "./FarmerSlider.css";

import { Translate } from "react-auto-translate";

import FallbackLazy from "../../FallbackLazy";
import ErrorBoundary from "../../errorBoundary/ErrorBoundary";

const FarmerSliderItem = lazy(() => import("./FarmerSliderItem"));

function FarmerSlider({ boldHeading, normalHeading, farmersList }) {
  return (
    <div className="farmer_slider_main_div">
      <div className="farmer_slider_inner_main_div">
        <div className="farmer_slider_header">
          <div className="farmer_slider_header_content">
            <div className="farmer_slider_header_heading">
              <span>
                <strong>
                  <Translate>{boldHeading}</Translate>{" "}
                </strong>
              </span>
              <span>
                <Translate>{normalHeading}</Translate>
              </span>
            </div>
            <div className="farmer_slider_header_view_all">
              <button>
                <Translate>View all</Translate>
              </button>
            </div>
          </div>
        </div>
        <div className="farmer_slider_contents">
          <div className="farmer_slider_left_arrow">
            <i className="fas fa-angle-double-left"></i>
          </div>
          <div className="farmer_slider_container">
            <ErrorBoundary>
              <Suspense fallback={<FallbackLazy />}>
                {console.log(farmersList)}
                {farmersList.map((farmer) => (
                  <FarmerSliderItem
                    key={farmer.id.name}
                    id={farmer.id.value}
                    name={`${farmer.name.title} ${farmer.name.first} ${farmer.name.last}`}
                    place={`${farmer.location.city}, ${farmer.location.state} `}
                    dpUrl={farmer.picture.thumbnail}
                    rating={`${Math.floor(Math.random() * 5)}`}
                    profileUrl={"/"}
                    productUrl={"/"}
                    isAd={farmer.dob.age > 25 ? true : false}
                  />
                ))}
              </Suspense>
            </ErrorBoundary>
          </div>

          <div className="farmer_slider_right_arrow">
            <i className="fas fa-angle-double-right"></i>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(FarmerSlider);
