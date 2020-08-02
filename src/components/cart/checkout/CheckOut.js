import React, { useState } from "react";

import { Translate } from "react-auto-translate";

import Contact from "../../contact/Contact";

const CheckOut = () => {
  return (
    <div className="checkout_main_div">
      <div className="checkout_top_steps">
        <Translate>Select a Language</Translate>:
        <br />
        <h1>
          <Translate>Hello World!</Translate>
          <Contact />
          <div>
            <Translate>I am a boy</Translate>
          </div>
          🌎
        </h1>
      </div>
    </div>
  );
};

export default CheckOut;
