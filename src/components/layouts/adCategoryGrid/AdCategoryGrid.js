import React, { memo } from "react";
import "./AdCategoryGrid.css";

function AdCategoryGrid({ dataList }) {
  let fontColorWrapper = {
    color: `${dataList.fontColor}`,
  };

  let bgImageWrapper = { backgroundImage: `${dataList.bgImage}` };

  if (window.innerWidth > 1024) {
    bgImageWrapper = { backgroundImage: `${dataList.bgImagePC}` };
    fontColorWrapper = { color: `${dataList.fontColorPC}` };
  }

  return (
    <div className="adCat_outer_div">
      <div className="adCat_inner_div" style={bgImageWrapper}>
        <div className="adCat_header">
          <div className="adCat_heading_left" style={fontColorWrapper}>
            <div className="adCat_heading_left_1">{dataList.titleLeft1}</div>
            <div className="adCat_heading_left_2">{dataList.titleLeft2}</div>
          </div>
          <div className="adCat_heading_right" style={fontColorWrapper}>
            <div className="adCat_heading_right_1">{dataList.titleRight1}</div>
            <button className="adCat_heading_right_2">
              {dataList.titleRight2}
            </button>
          </div>
        </div>
        <div className="adCat_body">
          <div className="adCat_grid">
            {dataList.adList.map((adElement) => (
              <div key={adElement.adId} className="adCat_box">
                <div className="adCat_box_top_info">{adElement.offerVal}</div>
                <img src={adElement.adImgUrl} alt={adElement.adTitle} />
                <div className="adCat_adTitle">{adElement.adTitle}</div>
                <div className="adCat_adDesc">{adElement.adDesc}</div>
                <div className="adCat_adSubDesc">{adElement.adSubDesc}</div>
                <button className="adCat_view_more_btn">View more</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(AdCategoryGrid);
