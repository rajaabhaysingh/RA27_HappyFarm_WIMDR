import React from "react";
import "./FourCards.css";

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
          <div className="four_cards_item_heading">{item.heading}</div>
          <div className="four_cards_item_desc">{item.desc}</div>
        </div>
      ))}
    </div>
  );
};

export default FourCards;
