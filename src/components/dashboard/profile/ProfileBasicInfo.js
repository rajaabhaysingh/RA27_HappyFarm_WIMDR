import React, { useState } from "react";
import "./ProfileBasicInfo.css";

import {
  AimOutlined,
  LockOutlined,
  UnlockOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";

import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import API_KEY from "../../auth/GoogleAPI";
import AddressSelector from "./AddressSelector";

// configuring toast
toast.configure();

function ProfileBasicInfo(props) {
  // ---------form state management----------
  const [formState, setFormState] = useState({
    fullName: props.profileData.fullName,
    email: props.profileData.email,
    mobileCode: props.profileData.mobileCode,
    mobileNumber: props.profileData.mobileNumber,
    state: props.profileData.state,
    dist: props.profileData.dist,
    block: props.profileData.block,
    address: props.profileData.address,
    pin: props.profileData.pin,
  });

  const { fullName, email, mobileCode, mobileNumber, address } = formState;

  const handleChange = (inputField) => (e) => {
    setFormState({
      ...formState,
      [inputField]: e.target.value,
    });
  };

  // input editable state management
  const [isNameDisabled, setIsNameDisabled] = useState(fullName ? true : false);
  const [isEmailDisabled, setIsEmailDisabled] = useState(email ? true : false);
  const [isMobileDisabled, setIsMobileDisabled] = useState(
    mobileNumber ? true : false
  );
  const [isAddressDisabled, setIsAddressDisabled] = useState(
    address ? true : false
  );

  // returning lock/unlock icon on basis of state
  const getNameBtnSymbol = () => {
    if (isNameDisabled) {
      return <LockOutlined />;
    } else {
      return <UnlockOutlined />;
    }
  };
  const getEmailBtnSymbol = () => {
    if (isEmailDisabled) {
      return <LockOutlined />;
    } else {
      return <UnlockOutlined />;
    }
  };
  const getMobileBtnSymbol = () => {
    if (isMobileDisabled) {
      return <LockOutlined />;
    } else {
      return <UnlockOutlined />;
    }
  };

  // lock/unlock class for edit btn
  let nameBtnLock = isNameDisabled
    ? "profile_edit_btn--lock"
    : "profile_edit_btn--unlock";

  let emailBtnLock = isEmailDisabled
    ? "profile_edit_btn--lock"
    : "profile_edit_btn--unlock";

  let mobileBtnLock = isMobileDisabled
    ? "profile_edit_btn--lock"
    : "profile_edit_btn--unlock";

  // setState function for - input(s)
  const toggleNameEditable = () => {
    setIsNameDisabled(!isNameDisabled);
  };
  const toggleEmailEditable = () => {
    setIsEmailDisabled(!isEmailDisabled);
  };
  const toggleMobileEditable = () => {
    setIsMobileDisabled(!isMobileDisabled);
  };
  const toggleAddressEditable = () => {
    setIsAddressDisabled(!isAddressDisabled);
  };
  // ----------------------------------------

  // ---------LOCATION SEARCH BLOCK STARTS HERE--------
  const getLocation = () => {
    if (navigator.geolocation) {
      setFormState({
        ...formState,
        address: "Locating...",
      });
      //   setAddress("Locating...");
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
        setFormState({
          ...formState,
          address: currentLocation,
        });
        // setAddress(currentLocation);
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
    setFormState({
      ...formState,
      address: "Couldn't locate...",
    });
    // setAddress("Couldn't locate...");
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
    <div className="profile_basic_info_main_div">
      <div className="profile_basic_info_heading">BASIC DETAILS</div>
      <div className="profile_basic_info_content">
        <div className="profile_basic_info_label">Full name:</div>
        <div className="profile_basic_info_item profile_full_name">
          <input
            autoFocus
            onChange={handleChange("fullName")}
            defaultValue={fullName}
            type="text"
            className="profile_full_name_input"
            id="profile_full_name_input"
            placeholder="Enter full name"
            disabled={isNameDisabled}
          />
          <button onClick={toggleNameEditable} className={nameBtnLock}>
            {getNameBtnSymbol()}
          </button>
        </div>
        <div className="profile_basic_info_label">Email:</div>
        <div className="profile_basic_info_item profile_email">
          <input
            onChange={handleChange("email")}
            defaultValue={email}
            type="text"
            className="profile_email_input"
            placeholder="Enter email-ID"
            disabled={isEmailDisabled}
          />
          <div className="profile_email_verified_info">
            <span style={{ marginRight: "8px", fontSize: "1rem" }}>
              <CloseCircleOutlined />
            </span>
          </div>
          <button onClick={toggleEmailEditable} className={emailBtnLock}>
            {getEmailBtnSymbol()}
          </button>
        </div>
        <div className="profile_basic_info_label">Mobile number:</div>
        <div className="profile_basic_info_item profile_mob">
          <div className="profile_mob_code">{mobileCode}</div>
          <input
            onChange={handleChange("mobileNumber")}
            defaultValue={mobileNumber}
            type="text"
            className="profile_mob_input"
            placeholder="Enter mobile number"
            disabled={isMobileDisabled}
          />
          <div className="profile_mob_verified_info">
            <span style={{ marginRight: "8px", fontSize: "1rem" }}>
              <CheckCircleOutlined />
            </span>
          </div>
          <button onClick={toggleMobileEditable} className={mobileBtnLock}>
            {getMobileBtnSymbol()}
          </button>
        </div>
        <div className="profile_basic_info_label">Password:</div>
        <div className="profile_basic_info_item profile_pwd">
          <div className="profile_pwd_item">●●●●●●●●●●</div>
          <div className="profile_pwd_edit_btn">Change password</div>
        </div>
      </div>

      <div className="profile_address_heading">ADDRESS</div>

      <div className="profile_address_content">
        <div className="profile_basic_info_label">Address line 1:</div>

        <div className="profile_basic_info_item profile_add_1">
          <input
            type="text"
            className="profile_full_name_input"
            // value={address}
            defaultValue={address}
            onChange={handleChange("address")}
            placeholder="Enter address..."
            disabled={isAddressDisabled}
          />
          {/* location utility btn */}
          <div className="profile_auto_detect_loc_btn" onClick={getLocation}>
            <AimOutlined />
          </div>
          <button
            onClick={toggleAddressEditable}
            className="profile_edit_btn profile_full_name_edit_btn"
          >
            <LockOutlined />
          </button>
        </div>
        <div className="profile_add_selector_component">
          <AddressSelector handleChange={handleChange} formState={formState} />
        </div>
      </div>
    </div>
  );
}

export default ProfileBasicInfo;
