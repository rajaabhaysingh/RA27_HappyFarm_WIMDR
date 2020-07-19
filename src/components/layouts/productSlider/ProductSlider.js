import React, { lazy, Suspense, memo } from "react";
import "./ProductSlider.css";

import DoubleLeftOutlined from "@ant-design/icons/DoubleLeftOutlined";
import DoubleRightOutlined from "@ant-design/icons/DoubleRightOutlined";

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
                <strong>{boldHeading}</strong>
              </span>
              <span> {normalHeading} </span>
            </div>
            <div className="product_slider_header_view_all">
              <button>View all</button>
            </div>
          </div>
        </div>
        <div className="product_slider_contents">
          <div className="product_slider_left_arrow">
            <DoubleLeftOutlined />
          </div>
          <div className="product_slider_container">
            <ErrorBoundary>
              <Suspense fallback={<FallbackLazy />}>
                {productsList.map((product) => (
                  <ProductSliderItem
                    key={product.id}
                    id={product.id}
                    isFresh={product.isFresh}
                    imageURL={product.imageURL}
                    name={product.name}
                    prodRating={product.prodRating}
                    type={product.type}
                    category={product.category}
                    basePrice={product.basePrice}
                    pricePerUnit={product.pricePerUnit}
                    addedDigit={product.addedDigit}
                    addedUnit={product.addedUnit}
                    location={product.location}
                    isNegotiable={product.isNegotiable}
                    sellerId={product.sellerId}
                  />
                ))}
              </Suspense>
            </ErrorBoundary>
          </div>
          <div className="product_slider_right_arrow">
            <DoubleRightOutlined />
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(ProductSlider);
