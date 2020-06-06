import React, { useState } from "react";
import "./BulkDealItem.css";
import {
  ClockCircleOutlined,
  EnvironmentOutlined,
  HeartFilled,
  PhoneFilled,
  MessageFilled,
} from "@ant-design/icons";
import StarComponent from "../starComponent/StarComponent";
import ProgressBar from "../progressBar/ProgressBar";

function BulkDealItem(props) {
  const [bookQtyUnit, setBookQtyUnit] = useState("kg");

  const handleChange = (event) => {
    setBookQtyUnit(event.target.value);
  };

  const handleSubmit = (event) => {
    alert("Option selected is: " + bookQtyUnit);
    event.preventDefault();
  };

  return (
    <div className="bulk_outer_main_div">
      <div className="bulk_inner_main_div">
        <div className="bulk_content">
          <div className="bulk_info_top">
            <div className="bulk_info_top_left">
              <div className="bulk_details_pri">
                <div className="bulk_image">
                  <img src={props.imageURL} alt="product" />
                </div>
                <div className="bulk_primary_details">
                  <div className="bulk_name">{props.name}</div>
                  <div className="bulk_desc">
                    <div className="bulk_breed">{props.breed},</div>
                    <div className="bulk_type">{props.category}</div>
                  </div>
                  <div className="bulk_location">
                    <div className="bulk_loc_icon">
                      <EnvironmentOutlined />
                    </div>
                    <div className="bulk_loc_text">{props.location}</div>
                  </div>
                </div>
              </div>
              <div className="bulk_details_sec">
                <div className="bulk_lot_size">
                  <div className="bulk_lot_size_text">Stock size:</div>
                  <div className="bulk_lot_size_digit">
                    {props.lotSizeDigit}
                  </div>
                  <div className="bulk_lot_size_unit">{props.lotSizeUnit}</div>
                </div>
                <div className="bulk_price">
                  <div className="bulk_price_text">Base price:</div>
                  <div className="bulk_price_amount">₹ {props.basePrice}</div>
                  <div className="bulk_price_per_unit">
                    / {props.pricePerUnit}
                  </div>
                </div>
              </div>
            </div>
            <div className="bulk_info_top_right">
              <div className="bulk_product_contact_utility">
                <button>
                  <div className="bulk_contact_symbol">
                    <PhoneFilled rotate="90" />
                  </div>
                  <div className="bulk_button_text">CONTACT</div>
                </button>
              </div>
              <div className="bulk_profile_link">SELLER PROFILE</div>
              <div className="bulk_rating">
                <div className="bulk_rating_star">
                  <StarComponent rating={props.sellerRating} />
                </div>
                <div className="bulk_rating_text">SELLER RATING</div>
              </div>
              <div className="bulk_utility">
                <div className="bulk_utility_nego">
                  <MessageFilled />
                </div>
                <div className="bulk_utility_fav">
                  <HeartFilled />
                </div>
              </div>
            </div>
          </div>
          <div className="bulk_info_mid">
            <div className="bulk_expected_del_icon">
              <ClockCircleOutlined />
            </div>
            <div className="bulk_expected_del_text">Next delivery in:</div>
            <div className="bulk_expected_del_time">{props.delTime}*</div>
          </div>
          <div className="bulk_info_bottom">
            <form onSubmit={handleSubmit}>
              <div className="bulk_form_left">
                <label className="bulk_book_label">
                  Your need:
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
                        g
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
        <div className="bulk_status">
          <div className="bulk_status_bar">
            <ProgressBar
              done={props.soldPercent}
              textInfo="sold"
              refreshTime="3000"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default BulkDealItem;
