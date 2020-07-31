import React, { useState, memo, useCallback, lazy, Suspense } from "react";
import "./SignUp.css";

import FallbackLazy from "../../FallbackLazy";
import ErrorBoundary from "../../errorBoundary/ErrorBoundary";

const SignUpMobile = lazy(() => import("./SignUpMobile"));
const SignUpOtp = lazy(() => import("./SignUpOtp"));
const SignUpPwd = lazy(() => import("./SignUpPwd"));

function SignUp({ setIsSignInOpen }) {
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
  const nextStep = useCallback(() => {
    const { step } = signUpFormState;
    setSignUpFormState({
      ...signUpFormState,
      step: step + 1,
    });
  }, [signUpFormState]);

  const prevStep = useCallback(() => {
    const { step } = signUpFormState;
    setSignUpFormState({
      ...signUpFormState,
      step: step - 1,
    });
  }, [signUpFormState]);

  const handleChange = useCallback(
    (inputField) => (e) => {
      setSignUpFormState({
        ...signUpFormState,
        [inputField]: e.target.value,
      });
    },
    [signUpFormState]
  );
  // ------------------------------------

  const { step, email, otp, password, cnf_password } = signUpFormState;
  const formValues = { step, email, otp, password, cnf_password };

  switch (step) {
    case 1:
      return (
        <div className="sign_up_main_div">
          <ErrorBoundary>
            <Suspense fallback={<FallbackLazy />}>
              <SignUpMobile
                nextStep={nextStep}
                handleChange={handleChange}
                formValues={formValues}
              />
            </Suspense>
          </ErrorBoundary>
        </div>
      );

    case 2:
      return (
        <div className="sign_up_main_div">
          <ErrorBoundary>
            <Suspense fallback={<FallbackLazy />}>
              <SignUpOtp
                prevStep={prevStep}
                nextStep={nextStep}
                handleChange={handleChange}
                formValues={formValues}
              />
            </Suspense>
          </ErrorBoundary>
        </div>
      );

    case 3:
      return (
        <div className="sign_up_main_div">
          <ErrorBoundary>
            <Suspense fallback={<FallbackLazy />}>
              <SignUpPwd
                setIsSignInOpen={setIsSignInOpen}
                handleChange={handleChange}
                formValues={formValues}
              />
            </Suspense>
          </ErrorBoundary>
        </div>
      );

    default:
      alert("Oops! We encountered error on your side, please try again.");
      break;
  }
}

export default memo(SignUp);
