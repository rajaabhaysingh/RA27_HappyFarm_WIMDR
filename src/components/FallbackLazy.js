import React from "react";

import LoadingOutlined from "@ant-design/icons/LoadingOutlined";

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
        <LoadingOutlined />
      </div>
    </div>
  );
}

export default FallbackLazy;
