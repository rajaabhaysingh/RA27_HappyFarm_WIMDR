import React, { memo } from "react";
import "./SellingNowItem.css";
import ProgressBar from "../../layouts/progressBar/ProgressBar";

const SellingNowItem = ({ item }) => {
  const calculatePercentage = () => {
    return (item.bQ / item.qty) * 100;
  };

  // renderButtons
  const renderButton = () => {
    if (item.p) {
      return (
        <button className="sell_now_btn sell_now_resume">
          <i className="fas fa-play"></i> RESUME SALE
        </button>
      );
    } else {
      return (
        <button className="sell_now_btn sell_now_pause">
          <i className="fas fa-pause"></i> PAUSE SALE
        </button>
      );
    }
  };

  const tstampToTime = (ts) => {
    const tsDate = new Date(ts * 1000);
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return (
      tsDate.getDate() +
      " " +
      months[tsDate.getMonth()] +
      " " +
      tsDate.getFullYear() +
      ",  " +
      tsDate.getHours() +
      ":" +
      tsDate.getMinutes() +
      ":" +
      tsDate.getSeconds()
    );
  };

  // renderProgressBar
  const renderProgressBar = () => {
    if (item.bQ) {
      return (
        <div className="sell_now_item_progress">
          <ProgressBar
            done={calculatePercentage()}
            symbol={"%"}
            textInfo={"booked"}
          />
        </div>
      );
    } else if (item.ts) {
      return (
        <div className="sell_now_timeStamp">
          Posted on: {tstampToTime(item.ts)}
        </div>
      );
    } else {
      return (
        <div className="sell_now_item_unknown">
          <i className="fas fa-exclamation-triangle"></i> We can't get product's
          status
        </div>
      );
    }
  };

  return (
    <div className="sell_now_main_div">
      <div className="sell_now_inner_div">
        <div className="sell_now_img_and_desc">
          <div className="sell_now_image">
            <img src={item.img} alt="" />
          </div>
          <div className="sell_now_details">
            <div className="sell_now_name_group">
              <div className="sell_now_name">{item.nm}</div>
              <span style={{ width: "8px" }}></span>
              <div className="sell_now_desc">
                {item.ty}, {item.ve}
              </div>
            </div>
            <div className="sell_now_qty">
              <strong>Lot size: </strong>
              {item.qty} {item.qtU}
            </div>
            <div className="sell_now_del_time">
              <em>Next delivery in: </em>
              <strong>{item.tm ? item.tm : "N/A"}</strong>
            </div>
            <div className="sell_now_price">
              Base price:{" "}
              <strong>
                ₹ {item.bp} / {item.bpU}
              </strong>
            </div>
            <div className="sell_now_shelf_life">
              Shelf life: {item.sl} {item.slU}
            </div>
            <div className="sell_now_progress_bar">{renderProgressBar()}</div>
          </div>
        </div>
        <div className="sell_now_spacer"></div>
        <div className="sell_now_utilities">
          <button className="sell_now_update_details">Update details</button>
          <div className="sell_now_spacer"></div>
          {renderButton()}
          <button className="sell_now_btn sell_now_remove">
            <i className="fas fa-trash-alt"></i> DELETE
          </button>
        </div>
      </div>
    </div>
  );
};

export default memo(SellingNowItem);
