import React, { useState } from "react";
import {
  EnvironmentFilled,
  SearchOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import "./SearchBarPc.css";
import SpeechRecognition from "../speechRecognition/SpeechRecognition";
import PlacesAutocompleteComponent from "../placesAutocomplete/PlacesAutocompleteComponent";

function SearchBarPc(props) {
  // useState hook to define initial Product search result state
  const [productSuggestionStatePC, setProductSuggestionStatePC] = useState({
    productSuggestionPC: [],
    productQueryPC: "",
  });

  // destructuring the states of productSuggestionState
  const { productQueryPC } = productSuggestionStatePC;

  // onProduct change state
  const onProductTextChangePC = (e) => {
    // setProductSuggestionStatePC

    // Destructuring props
    const { productItems } = props;
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
  };

  // // close product list
  // const closeProductListPC = (enteredProduct) => {
  //   // capturing click outside the list and closing list
  //   const list = document.getElementById("searchbar_main_div");
  //   document.body.addEventListener("click", function (event) {
  //     if (!list.contains(event.target)) {
  //       setProductSuggestionStatePC({
  //         ...productSuggestionStatePC,
  //         productQueryPC: enteredProduct,
  //         productSuggestionPC: [],
  //       });
  //     }
  //   });
  // };

  // Rendering product suggestion list
  const renderProductSuggestionPC = () => {
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
  };

  // Handling on-select suggestions item - for Products
  const productSuggestionSelectedPC = (value) => {
    setProductSuggestionStatePC({
      ...productSuggestionStatePC,
      productSuggestionPC: [],
      productQueryPC: value,
    });
  };

  // handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  // --------------------------------------------------
  // -------SPEECH RECOGNITION BLOCK STARTS HERE-------
  const searchFromSpeech = (query) => {
    setProductSuggestionStatePC({
      ...productSuggestionStatePC,
      productSuggestionPC: [],
      productQueryPC: query,
    });
  };
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
                autoFocus
                value={productQueryPC}
                className="input_field"
                type="text"
                placeholder="Search products..."
                onChange={onProductTextChangePC}
              />
              {/* speech recognition button */}
              <SpeechRecognition searchFromSpeech={searchFromSpeech} />
            </div>
            {/* <div> for location icon */}
            <div className="location_icon">
              <EnvironmentFilled />
            </div>
            <div className="loc_search_fields">
              {/* Input field for location search */}
              <div className="places_autocomplete_component">
                <PlacesAutocompleteComponent />
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

export default SearchBarPc;
