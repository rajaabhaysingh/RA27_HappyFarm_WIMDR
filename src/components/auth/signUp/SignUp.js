import React, { useState } from "react";
import "./SignUp.css";

import SignUpMobile from "./SignUpMobile";
import SignUpOtp from "./SignUpOtp";
import SignUpPwd from "./SignUpPwd";

function SignUp(props) {
  // -------local state mgmt---------
  const [signUpFormState, setSignUpFormState] = useState({
    step: 1,
    phone: "",
    otp: "",
    password: "",
    cnf_password: "",
  });

  // --------------------------------

  // -----next/previous step mgmt--------
  const nextStep = () => {
    const { step } = signUpFormState;
    setSignUpFormState({
      ...signUpFormState,
      step: step + 1,
    });
  };

  const prevStep = () => {
    const { step } = signUpFormState;
    setSignUpFormState({
      ...signUpFormState,
      step: step - 1,
    });
  };

  const handleChange = (inputField) => (e) => {
    setSignUpFormState({
      ...signUpFormState,
      [inputField]: e.target.value,
    });
  };
  // ------------------------------------

  const { step, phone, otp, password, cnf_password } = signUpFormState;
  const formValues = { step, phone, otp, password, cnf_password };

  switch (step) {
    case 1:
      return (
        <div className="sign_up_main_div">
          <SignUpMobile
            nextStep={nextStep}
            handleChange={handleChange}
            formValues={formValues}
          />
        </div>
      );

    case 2:
      return (
        <div className="sign_up_main_div">
          <SignUpOtp
            prevStep={prevStep}
            nextStep={nextStep}
            handleChange={handleChange}
            formValues={formValues}
          />
        </div>
      );

    case 3:
      return (
        <div className="sign_up_main_div">
          <SignUpPwd
            // nextStep={nextStep}
            handleChange={handleChange}
            formValues={formValues}
          />
        </div>
      );

    default:
      alert("Oops! We encountered error on your side, please try again.");
      break;
  }
}

export default SignUp;
