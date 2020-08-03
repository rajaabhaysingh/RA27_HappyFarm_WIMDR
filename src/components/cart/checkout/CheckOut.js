import React, { useState, useEffect } from "react";

import axios from "axios";

import { Translate } from "react-auto-translate";

const loadScript = (src) => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;

    script.onload = () => {
      resolve(true);
    };

    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

const CheckOut = () => {
  const [checkoutData, setCheckoutData] = useState([]);
  const [finalAmount, setFinalAmount] = useState(undefined);
  const [promoAmt, setPromoAmt] = useState(0.0);

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
      console.log(checkout.data.data.cart[0].cart_items_obj);
      setCheckoutData(checkout.data.data.cart[0].cart_items_obj);
    }, 1000);
  };

  // ------------------------------------

  useEffect(() => {
    dataFetcher();
  }, []);

  // calcuatePrice
  const calcuatePrice = (item) => {
    if (item.purchasedQtyUnit === item.item_details.pricePerUnit) {
      return (
        (parseFloat(item.purchasedQty).toFixed(2) /
          parseFloat(item.item_details.basePricePerDigit).toFixed(2)) *
        parseFloat(item.item_details.basePrice).toFixed(2)
      ).toFixed(2);
    } else {
      // check for units and calculate price here
    }
  };

  const calcSubTotal = () => {
    let tempTot = 0.0;

    checkoutData.forEach((item) => {
      tempTot = +tempTot + +calcuatePrice(item);
    });

    return tempTot.toFixed(2);
  };

  const calcDelCharges = () => {
    let delTot = 0.0;

    checkoutData.forEach((item) => {
      delTot = +delTot + +0;
    });

    return delTot.toFixed(2);
  };

  const calcTax = () => {
    let taxTot = 0.0;

    checkoutData.forEach((item) => {
      taxTot =
        +taxTot + +((calcuatePrice(item) * parseFloat(item.taxPerc)) / 100);
    });

    return taxTot.toFixed(2);
  };

  // setting final amt
  // setFinalAmount(
  //   +calcSubTotal() + +calcDelCharges() + +calcTax() - +promoAmt.toFixed(2)
  // ).toFixed(2);

  useEffect(() => {
    // setFinalAmount(
    //   +calcSubTotal() + +calcDelCharges() + +calcTax() - +promoAmt.toFixed(2)
    // ).toFixed(2);
  }, [checkoutData]);

  // displayRazorpay
  const displayRazorpay = async () => {
    const result = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!result) {
      alert("Razorpay load failed. Check your connection.");
    }

    const options = {
      key: "rzp_test_qhsWdZwF3QKDfN",
      amount: "50000",
      currency: "INR",
      name: "Farmted",
      description: "Buy transaction",
      image: "https://happyfarmmedia.imfast.io/images/logo/logo_144x144.png",
      order_id: "order_9A33XWu170gUtm", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      handler: function (response) {
        alert(response.razorpay_payment_id);
        alert(response.razorpay_order_id);
        alert(response.razorpay_signature);
      },
      prefill: {
        name: "Farmted customer",
        email: "customer@farmted.com",
        contact: "+919898989898",
      },
      theme: {
        color: "#ee5600",
      },
    };

    const paymentObj = new window.Razorpay(options);
    paymentObj.open();
  };

  return (
    <div className="checkout_main_div">
      <div className="checkout_top_steps">
        <div className="checkout_heading">
          <Translate>CHECKOUT.</Translate>
        </div>
        <button onClick={displayRazorpay}>
          <Translate>PAY ₹ {3000} NOW</Translate>
        </button>
      </div>
    </div>
  );
};

export default CheckOut;
