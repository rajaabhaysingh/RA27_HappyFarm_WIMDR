import React, { lazy, Suspense, useState, memo } from "react";
import "./SearchPage.css";

import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import FallbackLazy from "../FallbackLazy";

import HeaderImage from "../../res/searchPage/header_bg-01.png";
import SearchResultData from "./SearchResultData";

import ProductList from "../layouts/productSlider/ProductSliderList";
const ProductSlider = lazy(() =>
  import("../layouts/productSlider/ProductSlider")
);

const SearchBarPc = lazy(() => import("../layouts/searchBarPC/SearchBarPc"));
const Footer = lazy(() => import("../layouts/footer/Footer"));
const Pagination = lazy(() => import("./pagination/Pagination"));

// const SearchResultData = lazy(() => import("./SearchResultData"));
const ProductSliderItem = lazy(() =>
  import("../layouts/productSlider/ProductSliderItem")
);
const BulkDealItem = lazy(() =>
  import("../layouts/bulkDealSlider/BulkDealItem")
);

const SearchPage = () => {
  const prodData = SearchResultData;

  // handleSearchContainer
  const handleSearchContainer = () => {
    if (window.innerWidth >= 1024) {
      return (
        <div className="search_pg_search_container">
          <div className="search_pg_top_graphics">
            <img src={HeaderImage} alt="" />
          </div>
          <div className="search_pg_search_bar">
            <ErrorBoundary>
              <Suspense fallback={<FallbackLazy />}>
                <SearchBarPc />
              </Suspense>
            </ErrorBoundary>
          </div>
        </div>
      );
    }
  };

  // getSortOptClass
  const getSortOptClass = (activetype) => {
    if (prodData.filters.sort === activetype) {
      return "search_pg_sort_opt--active";
    } else {
      return "search_pg_sort_opt";
    }
  };

  return (
    <div className="search_pg_main_div">
      <div className="search_pg_inner_div">
        {handleSearchContainer()}
        <div className="search_pg_search_result_container">
          <div className="search_pg_utility">
            <div className="search_pg_num_results">
              <span
                style={{
                  fontWeight: "bold",
                  marginRight: "4px",
                  color: "#000000",
                }}
              >
                {prodData.totRes}
              </span>
              products found
            </div>
            <div className="search_pg_utility_main_div">
              <div className="search_pg_alert_div">
                <div className="search_pg_alert_header">
                  CREATE PRODUCT ALERT
                </div>
                <div className="search_pg_alert_desc">
                  Create a product alert and never miss new deals
                </div>
                <input
                  placeholder="Product name"
                  className="search_pg_alert_input"
                  type="email"
                />
                <button className="search_pg_alert_submit">SET ALERT</button>
              </div>
              <div className="search_pg_type">
                <div className="search_pg_type_heading">PRODUCT TYPE</div>
                <div className="search_pg_type_options">
                  <div className="search_pg_type_opt_item"></div>
                </div>
              </div>
              <div className="search_pg_ratings"></div>
              <div className="search_pg_assured"></div>
              <div className="search_pg_avail"></div>
              <div className="search_pg_search_rad"></div>
              <div className="search_pg_price"></div>
            </div>
          </div>
          <div className="search_pg_results">
            <div className="search_pg_results_filters">
              <div className="search_pg_spacer"></div>
              <div className="search_pg_sort">
                <div className="search_pg_sort_by_text">SORT BY:</div>
                <div className={getSortOptClass("relevence")}>Relevence</div>
                <div className={getSortOptClass("price_l_to_h")}>
                  Price - Low to High
                </div>
                <div className={getSortOptClass("price_h_to_l")}>
                  Price - High to Low
                </div>
                <div className={getSortOptClass("newest_first")}>
                  Newest first
                </div>
                <div className={getSortOptClass("ratings")}>Ratings</div>
              </div>
            </div>
            <div className="search_pg_results_items">
              {/* <div className="search_pg_result_heading">NORMAL PRODUCTS</div> */}
              <div className="search_pg_normal">
                <ErrorBoundary>
                  <Suspense fallback={<FallbackLazy />}>
                    {prodData.dataNormal.map((product) => (
                      <ProductSliderItem
                        key={product.id}
                        id={product.id}
                        isFresh={product.isFresh}
                        imageURL={product.imageURL}
                        name={product.name}
                        prodRating={product.prodRating}
                        type={product.type}
                        category={product.category}
                        basePrice={product.basePrice}
                        pricePerUnit={product.pricePerUnit}
                        addedDigit={product.addedDigit}
                        addedUnit={product.addedUnit}
                        location={product.location}
                        isNegotiable={product.isNegotiable}
                        sellerId={product.sellerId}
                      />
                    ))}
                  </Suspense>
                </ErrorBoundary>
              </div>
              <div className="search_pg_result_heading">BULK DEALS</div>
              <div className="search_pg_bulk">
                <ErrorBoundary>
                  <Suspense fallback={<FallbackLazy />}>
                    {prodData.dataBulk.map((product) => (
                      <BulkDealItem
                        key={product.id}
                        id={product.id}
                        imageURL={product.imageURL}
                        name={product.name}
                        breed={product.breed}
                        location={product.location}
                        category={product.category}
                        lotSizeDigit={product.lotSizeDigit}
                        lotSizeUnit={product.lotSizeUnit}
                        basePrice={product.basePrice}
                        pricePerUnit={product.pricePerUnit}
                        sellerId={product.sellerId}
                        sellerRating={product.sellerRating}
                        isNegotiable={product.isNegotiable}
                        delTime={product.delTime}
                        minBookVal={product.minBookVal}
                        minBookValUnit={product.minBookValUnit}
                        maxBookVal={product.maxBookVal}
                        maxBookValUnit={product.maxBookValUnit}
                        soldPercent={product.soldPercent}
                      />
                    ))}
                  </Suspense>
                </ErrorBoundary>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* ad-bar */}
      <div className="search_pg_product_slider_ad">
        <ProductSlider
          productsList={ProductList}
          boldHeading="Sponsored"
          normalHeading="products"
          viewAllLink="#"
        />
      </div>
      <div className="search_pg_pagination">
        <ErrorBoundary>
          <Suspense>
            <Pagination
              totalPage={5}
              activePage={2}
              gotoSpecificPage
              gotoNextPage
              gotoPrevPage
              gotoStart
              gotoEnd
            />
          </Suspense>
        </ErrorBoundary>
      </div>
      <div className="search_pg_footer">
        <Footer />
      </div>
    </div>
  );
};

export default SearchPage;
