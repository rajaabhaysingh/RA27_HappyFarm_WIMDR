import React, { memo, useCallback, lazy, Suspense } from "react";
import "./PlacesAutocompleteComponent.css";

import { geocodeByAddress, getLatLng } from "react-places-autocomplete";

import Loading3QuartersOutlined from "@ant-design/icons/Loading3QuartersOutlined";
import ArrowLeftOutlined from "@ant-design/icons/ArrowLeftOutlined";
import AimOutlined from "@ant-design/icons/AimOutlined";

import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import API_KEY from "../../auth/GoogleAPI";

import FallbackLazySecondary from "../../FallbackLazySecondary";
import ErrorBoundary from "../../errorBoundary/ErrorBoundary";

const PlacesAutocomplete = lazy(() => import("react-places-autocomplete"));

// configuring toast
toast.configure();

function PlacesAutocompleteComponent({ address, setAddress, setLat, setLong }) {
  // Log error status and clear dropdown when Google Maps API returns an error.
  const onError = useCallback((status, clearSuggestions) => {
    console.log("Google Maps API returned error with status: ", status);
    clearSuggestions();
  }, []);

  // limit the results to below constraints only
  const searchOptions = {
    types: ["address"],
    componentRestrictions: {
      country: ["in"],
    },
  };

  const handleChange = useCallback(
    (address) => {
      setAddress(address);
    },
    [address]
  );

  const handleSelect = useCallback(
    (address) => {
      setAddress(address);
      geocodeByAddress(address)
        .then((results) => getLatLng(results[0]))
        .then((latLng) => {
          setLat(latLng.lat);
          setLong(latLng.lng);
        })
        .catch((error) => console.error("Error", error));
    },
    [address]
  );

  // --------------------------------------------------
  // ---------LOCATION SEARCH BLOCK STARTS HERE--------
  const getLocation = () => {
    if (navigator.geolocation) {
      setAddress("Locating...");
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

    setLat(posX);
    setLong(posY);

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
        setAddress(currentLocation);
        handleToast(currentLocation, "dark");
        // console.log(currentLocation);
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
    setAddress("Couldn't locate...");
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
  // --------------------------------------------------

  return (
    <div className="places_component">
      <ErrorBoundary>
        <Suspense fallback={<FallbackLazySecondary />}>
          <PlacesAutocomplete
            value={address}
            onChange={handleChange}
            onSelect={handleSelect}
            onError={onError}
            searchOptions={searchOptions}
          >
            {({
              getInputProps,
              suggestions,
              getSuggestionItemProps,
              loading,
            }) => (
              <div className="autocomplete_places_main_outer_div">
                <input
                  {...getInputProps({
                    placeholder: "Select location",
                    className: "location_search_input",
                    autoFocus: false,
                    required: true,
                  })}
                />
                <div className="autocomplete_dropdown_container">
                  {loading && (
                    <div className="loading_location_div">
                      Loading... <Loading3QuartersOutlined spin />
                    </div>
                  )}
                  {suggestions.map((suggestion) => {
                    const className = "suggestion_item";
                    return (
                      <div
                        key={suggestion.id}
                        {...getSuggestionItemProps(suggestion, {
                          className,
                        })}
                      >
                        <div className="suggestion_desc">
                          {suggestion.description}
                        </div>
                        <div className="up_left_arrow">
                          <ArrowLeftOutlined rotate="45" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </PlacesAutocomplete>
        </Suspense>
      </ErrorBoundary>

      {/* location utility btn */}
      <div className="searchbar_utility_btn_location" onClick={getLocation}>
        <AimOutlined />
      </div>
    </div>
  );
}

export default memo(PlacesAutocompleteComponent);
