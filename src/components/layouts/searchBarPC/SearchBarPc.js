import React, { useCallback, useState, memo, lazy, Suspense } from "react";
import "./SearchBarPc.css";

import EnvironmentFilled from "@ant-design/icons/EnvironmentFilled";
import SearchOutlined from "@ant-design/icons/SearchOutlined";
import ArrowLeftOutlined from "@ant-design/icons/ArrowLeftOutlined";

import FallbackLazySecondary from "../../FallbackLazySecondary";
import ErrorBoundary from "../../errorBoundary/ErrorBoundary";

const SpeechRecognition = lazy(() =>
  import("../speechRecognition/SpeechRecognition")
);
const PlacesAutocompleteComponent = lazy(() =>
  import("../placesAutocomplete/PlacesAutocompleteComponent")
);

function SearchBarPc({ productItems }) {
  // useState hook to define initial Product search result state
  const [productSuggestionStatePC, setProductSuggestionStatePC] = useState({
    productSuggestionPC: [],
    productQueryPC: "",
  });

  // destructuring the states of productSuggestionState
  const { productQueryPC } = productSuggestionStatePC;

  // onProduct change state
  const onProductTextChangePC = useCallback(
    (e) => {
      const enteredProduct = e.target.value;
      let productSuggestionPC = [];

      // Product list filtering and list population
      if (enteredProduct.length > 0) {
        const prod_regex = new RegExp(`^${enteredProduct}`, "i");
        productSuggestionPC = productItems
          .sort()
          .filter((v) => prod_regex.test(v));
      }

      setProductSuggestionStatePC({
        ...productSuggestionStatePC,
        productSuggestionPC,
        productQueryPC: enteredProduct,
      });
    },
    [productSuggestionStatePC, productItems]
  );

  // Handling on-select suggestions item - for Products
  const productSuggestionSelectedPC = useCallback(
    (value) => {
      setProductSuggestionStatePC({
        ...productSuggestionStatePC,
        productSuggestionPC: [],
        productQueryPC: value,
      });
    },
    [productSuggestionStatePC]
  );

  // Rendering product suggestion list
  const renderProductSuggestionPC = useCallback(() => {
    const { productSuggestionPC } = productSuggestionStatePC;
    if (productSuggestionPC.length === 0) {
      return null;
    }

    // closeProductListPC();

    return (
      <ul className="product_suggestion_list" id="product_suggestion_list">
        {productSuggestionPC.map((item) => (
          <li key={item} onClick={() => productSuggestionSelectedPC(item)}>
            {item}
            <ArrowLeftOutlined rotate="45" />
          </li>
        ))}
      </ul>
    );
  }, [productSuggestionStatePC, productSuggestionSelectedPC]);

  // handle form submit
  const handleSubmit = (e) => {
    try {
      //search
      e.preventDefault();
    } catch (error) {
      console.log(error);
    }
  };

  // --------------------------------------------------
  // -------SPEECH RECOGNITION BLOCK STARTS HERE-------
  const searchFromSpeech = useCallback(
    (query) => {
      setProductSuggestionStatePC({
        ...productSuggestionStatePC,
        productSuggestionPC: [],
        productQueryPC: query,
      });
    },
    [productSuggestionStatePC]
  );
  // --------SPEECH RECOGNITION BLOCK ENDS HERE--------
  // --------------------------------------------------

  return (
    <div className="searchbar_main_div" id="searchbar_main_div">
      <div className="searchbar_container_div">
        <form action="" onSubmit={handleSubmit}>
          <div className="search_box_no_suggestions">
            <div className="product_search_field">
              {/* <div> for search icon */}
              <div className="search_icon">
                <SearchOutlined />
              </div>
              {/* Input field for product search */}
              <input
                required
                value={productQueryPC}
                className="input_field"
                type="text"
                placeholder="Search products"
                onChange={onProductTextChangePC}
              />
              {/* speech recognition button */}
              <ErrorBoundary>
                <Suspense fallback={""}>
                  <SpeechRecognition searchFromSpeech={searchFromSpeech} />
                </Suspense>
              </ErrorBoundary>
            </div>
            {/* <div> for location icon */}
            <div className="location_icon">
              <EnvironmentFilled />
            </div>
            <div className="loc_search_fields">
              {/* Input field for location search */}
              <div className="places_autocomplete_component">
                <ErrorBoundary>
                  <Suspense fallback={<FallbackLazySecondary />}>
                    <PlacesAutocompleteComponent />
                  </Suspense>
                </ErrorBoundary>
              </div>
              {/* search btn */}
              <button type="submit" className="search_button">
                <SearchOutlined />
              </button>
            </div>
          </div>
        </form>
      </div>
      {renderProductSuggestionPC()}
    </div>
  );
}

export default memo(SearchBarPc);
