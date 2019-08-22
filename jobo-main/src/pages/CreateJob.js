import React, { Component } from "react";
import Header from "../layout/header/Header";
import axios from "axios";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";

export default class CreateJob extends Component {
  state = {
    title: "",
    location: "",
    yearsOfExperience: "",
    salary: "",
    description: "",
    isLoading: false,
    message: "",
    messageStyle: {},
    companyName: "",
    category: ""
  };

  componentDidMount() {
    axios
      .get(`/getCompany?id=${this.props.history.location.search.slice(4)}`)
      .then(data => {
        this.setState({
          companyName: data.data.companyName
        });
      })
      .catch(e => {
        this.setState({
          message: "can't get company id to post a job",
          messageStyle: { color: "red" }
        });
      });
  }

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    const id = this.props.history.location.search.slice(4);
    const {
      title,
      location,
      description,
      salary,
      yearsOfExperience,
      category
    } = this.state;
    if (
      !yearsOfExperience.trim().length ||
      !title.trim().length ||
      !location.trim().length ||
      !description.trim().length ||
      !category.trim().length
    ) {
      this.setState({
        message: "Please fill all form fields",
        messageStyle: { color: "red" }
      });
      return;
    }
    this.setState({
      isLoading: true
    });
    axios
      .post("/addJob", {
        companyId: id,
        title,
        location,
        description,
        yearsOfExperience,
        salary,
        companyName: this.state.companyName,
        category
      })
      .then(() => {
        this.setState({
          title: "",
          location: "",
          yearsOfExperience: "",
          salary: "",
          description: "",
          message: "You successfuly created a new job!",
          messageStyle: { color: "green" },
          isLoading: false
        });
      })
      .catch(e => {
        this.setState({
          message: "Error creating a new job",
          messageStyle: { color: "red" },
          isLoading: false
        });
      });
  };
  render() {
    if (!this.props.history.location.search) {
      this.props.history.push("/profile/company");
    }
    let content = this.state.isLoading ? (
      <Loader />
    ) : (
      <form className="auth-form">
        <div className="flex-align">
          <label htmlFor="title">Title:</label>
          <input
            onChange={this.handleChange}
            id="title"
            type="text"
            value={this.state.title}
            placeholder="Web developer"
          />
        </div>
        <div className="flex-align">
          <label htmlFor="location">Location:</label>
          <input
            onChange={this.handleChange}
            id="location"
            type="text"
            value={this.state.location}
            placeholder="Lviv"
          />
        </div>
        <div className="flex-align">
          <label htmlFor="yearsOfExperience">Years of experince:</label>
          <input
            onChange={this.handleChange}
            id="yearsOfExperience"
            type="text"
            value={this.state.yearsOfExperience}
            placeholder="2"
          />
        </div>
        <div className="flex-align">
          <label htmlFor="category">Category:</label>
          <input
            onChange={this.handleChange}
            id="category"
            type="text"
            value={this.state.category}
            placeholder="IT"
          />
        </div>
        <div className="flex-align">
          <label htmlFor="salary">Salary:</label>
          <input
            onChange={this.handleChange}
            id="salary"
            type="text"
            value={this.state.salary}
            placeholder="1000$"
          />
        </div>
        <div>
          <textarea
            onChange={this.handleChange}
            id="description"
            type="text"
            value={this.state.description}
            placeholder="Description"
          />
        </div>
        <button onClick={this.handleSubmit}>Create</button>
        <div style={{ marginTop: "14px" }}>
          <Link to="/profile/company">
            <span className="accent-text">Back to profile</span>
          </Link>
          <p style={this.state.messageStyle}>{this.state.message}</p>
        </div>
      </form>
    );
    return (
      <div>
        <Header {...this.props} />
        <section>
          <h1>Create a job</h1>
          {content}
        </section>
      </div>
    );
  }
}
