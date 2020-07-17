import React from "react";

import { useParams } from "react-router-dom";

const SalesDetails = () => {
  let { historyId } = useParams();

  return (
    <div>
      <h3>salesDetails: {historyId}</h3>
    </div>
  );
};

export default SalesDetails;
