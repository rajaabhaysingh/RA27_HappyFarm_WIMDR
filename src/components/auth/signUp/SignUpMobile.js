import React, { useState, memo } from "react";
import "./SignUpMobile.css";

import { Link } from "react-router-dom";

function SignUpMobile({ formValues, handleChange, nextStep }) {
  const [emailError, setEmailError] = useState(null);

  // validateEmail
  const validateEmail = (emailValue) => {
    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(emailValue);
  };

  // ---local form state mgmt-----
  const handleContinue = (e) => {
    try {
      e.preventDefault();
      if (validateEmail(formValues.email)) {
        emailError && setEmailError(null);
        nextStep();
      } else {
        !emailError && setEmailError("Invalid email address.");
      }
    } catch (error) {
      console.log(error);
    }
  };
  // -----------------------------

  return (
    <div className="sign_up_mobile_main_div">
      <form className="sign_up_form" onSubmit={handleContinue}>
        <div className="sign_up_label">Enter your email ID:</div>
        <input
          required
          autoFocus
          name="email"
          onChange={handleChange("email")}
          className="sign_up_mob"
          type="email"
          placeholder="Email id"
          defaultValue={formValues.email}
        />
        <div className="form_error">{emailError ? emailError : null}</div>
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
