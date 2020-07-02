import React from "react";

function FallbackUI() {
  return (
    <div
      style={{
        fontSize: "0.7rem",
        color: "#bb0000",
        display: "flex",
        height: "100%",
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <i className="fas fa-exclamation-triangle"></i> Error
    </div>
  );
}

export default FallbackUI;
