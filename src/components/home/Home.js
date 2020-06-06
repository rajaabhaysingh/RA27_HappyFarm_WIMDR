import React from "react";
import "./Home.css";
import CategoryScroll from "./homeComponents/categoryScroll/CategoryScroll";

// import SingleInfoBanner from "./homeComponents/infoBanner/SingleInfoBanner";
import DoubleInfoBannerTypeOne from "./homeComponents/infoBanner/DoubleInfoBanner";
import TrippleInfoBanner from "../layouts/trippleInfoBanner/TrippleInfoBanner";

import FarmerSlider from "../layouts/farmerSlider/FarmerSlider";
import ProductSlider from "../layouts/productSlider/ProductSlider";

import ProductOptions from "../layouts/ProductOptions";

// Importing banner urls
import topCarouselUrls from "./homeComponents/topCarousel/TopCarouselUrls";
import SearchBarPc from "../layouts/searchBarPC/SearchBarPc";

// Importing data files
import Categories from "./homeComponents/categoryScroll/CategoryList";
import FarmersList from "../layouts/farmerSlider/FarmerSliderList";
import ProductList from "../layouts/productSlider/ProductSliderList";
import BulkProdList from "../layouts/bulkDealSlider/BulkSliderList";
import BulkSlider from "../layouts/bulkDealSlider/BulkSlider";
import DoubleInfoBanner from "../layouts/doubleInfoBanner/DoubleInfoBanner";
import IntroInfo from "../layouts/introInfo/IntroInfo";
import Footer from "../layouts/footer/Footer";
import FooterDetails from "../layouts/footer/FooterDetails";
import AdCategoryData1 from "../layouts/adCategoryGrid/AdCategoryData1";
import AdCategoryData2 from "../layouts/adCategoryGrid/AdCategoryData2";
import AdCategoryGrid from "../layouts/adCategoryGrid/AdCategoryGrid";
import CarouselSlider from "../layouts/carousel/CarouselSlider";

// Function to get width of screen
// Returns 1024 if width is greater than 1024 pixels
const getWidth = () => {
  return window.innerWidth;
};

function Home() {
  // calculation border radius based on device width ad passing as props
  let borderRadiusWrapperOne = { borderRadius: "0 0 0 0" };
  // let borderRadiusWrapperTwo = { borderRadius: "0 0 0 0" };
  if (getWidth() >= 1024) {
    borderRadiusWrapperOne = { borderRadius: "0 0 25px 25px" };
    // borderRadiusWrapperTwo = { borderRadius: "25px 25px 25px 25px" };
  }
  return (
    <div className="main_home_div">
      <div className="category_scroll_container_mobile">
        <CategoryScroll categoryList={Categories} />
      </div>

      <div className="first_image_carousel">
        {/* If we remove autoPlay prop, arrows on sliders will appear */}
        <CarouselSlider
          slides={topCarouselUrls}
          borderRadius={borderRadiusWrapperOne}
        />
      </div>

      {/* Search bar for PC */}
      <div className="search_bar_pc">
        <SearchBarPc productItems={ProductOptions} />
      </div>

      {/* Caregory scroll for PC devices */}
      <div className="category_scroll_container_pc">
        <CategoryScroll categoryList={Categories} />
      </div>

      {/* Double info banner */}
      <div className="double_info_banner_type_one">
        <DoubleInfoBannerTypeOne />
      </div>

      {/* Farmer slider - active farmers */}
      <div className="farmer_slider_component">
        <FarmerSlider
          farmersList={FarmersList}
          boldHeading="Active farmers"
          normalHeading="in your area"
          viewAllLink="#"
        />
      </div>

      {/* product slider -trending products */}
      <div className="product_slider_component">
        <ProductSlider
          productsList={ProductList}
          boldHeading="Trending products"
          normalHeading="in your area"
          viewAllLink="#"
        />
      </div>

      {/* tripple banner */}
      <div className="tripple_info_banner_component">
        <TrippleInfoBanner />
      </div>

      {/* bulk slider - active bulk deals */}
      <div className="bulk_slider_component">
        <BulkSlider
          productsList={BulkProdList}
          boldHeading="Bulk deals"
          normalHeading="in your area"
          viewAllLink="#"
        />
      </div>

      {/* double slider */}
      <div className="double_info_banner_component">
        <DoubleInfoBanner />
      </div>

      {/* product slider */}
      <div className="product_slider_component">
        <ProductSlider
          productsList={ProductList}
          boldHeading="Based on your"
          normalHeading="Profile and history"
          viewAllLink="#"
        />
      </div>

      {/* tripple banner */}
      <div className="tripple_info_banner_component">
        <TrippleInfoBanner />
      </div>

      {/* bulk slider - active bulk deals */}
      <div className="bulk_slider_component">
        <BulkSlider
          productsList={BulkProdList}
          boldHeading="Bulk deals"
          normalHeading="in your area"
          viewAllLink="#"
        />
      </div>

      {/* double slider */}
      <div className="double_info_banner_component">
        <DoubleInfoBanner />
      </div>

      {/* ad category */}
      <div className="ad_cat_component ad_cat_1">
        <AdCategoryGrid dataList={AdCategoryData1} />
      </div>

      {/* ad category */}
      <div className="ad_cat_component ad_cat_1">
        <AdCategoryGrid dataList={AdCategoryData2} />
      </div>

      {/* double slider */}
      <div className="double_info_banner_component">
        <DoubleInfoBanner />
      </div>

      {/* product slider */}
      <div className="product_slider_component">
        <ProductSlider
          productsList={ProductList}
          boldHeading="Recently added"
          normalHeading="products"
          viewAllLink="#"
        />
      </div>

      {/* bulk slider - active bulk deals */}
      <div className="bulk_slider_component">
        <BulkSlider
          productsList={BulkProdList}
          boldHeading="Bulk deals"
          normalHeading="in your area"
          viewAllLink="#"
        />
      </div>

      {/* double slider */}
      <div className="double_info_banner_component">
        <DoubleInfoBanner />
      </div>

      {/* ad category */}
      <div className="ad_cat_component ad_cat_1">
        <AdCategoryGrid dataList={AdCategoryData1} />
      </div>

      {/* ad category */}
      <div className="ad_cat_component ad_cat_1">
        <AdCategoryGrid dataList={AdCategoryData2} />
      </div>

      {/* double slider */}
      <div className="double_info_banner_component">
        <DoubleInfoBanner />
      </div>

      {/* ad category */}
      <div className="ad_cat_component ad_cat_1">
        <AdCategoryGrid dataList={AdCategoryData1} />
      </div>

      {/* ad category */}
      <div className="ad_cat_component ad_cat_1">
        <AdCategoryGrid dataList={AdCategoryData2} />
      </div>

      {/* product slider */}
      <div className="product_slider_component">
        <ProductSlider
          productsList={ProductList}
          boldHeading="Based on your"
          normalHeading="Profile and history"
          viewAllLink="#"
        />
      </div>

      {/* intro info */}
      <div className="intro_info_component">
        <IntroInfo />
      </div>

      {/* Farmer slider - active farmers */}
      <div className="farmer_slider_component">
        <FarmerSlider
          farmersList={FarmersList}
          boldHeading="Rising farmers"
          normalHeading="in your area"
          viewAllLink="#"
        />
      </div>

      <div className="footer_component">
        <Footer details={FooterDetails} />
      </div>
      {/* <SingleInfoBanner /> */}
    </div>
  );
}

export default Home;
