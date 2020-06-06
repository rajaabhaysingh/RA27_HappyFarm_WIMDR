import React from "react";
import "./CategoryScroll.css";
import CategoryScrollItem from "./CategoryScrollItem";

function CategoryScroll(props) {
  return (
    <div className="category_scroll_main_div">
      <div className="category_scroll_inner_div">
        {props.categoryList.map((category) => (
          <CategoryScrollItem
            key={category.name}
            categoryName={category.name}
            iconURL={category.catIconUrl}
          />
        ))}
      </div>
    </div>
  );
}

export default CategoryScroll;
