import React, { useCallback, useState, memo, lazy, Suspense } from "react";
import "./SearchBarPc.css";

import { useHistory } from "react-router-dom";

import FallbackLazySecondary from "../../FallbackLazySecondary";
import ErrorBoundary from "../../errorBoundary/ErrorBoundary";

const SpeechRecognition = lazy(() =>
  import("../speechRecognition/SpeechRecognition")
);
const PlacesAutocompleteComponent = lazy(() =>
  import("../placesAutocomplete/PlacesAutocompleteComponent")
);

function SearchBarPc({
  productItems,
  isSearchBarOpen,
  setIsSearchBarOpen,
  filterProps,
  sortOptions,
}) {
  let history = useHistory();

  // useState hook to define initial Product search result state and location
  const [productSuggestionStatePC, setProductSuggestionStatePC] = useState({
    productSuggestionPC: [],
    productQueryPC: "",
  });
  const [address, setAddress] = useState("");
  const [lat, setLat] = useState(undefined);
  const [long, setLong] = useState(undefined);

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
            <i className="fas fa-arrow-left"></i>
          </li>
        ))}
      </ul>
    );
  }, [productSuggestionStatePC, productSuggestionSelectedPC]);

  // handle form submit
  const handleSearch = (e) => {
    try {
      //search
      e.preventDefault();
      if (productQueryPC === "") {
        setProductSuggestionStatePC({
          productQueryPC: "",
        });
      } else if (address === "") {
        setAddress("");
      } else {
        if (
          isSearchBarOpen &&
          window.innerWidth >= 1024 &&
          address !== "" &&
          productQueryPC !== ""
        ) {
          console.log(isSearchBarOpen);

          setIsSearchBarOpen(false);
        }
        console.log(productQueryPC, address, lat, long);
        history.push(
          `/products/search?q=${productQueryPC.toLowerCase()}&add=${address.toLowerCase()}&lat=${lat}&long=${long}&filters=${
            filterProps
              ? filterProps.map(
                  (filterOption) => filterOption.toLowerCase() + ","
                )
              : "none"
          }&sort=${sortOptions ? sortOptions : "relevence"}`
        );
      }
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
        <form action="" onSubmit={handleSearch}>
          <div className="search_box_no_suggestions">
            <div className="product_search_field">
              {/* <div> for search icon */}
              <div className="search_icon">
                <i className="fas fa-search"></i>
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
              <i className="fas fa-map-marker-alt"></i>
            </div>
            <div className="loc_search_fields">
              {/* Input field for location search */}
              <div className="places_autocomplete_component">
                <ErrorBoundary>
                  <Suspense fallback={<FallbackLazySecondary />}>
                    <PlacesAutocompleteComponent
                      address={address}
                      setAddress={setAddress}
                      setLat={setLat}
                      setLong={setLong}
                    />
                  </Suspense>
                </ErrorBoundary>
              </div>
              {/* search btn */}
              <button type="submit" className="search_button">
                <i className="fas fa-search"></i>
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
