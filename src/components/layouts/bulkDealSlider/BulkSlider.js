import React, { memo, lazy, Suspense } from "react";
import "./BulkSlider.css";

import FallbackLazy from "../../FallbackLazy";
import ErrorBoundary from "../../errorBoundary/ErrorBoundary";

const BulkDealItem = lazy(() => import("./BulkDealItem"));

function BulkSlider({ productsList, boldHeading, normalHeading }) {
  return (
    <div className="bulk_slider_main_div">
      <div className="bulk_slider_inner_main_div">
        <div className="bulk_slider_header">
          <div className="bulk_slider_header_content">
            <div className="bulk_slider_header_heading">
              <span>
                <strong>{boldHeading} </strong>
              </span>
              <span>{normalHeading}</span>
            </div>
            <div className="bulk_slider_header_view_all">
              <button>View all</button>
            </div>
          </div>
        </div>
        <div className="bulk_slider_contents">
          <div className="bulk_slider_left_arrow">
            <i className="fas fa-angle-double-left"></i>
          </div>
          <div className="bulk_slider_container">
            <ErrorBoundary>
              <Suspense fallback={<FallbackLazy />}>
                {productsList.map((product) => (
                  <BulkDealItem
                    key={product.id}
                    id={product.id}
                    imageURL={
                      product.thumbnail
                        ? product.thumbnail
                        : product.alt_thumbnail
                    }
                    name={product.name}
                    breed={product.breed}
                    location={product.location}
                    category={product.category}
                    lotSizeDigit={product.lotSizeDigit}
                    lotSizeUnit={product.lotSizeUnit}
                    basePrice={product.basePrice}
                    basePricePerUnit={product.basePricePerUnit}
                    sellerId={product.seller}
                    sellerRating={product.rating}
                    isNegotiable={product.isNegotiable}
                    delTime={`${(Math.random() * 4).toFixed(1)} hours`}
                    minBookVal={product.minBookVal}
                    minBookValUnit={product.minBookValUnit}
                    maxBookVal={product.maxBookVal}
                    maxBookValUnit={product.maxBookValUnit}
                    soldPercent={product.soldPercent}
                  />
                ))}
              </Suspense>
            </ErrorBoundary>
          </div>
          <div className="bulk_slider_right_arrow">
            <i className="fas fa-angle-double-right"></i>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(BulkSlider);
