import React, { lazy, memo, Suspense } from "react";
import "./FarmerSliderItem.css";

import FallbackLazy from "../../FallbackLazy";
import ErrorBoundary from "../../errorBoundary/ErrorBoundary";

const StarComponent = lazy(() => import("../starComponent/StarComponent"));

function FarmerSliderItem({ dpUrl, name, place, rating, productUrl }) {
  // handleFarmerProfileClick
  const handleFarmerProfileClick = () => {
    console.log(name);
  };

  // handleFollowBtnClick
  const handleFollowBtnClick = (e) => {
    console.log("followed");
  };

  // handleShowProductLink
  const handleShowProductLink = (e) => {
    console.log("show product clicked");
  };

  return (
    <div className="farmer_slider_item_main_div">
      <div className="farmer_slider_item">
        <div
          className="farmer_slider_item_profile"
          onClick={() => handleFarmerProfileClick()}
        >
          <div className="farmer_slider_item_image">
            <img src={dpUrl} alt="farmer" />
          </div>
          <div className="farmer_slider_item_details">
            <div className="farmer_slider_name">{name}</div>
            <div className="farmer_slider_place">{place}</div>
            <div className="farmer_slider_star_rating">
              <ErrorBoundary>
                <Suspense fallback={<FallbackLazy />}>
                  <StarComponent rating={rating} />
                </Suspense>
              </ErrorBoundary>
            </div>
          </div>
        </div>
        <div className="farmer_slider_item_utility">
          <div className="farmer_slider_show_product_link">
            <a href={productUrl} onClick={() => handleShowProductLink}>
              Products
            </a>
          </div>
          <button
            className="farmer_slider_follow_toggle_button"
            onClick={() => handleFollowBtnClick}
          >
            <i style={{ marginRight: "4px" }} className="fas fa-user-plus"></i>
            Follow
          </button>
        </div>
      </div>
      <div className="ad_label"></div>
    </div>
  );
}

export default memo(FarmerSliderItem);
