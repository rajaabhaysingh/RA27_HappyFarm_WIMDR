import React, { lazy, Suspense, memo } from "react";
import "./ProductSlider.css";

import { Translate } from "react-auto-translate";

import FallbackLazy from "../../FallbackLazy";
import ErrorBoundary from "../../errorBoundary/ErrorBoundary";

const ProductSliderItem = lazy(() => import("./ProductSliderItem"));

function ProductSlider({ boldHeading, normalHeading, productsList }) {
  return (
    <div className="product_slider_main_div">
      <div className="product_slider_inner_main_div">
        <div className="product_slider_header">
          <div className="product_slider_header_content">
            <div className="product_slider_header_heading">
              <span>
                <strong>
                  <Translate>{boldHeading}</Translate>
                </strong>
              </span>
              <span>
                {" "}
                <Translate>{normalHeading}</Translate>{" "}
              </span>
            </div>
            <div className="product_slider_header_view_all">
              <button>
                <Translate>View all</Translate>
              </button>
            </div>
          </div>
        </div>
        <div className="product_slider_contents">
          <div className="product_slider_left_arrow">
            <i className="fas fa-angle-double-left"></i>
          </div>
          <div className="product_slider_container">
            <ErrorBoundary>
              <Suspense fallback={<FallbackLazy />}>
                {productsList.map((product) => (
                  <ProductSliderItem
                    key={product.id}
                    id={product.id}
                    isFresh={product.isFresh}
                    imageURL={
                      product.thumbnail
                        ? product.thumbnail
                        : product.alt_thumbnail
                    }
                    name={product.name}
                    prodRating={product.rating}
                    type={product.item_type}
                    category={product.category}
                    basePrice={product.basePrice}
                    pricePerUnit={product.pricePerUnit}
                    addedDigit={product.addedDigit ? product.addedDigit : 25}
                    addedUnit={
                      product.addedUnit ? product.addedUnit : "minutes"
                    }
                    location={product.location}
                    isNegotiable={product.is_negotiable}
                    sellerId={product.seller}
                  />
                ))}
              </Suspense>
            </ErrorBoundary>
          </div>
          <div className="product_slider_right_arrow">
            <i className="fas fa-angle-double-right"></i>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(ProductSlider);
