import React, { useEffect, useState, memo, lazy, Suspense } from "react";
import "./Home.css";

import axios from "axios";

import { Helmet } from "react-helmet";

import FallbackLazy from "../FallbackLazy";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

// Importing data files
import ProductOptions from "../layouts/ProductOptions";
// import topCarouselUrls from "./homeComponents/topCarousel/TopCarouselUrls";
// import CategoryList from "./homeComponents/categoryScroll/CategoryList";
// import FarmersList from "../layouts/farmerSlider/FarmerSliderList";
// import ProductList from "../layouts/productSlider/ProductSliderList";
// import BulkProdList from "../layouts/bulkDealSlider/BulkSliderList";
import FooterDetails from "../layouts/footer/FooterDetails";
import AdCategoryData1 from "../layouts/adCategoryGrid/AdCategoryData1";
import AdCategoryData2 from "../layouts/adCategoryGrid/AdCategoryData2";
import BannerUrls from "./BannerUrls";

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
const getWidth = () => {
  return window.innerWidth;
};

function Home({ isSearchBarOpen, setIsSearchBarOpen }) {
  // ----- fetching data state mgmt -----
  const baseUrl = "https://abhijitpatil.pythonanywhere.com";

  const [topCarouselUrls, setTopCarouselUrls] = useState([]);
  const [Categories, setCategories] = useState([]);
  const [FarmersList, setFarmersList] = useState([]);
  const [ProductList, setProductList] = useState([]);
  const [ProductList2, setProductList2] = useState([]);
  const [ProductList3, setProductList3] = useState([]);
  const [ProductList4, setProductList4] = useState([]);
  const [bulkProdList, setBulkProdList] = useState([]);
  const [bulkProdList2, setBulkProdList2] = useState([]);
  const [bulkProdList3, setBulkProdList3] = useState([]);
  const [adCatData, setAdCatData] = useState([]);

  // dataFetcher
  const dataFetcher = async () => {
    let carousel = await axios
      .get(baseUrl + "/top_carousel/")
      .catch((error) => {
        console.log(error);
      });
    setTopCarouselUrls(carousel.data.results);

    let categories = await axios.get(baseUrl + "/category/").catch((error) => {
      console.log(error);
    });
    setCategories(categories.data.results);

    let farmers = await axios
      .get("https://randomuser.me/api/?results=20")
      .catch((error) => {
        console.log(error);
      });
    setFarmersList(farmers.data.results);

    let products = await axios
      .get(baseUrl + "/item/?limit=12&offset=1&group=individual")
      .catch((error) => {
        console.log(error);
      });
    setProductList(products.data.results);
    let products2 = await axios
      .get(baseUrl + "/item/?limit=25&offset=13&group=individual")
      .catch((error) => {
        console.log(error);
      });
    setProductList2(products2.data.results);
    let products3 = await axios
      .get(baseUrl + "/item/?limit=37&offset=25&group=individual")
      .catch((error) => {
        console.log(error);
      });
    setProductList3(products3.data.results);
    let products4 = await axios
      .get(baseUrl + "/item/?limit=37&offset=25&group=individual")
      .catch((error) => {
        console.log(error);
      });
    setProductList4(products4.data.results);

    let bulk = await axios
      .get(baseUrl + "/item/?limit=16&offset=3&group=bulk")
      .catch((error) => {
        console.log(error);
      });
    setBulkProdList(bulk.data.results);
    let bulk2 = await axios
      .get(baseUrl + "/item/?limit=25&offset=12&group=bulk")
      .catch((error) => {
        console.log(error);
      });
    setBulkProdList2(bulk2.data.results);
    let bulk3 = await axios
      .get(baseUrl + "/item/?limit=37&offset=25&group=bulk")
      .catch((error) => {
        console.log(error);
      });
    setBulkProdList3(bulk3.data.results);

    let adCat = await axios.get(baseUrl + "/ad_category/").catch((error) => {
      console.log(error);
    });
    setAdCatData(adCat.data.results);
  };

  // ------------------------------------

  useEffect(() => {
    dataFetcher();
  }, []);

  useEffect(() => {
    console.log();
  }, [
    topCarouselUrls,
    FarmersList,
    Categories,
    ProductList,
    ProductList2,
    ProductList3,
    ProductList4,
    setBulkProdList,
    setBulkProdList2,
    setBulkProdList3,
  ]);

  // ------search should be open by default------
  // const searchBarBtn = document.getElementById("navbar_search_btn_group");

  // if (searchBarBtn && !isSearchBarOpen && window.innerWidth < 1024) {
  //   setTimeout(() => {
  //     setIsSearchBarOpen(true);
  //   }, 1000);
  // }
  // --------------------------------------

  // calculation border radius based on device width ad passing as props
  let borderRadiusWrapperOne = {
    borderRadius: "0 0 0 0",
  };

  if (getWidth() >= 1024) {
    borderRadiusWrapperOne = {
      borderRadius: "0 0 25px 25px",
    };
  }

  return (
    <div className="main_home_div">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Farmted - Home</title>
      </Helmet>

      <ErrorBoundary>
        <Suspense fallback={<FallbackLazy />}>
          <div className="category_scroll_container_mobile">
            <CategoryScroll categoryList={Categories} />
          </div>
          <div className="first_image_carousel">
            {console.log(topCarouselUrls)}
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
            <DoubleInfoBannerTypeOne
              banner1={BannerUrls.url[0]}
              banner2={BannerUrls.url[1]}
            />
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
            <TrippleInfoBanner
              banner1={BannerUrls.url[2]}
              banner2={BannerUrls.url[3]}
              banner3={BannerUrls.url[4]}
            />
          </div>
          {/* bulk slider - active bulk deals */}
          <div className="bulk_slider_component">
            <BulkSlider
              productsList={bulkProdList}
              boldHeading="Bulk deals"
              normalHeading="in your area"
              viewAllLink="#"
            />
          </div>
          {/* double slider */}
          <div className="double_info_banner_component">
            <DoubleInfoBanner
              banner1={BannerUrls.url[5]}
              banner2={BannerUrls.url[6]}
            />
          </div>
          {/* product slider */}
          <div className="product_slider_component">
            <ProductSlider
              productsList={ProductList2}
              boldHeading="Based on your"
              normalHeading="Profile and history"
              viewAllLink="#"
            />
          </div>
          {/* tripple banner */}
          <div className="tripple_info_banner_component">
            <TrippleInfoBanner
              banner1={BannerUrls.url[7]}
              banner2={BannerUrls.url[8]}
              banner3={BannerUrls.url[9]}
            />
          </div>
          {/* bulk slider - active bulk deals */}
          <div className="bulk_slider_component">
            <BulkSlider
              productsList={bulkProdList2}
              boldHeading="Bulk deals"
              normalHeading="in your area"
              viewAllLink="#"
            />
          </div>
          {/* double slider */}
          <div className="double_info_banner_component">
            <DoubleInfoBanner
              banner1={BannerUrls.url[10]}
              banner2={BannerUrls.url[11]}
            />
          </div>
          {/* ad category */}
          <div className="ad_cat_component ad_cat_1">
            <AdCategoryGrid dataList={adCatData[0]} />
          </div>
          {/* ad category */}
          <div className="ad_cat_component ad_cat_1">
            <AdCategoryGrid dataList={adCatData[1]} />
          </div>
          {/* double slider */}
          <div className="double_info_banner_component">
            <DoubleInfoBanner
              banner1={BannerUrls.url[12]}
              banner2={BannerUrls.url[13]}
            />
          </div>
          {/* product slider */}
          <div className="product_slider_component">
            <ProductSlider
              productsList={ProductList3}
              boldHeading="Recently added"
              normalHeading="products"
              viewAllLink="#"
            />
          </div>
          {/* bulk slider - active bulk deals */}
          <div className="bulk_slider_component">
            <BulkSlider
              productsList={bulkProdList3}
              boldHeading="Bulk deals"
              normalHeading="in your area"
              viewAllLink="#"
            />
          </div>
          {/* double slider */}
          <div className="double_info_banner_component">
            <DoubleInfoBanner
              banner1={BannerUrls.url[14]}
              banner2={BannerUrls.url[15]}
            />
          </div>
          {/* ad category */}
          <div className="ad_cat_component ad_cat_1">
            <AdCategoryGrid dataList={adCatData[2]} />
          </div>
          {/* ad category */}
          <div className="ad_cat_component ad_cat_1">
            <AdCategoryGrid dataList={adCatData[3]} />
          </div>
          {/* double slider */}
          <div className="double_info_banner_component">
            <DoubleInfoBanner
              banner1={BannerUrls.url[16]}
              banner2={BannerUrls.url[17]}
            />
          </div>
          {/* ad category */}
          <div className="ad_cat_component ad_cat_1">
            <AdCategoryGrid dataList={adCatData[0]} />
          </div>
          {/* ad category */}
          <div className="ad_cat_component ad_cat_1">
            <AdCategoryGrid dataList={adCatData[1]} />
          </div>
          {/* product slider */}
          <div className="product_slider_component">
            <ProductSlider
              productsList={ProductList4}
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
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

export default memo(Home);
