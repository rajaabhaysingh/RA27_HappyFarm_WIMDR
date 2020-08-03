import React, { useEffect, useState, lazy, Suspense, memo } from "react";
import "./Products.css";

import { Translate } from "react-auto-translate";

import axios from "axios";

import { Switch, Route, Link, useRouteMatch } from "react-router-dom";

import FallbackLazy from "../FallbackLazy";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

import AdCategoryData1 from "../layouts/adCategoryGrid/AdCategoryData1";
import AdCategoryData2 from "../layouts/adCategoryGrid/AdCategoryData2";
import ProductList from "../layouts/productSlider/ProductSliderList";
import FooterDetails from "../layouts/footer/FooterDetails";
import BannerUrls from "../home/BannerUrls";

const DoubleInfoBanner = lazy(() =>
  import("../layouts/doubleInfoBanner/DoubleInfoBanner")
);
const TrippleInfoBanner = lazy(() =>
  import("../layouts/trippleInfoBanner/TrippleInfoBanner")
);
const AdCategoryGrid = lazy(() =>
  import("../layouts/adCategoryGrid/AdCategoryGrid")
);
const ProductSlider = lazy(() =>
  import("../layouts/productSlider/ProductSlider")
);
const Footer = lazy(() => import("../layouts/footer/Footer"));
const Product = lazy(() => import("./Product"));
const SearchPage = lazy(() => import("../searchPage/SearchPage"));

const Products = ({
  user,
  setUser,
  isSignedOutLinkOpen,
  setIsSignedOutLinkOpen,
}) => {
  // ----- fetching data state mgmt -----
  const baseUrl = "https://abhijitpatil.pythonanywhere.com";

  const [Categories, setCategories] = useState([]);

  // dataFetcher
  const dataFetcher = async () => {
    let categories = await axios.get(baseUrl + "/category/").catch((error) => {
      console.log(error);
    });
    console.log(categories);

    setCategories(categories.data.results);
  };

  // ------------------------------------

  useEffect(() => {
    dataFetcher();
  }, []);

  useEffect(() => {
    console.log();
  }, [Categories]);

  // for routing
  let { path, url } = useRouteMatch();

  return (
    <div className="prod_main_div">
      <Switch>
        <Route exact strict path={path}>
          <ErrorBoundary>
            <Suspense fallback={<FallbackLazy />}>
              <div className="prod_cat_list">
                {Categories.map((item) => (
                  <Link to={`${url}/search?q=${item.name}`}>
                    <div key={item.name} className="prod_cat_item">
                      <img className="cat_item_img" src={item.iconUrl} alt="" />
                      <div className="cat_item_name">
                        <Translate>{item.name}</Translate>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              {/* tripple banner */}
              <div className="prod_tripple_banner">
                <TrippleInfoBanner
                  banner1={BannerUrls.url[24]}
                  banner2={BannerUrls.url[23]}
                  banner3={BannerUrls.url[22]}
                />
              </div>
              {/* ad category */}
              <div className="prod_ad_cat ">
                <AdCategoryGrid dataList={AdCategoryData1} />
              </div>
              {/* ad category */}
              <div className="prod_ad_cat ">
                <AdCategoryGrid dataList={AdCategoryData2} />
              </div>
              {/* double banner */}
              <div className="prod_double_banner">
                <DoubleInfoBanner
                  banner1={BannerUrls.url[25]}
                  banner2={BannerUrls.url[21]}
                />
              </div>
              {/* ad category */}
              <div className="prod_ad_cat ">
                <AdCategoryGrid dataList={AdCategoryData1} />
              </div>
              {/* ad category */}
              <div className="prod_ad_cat ">
                <AdCategoryGrid dataList={AdCategoryData2} />
              </div>
              {/* double banner */}
              <div className="prod_double_banner">
                <DoubleInfoBanner
                  banner1={BannerUrls.url[20]}
                  banner2={BannerUrls.url[19]}
                />
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
              {/* double banner */}
              <div className="prod_double_banner">
                <DoubleInfoBanner
                  banner1={BannerUrls.url[18]}
                  banner2={BannerUrls.url[17]}
                />
              </div>
              {/* ad category */}
              <div className="prod_ad_cat ">
                <AdCategoryGrid dataList={AdCategoryData1} />
              </div>
              {/* ad category */}
              <div className="prod_ad_cat ">
                <AdCategoryGrid dataList={AdCategoryData2} />
              </div>
              {/* double banner */}
              <div className="prod_double_banner">
                <DoubleInfoBanner
                  banner1={BannerUrls.url[15]}
                  banner2={BannerUrls.url[16]}
                />
              </div>
              {/* ad category */}
              <div className="prod_ad_cat ">
                <AdCategoryGrid dataList={AdCategoryData1} />
              </div>
              {/* ad category */}
              <div className="prod_ad_cat ">
                <AdCategoryGrid dataList={AdCategoryData2} />
              </div>
              {/* tripple banner */}
              <div className="prod_tripple_banner">
                <TrippleInfoBanner
                  banner1={BannerUrls.url[12]}
                  banner2={BannerUrls.url[11]}
                  banner3={BannerUrls.url[10]}
                />
              </div>
              {/* ad category */}
              <div className="prod_ad_cat ">
                <AdCategoryGrid dataList={AdCategoryData1} />
              </div>
              {/* ad category */}
              <div className="prod_ad_cat ">
                <AdCategoryGrid dataList={AdCategoryData2} />
              </div>
              {/* double banner */}
              <div className="prod_double_banner">
                <DoubleInfoBanner
                  banner1={BannerUrls.url[14]}
                  banner2={BannerUrls.url[13]}
                />
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
              <div className="prod_footer">
                <Footer details={FooterDetails} />
              </div>
            </Suspense>
          </ErrorBoundary>
        </Route>
        <Route path={`${path}/search`}>
          <SearchPage />
        </Route>
        <Route path={`${path}/:prodId`}>
          <Product
            user={user}
            setUser={setUser}
            isSignedOutLinkOpen={isSignedOutLinkOpen}
            setIsSignedOutLinkOpen={setIsSignedOutLinkOpen}
          />
        </Route>
      </Switch>
    </div>
  );
};

export default memo(Products);
