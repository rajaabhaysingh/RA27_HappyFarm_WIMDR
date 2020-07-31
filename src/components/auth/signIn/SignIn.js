import React, { useState, memo, Suspense, lazy, useCallback } from "react";
import "./SignIn.css";

import FallbackLazy from "../../FallbackLazy";
import ErrorBoundary from "../../errorBoundary/ErrorBoundary";

const SignInNormal = lazy(() => import("./SignInNormal"));
const SignInResetPwd = lazy(() => import("./SignInResetPwd"));

function SignIn({ user, setUser, onClose }) {
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
  const nextStep = useCallback(() => {
    const { step } = signInFormState;
    setSignInFormState({
      ...signInFormState,
      step: step + 1,
    });
  }, [signInFormState]);

  const prevStep = useCallback(() => {
    const { step } = signInFormState;
    setSignInFormState({
      ...signInFormState,
      step: step - 1,
    });
  }, [signInFormState]);

  const handleChange = useCallback(
    (inputField) => (e) => {
      setSignInFormState({
        ...signInFormState,
        [inputField]: e.target.value,
      });
    },
    [signInFormState]
  );
  // ------------------------------------

  switch (step) {
    case 1:
      return (
        <div className="sign_in_main_div">
          <ErrorBoundary>
            <Suspense fallback={<FallbackLazy />}>
              <SignInNormal
                nextStep={nextStep}
                handleChange={handleChange}
                formValues={formValues}
                onClose={onClose}
                user={user}
                setUser={setUser}
              />
            </Suspense>
          </ErrorBoundary>
        </div>
      );

    case 2:
      return (
        <div className="sign_in_main_div">
          <ErrorBoundary>
            <Suspense fallback={<FallbackLazy />}>
              <SignInResetPwd
                prevStep={prevStep}
                handleChange={handleChange}
                formValues={formValues}
                onClose={onClose}
                user={user}
                setUser={setUser}
              />
            </Suspense>
          </ErrorBoundary>
        </div>
      );

    default:
      alert("Oops! something went wrong on your end. Please try again.");
      break;
  }
}

export default memo(SignIn);
