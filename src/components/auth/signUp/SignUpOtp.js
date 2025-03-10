import React, { memo, useEffect, useState, useRef, useCallback } from "react";
import "./SignUpOtp.css";

import { Translate } from "react-auto-translate";

import axios from "axios";

function SignUpOtp({
  formValues,
  handleChange,
  nextStep,
  prevStep,
  apikey,
  sessionId,
}) {
  const [otpError, setOtpError] = useState(null);

  const url =
    "https://2factor.in/API/V1/" +
    apikey +
    "/SMS/VERIFY/" +
    sessionId +
    "/" +
    formValues.otp;

  console.log(url);

  useEffect(() => {
    console.log(formValues);
  }, [formValues.otp]);

  // ---- otp submission -----
  const verifyOtp = useCallback(async () => {
    let res = await axios.get(url);
    console.log(res.data.Details);

    setTimeout(() => {
      if (res.data.Details === "OTP Matched") {
        nextStep();
      }
    }, 1000);
  }, [formValues]);
  // ------------------------

  // ---local form state mgmt-----
  const handleConfirm = useCallback(
    (e) => {
      try {
        e.preventDefault();
        verifyOtp();
        nextStep();
      } catch (error) {
        console.log(error);
      }
    },
    [formValues]
  );
  // -----------------------------

  // use ref
  const focusOtpRef = useRef();

  // -----handleResendOtp----------
  const [isResendBtnVisible, setIsResendBtnVisible] = useState(true);
  const [isTimerVisible, setIsTimerVisible] = useState(false);

  let resendBtnClass = "sign_up_resend_btn--visible";
  let timerClass = "sign_up_resend_otp_timer--hidden";

  if (!isResendBtnVisible) {
    resendBtnClass = "sign_up_resend_btn--hidden";
  }
  if (isTimerVisible) {
    timerClass = "sign_up_resend_otp_timer--visible";
  }

  const handleResendOtp = () => {
    setIsResendBtnVisible(false);
    setIsTimerVisible(true);
    startTimer();
    // keep focus on otp box
    focusOtpRef.current.focus();
  };

  // timer fun
  var timeLeft = 30;
  const startTimer = () => {
    var elem = document.getElementById("sign_up_resend_otp_timer");
    var countDownTimer = setInterval(countdown, 1000);

    function countdown() {
      if (timeLeft === -1) {
        clearTimeout(countDownTimer);
        nextSteps();
      } else {
        elem.innerHTML = "00:" + (timeLeft < 10 ? "0" : "") + timeLeft;
        timeLeft--;
      }
    }

    function nextSteps() {
      setIsResendBtnVisible(true);
      setIsTimerVisible(false);
      return;
    }
  };
  // ------------------------------

  return (
    <div className="sign_up_otp_main_div">
      <form className="sign_up_form" onSubmit={handleConfirm}>
        <div className="sign_up_label">
          <Translate>Enter OTP sent to your mobile number:</Translate>
        </div>
        <input
          required
          autoFocus
          name="otp"
          className="sign_up_otp"
          type="text"
          placeholder="Enter OTP"
          onChange={handleChange("otp")}
          defaultValue={formValues.otp}
          ref={focusOtpRef}
        />
        <div className="form_error">
          <Translate>{otpError ? otpError : null}</Translate>
        </div>
        <div className="sign_up_otp_params">
          <Translate>Didn't receive OTP?</Translate>
          <div className={timerClass}>
            <span style={{ marginLeft: "8px" }}>
              <Translate>Please wait...</Translate>
            </span>
            <span
              id="sign_up_resend_otp_timer"
              style={{
                marginLeft: "4px",
                fontWeight: "bold",
                fontStyle: "italic",
              }}
            >
              00:{timeLeft}
            </span>
          </div>
          {/* following div is just a spacer div */}
          <div style={{ display: "flex", flex: "1" }}></div>
          <div className={resendBtnClass} onClick={handleResendOtp}>
            <Translate>RESEND OTP</Translate>
          </div>
        </div>

        <input className="sign_up_otp_cnf_btn" type="submit" value="CONFIRM" />
        <div className="sign_up_otp_back">
          <button
            className="sign_up_otp_back_btn"
            type="button"
            onClick={prevStep}
          >
            <Translate>CHANGE NUMBER</Translate>
          </button>
        </div>
      </form>
    </div>
  );
}

export default memo(SignUpOtp);
