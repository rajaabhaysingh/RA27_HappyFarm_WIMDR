import React, { useState, memo, lazy, Suspense } from "react";
import "./BulkDealItem.css";

import { Translate } from "react-auto-translate";

import FallbackLazy from "../../FallbackLazy";
import ErrorBoundary from "../../errorBoundary/ErrorBoundary";

const StarComponent = lazy(() => import("../starComponent/StarComponent"));
const ProgressBar = lazy(() => import("../progressBar/ProgressBar"));

function BulkDealItem({
  imageURL,
  name,
  breed,
  category,
  location,
  lotSizeDigit,
  lotSizeUnit,
  basePrice,
  pricePerUnit,
  sellerRating,
  delTime,
  soldPercent,
}) {
  const [bookQtyUnit, setBookQtyUnit] = useState("kg");

  const handleChange = (event) => {
    setBookQtyUnit(event.target.value);
  };

  const handleSubmit = (event) => {
    try {
      alert("Option selected is: " + bookQtyUnit);
      event.preventDefault();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bulk_outer_main_div">
      <div className="bulk_inner_main_div">
        <div className="bulk_content">
          <div className="bulk_info_top">
            <div className="bulk_info_top_left">
              <div className="bulk_details_pri">
                <div className="bulk_image">
                  <img src={imageURL} alt="product" />
                </div>
                <div className="bulk_primary_details">
                  <div className="bulk_name">
                    <Translate>{name}</Translate>
                  </div>
                  <div className="bulk_desc">
                    <Translate>{breed}</Translate>,{" "}
                    <Translate>{category}</Translate>
                  </div>
                  <div className="bulk_location">
                    <i className="fas fa-map-marker-alt"></i> &nbsp;
                    <Translate>{location}</Translate>
                  </div>
                </div>
              </div>
              <div className="bulk_details_sec">
                <div className="bulk_lot_size">
                  <Translate>Stock size:</Translate>{" "}
                  <Translate>
                    {lotSizeDigit}
                    {lotSizeUnit}
                  </Translate>
                </div>
                <div className="bulk_price">
                  <span style={{ color: "#5c5c5c" }}>
                    <Translate>Base price:</Translate>
                  </span>
                  &nbsp;
                  <span style={{ fontWeight: "bold" }}>
                    <Translate>
                      {basePrice} / {pricePerUnit}
                    </Translate>
                  </span>
                </div>
              </div>
            </div>
            <div className="bulk_info_top_right">
              <button className="bulk_product_contact_btn">
                <i className="fas fa-phone-alt"></i>{" "}
                <Translate>CONTACT</Translate>
              </button>
              <div className="bulk_profile_link">
                <Translate>SELLER PROFILE</Translate>
              </div>
              <div className="bulk_rating">
                <div className="bulk_rating_star">
                  <ErrorBoundary>
                    <Suspense fallback={<FallbackLazy />}>
                      <StarComponent rating={sellerRating} />
                    </Suspense>
                  </ErrorBoundary>
                </div>
                <div className="bulk_rating_text">
                  <Translate>SELLER RATING</Translate>
                </div>
              </div>
              <div className="bulk_utility">
                <div className="bulk_utility_nego">
                  <i className="fas fa-comments"></i>
                </div>
                <div className="bulk_utility_fav">
                  <i className="fas fa-heart"></i>
                </div>
              </div>
            </div>
          </div>
          <div className="bulk_info_mid">
            <div className="bulk_expected_del_icon">
              <i className="fas fa-clock"></i>
            </div>
            <div className="bulk_expected_del_text">
              <Translate>Next delivery in:</Translate>
            </div>
            <div className="bulk_expected_del_time">
              <Translate>{delTime}</Translate>*
            </div>
          </div>
          <div className="bulk_info_bottom">
            <form onSubmit={handleSubmit}>
              <div className="bulk_form_left">
                <label className="bulk_book_label">
                  <Translate>Your need:</Translate>
                  <div className="bulk_form_input_container">
                    <input
                      placeholder="Enter qty"
                      required
                      type="text"
                      className="bulk_qty_input"
                    />
                    <select
                      className="bulk_book_select"
                      value={bookQtyUnit}
                      onChange={handleChange}
                    >
                      <option className="bulk_book_option" value="mg">
                        mg
                      </option>
                      <option className="bulk_book_option" value="g">
                        gram
                      </option>
                      <option
                        className="bulk_book_option"
                        defaultValue
                        value="kg"
                      >
                        kg
                      </option>
                      <option className="bulk_book_option" value="quintel">
                        quintel
                      </option>
                    </select>
                  </div>
                </label>
              </div>
              <input
                className="bulk_book_now_btn"
                type="submit"
                value="BOOK NOW"
              />
            </form>
          </div>
        </div>
        <div className="bulk_status_bar">
          <ErrorBoundary>
            <Suspense className={<FallbackLazy />}>
              <ProgressBar done={soldPercent} textInfo="sold" symbol={"%"} />
            </Suspense>
          </ErrorBoundary>
        </div>
      </div>
    </div>
  );
}

export default memo(BulkDealItem);
