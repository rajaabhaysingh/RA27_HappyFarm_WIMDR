import React from "react";

import { useParams } from "react-router-dom";

const Notice = () => {
  let { solutionId } = useParams();
  return (
    <div>
      <div>{solutionId}dsfsdfs</div>
      <div>{solutionId}dsfsdfs</div>
      <div>{solutionId}dsfsdfs</div>
      <div>{solutionId}dsfsdfs</div>
      <div>{solutionId}dsfsdfs</div>
      <div>{solutionId}dsfsdfs</div>
      <div>{solutionId}dsfsdfs</div>
      <div>{solutionId}dsfsdfs</div>
      <div>{solutionId}dsfsdfs</div>
    </div>
  );
};

export default Notice;
