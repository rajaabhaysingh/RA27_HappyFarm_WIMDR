import React from "react";
import "./CategoryScrollItem.css";

function CategoryScrollItem(props) {
  const handleItemClick = () => {
    console.log(props.categoryName);
  };

  return (
    <div className="category_item" onClick={() => handleItemClick()}>
      <div className="category_image">
        <img src={props.iconURL} alt="category_item" />
      </div>
      <div className="category_name">{props.categoryName}</div>
    </div>
  );
}

export default CategoryScrollItem;
