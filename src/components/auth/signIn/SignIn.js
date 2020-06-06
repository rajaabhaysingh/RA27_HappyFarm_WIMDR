import React, { useState } from "react";
import "./SignIn.css";

import SignInNormal from "./SignInNormal";
import SignInResetPwd from "./SignInResetPwd";

function SignIn(props) {
  // --------managing sign-in states-----------
  const [signInFormState, setSignInFormState] = useState({
    // step: 1 is normal login sub-form
    // step: 2 is reset password sub-form
    step: 1,
    email_phone: "",
    password: "",
    otp: "",
    new_pwd: "",
    cnf_new_pwd: "",
  });

  const {
    step,
    email_phone,
    otp,
    password,
    new_pwd,
    cnf_new_pwd,
  } = signInFormState;
  const formValues = { step, email_phone, otp, password, new_pwd, cnf_new_pwd };
  // ------------------------------------------

  // -----next/previous step mgmt--------
  const nextStep = () => {
    const { step } = signInFormState;
    setSignInFormState({
      ...signInFormState,
      step: step + 1,
    });
  };

  const prevStep = () => {
    const { step } = signInFormState;
    setSignInFormState({
      ...signInFormState,
      step: step - 1,
    });
  };

  const handleChange = (inputField) => (e) => {
    setSignInFormState({
      ...signInFormState,
      [inputField]: e.target.value,
    });
  };
  // ------------------------------------

  switch (step) {
    case 1:
      return (
        <div className="sign_in_main_div">
          <SignInNormal
            nextStep={nextStep}
            handleChange={handleChange}
            formValues={formValues}
          />
        </div>
      );

    case 2:
      return (
        <div className="sign_in_main_div">
          <SignInResetPwd
            prevStep={prevStep}
            handleChange={handleChange}
            formValues={formValues}
          />
        </div>
      );

    default:
      alert("Oops! something went wrong on yout end. Please try again later.");
      break;
  }
}

export default SignIn;
