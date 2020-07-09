import React, {
  useCallback,
  useEffect,
  memo,
  useState,
  lazy,
  Suspense,
} from "react";
import "./ProfileBasicInfo.css";

import { Link } from "react-router-dom";

import AddressSelector from "./AddressSelector";

import FallbackLazy from "../../FallbackLazy";
import ErrorBoundary from "../../errorBoundary/ErrorBoundary";

const Select = lazy(() => import("react-select"));
const Popup = lazy(() => import("reactjs-popup"));

// DocumentComponent is not default component of this file
// helper component for document uploading
export function DocumentComponent({
  customTheme,
  setSelectedDocument,
  shouldSaveEnable,
  documentNumber,
  setDocumentNumber,
  profileData,
  fileNameState,
  errorVisibleClass,
  fileErrorMsg,
  handleFileInput,
  handleSaveChanges,
  saveBtnClass,
  buttonText,
  styleWrapper,
}) {
  return (
    <div style={styleWrapper} className="profile_update_doc_popup">
      <div className="profile_id_proof">
        <div className="profile_basic_info_label">Select document:</div>
        <ErrorBoundary>
          <Suspense fallback={<FallbackLazy />}>
            <Select
              theme={customTheme}
              options={[
                { value: "kid", label: "Kisaan Registration Document" },
                { value: "vid", label: "Voter ID Card" },
                { value: "uid", label: "Aadhaar Card" },
                { value: "dl", label: "Driving License" },
              ]}
              className="profile_select_document"
              placeholder="Select document..."
              isSearchable
              onChange={(selectedOption) => {
                setSelectedDocument({ selectedOption });
                shouldSaveEnable();
              }}
            />
          </Suspense>
        </ErrorBoundary>
        <div className="profile_basic_info_label">Enter document ID:</div>
        <input
          value={documentNumber}
          required
          type="text"
          className="profile_document_number"
          placeholder="Enter document number..."
          onChange={(e) => {
            setDocumentNumber(e.target.value);
            if (documentNumber) {
              shouldSaveEnable();
            }
          }}
        />
        <div className="profile_file_upload">
          <div className="profile_basic_info_label">
            Select document to upload:
          </div>
          <div className="profile_doc_instructions">
            Accepted formats: <strong>PNG, JPG, JPEG and PDF</strong>. Max file
            size: <strong>2 MB</strong>
          </div>
          <div className="profile_file_container">
            <input
              className="profile_file_input"
              required
              type="file"
              name={profileData.id + "-" + documentNumber}
              id="user-verification-document"
              onChange={handleFileInput}
            />
            <div className="profile_file_input_filename">{fileNameState}</div>
            <label
              className="profile_file_input_label"
              htmlFor="user-verification-document"
            >
              <i className="fas fa-upload"></i>
              <span style={{ width: "8px" }}></span>
              Choose document
            </label>
            <div className={errorVisibleClass}>
              <i className="fas fa-exclamation-triangle"></i> {fileErrorMsg}
            </div>
          </div>
        </div>
      </div>
      <div className="profile_save_btn_container">
        <button onClick={handleSaveChanges} className={saveBtnClass}>
          {buttonText}
        </button>
      </div>
    </div>
  );
}

