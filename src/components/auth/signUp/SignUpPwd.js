import React, { useState, memo } from "react";
import "./SignUpPwd.css";

import { Translate } from "react-auto-translate";

import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// configuring toast
toast.configure();

function SignUpPwd({ handleChange, formValues, setIsSignInOpen }) {
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

  // pwd error state mgmt
  const [pwdError, setPwdError] = useState(null);

  const validatePwd = (pwd) => {
    const regexPwd = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
    return regexPwd.test(pwd);
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

  // ---local form state mgmt-----
  const handleSignUp = async (e) => {
    e.preventDefault();
    if (formValues.password === formValues.cnf_password) {
      if (validatePwd(formValues.password)) {
        setPwdError(null);

        // send registration POST request
        let res = await axios
          .post("http://abhijitpatil.pythonanywhere.com/accounts/register/", {
            phone: "+91" + formValues.phone,
            password: formValues.password,
            password_confirm: formValues.cnf_password,
            registration_mode: detectOS(),
          })
          .catch((error) => {
            console.log(error);
            setPwdError(error);
          });
        setPwdError("Successful! Redirecting to login page.");
        setTimeout(() => {
          console.log(res);
          if (res.status === 201) {
            setIsSignInOpen(true);
          }
        }, 1000);
      } else {
        e.preventDefault();
        setPwdError(
          "Must be 8 characters long and contain numbers and letters."
        );
      }
    } else {
      e.preventDefault();
      setPwdError("Password didn't match.");
    }
  };
  // -----------------------------

  return (
    <div className="sign_up_pwd_main_div">
      <form className="sign_up_form" onSubmit={handleSignUp}>
        <div className="sign_up_label_pri">
          <Translate>Mobile number:</Translate>
        </div>
        <div className="sign_up_pwd_mob">
          <Translate>{formValues.phone}</Translate>
        </div>
        <div className="sign_up_label_sec">
          <Translate>Enter password:</Translate>
        </div>
        <input
          required
          autoFocus
          className="sign_up_pwd"
          type="password"
          placeholder="Enter password"
          onChange={handleChange("password")}
        />
        <input
          required
          className="sign_up_cnf_pwd"
          type="password"
          placeholder="Confirm password"
          onChange={handleChange("cnf_password")}
        />
        <div className="form_error">
          <Translate>{pwdError ? pwdError : null}</Translate>
        </div>
        <div className="sign_up_pwd_params">
          <Translate>Guidelines for password:</Translate>
        </div>

        <ul className="sign_up_pwd_params_list">
          <li className="sign_up_pwd_params_item">
            <Translate>Password must be at least 8 characters long.</Translate>
          </li>
          <li className="sign_up_pwd_params_item">
            <Translate>
              It must include uppercase or lowercase characters ([A-Z], [a-z])
            </Translate>
          </li>
          <li className="sign_up_pwd_params_item">
            <Translate>It must include numbers ([0-9])</Translate>
          </li>
        </ul>

        <input className="sign_up_sign_up_btn" type="submit" value="SIGN UP" />
      </form>
    </div>
  );
}

export default memo(SignUpPwd);
