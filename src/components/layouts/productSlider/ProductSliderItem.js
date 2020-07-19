import React, { memo, lazy, Suspense } from "react";
import "./ProductSliderItem.css";

import FallbackLazy from "../../FallbackLazy";
import ErrorBoundary from "../../errorBoundary/ErrorBoundary";

const StarComponent = lazy(() => import("../starComponent/StarComponent"));

function ProductSliderItem({
  isFresh,
  isNegotiable,
  imageURL,
  name,
  prodRating,
  type,
  category,
  basePrice,
  pricePerUnit,
  addedDigit,
  addedUnit,
  location,
}) {
  let ContactSeller = "CALL SELLER";
  const screenSize = window.innerWidth;
  if (screenSize < 1024) {
    ContactSeller = "CALL";
  }

  let negotiableWrapper = { border: "1px solid #cc0000" };
  if (isNegotiable) {
    negotiableWrapper = { border: "1px solid #00cc00" };
  }

  // renderFreshTag
  const renderFreshTag = () => {
    if (isFresh) {
      return <div className="product_fresh_tag">FRESH</div>;
    }
  };

  return (
    <div className="product_slider_item_main_div">
      {renderFreshTag()}
      <div className="product_slider_item_inner_div">
        <div className="product_detail_group">
          <div className="product_image">
            <img src={imageURL} alt="product_image" />
          </div>
          <div className="product_name_and_seller">
            <div className="product_name">{name}</div>
            <ErrorBoundary>
              <Suspense fallback={<FallbackLazy />}>
                <StarComponent rating={prodRating} />
              </Suspense>
            </ErrorBoundary>
          </div>
          <div className="product_desc">
            <div className="product_type">{type}</div>
            <span>, </span>
            <div className="product_category">{category}</div>
          </div>
          <div className="product_price">
            <div className="product_base_price">₹ {basePrice}</div>
            <div className="product_price_per_unit">/ {pricePerUnit}*</div>
          </div>
          <div className="product_posted">
            <div className="product_posted_icon">
              <i className="fas fa-clock"></i>
            </div>
            <div className="product_posted_text">Added:</div>
            <div className="product_posted_digit">{addedDigit}</div>
            <div className="product_posted_unit">{addedUnit} ago</div>
          </div>
          <div className="product_location">
            <div className="product_location_icon">
              <i className="fas fa-map-marker-alt"></i>
            </div>
            <div className="product_location_place">{location}</div>
          </div>
        </div>
        <div className="product_utility_group">
          <div className="product_utility">
            <div className="product_contact_utility">
              <button>
                <div className="contact_symbol">
                  <i className="fas fa-phone-alt"></i>
                </div>
                <div className="button_text">{ContactSeller}</div>
              </button>
            </div>
            <div className="product_other_utility">
              <div style={negotiableWrapper} className="product_is_negotiable">
                <i className="fas fa-comments"></i>
              </div>
              <div className="product_add_to_fav">
                <i className="fas fa-heart"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(ProductSliderItem);
