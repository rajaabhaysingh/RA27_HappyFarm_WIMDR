import React, { useState, memo, lazy, Suspense } from "react";
import "./SignInUpReset.css";

import CloseOutlined from "@ant-design/icons/CloseOutlined";

import LoginGraphics from "../../res/login/login_graphic.svg";

import FallbackLazy from "../FallbackLazy";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

const SignIn = lazy(() => import("./signIn/SignIn"));
const SignUp = lazy(() => import("./signUp/SignUp"));

function SignInUp({ onClose }) {
  // ----------sign-up / sign-in state mgmt---------

  // form toggle (between sign-in and sign-up) logic
  // if isSignInOpen is true, then sign in form is open
  // else sign up form is open

  let [isSignInOpen, setIsSignInOpen] = useState(true);

  const signInState = {
    formHeading: "Login",
    formDesc:
      "Get access to your Account, History, Wishlist, Recommendations and much more.",
    bottomTextPrimary: "New to happyfarm? ",
    bottomTextSecondary: "Sign-up now.",
  };

  const signOutState = {
    formHeading: "Sign-up",
    formDesc:
      "Seems you are new at Happyfarm. Create you accont to get maximum benefit from happyfarm.com",
    bottomTextPrimary: "Already have an account? ",
    bottomTextSecondary: "Login.",
  };

  let [formState, setFormState] = useState(signInState);

  const handleToggleFormState = () => {
    setIsSignInOpen(!isSignInOpen);
    setFormState(isSignInOpen ? signOutState : signInState);
  };

  let {
    formHeading,
    formDesc,
    bottomTextPrimary,
    bottomTextSecondary,
  } = formState;

  // -----------------------------------------------

  // ------- toggle form UI --------------
  const renderFormUI = (shouldDisplaySignIn) => {
    if (shouldDisplaySignIn) {
      return (
        <ErrorBoundary>
          <Suspense fallback={<FallbackLazy />}>
            <SignIn formState={formState} setFormState={setFormState} />
          </Suspense>
        </ErrorBoundary>
      );
    } else {
      return (
        <ErrorBoundary>
          <Suspense fallback={<FallbackLazy />}>
            <SignUp formState={formState} setFormState={setFormState} />
          </Suspense>
        </ErrorBoundary>
      );
    }
  };
  // -------------------------------------

  return (
    <div className="sign_in_up_main_div">
      <div className="sign_in_up_inner_div">
        <div className="sign_in_up_graphics">
          <div className="sign_in_up_graphics_text">
            <div className="sign_in_up_graphics_heading">{formHeading}</div>
            <div className="sign_in_up_graphics_desc">{formDesc}</div>
          </div>
          <div className="sign_in_up_graphics_image">
            <img src={LoginGraphics} alt="" />
          </div>
        </div>
        <div className="sign_in_up_form_container">
          <div className="sign_in_up_close_btn" onClick={onClose}>
            <CloseOutlined />
          </div>

          {renderFormUI(isSignInOpen)}

          <button
            type="button"
            className="sign_in_up_sign_up"
            onClick={handleToggleFormState}
          >
            {bottomTextPrimary}
            <span style={{ marginLeft: "4px" }}>
              <strong>{bottomTextSecondary}</strong>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default memo(SignInUp);
