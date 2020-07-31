import React, { useState, memo } from "react";
import "./SignUpMobile.css";

import { Link } from "react-router-dom";

function SignUpMobile({ formValues, handleChange, nextStep }) {
  const [mobError, setMobError] = useState(null);

  // validateMobile
  const validateMobile = (phoneNumber) => {
    var mobilePattern = /^[6-9]\d{9}$/;
    return mobilePattern.test(phoneNumber);
  };

  // ---local form state mgmt-----
  const handleContinue = (e) => {
    try {
      e.preventDefault();
      if (validateMobile(formValues.phone)) {
        setMobError(null);
        nextStep();
      } else {
        setMobError("Invalid mobile number.");
      }
    } catch (error) {
      console.log(error);
    }
  };
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
