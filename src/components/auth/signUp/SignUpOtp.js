import React, { useState, useRef, memo } from "react";
import "./SignUpOtp.css";

function SignUpOtp({ formValues, handleChange, nextStep, prevStep }) {
  const [otpError, setOtpError] = useState(null);

  // ---local form state mgmt-----
  const handleConfirm = (e) => {
    try {
      // verify otp
      // if successful
      e.preventDefault();
      if (formValues.otp.length === 6) {
        otpError && setOtpError(null);
        nextStep();
      } else {
        setOtpError("Invalid OTP - accepts any 6 digit OTP currently.");
      }
      // else
      // error popup
    } catch (error) {
      console.log(error);
    }
  };
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
          Enter OTP sent to your email address or open email to vefify:
        </div>
        <input
          required
          autoFocus
          className="sign_up_otp"
          type="text"
          placeholder="Enter OTP"
          onChange={handleChange("otp")}
          defaultValue={formValues.otp}
          ref={focusOtpRef}
        />
        <div className="form_error">{otpError ? otpError : null}</div>
        <div className="sign_up_otp_params">
          Didn't receive OTP?
          <div className={timerClass}>
            <span style={{ marginLeft: "8px" }}>Please wait...</span>
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
            RESEND OTP
          </div>
        </div>

        <input className="sign_up_otp_cnf_btn" type="submit" value="CONFIRM" />
        <div className="sign_up_otp_back">
          <button
            className="sign_up_otp_back_btn"
            type="button"
            onClick={prevStep}
          >
            CHANGE NUMBER
          </button>
        </div>
      </form>
      {console.log("otp rendered")}
    </div>
  );
}

export default memo(SignUpOtp);
