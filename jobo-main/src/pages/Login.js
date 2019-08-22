import React, { Component } from "react";
import Header from "../layout/header/Header";
import Footer from "../layout/footer/Footer";
import { Link } from "react-router-dom";
import InputError from "../components/InputError";
import Loader from "../components/Loader";
import axios from "axios";
import { UserContext } from "../contexts/UserContext";

class Login extends Component {
  state = {
    email: "",
    password: "",
    isLoading: false,
    errors: {
      emailError: "",
      passwordError: "",
      wrongCreds: ""
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
      .post("/signIn", {
        email: this.state.email,
        password: this.state.password
      })
      .then(data => {
        const token = data.data.token;
        localStorage.setItem("token", token);
        this.context.authenticateUser(this.state.email);
        this.props.history.push("/profile/info");
      })
      .catch(error => {
        console.log(error.response.data);
        this.setState({ isLoading: false, errors: error.response.data });
      });
  };

  render() {
    const emailError = this.state.errors.emailError;
    const passwordError = this.state.errors.passwordError;
    const credsError = this.state.errors.wrongCreds;
    const content = this.state.isLoading ? (
      <Loader />
    ) : (
      <section>
        <h1>Login</h1>
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
            <InputError errorMessage={credsError} />
          </div>

          <button onClick={this.handleSubmit}>Login</button>
          <p>
            Have no account ?
            <Link to="/register">
              <span className="accent-text"> Register</span>
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

Login.contextType = UserContext;
export default Login;
