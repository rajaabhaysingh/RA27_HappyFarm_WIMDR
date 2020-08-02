import React from "react";
import "./CategoryScrollItem.css";

import { Link } from "react-router-dom";
import { Translate } from "react-auto-translate";

function CategoryScrollItem(props) {
  const handleItemClick = () => {
    try {
      console.log(props.categoryName);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Link
      to={`/products/search?q=${props.categoryName}`}
      style={{ textDecoration: "none", color: "inherit" }}
      className="category_item"
      onClick={() => handleItemClick()}
    >
      <div className="category_image">
        <img src={props.iconUrl} alt="category_item" />
      </div>
      <div className="category_name">
        <Translate>{props.categoryName}</Translate>
      </div>
    </Link>
  );
}

export default CategoryScrollItem;
