import React, { useCallback, memo, useState, lazy, Suspense } from "react";
import "./ProfileBasicInfo.css";

import AddressSelector from "./AddressSelector";

import FallbackLazy from "../../FallbackLazy";
import ErrorBoundary from "../../errorBoundary/ErrorBoundary";

const Select = lazy(() => import("react-select"));

function ProfileBasicInfo({ profileData }) {
  // defining custom theme for select component
  const customTheme = (theme) => {
    return {
      ...theme,
      border: "1px solid",
      colors: {
        ...theme.colors,
        primary25: "#ffe1c0",
        primary: "#ee5700",
      },
    };
  };
  // ---------form state management----------
  const [formState, setFormState] = useState({
    fullName: profileData.fullName,
    email: profileData.email,
    mobileCode: profileData.mobileCode,
    mobileNumber: profileData.mobileNumber,
  });

  const { fullName, email, mobileCode, mobileNumber } = formState;

  const handleChange = useCallback(
    (inputField) => (e) => {
      setFormState({
        ...formState,
        [inputField]: e.target.value,
      });
    },
    [formState]
  );

  // input editable state management
  const [isNameDisabled, setIsNameDisabled] = useState(fullName ? true : false);
  const [isEmailDisabled, setIsEmailDisabled] = useState(email ? true : false);
  const [isMobileDisabled, setIsMobileDisabled] = useState(
    mobileNumber ? true : false
  );

  // returning lock/unlock icon on basis of state
  const getNameBtnSymbol = useCallback(() => {
    if (isNameDisabled) {
      return <i className="fas fa-lock"></i>;
    } else {
      return <i className="fas fa-lock-open"></i>;
    }
  }, [isNameDisabled]);

  const getEmailBtnSymbol = useCallback(() => {
    if (isEmailDisabled) {
      return <i className="fas fa-lock"></i>;
    } else {
      return <i className="fas fa-lock-open"></i>;
    }
  }, [isEmailDisabled]);

  const getMobileBtnSymbol = useCallback(() => {
    if (isMobileDisabled) {
      return <i className="fas fa-lock"></i>;
    } else {
      return <i className="fas fa-lock-open"></i>;
    }
  }, [isMobileDisabled]);

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
  // ----------------------------------------

  // ----address selector state management----
  const [newName, setNewName] = useState("");
  const [newContact, setNewContact] = useState("");
  const [newAddressLine, setNewAddressLine] = useState("");
  const [newCountry, setNewCountry] = useState({});
  const [newDiv1, setNewDiv1] = useState({});
  const [newDiv2, setNewDiv2] = useState({});
  const [newDiv3, setNewDiv3] = useState({});
  const [newDiv4, setNewDiv4] = useState({});
  const [newZip, setNewZip] = useState("");

  // -----------------------------------------

  // ------render saved address-------
  const renderSavedAddress = () => {
    if (profileData.address) {
      return profileData.address.map((individualAddress) => (
        <div
          key={individualAddress.id}
          className="profile_basic_info_saved_address"
        >
          <div className="profile_saved_add_group">
            <div className="profile_saved_add_name">
              <strong>{individualAddress.name}</strong>
            </div>
            <div className="profile_saved_add_address">
              {individualAddress.address}
            </div>
            <div className="profile_saved_add_sub_dist_dist">
              {individualAddress.villageCity}, {individualAddress.subDist},{" "}
              {individualAddress.dist}
            </div>
            <div className="profile_saved_add_state_country_pin">
              {individualAddress.state}, {individualAddress.country},{" "}
              {individualAddress.pin}
            </div>
            <div className="profile_saved_add_contact">
              <i className="fas fa-phone-square-alt"></i>{" "}
              <strong>{individualAddress.contact}</strong>
            </div>
          </div>
          <div style={{ display: "flex", flex: 1 }}></div>
          <div className="profile_saved_add_utility">
            <button className="saved_add_delete">
              <i className="fas fa-trash-alt"></i> DELETE
            </button>
            <button className="saved_add_edit">
              <i className="fas fa-edit"></i> EDIT
            </button>
          </div>
        </div>
      ));
    } else {
      return (
        <div className="profile_basic_info_saved_address">
          No saved address found. Please add a new address...
        </div>
      );
    }
  };
  // ---------------------------------

  // -----add new address state management-----
  const [isAddNewAddressVisible, setIsAddNewAddressVisible] = useState(false);
  const [isAddNewAddBtnVisible, setIsAddNewAddBtnVisible] = useState(true);

  let addNewAddressVisibleClass = isAddNewAddressVisible
    ? "profile_address_content--visible"
    : "profile_address_content--hidden";

  let addNewAddressBtnClass = isAddNewAddBtnVisible
    ? "profile_add_new_add_btn--visible"
    : "profile_add_new_add_btn--hidden";

  const handleAddNewAddressVisiblity = () => {
    setIsAddNewAddressVisible(true);
    setIsAddNewAddBtnVisible(false);
  };

  const handleAddNewAddressCancel = () => {
    setIsAddNewAddressVisible(false);
    setIsAddNewAddBtnVisible(true);
  };

  const handleSaveNewAddress = () => {
    try {
      // validate and save address
      if (!isAddNewAddBtnVisible) {
        setIsAddNewAddBtnVisible(true);
        setIsAddNewAddressVisible(false);
      }
      alert("saved address");
    } catch (error) {
      alert("address not saved", error);
    }
  };
  // ------------------------------------------

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
              <i className="fas fa-times-circle"></i>
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
              <i className="fas fa-check-circle"></i>
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

      {renderSavedAddress()}

      <div
        className={addNewAddressBtnClass}
        onClick={handleAddNewAddressVisiblity}
      >
        <span>Add new address</span> <i className="fas fa-map-marked-alt"></i>
      </div>

      <div className={addNewAddressVisibleClass}>
        <div className="profile_add_selector_component">
          <div className="profile_add_new_add_heading">Add new address:</div>
          <AddressSelector
            customTheme={customTheme}
            setNewName={setNewName}
            setNewContact={setNewContact}
            setNewAddressLine={setNewAddressLine}
            setNewCountry={setNewCountry}
            setNewDiv1={setNewDiv1}
            setNewDiv2={setNewDiv2}
            setNewDiv3={setNewDiv3}
            setNewDiv4={setNewDiv4}
            setNewZip={setNewZip}
            newName={newName}
            newContact={newContact}
            newAddressLine={newAddressLine}
            newCountry={newCountry}
            newDiv1={newDiv1}
            newDiv2={newDiv2}
            newDiv3={newDiv3}
            newDiv4={newDiv4}
            newZip={newZip}
          />
        </div>
        <div className="profile_new_add_utility">
          <button
            className="profile_new_add_cancel"
            onClick={handleAddNewAddressCancel}
          >
            CANCEL
          </button>
          <button
            className="profile_new_add_save"
            onClick={handleSaveNewAddress}
          >
            SAVE
          </button>
        </div>
      </div>
      <div className="profile_id_proof">
        <div className="profile_id_proof_heading">
          IDENTITY PROOF (KYC Details)
        </div>
        <div className="profile_id_proof_desc">
          Important for government schemes and incentives.{" "}
          <i className="fas fa-info-circle"></i>
        </div>
        <div className="profile_basic_info_label">Select document:</div>
        <ErrorBoundary>
          <Suspense fallback={<FallbackLazy />}>
            <Select
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
          </Suspense>
        </ErrorBoundary>
      </div>
    </div>
  );
}

export default memo(ProfileBasicInfo);
