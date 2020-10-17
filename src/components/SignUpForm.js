// eslint-disable-next-line
import React, { useState } from "react";
import { connect } from "react-redux";

function SignUpForm(props) {
  const [open, setOpen] = React.useState(false);

  const toggle = () => {
    setOpen(!open);
  };
  return (
    <div className="registration-form-modal">
      {!open ? (
        <button className="open-form-button" onClick={toggle}>
          Sign Up
        </button>
      ) : null}
      {open ? (
        <div className="registration-form-container">
          <form>
            <input
              type="email"
              className="form-control"
              id="email"
              aria-describedby="emailHelp"
              placeholder="Enter email"
            />
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Password"
            />
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              placeholder="Confirm Password"
            />
          </form>
          <div className="button-container">
            <button type="submit" className="login-button">
              Login
            </button>
            <button type="submit" className="signUp-button">
              Sign Up
            </button>
            <button type="close" className="close-button" onClick={toggle}>
              Cancel
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function mapStateToProps(state) {
  return {
    userID: state.userID,
  };
}

export default connect(mapStateToProps)(SignUpForm);
