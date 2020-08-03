import React, { useState, useEffect } from "react";

import axios from "axios";

import { Translate } from "react-auto-translate";

const CheckOut = () => {
  // ----- fetching data state mgmt -----
  const baseUrl = "https://abhijitpatil.pythonanywhere.com";
  // dataFetcher
  const dataFetcher = async () => {
    let checkout = await axios
      .get(baseUrl + "/my/cart/checkout/", {
        headers: {
          Authorization: "JWT " + localStorage.getItem("token"), //the token is a variable which holds the token
        },
      })
      .catch((error) => {
        console.log(error);
      });
    setTimeout(() => {
      console.log(checkout);
    }, 1000);
  };

  // ------------------------------------

  useEffect(() => {
    dataFetcher();
  }, []);

  // handlePay
  const handlePay = () => {};

  return (
    <div className="checkout_main_div">
      <div className="checkout_top_steps">
        <div className="checkout_heading">
          <Translate>CHECKOUT.</Translate>
        </div>
        <button onClick={handlePay}>
          <Translate>PAY NOW</Translate>
        </button>
      </div>
    </div>
  );
};

export default CheckOut;
