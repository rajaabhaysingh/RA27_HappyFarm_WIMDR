import React, {
  useEffect,
  lazy,
  Suspense,
  memo,
  useState,
  useCallback,
} from "react";
import "./AddNewProduct.css";

import { Translate } from "react-auto-translate";

import { useHistory } from "react-router-dom";

import FallbackLazy from "../../FallbackLazy";
import ErrorBoundary from "../../errorBoundary/ErrorBoundary";
import ImageUploader from "../../layouts/imageUploader/ImageUploader";

const Select = lazy(() => import("react-select"));
const AsyncSelect = lazy(() => import("react-select/async"));
const AsyncCreatableSelect = lazy(() => import("react-select/async-creatable"));

const AddNewProduct = ({ profileData }) => {
  let history = useHistory();
  // defining custom theme for select component
  const customTheme = (theme) => {
    return {
      ...theme,
      border: "1px solid",
      background: "#ee5700",
      colors: {
        ...theme.colors,
        primary25: "#ffe1c0",
        primary: "#ee5700",
      },
    };
  };

  // arrowStyleWrapper
  const arrowStyleWrapper = {
    dropdownIndicator: (defaultStyles) => ({
      ...defaultStyles,
      color: "#ee5700",
    }),
  };

  const arrowStyleWrapper2 = {
    dropdownIndicator: (defaultStyles) => ({
      ...defaultStyles,
      color: "#ee5700",
    }),
    control: (base, state) => ({
      ...base,
      background: "#fffbf0",
      borderColor: state.isFocused ? "#ee5700" : "#ee5700",
      "&:hover": {
        borderColor: state.isFocused ? "#ee5700" : "#ee5700",
      },
    }),
  };

  // list of productCat
  const productCatList = [
    {
      value: "VEG",
      label: "Vegetable",
    },
    {
      value: "FRU",
      label: "Fruits",
    },
    {
      value: "GRA",
      label: "Cereals",
    },
    {
      value: "PUL",
      label: "Pulses",
    },
  ];

  // form state mgmt
  const [formState, setFormState] = useState({
    prodCat: {},
    prodSubCat: {},
    prodName: {},
    prodDesc: "",
    isBulk: false,
    prodQty: undefined,
    prodQtyUnit: {},
    shelfLife: undefined,
    shelfLifeUnit: {},
    basePrice: undefined,
    basePricePerQty: undefined,
    basePricePerQtyUnit: {},
    isNegotiable: false,
    prodImages: [],
    thumbImage: [],
  });

  const {
    prodCat,
    prodSubCat,
    prodName,
    prodDesc,
    isBulk,
    prodQty,
    prodQtyUnit,
    shelfLife,
    shelfLifeUnit,
    basePrice,
    basePricePerQty,
    basePricePerQtyUnit,
    isNegotiable,
    prodImages,
    thumbImage,
  } = formState;

  // handleChange
  const handleChange = (inputField) => (e) => {
    setFormState({
      ...formState,
      [inputField]: e.target.value,
    });
  };

  useEffect(() => {
    setFormState({
      ...formState,
      isNegotiable: isNegotiable,
      isBulk: isBulk,
    });
  }, [isNegotiable, isBulk]);

  // ----async creatable handlers----
  const filterData = useCallback(
    (inputValue) => {
      return productCatList.filter((i) =>
        i.label.toLowerCase().includes(inputValue.toLowerCase())
      );
    },
    [productCatList]
  );

  const promiseOptions = (inputValue) =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(filterData(inputValue));
      }, 1000);
    });
  // --------------------------------

  // -------handleFormSubmit-------
  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(formState);
  };
  // ------------------------------

  // -----renderBulkSection-----
  const renderBulkSection = () => {
    if (isBulk) {
      return (
        <>
          <div className="add_new_dual_fields">
            <div className="add_new_dual_group">
              <div className="add_new_info_label">
                <Translate>Enter product quantity:</Translate>
              </div>
              <input
                type="text"
                className="add_new_input_half"
                placeholder="Quantity - Eg: 100"
                value={prodQty}
                onChange={handleChange("prodQty")}
              />
            </div>
            <div className="add_new_dual_group_spacer"></div>
            <div className="add_new_dual_group">
              <div className="add_new_info_label">
                <Translate>Quantity unit:</Translate>
              </div>
              <AsyncSelect
                styles={arrowStyleWrapper2}
                required
                theme={customTheme}
                loadOptions={promiseOptions}
                cacheOptions
                defaultOptions
                className="add_new_select_half"
                placeholder="Kg/Litre etc."
                isSearchable
                onChange={(prodQtyUnit) =>
                  setFormState({
                    ...formState,
                    prodQtyUnit: {
                      prodQtyUnit,
                    },
                  })
                }
              />
            </div>
          </div>
          {/* shelf life */}
          <div className="add_new_dual_fields">
            <div className="add_new_dual_group">
              <div className="add_new_info_label">
                <Translate>Product's shelf life:</Translate>
              </div>
              <input
                type="text"
                className="add_new_input_half"
                placeholder="Shelf life - Eg: 10"
                value={shelfLife}
                onChange={handleChange("shelfLife")}
              />
            </div>
            <div className="add_new_dual_group_spacer"></div>
            <div className="add_new_dual_group">
              <div className="add_new_info_label">
                <Translate>Time unit:</Translate>
              </div>
              <AsyncSelect
                styles={arrowStyleWrapper2}
                required
                theme={customTheme}
                loadOptions={promiseOptions}
                cacheOptions
                defaultOptions
                className="add_new_select_half"
                placeholder="Hours/Days etc."
                isSearchable
                onChange={(prodQtyUnit) =>
                  setFormState({
                    ...formState,
                    prodQtyUnit: {
                      prodQtyUnit,
                    },
                  })
                }
              />
            </div>
          </div>
        </>
      );
    }
  };

  return (
    <div className="add_new_main_div">
      <div className="add_new_inner_div">
        <form onSubmit={handleFormSubmit}>
          <ErrorBoundary>
            <Suspense fallback={<FallbackLazy />}>
              <div className="add_new_top_heading_and_utility">
                <div className="add_new_heading">
                  <Translate>ADD NEW PRODUCT</Translate>
                </div>
                <div
                  className="add_new_cancel_top"
                  onClick={() => {
                    history.goBack();
                  }}
                >
                  <i className="fas fa-times"></i> <Translate>Cancel</Translate>
                </div>
              </div>
              <div className="add_new_dual_fields">
                <div className="add_new_dual_group">
                  <div className="add_new_info_label">
                    <Translate>Select product category:</Translate>
                  </div>
                  <Select
                    styles={arrowStyleWrapper}
                    required
                    theme={customTheme}
                    options={productCatList}
                    className="add_new_select_half"
                    placeholder="Product Category"
                    isSearchable
                    onChange={(selectedCat) =>
                      setFormState({
                        ...formState,
                        prodCat: {
                          selectedCat,
                        },
                      })
                    }
                  />
                </div>
                <div className="add_new_dual_group_spacer"></div>
                <div className="add_new_dual_group">
                  <div className="add_new_info_label">
                    <Translate>Select sub-category:</Translate>
                  </div>
                  <AsyncSelect
                    styles={arrowStyleWrapper}
                    required
                    theme={customTheme}
                    loadOptions={promiseOptions}
                    cacheOptions
                    defaultOptions
                    className="add_new_select_half"
                    placeholder="Sub-category"
                    isSearchable
                    onChange={(selectedSubCat) =>
                      setFormState({
                        ...formState,
                        prodSubCat: {
                          selectedSubCat,
                        },
                      })
                    }
                  />
                </div>
              </div>
              {/* name */}
              <div className="add_new_info_label">
                <Translate>Enter/Select product name:</Translate>
              </div>
              <AsyncCreatableSelect
                styles={arrowStyleWrapper}
                required
                theme={customTheme}
                className="add_new_select"
                placeholder="Product name"
                cacheOptions
                defaultOptions
                loadOptions={promiseOptions}
                onChange={(productName) =>
                  setFormState({
                    ...formState,
                    prodName: {
                      productName,
                    },
                  })
                }
              />
              {/* description */}
              <div className="add_new_info_label">
                <Translate>Product's description:</Translate>
              </div>
              <div className="add_new_desc">
                <span style={{ color: "#ee5700" }}>
                  <i className="fas fa-info-circle"></i>
                </span>{" "}
                <Translate>
                  Please enter complete product detail like type, breed,
                  seasonal/non-seasonal, color, cultivation/production time, etc
                  briefly here.
                </Translate>{" "}
                <br></br>
                <span style={{ color: "#ee5700", cursor: "pointer" }}>
                  <strong>
                    <Translate>Click here</Translate>
                  </strong>
                </span>{" "}
                <Translate>
                  if you want to fill up complete description form
                </Translate>{" "}
                <em>
                  <Translate>(optional)</Translate>
                </em>
                .
              </div>
              <input
                type="text"
                className="add_new_input"
                value={prodDesc}
                onChange={handleChange("prodDesc")}
                placeholder="Enter Description (Eg: Breed, organic/inorganic, etc)"
              />
              {/* normal/bulk */}
              <div className="add_new_info_label">
                <Translate>Select sell type:</Translate>{" "}
                <span style={{ color: "#ee5700" }}>
                  {" "}
                  <Translate>Need help</Translate>{" "}
                  <i className="fas fa-question-circle"></i>
                </span>
              </div>
              <div className="add_new_negotiable">
                <span className="add_new_nego_text">
                  <Translate>Sell as bulk item or normal ?</Translate>
                </span>
                <div
                  className="add_new_fieldset"
                  onChange={(e) => {
                    if (e.target.value === "bulk") {
                      setFormState({
                        ...formState,
                        isBulk: true,
                      });
                    } else {
                      setFormState({
                        ...formState,
                        isBulk: false,
                      });
                    }
                  }}
                >
                  <label htmlFor="bulk">
                    <Translate>Bulk</Translate>
                  </label>
                  <span style={{ width: "4px" }}></span>
                  <input
                    defaultChecked={isBulk ? true : false}
                    className="add_new_radio_btn"
                    id="bulk"
                    type="radio"
                    value="bulk"
                    name="sell_type"
                  />
                  <div className="add_new_dual_group_spacer"></div>
                  <label htmlFor="normal">
                    <Translate>Normal</Translate>
                  </label>
                  <span style={{ width: "4px" }}></span>
                  <input
                    defaultChecked={isBulk ? false : true}
                    className="add_new_radio_btn"
                    id="normal"
                    type="radio"
                    value="normal"
                    name="sell_type"
                  />
                </div>
              </div>

              {/* quantity & shelf life - for bulk section only */}
              {renderBulkSection()}

              {/* base price */}
              <div className="add_new_dual_fields">
                <div className="add_new_dual_group">
                  <div className="add_new_info_label">
                    <Translate>Base price (in ₹):</Translate>
                  </div>
                  <input
                    type="text"
                    className="add_new_input_half"
                    placeholder="Eg: ₹ 35.0"
                    value={basePrice}
                    onChange={handleChange("basePrice")}
                  />
                </div>
                <div className="add_new_dual_group_spacer"></div>
                <div className="add_new_dual_group">
                  <div className="add_new_info_label">
                    <Translate>Per Qty digits</Translate>
                  </div>
                  <input
                    type="text"
                    className="add_new_input_half"
                    placeholder="per 1.0"
                    value={basePricePerQty}
                    onChange={handleChange("basePricePerQty")}
                  />
                </div>
                <div className="add_new_dual_group_spacer"></div>
                <div className="add_new_dual_group">
                  <div className="add_new_info_label">
                    <Translate>Per Qty unit:</Translate>
                  </div>
                  <AsyncSelect
                    styles={arrowStyleWrapper}
                    required
                    theme={customTheme}
                    loadOptions={promiseOptions}
                    cacheOptions
                    defaultOptions
                    className="add_new_select_half"
                    placeholder="Kg etc."
                    isSearchable
                    onChange={(basePricePerQtyUnit) =>
                      setFormState({
                        ...formState,
                        basePricePerQtyUnit: {
                          basePricePerQtyUnit,
                        },
                      })
                    }
                  />
                </div>
              </div>
              {/* radio */}
              <div className="add_new_info_label">
                <Translate>
                  Do you want to negotiate buyers over product's price ?
                </Translate>
              </div>
              <div className="add_new_negotiable">
                <span className="add_new_nego_text">
                  <Translate>Price negotiable ?</Translate>
                </span>
                <div
                  className="add_new_fieldset"
                  onChange={(e) => {
                    if (e.target.value === "yes") {
                      setFormState({
                        ...formState,
                        isNegotiable: true,
                      });
                    } else {
                      setFormState({
                        ...formState,
                        isNegotiable: false,
                      });
                    }
                  }}
                >
                  <label htmlFor="nego_yes">
                    <Translate>Yes</Translate>
                  </label>
                  <span style={{ width: "4px" }}></span>
                  <input
                    defaultChecked={isNegotiable ? true : false}
                    className="add_new_radio_btn"
                    id="nego_yes"
                    type="radio"
                    value="yes"
                    name="negotiable"
                  />
                  <div className="add_new_dual_group_spacer"></div>
                  <label htmlFor="nego_no">
                    <Translate>No</Translate>
                  </label>
                  <span style={{ width: "4px" }}></span>
                  <input
                    defaultChecked={isNegotiable ? false : true}
                    className="add_new_radio_btn"
                    id="nego_no"
                    type="radio"
                    value="no"
                    name="negotiable"
                  />
                </div>
              </div>
              {/* product image uploader */}
              <div className="add_new_info_label">
                <Translate>Select product's images:</Translate>
              </div>
              <div className="add_new_desc">
                <span style={{ color: "#ee5700" }}>
                  <i className="fas fa-info-circle"></i>
                </span>{" "}
                <Translate>Maximum</Translate> <strong>8</strong> i
                <Translate>
                  mage files allowed, with file size less than
                </Translate>{" "}
                <strong>
                  <Translate>2 MB</Translate>
                </strong>{" "}
                <Translate>each.</Translate>
              </div>
              <ImageUploader
                formState={formState}
                setFormState={setFormState}
                prodImages={prodImages}
                isMultiple={true}
                inputText={
                  "Click to select product images, or drag and drop here."
                }
                previewClass={"img_upld_thumb"}
              />
              {/* product thumbnail uploader */}
              <div className="add_new_info_label">
                <Translate>Select product thumbnail:</Translate>
              </div>
              <div className="add_new_desc">
                <span style={{ color: "#ee5700" }}>
                  <i className="fas fa-info-circle"></i>
                </span>{" "}
                <Translate>
                  This image will be used to feature your product on our
                  website.
                </Translate>
              </div>
              <ImageUploader
                formState={formState}
                setFormState={setFormState}
                thumbImage={thumbImage}
                isMultiple={false}
                inputText={"Select or Drag product's thumbnail here"}
                previewClass={"img_upld_preview"}
              />
              <div className="add_new_submit_container">
                <button className="add_new_submit_btn" type="submit">
                  <Translate>PUT ON SELL</Translate>
                </button>
              </div>
            </Suspense>
          </ErrorBoundary>
        </form>
      </div>
    </div>
  );
};

export default memo(AddNewProduct);
