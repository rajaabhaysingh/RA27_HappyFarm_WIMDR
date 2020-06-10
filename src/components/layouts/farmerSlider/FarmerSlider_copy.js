import React, { memo, lazy, Suspense } from "react";
import "./FarmerSlider.css";

import { DoubleLeftOutlined, DoubleRightOutlined } from "@ant-design/icons";

import FallbackLazy from "../../FallbackLazy";
import ErrorBoundary from "../../errorBoundary/ErrorBoundary";

import {
  List,
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache,
} from "react-virtualized";

import { ColumnSizer, Grid } from "react-virtualized";

const FarmerSliderItem = lazy(() => import("./FarmerSliderItem"));

function FarmerSlider({ boldHeading, normalHeading, farmersList }) {
  const child = () => {
    return (
      <div>
        {farmersList.map((farmer) => (
          <ErrorBoundary>
            <Suspense fallback={<FallbackLazy />}>
              <FarmerSliderItem
                key={farmer.id}
                name={farmer.name}
                place={farmer.place}
                dpUrl={farmer.dpUrl}
                rating={farmer.rating}
                profileUrl={farmer.profileUrl}
                productUrl={farmer.productUrl}
                isAd={farmer.isAd}
              />
            </Suspense>
          </ErrorBoundary>
        ))}
      </div>
    );
  };

  return (
    <div className="farmer_slider_main_div">
      <div className="farmer_slider_inner_main_div">
        <div className="farmer_slider_header">
          <div className="farmer_slider_header_content">
            <div className="farmer_slider_header_heading">
              <span>
                <strong>{boldHeading} </strong>
              </span>
              <span>{normalHeading}</span>
            </div>
            <div className="farmer_slider_header_view_all">
              <button>View all</button>
            </div>
          </div>
        </div>
        <div className="farmer_slider_contents">
          <div className="farmer_slider_left_arrow">
            <DoubleLeftOutlined />
          </div>
          <div className="farmer_slider_container">
            {farmersList.map((farmer) => (
              <ErrorBoundary>
                <Suspense fallback={<FallbackLazy />}>
                  <FarmerSliderItem
                    key={farmer.id}
                    name={farmer.name}
                    place={farmer.place}
                    dpUrl={farmer.dpUrl}
                    rating={farmer.rating}
                    profileUrl={farmer.profileUrl}
                    productUrl={farmer.productUrl}
                    isAd={farmer.isAd}
                  />
                </Suspense>
              </ErrorBoundary>
            ))}
          </div>
          <div className="farmer_slider_right_arrow">
            <DoubleRightOutlined />
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(FarmerSlider);
