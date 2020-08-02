import React, { memo, useCallback, useState } from "react";
import "./SignUpMobile.css";

import axios from "axios";

import { Link } from "react-router-dom";

function SignUpMobile({
  formValues,
  handleChange,
  nextStep,
  sessionId,
  setSessionId,
  apikey,
}) {
  const [mobError, setMobError] = useState(null);

  // validateMobile
  const validateMobile = (phoneNumber) => {
    var mobilePattern = /^[6-9]\d{9}$/;
    return mobilePattern.test(phoneNumber);
  };

  // generateOTP
  const generateOTP = useCallback(
    async (phonenumber) => {
      let res = await axios.get(
        `http://2factor.in/API/V1/${apikey}/SMS/${phonenumber}/AUTOGEN`
      );
      // console.log(res);
      setSessionId(res.data.Details);
      // console.log(res.data.Details);
    },
    [formValues]
  );

  // ---local form state mgmt-----
  const handleContinue = useCallback(
    (e) => {
      try {
        e.preventDefault();

        if (formValues.phone.length === 10) {
          console.log("phoneno: ", formValues.phone);
          setMobError(null);
          generateOTP(formValues.phone);
          // setSessionId("07dd7e4d-5622-4940-84f7-6bec5c606d59");

          setTimeout(() => {
            nextStep();
          }, 1000);
        } else {
          setMobError("Invalid mobile number.");
        }
      } catch (error) {
        console.log(error);
      }
    },
    [formValues]
  );
  // -----------------------------

  return (
    <div className="sign_up_mobile_main_div">
      <form className="sign_up_form" onSubmit={handleContinue}>
        <div className="sign_up_label">Enter your mobile number:</div>
        <input
          required
          autoFocus
          name="phone"
          onChange={handleChange("phone")}
          className="sign_up_mob"
          type="tel"
          placeholder="Mobile number"
          defaultValue={formValues.phone}
        />
        <div className="form_error">{mobError ? mobError : null}</div>
        <div className="sign_up_terms">
          By continuing, you agree to Farmted's{" "}
          <Link className="sign_up_terms_of_use" to="/">
            Terms of Use
          </Link>{" "}
          and
          <Link className="sign_up_privacy_policy" to="/">
            {" "}
            Privacy Policy
          </Link>
          .
        </div>
        <input
          className="sign_up_continue_btn"
          type="submit"
          value="CONTINUE"
        />
        <Link className="sign_up_need_help" to="/">
          Need help creating account?
        </Link>
      </form>
    </div>
  );
}

export default memo(SignUpMobile);
