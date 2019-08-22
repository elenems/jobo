import React, { Component } from "react";
import Header from "../layout/header/Header";
import Footer from "../layout/footer/Footer";
import { Link } from "react-router-dom";
import InputError from "../components/InputError";
import Loader from "../components/Loader";
import axios from "axios";
import { UserContext } from "../contexts/UserContext";

class Register extends Component {
  state = {
    email: "",
    password: "",
    confirmPassword: "",
    isLoading: false,
    errors: {
      emailError: "",
      passwordError: ""
    }
  };

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState({ isLoading: true });
    axios
      .post("/signUp", {
        email: this.state.email,
        password: this.state.password,
        confirmPassword: this.state.confirmPassword
      })
      .then(data => {
        const token = data.data.token;
        localStorage.setItem("token", token);
        this.context.authenticateUser(this.state.email);
        this.props.history.push("/profile/info");
      })
      .catch(error => {
        this.setState({ isLoading: false, errors: error.response.data });
      });
  };

  render() {
    const emailError = this.state.errors.emailError;
    const passwordError = this.state.errors.passwordError;
    const content = this.state.isLoading ? (
      <Loader />
    ) : (
      <section>
        <h1>Sign up for free</h1>
        <form className="auth-form">
          <div>
            <input
              type="email"
              placeholder="Email adress"
              value={this.state.email}
              onChange={this.handleChange}
              id="email"
            />
            <InputError errorMessage={emailError} />
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              value={this.password}
              onChange={this.handleChange}
              id="password"
            />
            <InputError errorMessage={passwordError} />
          </div>

          <div>
            <input
              type="password"
              placeholder="Confirm password"
              value={this.confirmPassword}
              onChange={this.handleChange}
              id="confirmPassword"
            />
            <InputError errorMessage={passwordError} />
          </div>

          <button onClick={this.handleSubmit}>Signup</button>
          <p>
            Already got an account ?
            <Link to="/login">
              <span className="accent-text"> Login</span>
            </Link>
          </p>
        </form>
      </section>
    );
    return (
      <React.Fragment>
        <Header {...this.props} />
        <div>{content}</div>
        <Footer />
      </React.Fragment>
    );
  }
}

Register.contextType = UserContext;
export default Register;
