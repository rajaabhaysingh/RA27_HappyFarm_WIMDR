import React, { useState, memo } from "react";
import "./SignUpPwd.css";

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

  // ---local form state mgmt-----
  const handleSignUp = (e) => {
    e.preventDefault();
    if (formValues.password === formValues.cnf_password) {
      if (validatePwd(formValues.password)) {
        setPwdError(null);

        // send registration POST request
        axios
          .post("http://127.0.0.1:8000/accounts/register", {
            email: formValues.email,
            password: formValues.password,
          })
          .then((response) => {
            console.log(response);

            if (response.status === 201) {
              // redirect to login screen
              e.preventDefault();
              handleToast(
                "Sign-up successful. Redirecting to login-screen.",
                "success"
              );
              setTimeout(() => {
                setIsSignInOpen(true);
              }, 1000);
            } else {
              e.preventDefault();
              setPwdError("Something went wrong. Please verify and try again.");
            }
            e.preventDefault();
          })
          .catch((error) => {
            console.log(error);
            e.preventDefault();
          });
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
        <div className="sign_up_label_pri">Email ID:</div>
        <div className="sign_up_pwd_mob">{formValues.email}</div>
        <div className="sign_up_label_sec">Enter password:</div>
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
        <div className="form_error">{pwdError ? pwdError : null}</div>
        <div className="sign_up_pwd_params">Guidelines for password:</div>

        <ul className="sign_up_pwd_params_list">
          <li className="sign_up_pwd_params_item">
            Password must be at least 8 characters long.
          </li>
          <li className="sign_up_pwd_params_item">
            It must include uppercase or lowercase characters ([A-Z], [a-z])
          </li>
          <li className="sign_up_pwd_params_item">
            It must include numbers ([0-9])
          </li>
        </ul>

        <input className="sign_up_sign_up_btn" type="submit" value="SIGN UP" />
      </form>
    </div>
  );
}

export default memo(SignUpPwd);
