import React from "react";
import "./FarmerSliderItem.css";
import { UserAddOutlined } from "@ant-design/icons";
import StarComponent from "../starComponent/StarComponent";

function FarmerSliderItem(props) {
  // handleFarmerProfileClick
  const handleFarmerProfileClick = () => {
    console.log(props.name);
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
            <img src={props.dpUrl} alt="farmer" />
          </div>
          <div className="farmer_slider_item_details">
            <div className="farmer_slider_name">{props.name}</div>
            <div className="farmer_slider_place">{props.place}</div>
            <div className="farmer_slider_star_rating">
              <StarComponent rating={props.rating} />
            </div>
          </div>
        </div>
        <div className="farmer_slider_item_utility">
          <div className="farmer_slider_show_product_link">
            <a href={props.productUrl} onClick={() => handleShowProductLink}>
              Show products
            </a>
          </div>
          <div className="farmer_slider_follow_toggle_button_container">
            {/* trigger follow function on click of follow button */}
            <button
              className="farmer_slider_follow_toggle_button"
              onClick={() => handleFollowBtnClick}
            >
              <div className="farmer_slider_plus_symbol">
                <UserAddOutlined />
              </div>
              <div className="farmer_slider_follow_text">Follow</div>
            </button>
          </div>
        </div>
      </div>
      <div className="ad_label"></div>
    </div>
  );
}

export default FarmerSliderItem;
