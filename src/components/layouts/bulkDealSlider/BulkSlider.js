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
                    imageURL={product.imageURL}
                    name={product.name}
                    breed={product.breed}
                    location={product.location}
                    category={product.category}
                    lotSizeDigit={product.lotSizeDigit}
                    lotSizeUnit={product.lotSizeUnit}
                    basePrice={product.basePrice}
                    pricePerUnit={product.pricePerUnit}
                    sellerId={product.sellerId}
                    sellerRating={product.sellerRating}
                    isNegotiable={product.isNegotiable}
                    delTime={product.delTime}
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
