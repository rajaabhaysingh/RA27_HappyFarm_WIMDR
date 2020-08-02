import React, { memo } from "react";
import "./SignInResetPwd.css";

import { Translate } from "react-auto-translate";

import Popup from "reactjs-popup";

function SignInResetPwd({ formValues, handleChange, prevStep }) {
  const handleReturnBack = (e) => {
    try {
      // if wrong mobile
      // e.preventDefault() and re-ask
      // else
      prevStep();
    } catch (error) {
      console.log(error);
    }
  };
  // -----------------------------

  const handleRequestOtp = () => {
    try {
      // do sth
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="sign_in_reset_pwd_main_div">
      <form className="sign_in_reset_pwd_form">
        <div className="sign_in_reset_pwd_label_pri">
          <Translate>Enter registered mobile number:</Translate>
        </div>
        <input
          required
          autoFocus
          className="sign_in_reset_pwd_mob"
          type="text"
          placeholder="Enter mobile number"
          onChange={handleChange("email_phone")}
          defaultValue={formValues.email_phone}
        />
        <button
          className="sign_in_reset_pwd_otp_btn"
          type="button"
          onClick={handleRequestOtp}
        >
          <Translate>REQUEST OTP</Translate>
        </button>
        <div className="sign_in_reset_pwd_label_sec">
          <Translate>Enter OTP:</Translate>
        </div>
        <input
          required
          className="sign_in_reset_pwd_otp"
          type="text"
          placeholder="Enter OTP"
          onChange={handleChange("otp")}
        />
        <div className="sign_in_reset_pwd_label_tert">
          <Translate>Enter new password:</Translate>
          <Popup
            trigger={
              <span style={{ marginLeft: "8px", color: "#5c5c5c" }}>
                <i class="fas fa-info-circle"></i>
              </span>
            }
            on="hover"
            position="right center"
            closeOnDocumentClick
            contentStyle={{
              borderRadius: "4px",
              padding: "0 8px",
            }}
          >
            <div className="sign_in_reset_pwd_pwd_params">
              <Translate>Guidelines for password:</Translate>
            </div>

            <ul className="sign_in_reset_pwd_pwd_params_list">
              <li className="sign_in_reset_pwd_pwd_params_item">
                <Translate>
                  Password must be at least 8 characters long.
                </Translate>
              </li>
              <li className="sign_in_reset_pwd_pwd_params_item">
                <Translate>
                  It must include uppercase or lowercase characters ([A-Z],
                  [a-z])
                </Translate>
              </li>
              <li className="sign_in_reset_pwd_pwd_params_item">
                <Translate>It must include numbers ([0-9])</Translate>
              </li>
            </ul>
          </Popup>
        </div>
        <input
          required
          className="sign_in_reset_pwd_pwd"
          type="password"
          placeholder="New password"
          onChange={handleChange("password")}
        />
        <input
          required
          className="sign_in_reset_pwd_cnf_pwd"
          type="password"
          placeholder="Confirm new password"
          onChange={handleChange("cnf_password")}
        />

        <div className="sign_in_reset_pwd_btn_container">
          <button
            type="button"
            className="sign_in_reset_pwd_back"
            onClick={handleReturnBack}
          >
            <i className="fas fa-arrow-left"></i>
            <span style={{ marginLeft: "8px" }}>
              <Translate>GO BACK</Translate>
            </span>
          </button>

          <button className="sign_in_reset_pwd_btn" type="submit">
            <Translate>SUBMIT</Translate>
          </button>
        </div>
      </form>
    </div>
  );
}

export default memo(SignInResetPwd);
