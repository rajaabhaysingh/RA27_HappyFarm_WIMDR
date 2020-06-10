import React, { memo, lazy, Suspense } from "react";
import "./Home.css";

import { Helmet } from "react-helmet";

import FallbackLazy from "../FallbackLazy";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

// Importing data files
import ProductOptions from "../layouts/ProductOptions";
import topCarouselUrls from "./homeComponents/topCarousel/TopCarouselUrls";
import Categories from "./homeComponents/categoryScroll/CategoryList";
import FarmersList from "../layouts/farmerSlider/FarmerSliderList";
import ProductList from "../layouts/productSlider/ProductSliderList";
import BulkProdList from "../layouts/bulkDealSlider/BulkSliderList";
import FooterDetails from "../layouts/footer/FooterDetails";
import AdCategoryData1 from "../layouts/adCategoryGrid/AdCategoryData1";
import AdCategoryData2 from "../layouts/adCategoryGrid/AdCategoryData2";

const CategoryScroll = lazy(() =>
  import("./homeComponents/categoryScroll/CategoryScroll")
);
const DoubleInfoBannerTypeOne = lazy(() =>
  import("./homeComponents/infoBanner/DoubleInfoBanner")
);
const TrippleInfoBanner = lazy(() =>
  import("../layouts/trippleInfoBanner/TrippleInfoBanner")
);
const FarmerSlider = lazy(() => import("../layouts/farmerSlider/FarmerSlider"));
const ProductSlider = lazy(() =>
  import("../layouts/productSlider/ProductSlider")
);
const AdCategoryGrid = lazy(() =>
  import("../layouts/adCategoryGrid/AdCategoryGrid")
);
const CarouselSlider = lazy(() => import("../layouts/carousel/CarouselSlider"));
const Footer = lazy(() => import("../layouts/footer/Footer"));
const IntroInfo = lazy(() => import("../layouts/introInfo/IntroInfo"));
const DoubleInfoBanner = lazy(() =>
  import("../layouts/doubleInfoBanner/DoubleInfoBanner")
);
const BulkSlider = lazy(() => import("../layouts/bulkDealSlider/BulkSlider"));

const SearchBarPc = lazy(() => import("../layouts/searchBarPC/SearchBarPc"));

// Function to get width of screen
// Returns 1024 if width is greater than 1024 pixels
const getWidth = () => {
  return window.innerWidth;
};

