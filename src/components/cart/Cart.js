import React, { useState, lazy, Suspense, memo } from "react";
import "./Cart.css";

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
        <div style={{ color: "#008800" }}>Door-step delivery available.</div>
      );
    } else {
      return <div style={{ color: "#cc0000" }}>Delivery not available.</div>;
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
            <div className="cart_tot_header_top">Join premium membership</div>
            <div className="cart_tot_header_desc">
              Get free delivery and much more*
            </div>
            <div className="cart_tot_header_link">
              <Link className="cart_normal_link" to="/premium">
                View details
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
          Your order does not qualify for Pay on Delivery because it contains
          items from sellers that don’t offer Pay on Delivery.
          <Link className="cart_normal_link">Learn more</Link>
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
                        <div className="cart_item_name">{item.name}</div>
                        <div className="cart_item_type_grp">
                          {item.type}, {item.cat}
                        </div>
                      </div>
                      <div className="cart_item_price">
                        Purchase price:
                        <span
                          style={{
                            fontWeight: "bold",
                            marginLeft: "4px",
                          }}
                        >
                          ₹{item.purchasedPrice.toFixed(2)} per{" "}
                          {item.purchasedPricePerDigit}{" "}
                          {item.purchasedPricePerUnit}
                        </span>
                      </div>
                      <div className="cart_item_del_avail">
                        {renderIsDeliverable(item.isDeliverable)}
                      </div>
                      <div className="cart_item_purch_qty">
                        Purchased quantity:
                        <span
                          style={{
                            fontWeight: "bold",
                            marginLeft: "4px",
                          }}
                        >
                          {item.purchasedQty} {item.purchasedQtyUnit}
                        </span>
                      </div>
                      <div className="cart_item_utility">
                        <Link className="cart_italics_link">
                          <i
                            style={{ marginRight: "4px" }}
                            className="fas fa-edit"
                          ></i>{" "}
                          Update
                        </Link>
                        <div style={{ margin: "0 8px" }}>|</div>
                        <Link className="cart_italics_link">
                          {" "}
                          <i
                            style={{ marginRight: "4px" }}
                            className="fas fa-trash"
                          ></i>{" "}
                          Delete
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
                  Sub-total ({cartData.items.length} items):
                </span>
                <span className="cart_total_sub_total_amt cart_total_spaced_right">
                  ₹{calcSubTotal()}
                </span>
              </div>
              <div className="cart_total_delivery">
                <span className="cart_total_spaced_left">
                  Delivery charges:
                </span>
                <span className="cart_total_spaced_right">
                  ₹{calcDelCharges()}
                </span>
              </div>
              <div className="cart_total_tax">
                <span className="cart_total_spaced_left">GST:</span>
                <span className="cart_total_spaced_right">₹{calcTax()}</span>
              </div>
              <div className="cart_total_promotion">
                <span className="cart_total_spaced_left">
                  Promotional offer applied:
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
                <span className="cart_total_spaced_left">Net Payable:</span>
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
              <button className="cart_total_del_btn">REQUEST DELIVERY</button>
              <button className="cart_total_sch_btn">SCHEDULE PICKUP</button>
              <div className="cart_total_apply_coupon">
                Have a coupon ?{" "}
                <span className="cartApplyCoupon" onClick={handleApplyCoupon}>
                  Apply here.
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
          <div>Oops! Your cart is empty.</div>
          <button>
            <Link to="/">Continue Shopping</Link>
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
              <div className="cart_details_heading">SHOPPING CART</div>
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
