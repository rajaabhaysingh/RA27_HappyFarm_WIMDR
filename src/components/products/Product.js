import React, { useCallback, useEffect, useState, lazy, Suspense } from "react";
import "./Product.css";

import Popup from "reactjs-popup";

import { Translate } from "react-auto-translate";

import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import FallbackLazy from "../FallbackLazySecondary";

import { Switch, Route, Link, useRouteMatch } from "react-router-dom";

import { Stripes, ProdData, Offers, Review, adBanners } from "./ProdData";

import ProductSliderList from "../layouts/productSlider/ProductSliderList";
import FooterDetails from "../layouts/footer/FooterDetails";
import Placeholder from "../../res/categoryScroll/placeholder.svg";
import Placeholder2 from "../../res/productSlider/placeholder.jpg";

const prodImages = [
  Placeholder,
  Placeholder2,
  Placeholder,
  Placeholder2,
  Placeholder,
  Placeholder2,
  Placeholder,
  Placeholder2,
];
const ProdImageWithZoom = lazy(() => import("./ProdImageWithZoom"));
const StarComponent = lazy(() =>
  import("../layouts/starComponent/StarComponent")
);
const DoubleInfoBanner = lazy(() =>
  import("../layouts/doubleInfoBanner/DoubleInfoBanner")
);
const ProductSlider = lazy(() =>
  import("../layouts/productSlider/ProductSlider")
);
const FarmerSlider = lazy(() => import("../layouts/farmerSlider/FarmerSlider"));
const Footer = lazy(() => import("../layouts/footer/Footer"));

// configuring toast
toast.configure();

