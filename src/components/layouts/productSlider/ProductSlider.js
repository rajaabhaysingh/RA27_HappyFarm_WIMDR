import React from "react";
import "./ProductSlider.css";
import ProductSliderItem from "./ProductSliderItem";
import { DoubleLeftOutlined, DoubleRightOutlined } from "@ant-design/icons";

function ProductSlider(props) {
  return (
    <div className="product_slider_main_div">
      <div className="product_slider_inner_main_div">
        <div className="product_slider_header">
          <div className="product_slider_header_content">
            <div className="product_slider_header_heading">
              <span>
                <strong>{props.boldHeading}</strong>
              </span>
              <span> {props.normalHeading} </span>
            </div>
            <div className="product_slider_header_view_all">
              <button>View all</button>
            </div>
          </div>
        </div>
        <div className="product_slider_contents">
          <div className="product_slider_left_arrow">
            <DoubleLeftOutlined />
          </div>
          <div className="product_slider_container">
            {props.productsList.map((product) => (
              <ProductSliderItem
                key={product.id}
                id={product.id}
                isFresh={product.isFresh}
                imageURL={product.imageURL}
                name={product.name}
                otherSellers={product.otherSellers}
                type={product.type}
                category={product.category}
                basePrice={product.basePrice}
                pricePerUnit={product.pricePerUnit}
                addedDigit={product.addedDigit}
                addedUnit={product.addedUnit}
                location={product.location}
                isNegotiable={product.isNegotiable}
                sellerId={product.sellerId}
              />
            ))}
          </div>
          <div className="product_slider_right_arrow">
            <DoubleRightOutlined />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductSlider;
