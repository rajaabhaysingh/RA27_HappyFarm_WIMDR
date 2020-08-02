import React, { memo } from "react";
import "./AdCategoryGrid.css";

import { Translate } from "react-auto-translate";

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
            <div className="adCat_heading_left_1">
              <Translate>{dataList.titleLeft1}</Translate>
            </div>
            <div className="adCat_heading_left_2">
              <Translate>{dataList.titleLeft2}</Translate>
            </div>
          </div>
          <div className="adCat_heading_right" style={fontColorWrapper}>
            <div className="adCat_heading_right_1">
              <Translate>{dataList.titleRight1}</Translate>
            </div>
            <button className="adCat_heading_right_2">
              <Translate>{dataList.titleRight2}</Translate>
            </button>
          </div>
        </div>
        <div className="adCat_body">
          <div className="adCat_grid">
            {dataList.adList.map((adElement) => (
              <div key={adElement.adId} className="adCat_box">
                <div className="adCat_box_top_info">
                  <Translate>{adElement.offerVal}</Translate>
                </div>
                <img src={adElement.adImgUrl} alt={adElement.adTitle} />
                <div className="adCat_adTitle">
                  <Translate>{adElement.adTitle}</Translate>
                </div>
                <div className="adCat_adDesc">
                  <Translate>{adElement.adDesc}</Translate>
                </div>
                <div className="adCat_adSubDesc">
                  <Translate>{adElement.adSubDesc}</Translate>
                </div>
                <button className="adCat_view_more_btn">
                  <Translate>View more</Translate>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(AdCategoryGrid);
