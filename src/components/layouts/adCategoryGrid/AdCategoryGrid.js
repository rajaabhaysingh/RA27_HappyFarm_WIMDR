import React from "react";
import "./AdCategoryGrid.css";

function AdCategoryGrid(props) {
  const data = props.dataList;

  let fontColorWrapper = {
    color: `${data.fontColor}`,
  };

  let bgImageWrapper = { backgroundImage: `${data.bgImage}` };

  if (window.innerWidth > 1024) {
    bgImageWrapper = { backgroundImage: `${data.bgImagePC}` };
    fontColorWrapper = { color: `${data.fontColorPC}` };
  }

  return (
    <div className="adCat_outer_div">
      <div className="adCat_inner_div" style={bgImageWrapper}>
        <div className="adCat_header">
          <div className="adCat_heading_left" style={fontColorWrapper}>
            <div className="adCat_heading_left_1">{data.titleLeft1}</div>
            <div className="adCat_heading_left_2">{data.titleLeft2}</div>
          </div>
          <div className="adCat_heading_right" style={fontColorWrapper}>
            <div className="adCat_heading_right_1">{data.titleRight1}</div>
            <button className="adCat_heading_right_2">
              {data.titleRight2}
            </button>
          </div>
        </div>
        <div className="adCat_body">
          <div className="adCat_grid">
            {data.adList.map((adElement) => (
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

export default AdCategoryGrid;
