import React, { lazy, Suspense, useState, memo } from "react";
import "./SearchPage.css";

import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import FallbackLazy from "../FallbackLazy";

import HeaderImage from "../../res/searchPage/header_bg-01.png";
import SearchResultData from "./SearchResultData";

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
                3208
              </span>
              products found
            </div>
            <div className="search_pg_utility_main_div"></div>
          </div>
          <div className="search_pg_results">
            <div className="search_pg_results_filters">
              <div className="search_pg_spacer"></div>
              <div className="search_pg_sort">Sort by</div>
            </div>
            <div className="search_pg_results_items">
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
                        otherSellers={product.otherSellers}
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
          </div>
        </div>
      </div>
      <div className="search_pg_footer">
        <Footer />
      </div>
    </div>
  );
};

export default SearchPage;
