import React, { memo, lazy, Suspense, useState } from "react";
import "./AddressSelector.css";

import addressData from "./addressData";

import FallbackLazy from "../../FallbackLazy";
import ErrorBoundary from "../../errorBoundary/ErrorBoundary";

import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import API_KEY from "../../auth/GoogleAPI";

// configuring toast
toast.configure();

const Select = lazy(() => import("react-select"));
const AsyncSelect = lazy(() => import("react-select/async"));
const AsyncCreatableSelect = lazy(() => import("react-select/async-creatable"));

function AddressSelector({
  customTheme,
  setNewName,
  setNewContact,
  setNewAddressLine,
  setNewCountry,
  setNewDiv1,
  setNewDiv2,
  setNewDiv3,
  setNewDiv4,
  setNewZip,
  newName,
  newContact,
  newAddressLine,
  newCountry,
  newDiv1,
  newDiv2,
  newDiv3,
  newDiv4,
  newZip,
}) {
  // ----async creatable handlers----
  const filterData = (inputValue) => {
    return addressData.filter((i) =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  const promiseOptions = (inputValue) =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(filterData(inputValue));
      }, 1000);
    });
  // --------------------------------

  // ---------LOCATION SEARCH BLOCK STARTS HERE--------
  const getLocation = () => {
    if (navigator.geolocation) {
      setNewAddressLine("Locating...");
      navigator.geolocation.getCurrentPosition(showPosition, handleError, {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0,
      });
    } else {
      alert(
        "This feature isn't supported. Try manually searching the address..."
      );
    }
  };

  const showPosition = (position) => {
    let posX = position.coords.latitude;
    let posY = position.coords.longitude;

    let currentLocation = "";

    let locAPI =
      "https://maps.googleapis.com/maps/api/geocode/json?latlng=" +
      posX +
      "," +
      posY +
      "&key=" +
      API_KEY;

    axios
      .get(locAPI)
      .then((response) => {
        currentLocation = response.data.results[0].formatted_address;
        // setting location box status to locating
        setNewAddressLine(currentLocation);
        handleToast(currentLocation, "dark");
      })
      .catch((error) => {
        handleToast(error, "error");
        // console.log(error);
      })
      .finally();
  };

  const handleError = (error) => {
    let errMsg = "";
    switch (error.code) {
      case error.PERMISSION_DENIED:
        errMsg =
          "PERMISSION_DENIED. Allow website to use location in site settings...";
        break;
      case error.POSITION_UNAVAILABLE:
        errMsg =
          "POSITION_UNAVAILABLE. Your current position is unavailable, please enter your location manually...";
        break;
      case error.TIMEOUT:
        errMsg = "Server timed out. Make sure Location service is turned on...";
        break;
      case error.UNKNOWN_ERROR:
        errMsg = "UNKNOWN_ERROR. Error code: 0";
        break;

      default:
        errMsg =
          "Something unexpected happened. We couldn't process your request...";
        break;
    }
    // setting location box status to locating
    setNewAddressLine("Couldn't locate...");
    handleToast(errMsg, "error");
  };

  const handleToast = (message, toastType) => {
    if (toastType === "dark") {
      toast.dark(message, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    } else if (toastType === "error") {
      toast.error(message, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    } else {
      toast(message);
    }
  };
  // ----------LOCATION SEARCH BLOCK ENDS HERE---------

  return (
    <div className="add_selector_main_div">
      <ErrorBoundary>
        <Suspense fallback={<FallbackLazy />}>
          <div className="add_sel_info_label">Enter name:</div>
          <div className="add_sel_info_item">
            <input
              required
              type="text"
              className="add_sel_input add_sel_input_full"
              onChange={(e) => {
                setNewName(e.target.value);
              }}
              value={newName}
              placeholder="Enter name"
            />
          </div>
          <div className="add_sel_info_label">Address line 1:</div>
          <div className="add_sel_info_item">
            <input
              required
              type="text"
              className="add_sel_input add_sel_input_full"
              onChange={(e) => {
                setNewAddressLine(e.target.value);
              }}
              value={newAddressLine}
              placeholder="House no, Street name, Colony, Landmark, etc"
            />
            <div className="add_sel_loc_btn" onClick={getLocation}>
              <i className="fas fa-crosshairs"></i>
            </div>
          </div>

          <div className="add_sel_dual_fields">
            <div className="add_sel_dual_group">
              <div className="add_sel_info_label">Select country:</div>
              <Select
                required
                theme={customTheme}
                options={[
                  { value: "IN", label: "India" },
                  { value: "PK", label: "Pakistan" },
                ]}
                className="add_sel_select_half add_sel_select_state"
                placeholder="Select country..."
                isSearchable
                onChange={setNewCountry}
              />
            </div>
            <div className="add_sel_dual_group">
              <div className="add_sel_info_label">Select your State/UT:</div>
              <AsyncSelect
                required
                theme={customTheme}
                loadOptions={promiseOptions}
                cacheOptions
                defaultOptions
                className="add_sel_select_half add_sel_select_state"
                placeholder="Enter State/UT..."
                isSearchable
                onChange={setNewDiv1}
              />
            </div>
          </div>

          <div className="add_sel_dual_fields">
            <div className="add_sel_dual_group">
              <div className="add_sel_info_label">Select your district:</div>
              <AsyncSelect
                theme={customTheme}
                loadOptions={promiseOptions}
                cacheOptions
                defaultOptions
                className="add_sel_select_half add_sel_select_state"
                placeholder="Enter district name..."
                isSearchable
                onChange={setNewDiv2}
              />
            </div>
            <div className="add_sel_dual_group">
              <div className="add_sel_info_label">
                Select your sub-district:
              </div>
              <AsyncSelect
                theme={customTheme}
                loadOptions={promiseOptions}
                cacheOptions
                defaultOptions
                className="add_sel_select_half add_sel_select_state"
                placeholder="Enter sub-district name..."
                isSearchable
                onChange={setNewDiv3}
              />
            </div>
          </div>

          {/* <div className="add_sel_info_label">EXAMPLE MULTI SELECT</div>
          <Select
            theme={customTheme}
            options={addressData}
            className="add_sel_select add_sel_select_state"
            placeholder="Enter multiple district..."
            isSearchable
            onChange={setMultiSelect}
            isMulti
            noOptionsMessage={() => "No more options available"}
          /> */}

          <div className="add_sel_info_label">
            Select your City/Village/Colony/Mohalla:
          </div>
          <AsyncCreatableSelect
            required
            theme={customTheme}
            className="add_sel_select add_sel_select_state"
            placeholder="Select or Type Village/City/Colony/Mohalla"
            cacheOptions
            defaultOptions
            loadOptions={promiseOptions}
            onChange={setNewDiv4}
          />

          <div className="add_sel_dual_fields">
            <div className="add_sel_dual_group">
              <div className="add_sel_info_label">Zip Code:</div>
              <div className="add_sel_info_item">
                <input
                  required
                  type="text"
                  className="add_sel_input add_sel_input_half"
                  onChange={(e) => {
                    setNewZip(e.target.value);
                  }}
                  value={newZip}
                  placeholder="Enter ZIP Code"
                />
              </div>
            </div>
            <div className="add_sel_dual_group">
              <div className="add_sel_info_label">Contact no:</div>
              <div className="add_sel_info_item">
                <div className="add_sel_phone_group">
                  <div className="add_sel_mob_code">
                    {newCountry.value === "PK" ? "+92" : "+91"}
                  </div>
                  <input
                    required
                    onChange={(e) => {
                      setNewContact(e.target.value);
                    }}
                    value={newContact}
                    type="text"
                    className="add_sel_input  add_sel_contact"
                    placeholder="Enter mobile number"
                  />
                </div>
              </div>
            </div>
          </div>
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

export default memo(AddressSelector);
