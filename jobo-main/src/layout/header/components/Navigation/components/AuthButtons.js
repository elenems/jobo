import React, { useContext } from "react";
import { UserContext } from "../../../../../contexts/UserContext";
import { Link } from "react-router-dom";

export default function AuthButtons() {
  const user = useContext(UserContext);
  const isAuthenticated = user.user.isAuthenticated;
  const unauthenticateUser = user.unauthenticateUser;
  let content = "";

  if (!isAuthenticated) {
    content = (
      <React.Fragment>
        <Link className="auth-button" to="/login">
          Login
        </Link>
        <Link className="auth-button" to="/register">
          Register
        </Link>
      </React.Fragment>
    );
  } else {
    content = (
      <React.Fragment>
        <Link className="auth-button" to="/profile/info">
          Profile
        </Link>
        <Link onClick={unauthenticateUser} className="auth-button" to="/">
          Sign out
        </Link>
        {/* <button onClick = {unauthenticateUser}  className = 'auth-button'>Signout</button> */}
      </React.Fragment>
    );
  }
  return <div className="auth-buttons">{content}</div>;
}
