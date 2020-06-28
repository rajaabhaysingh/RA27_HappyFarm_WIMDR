import React from "react";

function FallbackUI() {
  return (
    <div
      style={{
        fontSize: "0.7rem",
        color: "#AA0000",
        width: "100%",
        marginLeft: "8px",
      }}
    >
      <i className="fas fa-exclamation-triangle"></i> Error
    </div>
  );
}

export default FallbackUI;
