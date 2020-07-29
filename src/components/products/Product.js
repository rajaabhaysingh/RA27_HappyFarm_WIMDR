import React, { useState, lazy, Suspense } from "react";
import "./Product.css";

import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import FallbackLazy from "../FallbackLazySecondary";

import { Switch, Route, Link, useRouteMatch } from "react-router-dom";

import { Stripes, ProdData, Offers, Review, adBanners } from "./ProdData";

import ProductSliderList from "../layouts/productSlider/ProductSliderList";
import FarmerSliderList from "../layouts/farmerSlider/FarmerSliderList";
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

// main component function
const Product = () => {
  const stripes = Stripes;
  const prodData = ProdData;
  const offers = Offers;
  const review = Review;
  const productList = ProductSliderList;
  const farmersList = FarmerSliderList;

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
            <div className="prod_page_rev_img_show_all">See all</div>
          </div>
          {review.topRev &&
            review.topRev.map((review) => (
              <div key={review.id} className="prod_page_prod_review">
                <div className="prod_page_rev_name_rating">
                  <div className="prod_page_rev_name">
                    {review.reviewerName}
                  </div>
                  <div className="prod_page_rev_ratings">
                    <ErrorBoundary>
                      <Suspense fallback={<FallbackLazy />}>
                        <StarComponent rating={review.rating} />
                      </Suspense>
                    </ErrorBoundary>
                  </div>
                </div>
                <div className="prod_page_rev_desc">{review.reviewText}</div>
                <div className="prod_page_rev_time">
                  <i
                    style={{ marginRight: "4px" }}
                    className="fas fa-clock"
                  ></i>
                  {tstampToTime(review.time)}
                </div>
              </div>
            ))}
          {review.topRev && (
            <div style={{ marginTop: "32px" }}>
              <Link className="prod_page_rev_show_all" to={`${url}/reviews`}>
                See all reviews
              </Link>
            </div>
          )}
        </>
      );
    }
  };

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
                          {prodData.name}
                        </div>
                        <div className="prod_page_type">
                          {prodData.type}, {prodData.cat}
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
                          Seller's profile
                        </Link>
                        <button className="prod_page_seller_contact_btn">
                          <i
                            style={{ marginRight: "8px" }}
                            className="fas fa-phone-alt"
                          ></i>
                          Contact Seller
                        </button>
                      </div>
                    </div>
                    <div className="prod_page_sec_det">
                      <div className="prod_page_is_nego">
                        {prodData.isNegotiable ? (
                          <span style={{ color: "#008800" }}>
                            Price Negotiable
                          </span>
                        ) : (
                          <span style={{ color: "#cc0000" }}>
                            Price NOT negotiable
                          </span>
                        )}
                      </div>
                      <div className="prod_page_price">
                        <span
                          style={{ color: "#5c5c5c" }}
                          className="prod_page_price_text"
                        >
                          Price:
                        </span>
                        {" ₹ "}
                        {prodData.basePrice} per {prodData.basePricePerDigit}{" "}
                        {prodData.basePricePerUnit}
                      </div>
                      <div className="prod_page_life">
                        <i
                          style={{ marginRight: "8px" }}
                          className="fas fa-clock"
                        ></i>
                        Shelf life left:{" "}
                        <strong>
                          {prodData.shelfLifeDigit} {prodData.shelfLifeUnit}{" "}
                          {prodData.shelfLifeSubDigit}{" "}
                          {prodData.shelfLifeSubUnit}
                        </strong>
                      </div>
                      <div className="prod_page_qty">
                        <form className="prod_page_qty_form" onSubmit>
                          <div className="prod_page_form_details">
                            <label htmlFor="prod_page_buy_qty">
                              Enter quantity:
                            </label>
                            <input
                              required
                              placeholder="Quantity"
                              className="prod_page_buy_input"
                              id="prod_page_buy_qty"
                              type="text"
                            />
                            {renderWeightUnit()}
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
                            ADD TO CART
                          </button>
                        </form>
                        <div className={formErrorState}>
                          <span style={{ marginRight: "4px" }}>
                            <i className="fas fa-info-circle"></i>
                          </span>
                          Wrong input value
                        </div>
                      </div>
                      <div className="prod_page_prod_desc">
                        <div className="prod_page_prod_desc_heaing">
                          PRODUCT DESCRIPTION
                        </div>
                        <div className="prod_page_prod_desc_brief">
                          {prodData.desc.brief}
                        </div>
                        {prodData.desc.table && (
                          <div className="prod_page_prod_desc_table">
                            {prodData.desc.table.map((item) => (
                              <div
                                className="prod_page_prod_desc_table_item"
                                key={item.key}
                              >
                                <span className="prod_page_prod_desc_point_key">
                                  {item.key}
                                </span>
                                :
                                <span className="prod_page_prod_desc_point_value">
                                  {item.value}
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
                  <div className="prod_page_heading">OFFERS</div>
                  <hr />
                  <div className="prod_page_offer_container">
                    {offers.map((item) => (
                      <div className="prod_page_offer_item">
                        <div className="prod_page_offer_name">{item.name}:</div>
                        <div className="prod_page_offer_desc">
                          <span>{item.desc}</span>
                          <Link
                            className="prod_page_offer_link"
                            target="_blank"
                            to={`/offers/${item.id}`}
                          >
                            {item.linkText}
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
                  <div className="prod_page_heading">REVIEWS AND RATINGS</div>
                  <hr />
                  <div className="prod_page_rating_text">
                    {(totStars / totRating).toFixed(1)} out of 5
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
                    {totRating} user Ratings
                  </div>
                  <div className="prod_page_rating_bar_container">
                    <div className="prod_page_rating_bar_grp">
                      <div className="prod_page_rating_bar_text">1 star:</div>
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
                      <div className="prod_page_rating_bar_text">2 star:</div>
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
                      <div className="prod_page_rating_bar_text">3 star:</div>
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
                      <div className="prod_page_rating_bar_text">4 star:</div>
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
                      <div className="prod_page_rating_bar_text">5 star:</div>
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
                  <div className="prod_page_heading">USER REVIEWS</div>
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
                    farmersList={farmersList}
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
    </div>
  );
};

export default Product;
