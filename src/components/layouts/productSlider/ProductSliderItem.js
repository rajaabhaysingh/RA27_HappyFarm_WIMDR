import React, { memo } from "react";
import "./ProductSliderItem.css";

import ClockCircleOutlined from "@ant-design/icons/ClockCircleOutlined";
import EnvironmentOutlined from "@ant-design/icons/EnvironmentOutlined";
import HeartFilled from "@ant-design/icons/HeartFilled";
import MessageFilled from "@ant-design/icons/MessageFilled";
import PhoneFilled from "@ant-design/icons/PhoneFilled";

function ProductSliderItem({
  isFresh,
  isNegotiable,
  imageURL,
  name,
  otherSellers,
  type,
  category,
  basePrice,
  pricePerUnit,
  addedDigit,
  addedUnit,
  location,
}) {
  let ContactSeller = "CONTACT SELLER";
  const screenSize = window.innerWidth;
  if (screenSize < 1024) {
    ContactSeller = "CONTACT";
  }

  let freshWrapper = {};
  if (!isFresh) {
    freshWrapper = { display: "none" };
  }

  let negotiableWrapper = { border: "2px solid #cc0000" };
  if (isNegotiable) {
    negotiableWrapper = { border: "2px solid #00cc00" };
  }

  return (
    <div className="product_slider_item_main_div">
      <div style={freshWrapper} className="product_fresh_tag">
        FRESH
      </div>
      <div className="product_detail_group">
        <div className="product_image">
          <img src={imageURL} alt="product_image" />
        </div>
        <div className="product_name_and_seller">
          <div className="product_name">{name}</div>
          <div className="total_sellers">({otherSellers} other sellers)</div>
        </div>
        <div className="product_desc">
          <div className="product_type">{type}</div>
          <span>, </span>
          <div className="product_category">{category}</div>
        </div>
        <div className="product_price">
          <div className="product_rate_text">Price:</div>
          <div className="product_base_price">₹ {basePrice}</div>
          <div className="product_price_per_unit">/ {pricePerUnit}*</div>
        </div>
        <div className="product_posted">
          <div className="product_posted_icon">
            <ClockCircleOutlined />
          </div>
          <div className="product_posted_text">Added:</div>
          <div className="product_posted_digit">{addedDigit}</div>
          <div className="product_posted_unit">{addedUnit} ago</div>
        </div>
        <div className="product_location">
          <div className="product_location_icon">
            <EnvironmentOutlined />
          </div>
          <div className="product_location_place">{location}</div>
        </div>
      </div>
      <div className="product_utility_group">
        <div className="product_utility">
          <div className="product_contact_utility">
            <button>
              <div className="contact_symbol">
                <PhoneFilled rotate="90" />
              </div>
              <div className="button_text">{ContactSeller}</div>
            </button>
          </div>
          <div className="product_other_utility">
            <div style={negotiableWrapper} className="product_is_negotiable">
              <MessageFilled />
            </div>
            <div className="product_add_to_fav">
              <HeartFilled />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(ProductSliderItem);
