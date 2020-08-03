import React, { useState, memo, useCallback } from "react";
import "./SignInNormal.css";

import { Translate } from "react-auto-translate";

import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// configuring toast
toast.configure();

function SignInNormal({
  formValues,
  handleChange,
  nextStep,
  onClose,
  user,
  setUser,
  setIsFormOpen,
}) {
  const [emailError, setEmailError] = useState(null);
  const [pwdError, setPwdError] = useState(null);

  // handleResetPwd
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

  // handleToast
  const handleToast = (message, toastType) => {
    if (toastType === "dark") {
      toast.dark(message, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    } else if (toastType === "error") {
      toast.error(message, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    } else if (toastType === "success") {
      toast.success(message, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    } else {
      toast(message);
    }
  };

  // detect os
  const detectOS = () => {
    let OSName = "Unknown OS";
    if (navigator.userAgent.indexOf("Win") != -1) OSName = "Windows";
    if (navigator.userAgent.indexOf("Mac") != -1) OSName = "Macintosh";
    if (navigator.userAgent.indexOf("Linux") != -1) OSName = "Linux";
    if (navigator.userAgent.indexOf("Android") != -1) OSName = "Android";
    if (navigator.userAgent.indexOf("like Mac") != -1) OSName = "iOS";
    return OSName;
  };

  // validateMobile
  const validateMobile = (phoneNumber) => {
    var mobilePattern = /^[6-9]\d{9}$/;
    return mobilePattern.test(phoneNumber);
  };

  // ------handleSignIn------
  const handleSignIn = useCallback(
    async (e) => {
      e.preventDefault();
      if (validateMobile(formValues.email_phone)) {
        setEmailError(null);
        if (formValues.password.length < 8) {
          setPwdError("Password must be at least 8 characters long.");
        } else {
          setPwdError(null);
          // send post request
          let res = await axios
            .post("http://abhijitpatil.pythonanywhere.com/api-token-auth/", {
              phone: `+91${formValues.email_phone}`,
              password: `${formValues.password}`,
            })
            .catch((error) => {
              console.log(error);
              // displaying login error
              setPwdError("Invalid phone number or password.");
            });
          console.log(res);
          if (res && res.status === 200) {
            setUser({
              ...user,
              token: res.data.token,
            });
            localStorage.setItem("token", res.data.token);
            handleToast("Sign-in successful", "success");
            setIsFormOpen(false);
          } else {
            handleToast("Sign-in failed", "error");
            // bypass sign-in
            // setUser({
            //   ...user,
            //   token: "some_dummy_token",
            // });
            // setIsFormOpen(false);
          }
          console.log(user.token);
        }
      } else {
        setEmailError("Invalid phone number.");
      }
    },
    [formValues]
  );
  // ------------------------

  // placeholders

  return (
    <div className="sign_in_normal_main_div">
      <form className="sign_in_form" onSubmit={handleSignIn}>
        <input
          required
          autoFocus
          onChange={handleChange("email_phone")}
          defaultValue={formValues.email_phone}
          name="email_phone"
          className="sign_in_email_mob"
          type="text"
          placeholder="Mobile number"
        />
        <div className="form_error">
          <Translate>{emailError ? emailError : null}</Translate>
        </div>
        <input
          required
          onChange={handleChange("password")}
          name="password"
          className="sign_in_pwd"
          type="password"
          placeholder="Enter password"
        />
        <div className="form_error">
          <Translate>{pwdError ? pwdError : null}</Translate>
        </div>
        <input className="sign_in_login_btn" type="submit" value="LOGIN" />
        <div className="sign_in_forgot_pwd" onClick={handleResetPwd}>
          <Translate>Forgot password ?</Translate>
        </div>
        <div className="sign_in_using_container">
          <div className="sign_in_using_or">OR</div>
          <div className="sign_in_using_desc">
            <Translate>SIGN IN USING</Translate>
          </div>
          <div className="sign_in_ext_btn">
            <button
              type="button"
              className="sign_in_using_google sign_in_using_btn"
            >
              <i className="fab fa-google"></i> <Translate>Google</Translate>
            </button>
            <button
              type="button"
              className="sign_in_using_fb sign_in_using_btn"
            >
              <i className="fab fa-facebook-f"></i>{" "}
              <Translate>Facebook</Translate>
            </button>
            <button
              type="button"
              className="sign_in_using_twitter sign_in_using_btn"
            >
              <i className="fab fa-twitter"></i> <Translate>Twitter</Translate>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default memo(SignInNormal);