function Home({ isSearchBarOpen }) {
  // ------search should be open by default------
  const searchBarBtn = document.getElementById("navbar_search_btn_group");

  if (searchBarBtn && !isSearchBarOpen && window.innerWidth < 1024) {
    searchBarBtn.click();
  }

  // --------------------------------------

  // calculation border radius based on device width ad passing as props
  let borderRadiusWrapperOne = { borderRadius: "0 0 0 0" };

  if (getWidth() >= 1024) {
    borderRadiusWrapperOne = { borderRadius: "0 0 25px 25px" };
  }

  return (
    <div className="main_home_div">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Happyfarm</title>
      </Helmet>

      <div className="category_scroll_container_mobile">
        <ErrorBoundary>
          <Suspense fallback={<FallbackLazy />}>
            <CategoryScroll categoryList={Categories} />
          </Suspense>
        </ErrorBoundary>
      </div>

      <div className="first_image_carousel">
        {/* If we remove autoPlay prop, arrows on sliders will appear */}
        <ErrorBoundary>
          <Suspense fallback={<FallbackLazy />}>
            <CarouselSlider
              slides={topCarouselUrls}
              borderRadius={borderRadiusWrapperOne}
            />
          </Suspense>
        </ErrorBoundary>
      </div>

      {/* Search bar for PC */}
      <div className="search_bar_pc">
        <ErrorBoundary>
          <Suspense fallback={<FallbackLazy />}>
            <SearchBarPc productItems={ProductOptions} />
          </Suspense>
        </ErrorBoundary>
      </div>

      {/* Caregory scroll for PC devices */}
      <div className="category_scroll_container_pc">
        <ErrorBoundary>
          <Suspense fallback={<FallbackLazy />}>
            <CategoryScroll categoryList={Categories} />
          </Suspense>
        </ErrorBoundary>
      </div>

      {/* Double info banner */}
      <div className="double_info_banner_type_one">
        <ErrorBoundary>
          <Suspense fallback={<FallbackLazy />}>
            <DoubleInfoBannerTypeOne />
          </Suspense>
        </ErrorBoundary>
      </div>

      {/* Farmer slider - active farmers */}
      <div className="farmer_slider_component">
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

      {/* product slider -trending products */}
      <div className="product_slider_component">
        <ErrorBoundary>
          <Suspense fallback={<FallbackLazy />}>
            <ProductSlider
              productsList={ProductList}
              boldHeading="Trending products"
              normalHeading="in your area"
              viewAllLink="#"
            />
          </Suspense>
        </ErrorBoundary>
      </div>

      {/* tripple banner */}
      <div className="tripple_info_banner_component">
        <ErrorBoundary>
          <Suspense fallback={<FallbackLazy />}>
            <TrippleInfoBanner />
          </Suspense>
        </ErrorBoundary>
      </div>

      {/* bulk slider - active bulk deals */}
      <div className="bulk_slider_component">
        <ErrorBoundary>
          <Suspense fallback={<FallbackLazy />}>
            <BulkSlider
              productsList={BulkProdList}
              boldHeading="Bulk deals"
              normalHeading="in your area"
              viewAllLink="#"
            />
          </Suspense>
        </ErrorBoundary>
      </div>

      {/* double slider */}
      <div className="double_info_banner_component">
        <ErrorBoundary>
          <Suspense fallback={<FallbackLazy />}>
            <DoubleInfoBanner />
          </Suspense>
        </ErrorBoundary>
      </div>

      {/* product slider */}
      <div className="product_slider_component">
        <ErrorBoundary>
          <Suspense fallback={<FallbackLazy />}>
            <ProductSlider
              productsList={ProductList}
              boldHeading="Based on your"
              normalHeading="Profile and history"
              viewAllLink="#"
            />
          </Suspense>
        </ErrorBoundary>
      </div>

      {/* tripple banner */}
      <div className="tripple_info_banner_component">
        <ErrorBoundary>
          <Suspense fallback={<FallbackLazy />}>
            <TrippleInfoBanner />
          </Suspense>
        </ErrorBoundary>
      </div>

      {/* bulk slider - active bulk deals */}
      <div className="bulk_slider_component">
        <ErrorBoundary>
          <Suspense fallback={<FallbackLazy />}>
            <BulkSlider
              productsList={BulkProdList}
              boldHeading="Bulk deals"
              normalHeading="in your area"
              viewAllLink="#"
            />
          </Suspense>
        </ErrorBoundary>
      </div>

      {/* double slider */}
      <div className="double_info_banner_component">
        <ErrorBoundary>
          <Suspense fallback={<FallbackLazy />}>
            <DoubleInfoBanner />
          </Suspense>
        </ErrorBoundary>
      </div>

      {/* ad category */}
      <div className="ad_cat_component ad_cat_1">
        <ErrorBoundary>
          <Suspense fallback={<FallbackLazy />}>
            <AdCategoryGrid dataList={AdCategoryData1} />
          </Suspense>
        </ErrorBoundary>
      </div>

      {/* ad category */}
      <div className="ad_cat_component ad_cat_1">
        <ErrorBoundary>
          <Suspense fallback={<FallbackLazy />}>
            <AdCategoryGrid dataList={AdCategoryData2} />
          </Suspense>
        </ErrorBoundary>
      </div>

      {/* double slider */}
      <div className="double_info_banner_component">
        <ErrorBoundary>
          <Suspense fallback={<FallbackLazy />}>
            <DoubleInfoBanner />
          </Suspense>
        </ErrorBoundary>
      </div>

      {/* product slider */}
      <div className="product_slider_component">
        <ErrorBoundary>
          <Suspense fallback={<FallbackLazy />}>
            <ProductSlider
              productsList={ProductList}
              boldHeading="Recently added"
              normalHeading="products"
              viewAllLink="#"
            />
          </Suspense>
        </ErrorBoundary>
      </div>

      {/* bulk slider - active bulk deals */}
      <div className="bulk_slider_component">
        <ErrorBoundary>
          <Suspense fallback={<FallbackLazy />}>
            <BulkSlider
              productsList={BulkProdList}
              boldHeading="Bulk deals"
              normalHeading="in your area"
              viewAllLink="#"
            />
          </Suspense>
        </ErrorBoundary>
      </div>

      {/* double slider */}
      <div className="double_info_banner_component">
        <ErrorBoundary>
          <Suspense fallback={<FallbackLazy />}>
            <DoubleInfoBanner />
          </Suspense>
        </ErrorBoundary>
      </div>

      {/* ad category */}
      <div className="ad_cat_component ad_cat_1">
        <ErrorBoundary>
          <Suspense fallback={<FallbackLazy />}>
            <AdCategoryGrid dataList={AdCategoryData1} />
          </Suspense>
        </ErrorBoundary>
      </div>

      {/* ad category */}
      <div className="ad_cat_component ad_cat_1">
        <ErrorBoundary>
          <Suspense fallback={<FallbackLazy />}>
            <AdCategoryGrid dataList={AdCategoryData2} />
          </Suspense>
        </ErrorBoundary>
      </div>

      {/* double slider */}
      <div className="double_info_banner_component">
        <ErrorBoundary>
          <Suspense fallback={<FallbackLazy />}>
            <DoubleInfoBanner />
          </Suspense>
        </ErrorBoundary>
      </div>

      {/* ad category */}
      <div className="ad_cat_component ad_cat_1">
        <ErrorBoundary>
          <Suspense fallback={<FallbackLazy />}>
            <AdCategoryGrid dataList={AdCategoryData1} />
          </Suspense>
        </ErrorBoundary>
      </div>

      {/* ad category */}
      <div className="ad_cat_component ad_cat_1">
        <ErrorBoundary>
          <Suspense fallback={<FallbackLazy />}>
            <AdCategoryGrid dataList={AdCategoryData2} />
          </Suspense>
        </ErrorBoundary>
      </div>

      {/* product slider */}
      <div className="product_slider_component">
        <ErrorBoundary>
          <Suspense fallback={<FallbackLazy />}>
            <ProductSlider
              productsList={ProductList}
              boldHeading="Based on your"
              normalHeading="Profile and history"
              viewAllLink="#"
            />
          </Suspense>
        </ErrorBoundary>
      </div>

      {/* intro info */}
      <div className="intro_info_component">
        <ErrorBoundary>
          <Suspense fallback={<FallbackLazy />}>
            <IntroInfo />
          </Suspense>
        </ErrorBoundary>
      </div>

      {/* Farmer slider - active farmers */}
      <div className="farmer_slider_component">
        <ErrorBoundary>
          <Suspense fallback={<FallbackLazy />}>
            <FarmerSlider
              farmersList={FarmersList}
              boldHeading="Rising farmers"
              normalHeading="in your area"
              viewAllLink="#"
            />
          </Suspense>
        </ErrorBoundary>
      </div>

      <div className="footer_component">
        <ErrorBoundary>
          <Suspense fallback={<FallbackLazy />}>
            <Footer details={FooterDetails} />
          </Suspense>
        </ErrorBoundary>
      </div>
    </div>
  );
}

export default memo(Home);
