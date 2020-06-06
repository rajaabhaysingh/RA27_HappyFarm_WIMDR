import React from "react";
import "./SignUpPwd.css";

function SignUpPwd(props) {
  // ---local form state mgmt-----
  const { handleChange } = props;

  const handleSignUp = (e) => {
    // verify and sign-up
    // if wrong pwd
    // e.preventDefault();
    // else
    // redirdect to login-page
    return;
  };
  // -----------------------------

  return (
    <div className="sign_up_pwd_main_div">
      <form className="sign_up_form" onSubmit={handleSignUp}>
        <div className="sign_up_label_pri">Mobile number:</div>
        <div className="sign_up_pwd_mob">9898989898</div>
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

export default SignUpPwd;