// main component function
const Product = ({
  user,
  setUser,
  isSignedOutLinkOpen,
  setIsSignedOutLinkOpen,
}) => {
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);

  // ----- fetching data state mgmt -----
  const baseUrl = "https://abhijitpatil.pythonanywhere.com";

  const [FarmersList, setFarmersList] = useState([]);

  // dataFetcher
  const dataFetcher = async () => {
    let farmers = await axios
      .get("https://randomuser.me/api/?results=20")
      .catch((error) => {
        console.log(error);
      });
    setFarmersList(farmers.data.results);
  };

  // ------------------------------------

  useEffect(() => {
    dataFetcher();
  }, []);

  useEffect(() => {
    console.log();
  }, [FarmersList]);

  const stripes = Stripes;
  const prodData = ProdData;
  const offers = Offers;
  const review = Review;
  const productList = ProductSliderList;

  const totRating =
    review.ratingDesc.fiveStar +
    review.ratingDesc.fourStar +
    review.ratingDesc.threeStar +
    review.ratingDesc.twoStar +
    review.ratingDesc.oneStar;

  const totStars =
    review.ratingDesc.oneStar +
    review.ratingDesc.twoStar * 2 +
    review.ratingDesc.threeStar * 3 +
    review.ratingDesc.fourStar * 4 +
    review.ratingDesc.fiveStar * 5;

  let { path, url } = useRouteMatch();

  const [formErrorState, setFormErrorState] = useState(
    "prod_page_qty_form_error--hidden"
  );
  const [negotiatedPrice, setNegotiatedPrice] = useState(undefined);
  const [purchasedQty, setPurchasedQty] = useState(undefined);
  const [purchasedQtyUnit, setPurchasedQtyUnit] = useState(undefined);

  // -------- handleAddToCart ----------
  const handleAddToCart = useCallback(async (e) => {
    e.preventDefault();
    if (localStorage.getItem("token") !== null) {
      if (purchasedQty && purchasedQtyUnit) {
        let res = await axios
          .post(
            `${baseUrl}/`,
            {
              // check whether conditional request has to be made base on isProdctNegotiable
              purchasedQty: purchasedQty,
              purchasedQtyUnit: purchasedQtyUnit,
              negotiatedPrice: negotiatedPrice,
            },
            { headers: { Authorization: `JWT ${user.token}` } }
          )
          .catch((error) => {
            console.log(error);
          });

        setTimeout(() => {
          if (res.status === 201) {
            toast.success(
              "Successfully added to cart. Go to cart to checkout.",
              {
                position: toast.POSITION.BOTTOM_CENTER,
              }
            );
          } else {
            toast.error("You are logged in, but product not added.");
          }
        }, 1000);
      } else {
        setFormErrorState("prod_page_qty_form_error--hidden");
      }
    } else {
      setIsPopUpOpen(true);
      setTimeout(() => {
        setIsPopUpOpen(false);
        setIsSignedOutLinkOpen(true);
      }, 1000);
    }
  }, []);
  // ------------------------------------

  // tstampToTime
  const tstampToTime = (ts) => {
    const tsDate = new Date(ts * 1000);
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return (
      tsDate.getDate() +
      " " +
      months[tsDate.getMonth()] +
      " " +
      tsDate.getFullYear() +
      ",  " +
      tsDate.getHours() +
      ":" +
      tsDate.getMinutes() +
      ":" +
      tsDate.getSeconds()
    );
  };

  // renderWeightUnit
  const renderWeightUnit = () => {
    if (prodData.weightCat === 1) {
      return (
        <select
          onChange={(e) => setPurchasedQtyUnit(e.target.value)}
          placeholder="Select"
          className="prod_page_weight_selector"
          name="prod_page_weight_selector"
        >
          <option value="mg">mg</option>
          <option value="gram">gram</option>
          <option value="Kg">Kilogram</option>
        </select>
      );
    } else if (prodData.weightCat === 2) {
      return (
        <select
          onChange={(e) => setPurchasedQtyUnit(e.target.value)}
          placeholder="Select"
          className="prod_page_weight_selector"
          name="prod_page_weight_selector"
        >
          <option value="ml">ml</option>
          <option value="l">Litre</option>
        </select>
      );
    } else if (prodData.weightCat === 3) {
      return (
        <select
          onChange={(e) => setPurchasedQtyUnit(e.target.value)}
          placeholder="Select"
          className="prod_page_weight_selector"
          name="prod_page_weight_selector"
        >
          <option value="units">Units</option>
          <option value="dz">Dozen</option>
          <option value="Kg">Kilogram</option>
        </select>
      );
    } else {
      return (
        <select
          onChange={(e) => setPurchasedQtyUnit(e.target.value)}
          placeholder="Select"
          className="prod_page_weight_selector"
          name="prod_page_weight_selector"
        >
          <option value="kg">Kg</option>
          <option value="l">Litre</option>
          <option value="pound">Pound</option>
        </select>
      );
    }
  };

  // renderReview
  const renderReview = () => {
    if (totRating > 0) {
      return (
        <>
          <div className="prod_page_rev_img_container">
            {review.images &&
              review.images.map((image) => (
                <img key={image.id} src={image.url} alt="" />
              ))}
            <div className="prod_page_rev_img_show_all">
              <Translate>See all</Translate>
            </div>
          </div>
          {review.topRev &&
            review.topRev.map((review) => (
              <div key={review.id} className="prod_page_prod_review">
                <div className="prod_page_rev_name_rating">
                  <div className="prod_page_rev_name">
                    <Translate>{review.reviewerName}</Translate>
                  </div>
                  <div className="prod_page_rev_ratings">
                    <ErrorBoundary>
                      <Suspense fallback={<FallbackLazy />}>
                        <StarComponent rating={review.rating} />
                      </Suspense>
                    </ErrorBoundary>
                  </div>
                </div>
                <div className="prod_page_rev_desc">
                  <Translate>{review.reviewText}</Translate>
                </div>
                <div className="prod_page_rev_time">
                  <i
                    style={{ marginRight: "4px" }}
                    className="fas fa-clock"
                  ></i>
                  <Translate>{tstampToTime(review.time)}</Translate>
                </div>
              </div>
            ))}
          {review.topRev && (
            <div style={{ marginTop: "32px" }}>
              <Link className="prod_page_rev_show_all" to={`${url}/reviews`}>
                <Translate>See all reviews</Translate>
              </Link>
            </div>
          )}
        </>
      );
    }
  };

  // ----------- user validation -------------
  const validateUser = () => {
    if (user.token) {
      //
    } else {
      return (
        <div
          style={{
            display: "flex",
            height: "calc(100vh - 110px)",
            width: "100vw",
            alignItems: "center",
            justifyContent: "center",
            alignSelf: "center",
            justifySelf: "center",
          }}
        >
          <div
            style={{
              padding: "16px 16px",
              background: "#ee5700",
              color: "#ffffff",
              borderRadius: "8px",
            }}
          >
            Please log-in to continue...
          </div>
        </div>
      );
    }
  };
  // -----------------------------------------

  return (
    <div className="prod_page_main_div">
      <Switch>
        <Route exact path={path}>
          <>
            <div className="prod_page_top_strip">
              <div className="prod_page_strip">
                <Link className="prod_page_strip_img_link" to={"/offers/"}>
                  <img src={stripes.one.img} alt="" />
                </Link>
              </div>
              <div className="prod_page_strip prod_page_strip--sec">
                <Link className="prod_page_strip_img_link" to={"/offers"}>
                  <img src={stripes.two.img} alt="" />
                </Link>
              </div>
            </div>
            <div className="prod_page_middle">
              <div className="prod_page_prod_container">
                <div className="prod_page_prod">
                  <div className="prod_page_prod_images">
                    <ProdImageWithZoom prodImages={prodImages} />
                  </div>
                  <div className="prod_page_prod_details">
                    <div className="prod_page_pri_det_seller">
                      <div className="prod_page_pri_det">
                        <div className="prod_page_prod_name">
                          <Translate>{prodData.name}</Translate>
                        </div>
                        <div className="prod_page_type">
                          <Translate>{prodData.type}</Translate>,{" "}
                          <Translate>{prodData.cat}</Translate>
                        </div>
                        <div className="prod_page_prod_rating">
                          <ErrorBoundary>
                            <Suspense fallback={<FallbackLazy />}>
                              <StarComponent
                                rating={prodData.rating}
                                size="16px"
                              />
                            </Suspense>
                          </ErrorBoundary>
                        </div>
                      </div>
                      <div className="prod_page_seller">
                        <Link
                          target="_blank"
                          className="prod_page_seller_link"
                          to={`/farmers/${prodData.sellerId}`}
                        >
                          <Translate>Seller's profile</Translate>
                        </Link>
                        <button className="prod_page_seller_contact_btn">
                          <i
                            style={{ marginRight: "8px" }}
                            className="fas fa-phone-alt"
                          ></i>
                          <Translate>Contact Seller</Translate>
                        </button>
                      </div>
                    </div>
                    <div className="prod_page_sec_det">
                      <div className="prod_page_is_nego">
                        {prodData.isNegotiable ? (
                          <span style={{ color: "#008800" }}>
                            <Translate>Price Negotiable</Translate>
                          </span>
                        ) : (
                          <span style={{ color: "#cc0000" }}>
                            <Translate>Price NOT negotiable</Translate>
                          </span>
                        )}
                      </div>
                      <div className="prod_page_price">
                        <span
                          style={{ color: "#5c5c5c" }}
                          className="prod_page_price_text"
                        >
                          <Translate>Base price:</Translate>
                        </span>
                        {" ₹ "}
                        <Translate>{prodData.basePrice}</Translate>{" "}
                        <Translate>per</Translate>{" "}
                        <Translate>{prodData.basePricePerDigit}</Translate>{" "}
                        <Translate>{prodData.basePricePerUnit}</Translate>
                      </div>
                      <div className="prod_page_life">
                        <i
                          style={{ marginRight: "8px" }}
                          className="fas fa-clock"
                        ></i>
                        <Translate>Shelf life left:</Translate>{" "}
                        <strong>
                          <Translate>{prodData.shelfLifeDigit}</Translate>{" "}
                          <Translate>{prodData.shelfLifeUnit}</Translate>{" "}
                          <Translate>{prodData.shelfLifeSubDigit}</Translate>{" "}
                          <Translate>{prodData.shelfLifeSubUnit}</Translate>
                        </strong>
                      </div>
                      <div className="prod_page_qty">
                        <form
                          className="prod_page_qty_form"
                          onSubmit={handleAddToCart}
                        >
                          <div className="prod_page_form_details">
                            <label htmlFor="prod_page_buy_qty">
                              <Translate>Enter quantity:</Translate>
                            </label>
                            <input
                              value={purchasedQty}
                              onChange={(e) => setPurchasedQty(e.target.value)}
                              required
                              placeholder="Quantity"
                              className="prod_page_buy_input"
                              id="prod_page_buy_qty"
                              type="text"
                            />
                            {renderWeightUnit()}{" "}
                            <span style={{ marginLeft: "8px" }}>@</span>
                            {prodData.isNegotiable && (
                              <input
                                value={negotiatedPrice}
                                onChange={(e) =>
                                  setNegotiatedPrice(e.target.value)
                                }
                                onChange
                                placeholder="Your price"
                                className="prod_page_buy_input"
                                id="prod_page_neg_price"
                                type="text"
                              />
                            )}
                          </div>
                          <button type="submit">
                            <span>
                              <i
                                style={{
                                  marginRight: "8px",
                                }}
                                className="fas fa-cart-plus"
                              ></i>
                            </span>
                            <Translate>ADD TO CART</Translate>
                          </button>
                        </form>
                        <div className={formErrorState}>
                          <span style={{ marginRight: "4px" }}>
                            <i className="fas fa-info-circle"></i>
                          </span>
                          <Translate>Wrong input value</Translate>
                        </div>
                      </div>
                      <div className="prod_page_prod_desc">
                        <div className="prod_page_prod_desc_heaing">
                          <Translate>PRODUCT DESCRIPTION</Translate>
                        </div>
                        <div className="prod_page_prod_desc_brief">
                          <Translate>{prodData.desc.brief}</Translate>
                        </div>
                        {prodData.desc.table && (
                          <div className="prod_page_prod_desc_table">
                            {prodData.desc.table.map((item) => (
                              <div
                                className="prod_page_prod_desc_table_item"
                                key={item.key}
                              >
                                <span className="prod_page_prod_desc_point_key">
                                  <Translate>{item.key}</Translate>
                                </span>
                                :
                                <span className="prod_page_prod_desc_point_value">
                                  <Translate>{item.value}</Translate>
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="prod_page_offers">
                  <div className="prod_page_heading">
                    <Translate>OFFERS</Translate>
                  </div>
                  <hr />
                  <div className="prod_page_offer_container">
                    {offers.map((item) => (
                      <div className="prod_page_offer_item">
                        <div className="prod_page_offer_name">
                          <Translate>{item.name}</Translate>:
                        </div>
                        <div className="prod_page_offer_desc">
                          <span>
                            <Translate>{item.desc}</Translate>
                          </span>
                          <Link
                            className="prod_page_offer_link"
                            target="_blank"
                            to={`/offers/${item.id}`}
                          >
                            <Translate>{item.linkText}</Translate>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="prod_page_ad_banners">
                  <DoubleInfoBanner />
                </div>
                <div className="prod_page_rating_bars">
                  <div className="prod_page_heading">
                    <Translate>REVIEWS AND RATINGS</Translate>
                  </div>
                  <hr />
                  <div className="prod_page_rating_text">
                    <Translate>
                      {(totStars / totRating).toFixed(1)} out of 5
                    </Translate>
                  </div>
                  <div className="prod_page_rating_stars_count">
                    <ErrorBoundary>
                      <Suspense fallback={<FallbackLazy />}>
                        <StarComponent
                          rating={totStars / totRating}
                          size="20px"
                        />
                      </Suspense>
                    </ErrorBoundary>
                    <Translate>{totRating}</Translate>{" "}
                    <Translate>user Ratings</Translate>
                  </div>
                  <div className="prod_page_rating_bar_container">
                    <div className="prod_page_rating_bar_grp">
                      <div className="prod_page_rating_bar_text">
                        <Translate>1 star:</Translate>
                      </div>
                      <div className="prod_page_rating_bar">
                        <div className="prod_page_rating_bar_bg"></div>
                        <div
                          style={{
                            width: `${(
                              (review.ratingDesc.oneStar / totRating) *
                              100
                            ).toFixed(2)}%`,
                          }}
                          className="prod_page_rating_bar_fg"
                        ></div>
                      </div>
                      <div className="prod_page_rating_bar_perc">
                        {(
                          (review.ratingDesc.oneStar / totRating) *
                          100
                        ).toFixed(0)}
                        %
                      </div>
                    </div>
                    <div className="prod_page_rating_bar_grp">
                      <div className="prod_page_rating_bar_text">
                        <Translate>2 star:</Translate>
                      </div>
                      <div className="prod_page_rating_bar">
                        <div className="prod_page_rating_bar_bg"></div>
                        <div
                          style={{
                            width: `${(
                              (review.ratingDesc.twoStar / totRating) *
                              100
                            ).toFixed(2)}%`,
                          }}
                          className="prod_page_rating_bar_fg"
                        ></div>
                      </div>
                      <div className="prod_page_rating_bar_perc">
                        {(
                          (review.ratingDesc.twoStar / totRating) *
                          100
                        ).toFixed(0)}
                        %
                      </div>
                    </div>
                    <div className="prod_page_rating_bar_grp">
                      <div className="prod_page_rating_bar_text">
                        <Translate>3 star:</Translate>
                      </div>
                      <div className="prod_page_rating_bar">
                        <div className="prod_page_rating_bar_bg"></div>
                        <div
                          style={{
                            width: `${(
                              (review.ratingDesc.threeStar / totRating) *
                              100
                            ).toFixed(2)}%`,
                          }}
                          className="prod_page_rating_bar_fg"
                        ></div>
                      </div>
                      <div className="prod_page_rating_bar_perc">
                        {(
                          (review.ratingDesc.threeStar / totRating) *
                          100
                        ).toFixed(0)}
                        %
                      </div>
                    </div>
                    <div className="prod_page_rating_bar_grp">
                      <div className="prod_page_rating_bar_text">
                        <Translate>4 star:</Translate>
                      </div>
                      <div className="prod_page_rating_bar">
                        <div className="prod_page_rating_bar_bg"></div>
                        <div
                          style={{
                            width: `${(
                              (review.ratingDesc.fourStar / totRating) *
                              100
                            ).toFixed(2)}%`,
                          }}
                          className="prod_page_rating_bar_fg"
                        ></div>
                      </div>
                      <div className="prod_page_rating_bar_perc">
                        {(
                          (review.ratingDesc.fourStar / totRating) *
                          100
                        ).toFixed(0)}
                        %
                      </div>
                    </div>
                    <div className="prod_page_rating_bar_grp">
                      <div className="prod_page_rating_bar_text">
                        <Translate>5 star:</Translate>
                      </div>
                      <div className="prod_page_rating_bar">
                        <div className="prod_page_rating_bar_bg"></div>
                        <div
                          style={{
                            width: `${(
                              (review.ratingDesc.fiveStar / totRating) *
                              100
                            ).toFixed(2)}%`,
                          }}
                          className="prod_page_rating_bar_fg"
                        ></div>
                      </div>
                      <div className="prod_page_rating_bar_perc">
                        {(
                          (review.ratingDesc.fiveStar / totRating) *
                          100
                        ).toFixed(0)}
                        %
                      </div>
                    </div>
                  </div>
                </div>
                <div className="prod_page_reviews">
                  <div className="prod_page_heading">
                    <Translate>USER REVIEWS</Translate>
                  </div>
                  <hr />
                  {renderReview()}
                </div>
              </div>
              <div className="prod_page_ad_container">
                {adBanners.large.map((banner) => (
                  <div className="prod_page_side_ad_large" key={banner.id}>
                    <img src={banner.url} alt="" />
                  </div>
                ))}
                {adBanners.strip.map((banner) => (
                  <div className="prod_page_side_ad_strip" key={banner.id}>
                    <img src={banner.url} alt="" />
                  </div>
                ))}
              </div>
            </div>
            <div className="prod_page_prod_suggestion">
              <ErrorBoundary>
                <Suspense fallback={<FallbackLazy />}>
                  <ProductSlider
                    productsList={productList}
                    boldHeading="Related products"
                    normalHeading="that you may like"
                    viewAllLink="#"
                  />
                </Suspense>
              </ErrorBoundary>
            </div>
            <div className="prod_page_farmer_suggestion">
              <ErrorBoundary>
                <Suspense fallback={<FallbackLazy />}>
                  <FarmerSlider
                    farmersList={FarmersList}
                    boldHeading="Active farmers"
                    normalHeading="in your area"
                    viewAllLink="#"
                  />
                </Suspense>
              </ErrorBoundary>
            </div>
            <div className="prod_page_footer">
              <ErrorBoundary>
                <Suspense fallback={<FallbackLazy />}>
                  <Footer details={FooterDetails} />
                </Suspense>
              </ErrorBoundary>
            </div>
          </>
        </Route>
        <Route path={`${path}/reviews`}>
          <div>Well this is "all-review" page</div>
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
            background: "#00C4FF",
            color: "#ffffff",
          }}
        >
          Please log-in to continue.
        </div>
      </Popup>
    </div>
  );
};

export default Product;
