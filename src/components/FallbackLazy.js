import React from "react";

function FallbackLazy() {
  return (
    <div
      style={{
        alignSelf: "center",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "0.75rem",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "2px",
        }}
      >
        <i className="fas fa-spin fa-spinner"></i>
      </div>
    </div>
  );
}

export default FallbackLazy;
