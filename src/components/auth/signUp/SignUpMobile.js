import React, { memo } from "react";
import "./SignUpMobile.css";

import { NavLink } from "react-router-dom";

function SignUpMobile({ formValues, handleChange, nextStep }) {
  // ---local form state mgmt-----
  const handleContinue = (e) => {
    try {
      e.preventDefault();
      // if wrong mobile
      // do sth
      // else
      nextStep();
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
        <div className="sign_up_terms">
          By continuing, you agree to Happyfarm's{" "}
          <NavLink className="sign_up_terms_of_use" to="/">
            Terms of Use
          </NavLink>{" "}
          and
          <NavLink className="sign_up_privacy_policy" to="/">
            {" "}
            Privacy Policy
          </NavLink>
          .
        </div>
        <input className="sign_up_login_btn" type="submit" value="CONTINUE" />
        <NavLink className="sign_up_need_help" to="/">
          Need help creating account?
        </NavLink>
      </form>
    </div>
  );
}

export default memo(SignUpMobile);
