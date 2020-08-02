import React from "react";
import "./FourCards.css";

import { Translate } from "react-auto-translate";

const FourCards = ({ data, pcGap, mobileGap }) => {
  return (
    <div
      style={
        window.innerWidth < 640 ? { gap: `${mobileGap}` } : { gap: `${pcGap}` }
      }
      className="four_cards_main"
    >
      {data.map((item) => (
        <div key={item.id} className="four_cards_item">
          <div className="four_cards_item_graphics">
            <img src={item.imgUrl} alt="" />
          </div>
          <div className="four_cards_item_heading">
            <Translate>{item.heading}</Translate>
          </div>
          <div className="four_cards_item_desc">
            <Translate>{item.desc}</Translate>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FourCards;
