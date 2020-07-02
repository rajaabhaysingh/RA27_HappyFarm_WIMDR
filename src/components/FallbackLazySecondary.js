import React from "react";

function FallbackLazy() {
  return (
    <i
      style={{
        color: "#dddddd",
        fontSize: "0.8rem",
        display: "flex",
        alignSelf: "center",
        margin: "2px",
      }}
      className="fas fa-spin fa-circle-notch"
    ></i>
  );
}

export default FallbackLazy;