// default functional component
function ProfileBasicInfo({ profileData }) {
  // defining custom theme for select component
  const customTheme = useCallback((theme) => {
    return {
      ...theme,
      border: "1px solid",
      colors: {
        ...theme.colors,
        primary25: "#ffe1c0",
        primary: "#ee5700",
      },
    };
  }, []);

  // -----reset password mgmt-----
  const [resetPwdState, setResetPwdState] = useState({
    prevPwd: "",
    currPwd1: "",
    currPwd2: "",
    pwdErrorState: "",
  });

  let { prevPwd, currPwd1, currPwd2, pwdErrorState } = resetPwdState;

  // handlePasswordChanged
  const handlePasswordChanged = (e) => {
    e.preventDefault();

    if (currPwd1 === currPwd2) {
      // check prevPwd
      // if successful
      // alert ("saved and redirect to login")
      // else
      // alert ("prev password incorrect")
      alert("changed");
    } else {
      setResetPwdState({
        ...resetPwdState,
        pwdErrorState: "Password didn't match",
      });
    }
  };

  // ---------form state management----------
  const [formState, setFormState] = useState({
    fullName: profileData.fullName ? profileData.fullName : "",
    email: profileData.email ? profileData.email : "",
    mobileCode: profileData.mobileCode ? profileData.mobileCode : "",
    mobileNumber: profileData.mobileNumber ? profileData.mobileNumber : "",
    emailOtp: "",
    mobileOtp: "",
    emailVerified: profileData.emailVerified,
    mobileVerified: profileData.mobileVerified,
  });

  let {
    fullName,
    email,
    mobileCode,
    mobileNumber,
    emailOtp,
    mobileOtp,
    emailVerified,
    mobileVerified,
  } = formState;

  // handle change for form input fields
  const handleChange = useCallback(
    (inputField) => (e) => {
      setFormState({
        ...formState,
        [inputField]: e.target.value,
      });
    },
    [formState]
  );

  // comparing if already submitted email and current email are same
  const isEqual = (first, second) => {
    return first === second;
  };

  useEffect(() => {
    if (isEqual(email, profileData.email)) {
      console.log("email same");
      setFormState({
        ...formState,
        emailVerified: profileData.emailVerified,
      });
    } else {
      console.log("email diff");
      setFormState({
        ...formState,
        emailVerified: 0,
      });
    }
  }, [email, emailVerified]);

  useEffect(() => {
    if (isEqual(mobileNumber, profileData.mobileNumber)) {
      console.log("mobile same");
      setFormState({
        ...formState,
        mobileVerified: profileData.mobileVerified,
      });
    } else {
      console.log("mobile diff");
      setFormState({
        ...formState,
        mobileVerified: 0,
      });
    }
  }, [mobileNumber, mobileVerified]);

  // input editable state management
  const [isNameDisabled, setIsNameDisabled] = useState(fullName ? true : false);
  const [isEmailDisabled, setIsEmailDisabled] = useState(email ? true : false);
  const [isMobileDisabled, setIsMobileDisabled] = useState(
    mobileNumber ? true : false
  );

  const [isEmailOtpVisible, setIsEmailOtpVisible] = useState(false);
  const [isMobileOtpVisible, setIsMobileOtpVisible] = useState(false);
  const [emailOtpBtnGone, setEmailOtpBtnGone] = useState(false);
  const [mobileOtpBtnGone, setMobileOtpBtnGone] = useState(false);

  const [emailResendOtpBtnActive, setEmailOtpBtnActive] = useState(true);
  const [mobileResendOtpBtnActive, setMobileOtpBtnActive] = useState(true);

  let emailOtpClass = isEmailOtpVisible
    ? "profile_email_otp--visible"
    : "profile_email_otp--hidden";

  let mobileOtpClass = isMobileOtpVisible
    ? "profile_mobile_otp--visible"
    : "profile_mobile_otp--hidden";

  // timer for otp
  let timeLeft = 15;
  const startTimer = useCallback(() => {
    let elem = document.getElementById("profile_email_otp_timer");
    console.log("sad");

    if (elem) {
      let countDownTimer = setInterval(countdown, 1000);

      function countdown() {
        if (timeLeft === -1) {
          clearTimeout(countDownTimer);
          nextSteps();
        } else {
          elem.innerHTML = (timeLeft < 10 ? "0" : "") + timeLeft;
          timeLeft--;
        }
      }
    }

    function nextSteps() {
      setEmailOtpBtnActive(true);
      // setIsTimerVisible(false);
      return;
    }
  }, [timeLeft]);

  // // render email otp btn
  // const renderEmailOtpBtn = () => {
  //   if (emailResendOtpBtnActive) {
  //     return (
  //       <button
  //         type="button"
  //         onClick={resendEmailOtp}
  //         className="profile_resend_email_otp--active"
  //       >
  //         <i className="fas fa-redo-alt"></i>
  //       </button>
  //     );
  //   } else {
  //     return (
  //       <button type="button" className="profile_resend_email_otp--inactive">
  //         <div id="profile_email_otp_timer">
  //           <strong>{timeLeft}</strong>
  //         </div>
  //       </button>
  //     );
  //   }
  // };

  // handleEmailOtpBtnContent
  const handleEmailOtpBtnContent = () => {
    if (!emailOtpBtnGone) {
      if (!emailVerified) {
        return (
          <button
            onClick={handleEmailVerify}
            className="profile_email_otp_btn--visible"
          >
            VERIFY
          </button>
        );
      } else {
        if (emailVerified === 1) {
          return (
            <button
              style={{ color: "#009900" }}
              className="profile_email_otp_btn--hidden"
            >
              <i className="fas fa-check-circle"></i> Verified
            </button>
          );
        } else if (emailVerified === -1) {
          return (
            <button
              style={{ color: "#cc0000" }}
              className="profile_email_otp_btn--hidden"
            >
              <i className="fas fa-times-circle"></i> Not verified
            </button>
          );
        } else {
          return (
            <button
              style={{ color: "#ee5700" }}
              className="profile_email_otp_btn--hidden"
            >
              Unknown status
            </button>
          );
        }
      }
    }
  };

  // handleEmailOtpBtnContent
  const handleMobileOtpBtnContent = () => {
    if (!mobileOtpBtnGone) {
      if (!mobileVerified) {
        return (
          <button
            onClick={handleMobileVerify}
            className="profile_mobile_otp_btn--visible"
          >
            VERIFY
          </button>
        );
      } else {
        if (mobileVerified === 1) {
          return (
            <button
              style={{ color: "#009900" }}
              className="profile_mobile_otp_btn--hidden"
            >
              <i className="fas fa-check-circle"></i> Verified
            </button>
          );
        } else if (mobileVerified === -1) {
          return (
            <button
              style={{ color: "#cc0000" }}
              className="profile_mobile_otp_btn--hidden"
            >
              <i className="fas fa-times-circle"></i> Not verified
            </button>
          );
        } else {
          return (
            <button
              style={{ color: "#ee5700" }}
              className="profile_mobile_otp_btn--hidden"
            >
              Unknown status
            </button>
          );
        }
      }
    }
  };

  // handleEmailVerify
  const handleEmailVerify = (e) => {
    e.preventDefault();
    setIsEmailOtpVisible(true);
    setEmailOtpBtnGone(true);
    setIsEmailDisabled(true);
  };

  // handle email-otp verify
  const handleEmailOtpVerify = (e) => {
    e.preventDefault();
    alert("Email verified!");
  };

  // handleMobileVerify
  const handleMobileVerify = (e) => {
    e.preventDefault();
    setIsMobileOtpVisible(true);
    setMobileOtpBtnGone(true);
    setIsMobileDisabled(true);
  };

  // handle mobile-otp verify
  const handleMobileOtpVerify = (e) => {
    e.preventDefault();
    alert("Mobile verified!");
  };

  const resendEmailOtp = () => {
    alert("OTP sent");
    setEmailOtpBtnActive(false);
    // startTimer();
  };

  const resendMobileOtp = () => {
    alert("OTP sent");
    setMobileOtpBtnActive(false);
    // startTimer();
  };

  // returning lock/unlock icon on basis of state
  const getNameBtnSymbol = useCallback(() => {
    if (isNameDisabled) {
      return <i className="fas fa-pen"></i>;
    } else {
      return <i className="fas fa-lock-open"></i>;
    }
  }, [isNameDisabled]);

  const getEmailBtnSymbol = useCallback(() => {
    if (isEmailDisabled) {
      return <i className="fas fa-pen"></i>;
    } else {
      return <i className="fas fa-lock-open"></i>;
    }
  }, [isEmailDisabled]);

  const getMobileBtnSymbol = useCallback(() => {
    if (isMobileDisabled) {
      return <i className="fas fa-pen"></i>;
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
    if (isEmailDisabled) {
      setFormState({
        ...formState,
        emailOtp: "",
      });
      setIsEmailOtpVisible(false);
      setEmailOtpBtnGone(false);
    }
  };

  const toggleMobileEditable = () => {
    setIsMobileDisabled(!isMobileDisabled);
    if (isMobileDisabled) {
      setFormState({
        ...formState,
        mobileOtp: "",
      });
      setIsMobileOtpVisible(false);
      setMobileOtpBtnGone(false);
    }
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

  // -----handle id-file update-----
  const [isFormOpen, setIsFormOpen] = useState(false);

  const openForm = useCallback(() => {
    setIsFormOpen(true);
  });

  const closeForm = useCallback(() => {
    setIsFormOpen(false);
    setIsSaveEnabled(false);
  });

  const handleidFileUpdate = useCallback(() => openForm());
  // -------------------------------

  // ----save changes functions----
  const [isSaveEnabled, setIsSaveEnabled] = useState(false);

  let saveBtnClass = isSaveEnabled
    ? "profile_save_btn--enabled profile_save_btn"
    : "profile_save_btn--disabled profile_save_btn";

  // handleSaveChanges btn and update doc btn function
  const handleSaveChanges = useCallback(() => {
    alert("saved");
    if (isFormOpen) {
      closeForm();
    }
  }, [isFormOpen, closeForm]);

  // save details btn enable
  const shouldSaveEnable = useCallback(() => {
    // TODO:
    // check for form condition and set save enable to true

    // if (
    //   documentNumber != "" &&
    //   selectedDocument.selectedOption &&
    //   fileNameState !== "No file selected"
    // ) {
    //   setIsSaveEnabled(true);
    // }

    setIsSaveEnabled(true);
  }, []);
  // -----------------------------

  // ----document state management----
  const [selectedDocument, setSelectedDocument] = useState({});
  const [documentNumber, setDocumentNumber] = useState("");
  const [fileNameState, setFileNameState] = useState("No file selected");
  const [isFileErrorVisible, setIsFileErrorVisible] = useState(false);
  const [fileErrorMsg, setFileErrorMsg] = useState("");

  const handleFileInput = useCallback(
    (e) => {
      let fileInput = document.getElementById("user-verification-document");
      if (fileInput && fileInput.files.length > 0) {
        if (fileInput.files.item(0).size > 2097152) {
          setFileErrorMsg(
            "Allowed file size limit exceeded. File must be less than 2 MB."
          );
          setIsFileErrorVisible(true);
          setIsSaveEnabled(false);
        } else if (
          fileInput.files.item(0).type !== "image/jpeg" &&
          fileInput.files.item(0).type !== "image/png" &&
          fileInput.files.item(0).type !== "application/pdf"
        ) {
          setFileErrorMsg(
            "File type isn't supported. File must be in PNG/JPG/JPEG/PDF format."
          );
          setIsFileErrorVisible(true);
          setIsSaveEnabled(false);
        } else {
          setFileErrorMsg("");
          setIsFileErrorVisible(false);
          shouldSaveEnable();
        }

        console.log(fileInput.files.item(0).type);
      }
      if (e.target.value && fileInput && fileInput.files.length > 0) {
        setFileNameState(fileInput.files.item(0).name);
      } else {
        setFileNameState("No file selected");
      }
    },
    [shouldSaveEnable]
  );

  let errorVisibleClass = isFileErrorVisible
    ? "profile_document_error--visible"
    : "profile_document_error--hidden";
  // ---------------------------------

  // ------render saved address-------
  const renderSavedAddress = useCallback(() => {
    if (profileData.address) {
      return profileData.address.map((individualAddress) => (
        <div
          key={individualAddress.addId}
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
          <div
            style={{
              display: "flex",
              flex: 1,
            }}
          ></div>
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
  }, [profileData]);
  // ---------------------------------

  // ---render id proof and its status---
  const renderVerificationStatusColor = useCallback(() => {
    if (profileData.idProof.idProofStatus === -1) {
      return "#FA8C16";
    } else if (profileData.idProof.idProofStatus === 1) {
      return "#009900";
    } else if (profileData.idProof.idProofStatus === 0) {
      return "#cc0000";
    } else {
      return "#ee5700";
    }
  }, [profileData]);

  // render id proof status
  const renderVerificationStatus = useCallback(() => {
    if (profileData.idProof.idProofStatus === -1) {
      return (
        <div>
          <i className="fas fa-exclamation-triangle"></i> Verification pending.
          Don't worry, we'll verify soon.
        </div>
      );
    } else if (profileData.idProof.idProofStatus === 1) {
      return (
        <div>
          <i className="fas fa-check-circle"></i> Congratulations, document
          successfully verified.
        </div>
      );
    } else if (profileData.idProof.idProofStatus === 0) {
      return (
        <div>
          <i className="fas fa-times-circle"></i> Sorry, we couldn't verify your
          document. Update and try again.
        </div>
      );
    } else {
      return (
        <div>
          <i className="fas fa-question-circle"></i> Verification status
          unknown. We'll get back to you soon.
        </div>
      );
    }
  }, [profileData]);

  // render id proof
  const renderIdProof = useCallback(() => {
    // if already submitted
    if (profileData.idProof) {
      return (
        <>
          <div className="profile_submitted_document_heading">
            Document submitted:
          </div>
          <div className="profile_file_container">
            <div className="profile_file_submitted">
              <img
                src={profileData.idProof.idFileUrl}
                alt={profileData.idProof.idFileName}
              />
              <div className="submitted_file_id">
                {profileData.idProof.idFileName}
              </div>
              <button
                onClick={handleidFileUpdate}
                className="profile_update_kyc_file"
              >
                <i className="fas fa-edit"></i> Update
              </button>
            </div>
            <div
              style={{
                color: `${renderVerificationStatusColor()}`,
              }}
              className="profile_file_submitted_status"
            >
              {renderVerificationStatus()}
            </div>
          </div>

          {/* popup for updating form */}
          <ErrorBoundary>
            <Suspense>
              <Popup
                open={isFormOpen}
                modal
                closeOnDocumentClick
                lockScroll
                onClose={closeForm}
                contentStyle={{
                  borderRadius: "8px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div className="profile_update_doc_warning">
                    <strong>Alert!</strong> You're not recommended to update
                    already verified. Updating it may immediately disqualify you
                    from ongoing schemes and offers (including cashback).{" "}
                    <br></br>Read{" "}
                    <Link to="/terms" className="default_link">
                      <strong>Terms {"&"} Conditions</strong>
                    </Link>{" "}
                    for more.
                  </div>
                  <div className="profile_update_doc_heading">
                    UPDATE KYC DETAILS
                  </div>
                  <DocumentComponent
                    customTheme={customTheme}
                    setSelectedDocument={setSelectedDocument}
                    shouldSaveEnable={shouldSaveEnable}
                    documentNumber={documentNumber}
                    setDocumentNumber={setDocumentNumber}
                    profileData={profileData}
                    fileNameState={fileNameState}
                    errorVisibleClass={errorVisibleClass}
                    fileErrorMsg={fileErrorMsg}
                    handleFileInput={handleFileInput}
                    handleSaveChanges={handleSaveChanges}
                    saveBtnClass={saveBtnClass}
                    buttonText={"UPDATE"}
                    styleWrapper={{
                      padding: "16px",
                    }}
                  />
                </div>
              </Popup>
            </Suspense>
          </ErrorBoundary>
        </>
      );
    } else {
      // if not submitted already
      return (
        <DocumentComponent
          customTheme={customTheme}
          setSelectedDocument={setSelectedDocument}
          shouldSaveEnable={shouldSaveEnable}
          documentNumber={documentNumber}
          setDocumentNumber={setDocumentNumber}
          profileData={profileData}
          fileNameState={fileNameState}
          errorVisibleClass={errorVisibleClass}
          fileErrorMsg={fileErrorMsg}
          handleFileInput={handleFileInput}
          handleSaveChanges={handleSaveChanges}
          saveBtnClass={saveBtnClass}
          buttonText={"SAVE CHANGES"}
          styleWrapper={{}}
        />
      );
    }
  }, [
    customTheme,
    setSelectedDocument,
    shouldSaveEnable,
    documentNumber,
    setDocumentNumber,
    profileData,
    fileNameState,
    errorVisibleClass,
    fileErrorMsg,
    handleFileInput,
    closeForm,
    handleSaveChanges,
    handleidFileUpdate,
    isFormOpen,
    renderVerificationStatus,
    renderVerificationStatusColor,
    saveBtnClass,
  ]);
  // ---------------------

  // -----add new address state management-----
  const [isAddNewAddressVisible, setIsAddNewAddressVisible] = useState(false);
  const [isAddNewAddBtnVisible, setIsAddNewAddBtnVisible] = useState(true);

  let addNewAddressVisibleClass = isAddNewAddressVisible
    ? "profile_address_content--visible"
    : "profile_address_content--hidden";

  let addNewAddressBtnClass = isAddNewAddBtnVisible
    ? "profile_add_new_add_btn--visible"
    : "profile_add_new_add_btn--hidden";

  const handleAddNewAddressVisiblity = useCallback(() => {
    setIsAddNewAddressVisible(true);
    setIsAddNewAddBtnVisible(false);
  }, []);

  const handleAddNewAddressCancel = useCallback(() => {
    setIsAddNewAddressVisible(false);
    setIsAddNewAddBtnVisible(true);
  }, []);

  const handleSaveNewAddress = useCallback(() => {
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
  }, [isAddNewAddBtnVisible]);
  // ------------------------------------------

  return (
    <div className="profile_basic_info_main_div">
      <div className="profile_basic_info_heading">BASIC DETAILS</div>
      <div className="profile_basic_info_content">
        <div className="profile_basic_info_label">Full name:</div>
        <div className="profile_basic_info_item profile_full_name">
          <div className="profile_name_input_field_and_lock">
            <input
              autoFocus
              onChange={handleChange("fullName")}
              value={fullName}
              type="text"
              className="profile_input profile_name_input"
              id="profile_full_name_input"
              placeholder="Enter full name"
              disabled={isNameDisabled}
            />
            <button onClick={toggleNameEditable} className={nameBtnLock}>
              {getNameBtnSymbol()}
            </button>
          </div>
        </div>
        <div className="profile_basic_info_label">Email:</div>
        <div className="profile_basic_info_item profile_email">
          <div className="profile_email_input_field_and_lock">
            <input
              onChange={handleChange("email")}
              value={email}
              type="text"
              className="profile_input profile_email_input"
              placeholder="Enter email-ID"
              disabled={isEmailDisabled}
            />
            <button onClick={toggleEmailEditable} className={emailBtnLock}>
              {getEmailBtnSymbol()}
            </button>
          </div>
          <div className="profile_otp_input_with_verify">
            <form className={emailOtpClass} onSubmit={handleEmailOtpVerify}>
              <input
                onChange={handleChange("emailOtp")}
                type="text"
                value={emailOtp}
                placeholder="Enter OTP"
                className="profile_input profile_email_otp"
              />
              <button className="profile_verify_otp_go" type="submit">
                <i className="fas fa-arrow-right"></i>
              </button>
              {/* {renderEmailOtpBtn()}
              {startTimer()} */}
            </form>
            {handleEmailOtpBtnContent()}
          </div>
        </div>
        <div className="profile_basic_info_label">Mobile number:</div>
        <div className="profile_basic_info_item profile_mobile">
          <div className="profile_mobile_input_field_and_lock">
            <div className="profile_mob_code">{mobileCode}</div>
            <input
              onChange={handleChange("mobileNumber")}
              value={mobileNumber}
              type="text"
              className="profile_input profile_mobile_input"
              placeholder="Enter Mobile no."
              disabled={isMobileDisabled}
            />
            <button onClick={toggleMobileEditable} className={mobileBtnLock}>
              {getMobileBtnSymbol()}
            </button>
          </div>
          <div className="profile_otp_input_with_verify">
            <form className={mobileOtpClass} onSubmit={handleMobileOtpVerify}>
              <input
                onChange={handleChange("mobileOtp")}
                type="text"
                value={mobileOtp}
                placeholder="Enter OTP"
                className="profile_input profile_mobile_otp"
              />
              <button className="profile_verify_otp_go" type="submit">
                <i className="fas fa-arrow-right"></i>
              </button>
              {/* {renderMobileOtpBtn()}
              {startTimer()} */}
            </form>
            {handleMobileOtpBtnContent()}
          </div>
        </div>
        <div className="profile_basic_info_label">Password:</div>
        <div className="profile_pwd">
          <div className="profile_pwd_item">●●●●●●●●●●</div>

          <ErrorBoundary>
            <Suspense fallback={<FallbackLazy />}>
              <ErrorBoundary>
                <Suspense fallback={<FallbackLazy />}>
                  <Popup
                    trigger={
                      <div
                        // onClick={handleChangePassword}
                        className="profile_pwd_edit_btn"
                      >
                        Change password
                      </div>
                    }
                    modal
                    closeOnDocumentClick
                    lockScroll
                    // onClose={
                    //   // if successfully changed
                    //   //  redirect to login
                    //   // else
                    //   // do nothing
                    // }
                    contentStyle={{
                      borderRadius: "8px",
                    }}
                  >
                    <div className="profile_reset_pwd_popup">
                      <div className="profile_reset_pwd_header">
                        CHANGE PASSWORD
                      </div>
                      <form onSubmit={handlePasswordChanged}>
                        <div className="profile_basic_info_label">
                          Old password:
                        </div>
                        <input
                          className="profile_input profile_pwd_input"
                          autoFocus
                          value={prevPwd}
                          required
                          onChange={(e) => {
                            setResetPwdState({
                              ...resetPwdState,
                              prevPwd: e.target.value,
                            });
                          }}
                          placeholder="Old password"
                          type="password"
                          name="old-pwd"
                          id="old-pwd"
                        />
                        <div className="profile_basic_info_label">
                          New password:
                        </div>
                        <input
                          className="profile_input profile_pwd_input"
                          value={currPwd1}
                          required
                          onChange={(e) => {
                            setResetPwdState({
                              ...resetPwdState,
                              currPwd1: e.target.value,
                            });
                          }}
                          placeholder="New password"
                          type="password"
                          name="old-pwd"
                          id="old-pwd"
                        />
                        <input
                          className="profile_input profile_pwd_input"
                          value={currPwd2}
                          required
                          onChange={(e) => {
                            setResetPwdState({
                              ...resetPwdState,
                              currPwd2: e.target.value,
                            });
                          }}
                          placeholder="Confirm new password"
                          type="password"
                          name="old-pwd"
                          id="old-pwd"
                        />
                        <div className="profile_pwd_error">{pwdErrorState}</div>

                        <div className="profile_pwd_guideline">
                          <div className="profile_pwd_params">
                            Guidelines for password:
                          </div>

                          <ul className="profile_pwd_params_list">
                            <li className="profile_pwd_params_item">
                              Password must be at least 8 characters long.
                            </li>
                            <li className="profile_pwd_params_item">
                              It must include uppercase or lowercase characters
                              ([A-Z], [a-z])
                            </li>
                            <li className="profile_pwd_params_item">
                              It must include numbers ([0-9])
                            </li>
                          </ul>
                        </div>

                        <input
                          type="submit"
                          value="RESET PASSWORD"
                          className="profile_reset_pwd_btn"
                        />
                      </form>
                    </div>
                  </Popup>
                </Suspense>
              </ErrorBoundary>
            </Suspense>
          </ErrorBoundary>
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

      <div className="profile_id_proof_heading">
        IDENTITY PROOF (KYC Details)
      </div>
      <div className="profile_id_proof_desc">
        Important for government schemes and incentives.{" "}
        <i className="fas fa-info-circle"></i>
      </div>
      {renderIdProof()}
    </div>
  );
}

export default memo(ProfileBasicInfo);
