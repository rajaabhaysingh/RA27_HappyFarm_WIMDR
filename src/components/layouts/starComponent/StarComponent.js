import React, { memo } from "react";
import "./StarComponent.css";

import { Translate } from "react-auto-translate";

import FullStar from "../../../res/farmerSlider/star_full.svg";
import HalfStar from "../../../res/farmerSlider/star_half.svg";

function StarComponent(props, size) {
  let rating = parseFloat(props.rating);

  if (rating >= 1 && rating < 1.25) {
    rating = 1;
  } else if (rating >= 1.25 && rating < 1.75) {
    rating = 1.5;
  } else if (rating >= 1.75 && rating < 2.25) {
    rating = 2;
  } else if (rating >= 2.25 && rating < 2.75) {
    rating = 2.5;
  } else if (rating >= 2.75 && rating < 3.25) {
    rating = 3;
  } else if (rating >= 3.25 && rating < 3.75) {
    rating = 3.5;
  } else if (rating >= 3.75 && rating < 4.25) {
    rating = 4;
  } else if (rating >= 4.25 && rating < 4.75) {
    rating = 4.5;
  } else if (rating >= 4.75 && rating <= 5) {
    rating = 5;
  } else {
    rating = 0;
  }

  const renderRating = () => {
    switch (rating) {
      case 1:
        return (
          <div className="star_component_star_group">
            <img
              style={
                props.size
                  ? { height: props.size, width: props.size }
                  : { height: "10px", width: "10px" }
              }
              src={FullStar}
              alt="star"
            />
          </div>
        );

      case 1.5:
        return (
          <div className="star_component_star_group">
            <img
              style={
                props.size
                  ? { height: props.size, width: props.size }
                  : { height: "10px", width: "10px" }
              }
              src={FullStar}
              alt="star"
            />
            <img
              style={
                props.size
                  ? { height: props.size, width: props.size }
                  : { height: "10px", width: "10px" }
              }
              src={HalfStar}
              alt="star"
            />
          </div>
        );

      case 2:
        return (
          <div className="star_component_star_group">
            <img
              style={
                props.size
                  ? { height: props.size, width: props.size }
                  : { height: "10px", width: "10px" }
              }
              src={FullStar}
              alt="star"
            />
            <img
              style={
                props.size
                  ? { height: props.size, width: props.size }
                  : { height: "10px", width: "10px" }
              }
              src={FullStar}
              alt="star"
            />
          </div>
        );

      case 2.5:
        return (
          <div className="star_component_star_group">
            <img
              style={
                props.size
                  ? { height: props.size, width: props.size }
                  : { height: "10px", width: "10px" }
              }
              src={FullStar}
              alt="star"
            />
            <img
              style={
                props.size
                  ? { height: props.size, width: props.size }
                  : { height: "10px", width: "10px" }
              }
              src={FullStar}
              alt="star"
            />
            <img
              style={
                props.size
                  ? { height: props.size, width: props.size }
                  : { height: "10px", width: "10px" }
              }
              src={HalfStar}
              alt="star"
            />
          </div>
        );

      case 3:
        return (
          <div className="star_component_star_group">
            <img
              style={
                props.size
                  ? { height: props.size, width: props.size }
                  : { height: "10px", width: "10px" }
              }
              src={FullStar}
              alt="star"
            />
            <img
              style={
                props.size
                  ? { height: props.size, width: props.size }
                  : { height: "10px", width: "10px" }
              }
              src={FullStar}
              alt="star"
            />
            <img
              style={
                props.size
                  ? { height: props.size, width: props.size }
                  : { height: "10px", width: "10px" }
              }
              src={FullStar}
              alt="star"
            />
          </div>
        );

      case 3.5:
        return (
          <div className="star_component_star_group">
            <img
              style={
                props.size
                  ? { height: props.size, width: props.size }
                  : { height: "10px", width: "10px" }
              }
              src={FullStar}
              alt="star"
            />
            <img
              style={
                props.size
                  ? { height: props.size, width: props.size }
                  : { height: "10px", width: "10px" }
              }
              src={FullStar}
              alt="star"
            />
            <img
              style={
                props.size
                  ? { height: props.size, width: props.size }
                  : { height: "10px", width: "10px" }
              }
              src={FullStar}
              alt="star"
            />
            <img
              style={
                props.size
                  ? { height: props.size, width: props.size }
                  : { height: "10px", width: "10px" }
              }
              src={HalfStar}
              alt="star"
            />
          </div>
        );

      case 4:
        return (
          <div className="star_component_star_group">
            <img
              style={
                props.size
                  ? { height: props.size, width: props.size }
                  : { height: "10px", width: "10px" }
              }
              src={FullStar}
              alt="star"
            />
            <img
              style={
                props.size
                  ? { height: props.size, width: props.size }
                  : { height: "10px", width: "10px" }
              }
              src={FullStar}
              alt="star"
            />
            <img
              style={
                props.size
                  ? { height: props.size, width: props.size }
                  : { height: "10px", width: "10px" }
              }
              src={FullStar}
              alt="star"
            />
            <img
              style={
                props.size
                  ? { height: props.size, width: props.size }
                  : { height: "10px", width: "10px" }
              }
              src={FullStar}
              alt="star"
            />
          </div>
        );

      case 4.5:
        return (
          <div className="star_component_star_group">
            <img
              style={
                props.size
                  ? { height: props.size, width: props.size }
                  : { height: "10px", width: "10px" }
              }
              src={FullStar}
              alt="star"
            />
            <img
              style={
                props.size
                  ? { height: props.size, width: props.size }
                  : { height: "10px", width: "10px" }
              }
              src={FullStar}
              alt="star"
            />
            <img
              style={
                props.size
                  ? { height: props.size, width: props.size }
                  : { height: "10px", width: "10px" }
              }
              src={FullStar}
              alt="star"
            />
            <img
              style={
                props.size
                  ? { height: props.size, width: props.size }
                  : { height: "10px", width: "10px" }
              }
              src={FullStar}
              alt="star"
            />
            <img
              style={
                props.size
                  ? { height: props.size, width: props.size }
                  : { height: "10px", width: "10px" }
              }
              src={HalfStar}
              alt="star"
            />
          </div>
        );

      case 5:
        return (
          <div className="star_component_star_group">
            <img
              style={
                props.size
                  ? { height: props.size, width: props.size }
                  : { height: "10px", width: "10px" }
              }
              src={FullStar}
              alt="star"
            />
            <img
              style={
                props.size
                  ? { height: props.size, width: props.size }
                  : { height: "10px", width: "10px" }
              }
              src={FullStar}
              alt="star"
            />
            <img
              style={
                props.size
                  ? { height: props.size, width: props.size }
                  : { height: "10px", width: "10px" }
              }
              src={FullStar}
              alt="star"
            />
            <img
              style={
                props.size
                  ? { height: props.size, width: props.size }
                  : { height: "10px", width: "10px" }
              }
              src={FullStar}
              alt="star"
            />
            <img
              style={
                props.size
                  ? { height: props.size, width: props.size }
                  : { height: "10px", width: "10px" }
              }
              src={FullStar}
              alt="star"
            />
          </div>
        );

      default:
        return (
          <div className="star_component_no_rating">
            <Translate>Rating unavailable</Translate>
          </div>
        );
    }
  };

  return <div>{renderRating()}</div>;
}

export default memo(StarComponent);
