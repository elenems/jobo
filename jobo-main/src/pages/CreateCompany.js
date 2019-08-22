import React, { Component } from "react";
import Header from "../layout/header/Header";
import { Link } from "react-router-dom";
import InputError from "../components/InputError";
import Loader from "../components/Loader";
import axios from "axios";
import { UserContext } from "../contexts/UserContext";

export default class CreateCompany extends Component {
  state = {
    name: "",
    site: "",
    category: "",
    description: "",
    isLoading: false,
    error: ""
  };

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleSubmit = user => e => {
    e.preventDefault();
    this.setState({ isLoading: true });
    axios
      .post("/addCompany", {
        email: user.user.email,
        companyName: this.state.name,
        companySite: this.state.site,
        companyCategory: this.state.category,
        companyDescription: this.state.description
      })
      .then(() => {
        this.props.history.push("/profile/company");
      })
      .catch(error => {
        const errorMessage =
          error.response.data.errorMessage ||
          "Error, while creating a new company";
        this.setState({
          isLoading: false,
          error: errorMessage
        });
      });
  };

  render() {
    const content = this.state.isLoading ? (
      <Loader />
    ) : (
      <UserContext.Consumer>
        {user => (
          <section>
            <h1>Create company</h1>
            <form className="auth-form">
              <div>
                <input
                  type="text"
                  placeholder="*Company name"
                  value={this.state.name}
                  onChange={this.handleChange}
                  id="name"
                />
              </div>

              <div>
                <input
                  type="text"
                  placeholder="*Category"
                  value={this.category}
                  onChange={this.handleChange}
                  id="category"
                />
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Web site"
                  value={this.site}
                  onChange={this.handleChange}
                  id="site"
                />
              </div>

              <div>
                <textarea
                  id="description"
                  onChange={this.handleChange}
                  placeholder="*Description"
                />
              </div>
              <div>
                <InputError errorMessage={this.state.error} />
              </div>

              <button onClick={this.handleSubmit(user)}>Create</button>
              <p>
                <Link to="/profile/company">
                  <span className="accent-text">Back to profile</span>
                </Link>
              </p>
            </form>
          </section>
        )}
      </UserContext.Consumer>
    );
    return (
      <React.Fragment>
        <Header {...this.props} />
        <div>{content}</div>
      </React.Fragment>
    );
  }
}
