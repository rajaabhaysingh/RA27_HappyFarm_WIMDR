import React, { useEffect, useState, lazy, Suspense, memo } from "react";
import "./Cart.css";

import Popup from "reactjs-popup";

import { Translate } from "react-auto-translate";

import axios from "axios";

import {
  Switch,
  Route,
  Link,
  useRouteMatch,
  useHistory,
} from "react-router-dom";

import PrimeLogo from "../../res/cart/prime_logo.svg";

import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import FallbackLazy from "../FallbackLazy";

import ProductList from "../layouts/productSlider/ProductSliderList";
import FooterDetails from "../layouts/footer/FooterDetails";

const ProductSlider = lazy(() =>
  import("../layouts/productSlider/ProductSlider")
);
const Footer = lazy(() => import("../layouts/footer/Footer"));
const CheckOut = lazy(() => import("./checkout/CheckOut"));

const Cart = (props) => {
  // const cartData = CartData;
  let history = useHistory();

  const [isPopUpOpen, setIsPopUpOpen] = useState(false);

  // ----- fetching data state mgmt -----
  const baseUrl = "https://abhijitpatil.pythonanywhere.com";

  const [cartData, setCartData] = useState([]);

  // dataFetcher
  const dataFetcher = async () => {
    let cartItems = await axios
      .get(baseUrl + "/my/cart/current/", {
        headers: {
          Authorization: "JWT " + localStorage.getItem("token"), //the token is a variable which holds the token
        },
      })
      .catch((error) => {
        console.log(error);
      });
    setTimeout(() => {
      console.log(cartItems.data.cart_items_obj);
      setCartData(cartItems.data.cart_items_obj);
    }, 1000);
  };

  // ------------------------------------

  useEffect(() => {
    dataFetcher();
  }, []);

  useEffect(() => {
    console.log();
  }, [cartData]);

  // handleDeleteItem
  const handleDeleteItem = async (e) => {
    let req = await axios
      .delete(baseUrl + "/my/cart/current/" + e.target.value.id, {
        headers: {
          Authorization: "JWT " + localStorage.getItem("token"), //the token is a variable which holds the token
        },
      })
      .catch((err) => {
        console.log(err);
      });

    setTimeout(() => {
      dataFetcher();
    }, 1000);
  };

  // handleCheckout
  const handleCheckout = async () => {
    let refactor = await axios
      .get(baseUrl + "/my/cart/current/", {
        headers: {
          Authorization: "JWT " + localStorage.getItem("token"), //the token is a variable which holds the token
        },
      })
      .catch((error) => {
        console.log(error);
      });

    setTimeout(() => {
      refactor.data.cart_items_obj.forEach((item) => {
        console.log(item.purchasedPrice);
        console.log(item.item_details.basePrice);
        if (item.purchasedPrice !== item.item_details.basePrice) {
          setIsPopUpOpen(true);
        }
      });
    }, 1000);
    //
  };

  // doRefactor
  const doRefactor = async () => {
    let refactordCart = await axios
      .get(baseUrl + "/my/cart/clean_items/", {
        headers: {
          Authorization: "JWT " + localStorage.getItem("token"), //the token is a variable which holds the token
        },
      })
      .catch((error) => {
        console.log(error);
      });

    setTimeout(() => {
      if (refactordCart.status === 200) {
        setCartData(refactordCart.data.cart_items_obj);
        setIsPopUpOpen(false);
      }
    }, 1000);
  };
  // ----------------------------------

  let { path, url } = useRouteMatch();

  // state to hold coupon off amount
  const [promoAmt, setPromoAmt] = useState(0.0);

  // renderIsDeliverable
  const renderIsNegotiable = (isNeg) => {
    if (isNeg) {
      return (
        <div style={{ color: "#008800" }}>
          <Translate>Delivery available.</Translate>
        </div>
      );
    } else {
      return (
        <div style={{ color: "#cc0000" }}>
          <Translate>Delivery not available.</Translate>
        </div>
      );
    }
  };

  // calcuatePrice
  const calcuatePrice = (item) => {
    console.log(item);
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

  // renderCartTotalHeader
  const renderCartTotalHeader = () => {
    // check and handle for prime users here
    // temporarily using if(1) {---}
    if (1) {
      return (
        <>
          <img src={PrimeLogo} alt="" />
          <div className="cart_tot_header_content">
            <div className="cart_tot_header_top">
              <Translate>Join premium membership</Translate>
            </div>
            <div className="cart_tot_header_desc">
              <Translate>Get free delivery and much more*</Translate>
            </div>
            <div className="cart_tot_header_link">
              <Link className="cart_normal_link" to="/premium">
                <Translate>View details</Translate>
              </Link>
            </div>
          </div>
        </>
      );
    }
  };

  // renderFooter
  const renderFooter = () => {
    // check whether all items are deliverable and other relevent conditions and return status
    if (1) {
      return (
        <>
          <i style={{ marginRight: "4px" }} className="fas fa-info-circle"></i>{" "}
          <Translate>
            Your order does not qualify for Pay on Delivery because it contains
            items from sellers that don’t offer Pay on Delivery.
          </Translate>
          <Link className="cart_normal_link">
            <Translate>Learn more</Translate>
          </Link>
        </>
      );
    }
  };

  // handleApplyCoupon
  const handleApplyCoupon = () => {};

  // renderCartItems
  const renderCartItems = () => {
    if (cartData !== []) {
      const calcSubTotal = () => {
        let tempTot = 0.0;

        cartData.forEach((item) => {
          tempTot = +tempTot + +calcuatePrice(item);
        });

        return tempTot.toFixed(2);
      };

      const calcDelCharges = () => {
        let delTot = 0.0;

        cartData.forEach((item) => {
          delTot = +delTot + +0;
        });

        return delTot.toFixed(2);
      };

      const calcTax = () => {
        let taxTot = 0.0;

        cartData.forEach((item) => {
          taxTot =
            +taxTot + +((calcuatePrice(item) * parseFloat(item.taxPerc)) / 100);
        });

        return taxTot.toFixed(2);
      };

      return (
        <>
          <div className="cart_items">
            {cartData.map((item) => (
              <>
                {console.log(item.item_details.name)}
                <div key={item.id} className="cart_item">
                  <div className="cart_item_details">
                    <img src={item.item_details.thumbnail} alt="" />
                    <div className="cart_item_info">
                      <div className="cart_item_name_type_grp">
                        <div className="cart_item_name">
                          <Translate>{item.item_details.name}</Translate>
                        </div>
                        <div className="cart_item_type_grp">
                          <Translate>
                            {item.item_details.item_type},{" "}
                            {item.item_details.category}
                          </Translate>
                        </div>
                      </div>
                      <div className="cart_item_price">
                        <Translate>Purchase price:</Translate>
                        <span
                          style={{
                            fontWeight: "bold",
                            marginLeft: "4px",
                          }}
                        >
                          ₹
                          <Translate>
                            {parseFloat(item.item_details.basePrice).toFixed(2)}{" "}
                            per{" "}
                            {parseFloat(
                              item.item_details.basePricePerDigit
                            ).toFixed(2)}{" "}
                            {item.item_details.pricePerUnit}
                          </Translate>
                        </span>
                      </div>
                      <div className="cart_item_del_avail">
                        {renderIsNegotiable(item.item_details.isNegotiable)}
                      </div>
                      <div className="cart_item_purch_qty">
                        <Translate>Purchased quantity:</Translate>
                        <span
                          style={{
                            fontWeight: "bold",
                            marginLeft: "4px",
                          }}
                        >
                          <Translate>
                            {parseFloat(item.purchasedQty).toFixed(2)}{" "}
                            {item.purchasedQtyUnit}
                          </Translate>
                        </span>
                      </div>
                      <div className="cart_item_utility">
                        <div className="cart_italics_link">
                          <i
                            style={{ marginRight: "4px" }}
                            className="fas fa-edit"
                          ></i>{" "}
                          <Translate>Update</Translate>
                        </div>
                        <div style={{ margin: "0 8px" }}>|</div>
                        <div
                          onClick={async () => {
                            await axios
                              .delete(baseUrl + "/my/cartitem/" + item.id, {
                                headers: {
                                  Authorization:
                                    "JWT " + localStorage.getItem("token"), //the token is a variable which holds the token
                                },
                              })
                              .catch((err) => {
                                console.log(err);
                              });

                            setTimeout(() => {
                              dataFetcher();
                            }, 1000);
                          }}
                          value={item}
                          className="cart_italics_link"
                          style={{ cursor: "pointer" }}
                        >
                          {" "}
                          <i
                            style={{ marginRight: "4px" }}
                            className="fas fa-trash"
                          ></i>{" "}
                          <Translate>Delete</Translate>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="cart_item_tot_price">
                    ₹{calcuatePrice(item)}
                  </div>
                </div>
                <div
                  style={{
                    width: "100%",
                    height: "1px",
                    background: "#eeeeee",
                    marginTop: "16px",
                  }}
                ></div>
              </>
            ))}
          </div>
          <div className="cart_total_container">
            <div className="cart_total_header">{renderCartTotalHeader()}</div>
            <div className="cart_total_desc">
              <div className="cart_total_sub_total">
                <span className="cart_total_sub_total_text cart_total_spaced_left">
                  <Translate>Sub-total</Translate> ({cartData.length}{" "}
                  <Translate>items</Translate>):
                </span>
                <span className="cart_total_sub_total_amt cart_total_spaced_right">
                  ₹{calcSubTotal()}
                </span>
              </div>
              <div className="cart_total_delivery">
                <span className="cart_total_spaced_left">
                  <Translate> Delivery charges:</Translate>
                </span>
                <span className="cart_total_spaced_right">
                  ₹{calcDelCharges()}
                </span>
              </div>
              <div className="cart_total_tax">
                <span className="cart_total_spaced_left">
                  <Translate>GST:</Translate>
                </span>
                <span className="cart_total_spaced_right">₹{calcTax()}</span>
              </div>
              <div className="cart_total_promotion">
                <span className="cart_total_spaced_left">
                  <Translate>Promotional offer applied:</Translate>
                </span>
                <span className="cart_total_spaced_right">-₹{promoAmt}</span>
              </div>
              <div
                style={{
                  width: "100%",
                  height: "1px",
                  margin: "8px 0",
                  background: "#cccccc",
                }}
              ></div>
              <div className="cart_total_net_payable">
                <span className="cart_total_spaced_left">
                  <Translate>Net Payable:</Translate>
                </span>
                <span className="cart_total_spaced_right">
                  ₹
                  {(
                    +calcSubTotal() +
                    +calcDelCharges() +
                    +calcTax() -
                    +promoAmt.toFixed(2)
                  ).toFixed(2)}
                </span>
              </div>
              <button className="cart_total_del_btn">
                <Translate>SCHEDULE PICKUP</Translate>
              </button>
              <button onClick={handleCheckout} className="cart_total_sch_btn">
                <Translate>CHECKOUT AND DELIVERY</Translate>
              </button>
              <div className="cart_total_apply_coupon">
                <Translate>Have a coupon ?</Translate>{" "}
                <span className="cartApplyCoupon" onClick={handleApplyCoupon}>
                  <Translate>Apply here.</Translate>
                </span>
              </div>
            </div>
            <div className="cart_total_footer">{renderFooter()}</div>
          </div>
        </>
      );
    } else {
      return (
        <div className="cart_empty">
          <img src="" alt="" />
          <div>
            <Translate>Oops! Your cart is empty.</Translate>
          </div>
          <button>
            <Link style={{ textDecoration: "none", color: "inherit" }} to="/">
              <Translate>Continue Shopping</Translate>
            </Link>
          </button>
        </div>
      );
    }
  };

  return (
    <div className="cart_main_div">
      <Switch>
        <Route exact strict path={path}>
          <>
            <div className="cart_details_container">
              <div className="cart_details_heading">
                <Translate>SHOPPING CART</Translate>
              </div>
              <div className="cart_details">{renderCartItems()}</div>
            </div>
            <div className="cart_prod_suggestion">
              <ErrorBoundary>
                <Suspense fallback={<FallbackLazy />}>
                  <ProductSlider
                    productsList={ProductList}
                    boldHeading="Related products"
                    normalHeading="that you may need"
                    viewAllLink="#"
                  />
                </Suspense>
              </ErrorBoundary>
            </div>
            <div className="cart_footer">
              <ErrorBoundary>
                <Suspense fallback={<FallbackLazy />}>
                  <Footer details={FooterDetails} />
                </Suspense>
              </ErrorBoundary>
            </div>
          </>
        </Route>
        <Route path={`${path}/checkout`}>
          <ErrorBoundary>
            <Suspense fallback={<FallbackLazy />}>
              <CheckOut />
            </Suspense>
          </ErrorBoundary>
        </Route>
      </Switch>
      <Popup
        open={isPopUpOpen}
        modal
        closeOnDocumentClick
        lockScroll
        contentStyle={{
          borderRadius: "8px",
        }}
      >
        <div
          style={{
            margin: "16px",
            borderRadius: "6px",
            padding: "32px",
            background: "#fffbef",
            color: "#880000",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Translate>
            Alert! The base price of one or more item(s) has/have changed, since
            you added them. We request you to refactor your cart.
          </Translate>{" "}
          <br />
          <Translate>Click CONTINUE to buy or CANCEL to </Translate>
          <div style={{ display: "flex", marginTop: "32px" }}>
            <button
              style={{
                height: "38px",
                width: "100px",
                borderRadius: "4px",
                background: "#ee5700",
                color: "#ffffff",
                fontWeight: "bold",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "none",
                outline: "none",
              }}
              onClick={doRefactor}
            >
              <Translate>CONTINUE</Translate>
            </button>
            <button
              style={{
                marginLeft: "16px",
                height: "38px",
                width: "100px",
                borderRadius: "4px",
                background: "#dddddd",
                color: "#333333",
                fontWeight: "bold",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "none",
                outline: "none",
              }}
              onClick={() => setIsPopUpOpen(false)}
            >
              <Translate>CANCEL</Translate>
            </button>
          </div>
        </div>
      </Popup>
    </div>
  );
};

export default memo(Cart);
