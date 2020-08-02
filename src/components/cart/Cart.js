import React, { useState, lazy, Suspense, memo } from "react";
import "./Cart.css";

import { Translate } from "react-auto-translate";

import { Switch, Route, Link, useRouteMatch } from "react-router-dom";

import PrimeLogo from "../../res/cart/prime_logo.svg";

import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import FallbackLazy from "../FallbackLazy";

import CartData from "./CartData";
import ProductList from "../layouts/productSlider/ProductSliderList";
import FooterDetails from "../layouts/footer/FooterDetails";

const ProductSlider = lazy(() =>
  import("../layouts/productSlider/ProductSlider")
);
const Footer = lazy(() => import("../layouts/footer/Footer"));
const CheckOut = lazy(() => import("./checkout/CheckOut"));

const Cart = (props) => {
  const cartData = CartData;

  let { path, url } = useRouteMatch();

  // state to hold coupon off amount
  const [promoAmt, setPromoAmt] = useState(0.0);

  // renderIsDeliverable
  const renderIsDeliverable = (isDeliverable) => {
    if (isDeliverable) {
      return (
        <div style={{ color: "#008800" }}>
          <Translate>Door-step delivery available.</Translate>
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
    if (item.purchasedQtyUnit === item.purchasedPricePerUnit) {
      return (
        (item.purchasedQty / item.purchasedPricePerDigit) *
        item.purchasedPrice
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
    if (cartData.items) {
      const calcSubTotal = () => {
        let tempTot = 0.0;

        cartData.items.forEach((item) => {
          tempTot = +tempTot + +calcuatePrice(item);
        });

        return tempTot.toFixed(2);
      };

      const calcDelCharges = () => {
        let delTot = 0.0;

        cartData.items.forEach((item) => {
          delTot = +delTot + +item.deliveryCharge;
        });

        return delTot.toFixed(2);
      };

      const calcTax = () => {
        let taxTot = 0.0;

        cartData.items.forEach((item) => {
          taxTot = +taxTot + +((calcuatePrice(item) * item.taxPerc) / 100);
        });

        return taxTot.toFixed(2);
      };

      return (
        <>
          <div className="cart_items">
            {cartData.items.map((item) => (
              <>
                <div key={item.key} className="cart_item">
                  <div className="cart_item_details">
                    <img src={item.imgUrl} alt="" />
                    <div className="cart_item_info">
                      <div className="cart_item_name_type_grp">
                        <div className="cart_item_name">
                          <Translate>{item.name}</Translate>
                        </div>
                        <div className="cart_item_type_grp">
                          <Translate>
                            {item.type}, {item.cat}
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
                            {item.purchasedPrice.toFixed(2)} per{" "}
                            {item.purchasedPricePerDigit}{" "}
                            {item.purchasedPricePerUnit}
                          </Translate>
                        </span>
                      </div>
                      <div className="cart_item_del_avail">
                        {renderIsDeliverable(item.isDeliverable)}
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
                            {item.purchasedQty} {item.purchasedQtyUnit}
                          </Translate>
                        </span>
                      </div>
                      <div className="cart_item_utility">
                        <Link className="cart_italics_link">
                          <i
                            style={{ marginRight: "4px" }}
                            className="fas fa-edit"
                          ></i>{" "}
                          <Translate>Update</Translate>
                        </Link>
                        <div style={{ margin: "0 8px" }}>|</div>
                        <Link className="cart_italics_link">
                          {" "}
                          <i
                            style={{ marginRight: "4px" }}
                            className="fas fa-trash"
                          ></i>{" "}
                          <Translate>Delete</Translate>
                        </Link>
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
                  <Translate>Sub-total</Translate> ({cartData.items.length}{" "}
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
                <Translate>REQUEST DELIVERY</Translate>
              </button>
              <button className="cart_total_sch_btn">
                <Translate>SCHEDULE PICKUP</Translate>
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
            <Link to="/">
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
    </div>
  );
};

export default memo(Cart);
