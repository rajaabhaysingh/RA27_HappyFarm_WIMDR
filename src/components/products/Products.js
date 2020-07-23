import React, { lazy, Suspense, memo } from "react";
import "./Products.css";

import FallbackLazy from "../FallbackLazy";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

import ProdCatList from "./ProdCatList";
import AdCategoryData1 from "../layouts/adCategoryGrid/AdCategoryData1";
import AdCategoryData2 from "../layouts/adCategoryGrid/AdCategoryData2";
import ProductList from "../layouts/productSlider/ProductSliderList";
import FooterDetails from "../layouts/footer/FooterDetails";

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

const Products = () => {
  const prodList = ProdCatList;

  return (
    <div className="prod_main_div">
      <ErrorBoundary>
        <Suspense fallback={<FallbackLazy />}>
          <div className="prod_cat_list">
            {prodList.map((item) => (
              <div key={item.name} className="prod_cat_item">
                <img className="cat_item_img" src={item.catIconUrl} alt="" />
                <div className="cat_item_name">{item.name}</div>
              </div>
            ))}
          </div>
          {/* tripple banner */}
          <div className="prod_tripple_banner">
            <TrippleInfoBanner />
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
            <DoubleInfoBanner />
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
          {/* double banner */}
          <div className="prod_double_banner">
            <DoubleInfoBanner />
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
            <DoubleInfoBanner />
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
            <TrippleInfoBanner />
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
          <div className="prod_footer">
            <Footer details={FooterDetails} />
          </div>
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default Products;
