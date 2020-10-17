// eslint-disable-next-line
import React, { useState } from "react";
import { connect } from "react-redux";
import SignUpForm from "./SignUpForm";

function Login(props) {
  const { userID, username, logOutUser } = props;
  const [open, setOpen] = React.useState(false);

  function LogOut(name) {
    return (
      <div className="logout-component">
        <p>Logged in as: {name}</p>
        <button onClick={logOutUser}>Log Out</button>
      </div>
    );
  }

  const toggle = () => {
    setOpen(!open);
  };
  return (
    <div className="login-root">
      {userID !== null ? (
        LogOut(username)
      ) : !open ? (
        <button className="open-login-button" onClick={toggle}>
          Login to save settings
        </button>
      ) : null}

      {open ? (
        <div className="login-modal">
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
          </form>
          <div className="button-container">
            <button type="submit" className="login-button">
              Login
            </button>
            {"or"}
            <div type="submit" className="signUp-div">
              <SignUpForm></SignUpForm>
            </div>
            <button type="close" className="close-button" onClick={toggle}>
              Close
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

function mapDispatchToProps(dispatch) {
  return {
    logOutUser: () => dispatch({ type: "LOG_OUT" }),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
