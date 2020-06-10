import React, { memo } from "react";
import "./SignInNormal.css";

import {
  GoogleOutlined,
  FacebookOutlined,
  TwitterOutlined,
} from "@ant-design/icons";

function SignInNormal({ formValues, handleChange, nextStep }) {
  // ---local form state mgmt-----
  // const { formValues, handleChange, nextStep } = props;

  const handleResetPwd = (e) => {
    try {
      // if wrong mobile
      // e.preventDefault() and re-ask
      // else
      nextStep();
    } catch (error) {
      console.log(error);
    }
  };
  // -----------------------------

  return (
    <div className="sign_in_normal_main_div">
      <form className="sign_in_form">
        <input
          required
          autoFocus
          onChange={handleChange("email_phone")}
          defaultValue={formValues.email_phone}
          name="email_phone"
          className="sign_in_email_mob"
          type="text"
          placeholder="E-mail/Mobile"
        />
        <input
          required
          onChange={handleChange("password")}
          name="password"
          className="sign_in_pwd"
          type="password"
          placeholder="Enter password"
        />
        <input className="sign_in_login_btn" type="submit" value="LOGIN" />
        <div className="sign_in_forgot_pwd" onClick={handleResetPwd}>
          Forgot password ?
        </div>
        <div className="sign_in_using_container">
          <div className="sign_in_using_or">OR</div>
          <div className="sign_in_using_desc">SIGN IN USING</div>
          <div className="sign_in_ext_btn">
            <button
              type="button"
              className="sign_in_using_google sign_in_using_btn"
            >
              <GoogleOutlined /> Google
            </button>
            <button
              type="button"
              className="sign_in_using_fb sign_in_using_btn"
            >
              <FacebookOutlined /> Facebook
            </button>
            <button
              type="button"
              className="sign_in_using_twitter sign_in_using_btn"
            >
              <TwitterOutlined /> Twitter
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

// function arePropsEqual(prevProps, nextProps) {
//   return prevProps.formValues === nextProps.formValues;
// }

export default memo(SignInNormal);
