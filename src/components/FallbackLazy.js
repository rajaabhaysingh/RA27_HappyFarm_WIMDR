import React from "react";

function FallbackLazy() {
  return (
    <i
      style={{
        color: "#ee5700",
        fontSize: "0.7rem",
        margin: "4px",
      }}
      className="fas fa-spin fa-spinner"
    ></i>
  );
}

export default FallbackLazy;
