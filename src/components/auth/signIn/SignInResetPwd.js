import React from "react";
import "./SignInResetPwd.css";

import Popup from "reactjs-popup";

import { ArrowLeftOutlined, InfoCircleOutlined } from "@ant-design/icons";

function SignInResetPwd(props) {
  // ---local form state mgmt-----
  const { formValues, handleChange, prevStep } = props;

  const handleReturnBack = (e) => {
    // if wrong mobile
    // e.preventDefault() and re-ask
    // else
    prevStep();
  };
  // -----------------------------

  const handleRequestOtp = () => {
    return;
  };

  return (
    <div className="sign_in_reset_pwd_main_div">
      <form className="sign_in_reset_pwd_form">
        <div className="sign_in_reset_pwd_label_pri">
          Enter registered mobile number:
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
          REQUEST OTP
        </button>
        <div className="sign_in_reset_pwd_label_sec">Enter OTP:</div>
        <input
          required
          className="sign_in_reset_pwd_otp"
          type="text"
          placeholder="Enter OTP"
          onChange={handleChange("otp")}
        />
        <div className="sign_in_reset_pwd_label_tert">
          Enter new password:
          <Popup
            trigger={
              <span style={{ marginLeft: "8px", color: "#5c5c5c" }}>
                <InfoCircleOutlined />
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
              Guidelines for password:
            </div>

            <ul className="sign_in_reset_pwd_pwd_params_list">
              <li className="sign_in_reset_pwd_pwd_params_item">
                Password must be at least 8 characters long.
              </li>
              <li className="sign_in_reset_pwd_pwd_params_item">
                It must include uppercase or lowercase characters ([A-Z], [a-z])
              </li>
              <li className="sign_in_reset_pwd_pwd_params_item">
                It must include numbers ([0-9])
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
            <ArrowLeftOutlined />
            <span style={{ marginLeft: "8px" }}>GO BACK</span>
          </button>

          <input
            className="sign_in_reset_pwd_btn"
            type="submit"
            value="SUBMIT"
          />
        </div>
      </form>
    </div>
  );
}

export default SignInResetPwd;
