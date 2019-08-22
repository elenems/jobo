import React, { Component } from "react";
import { connect } from "react-redux";
import CompareJobItem from "../components/CompareJobItem";
import Header from "../layout/header/Header";
import Footer from "../layout/footer/Footer";
import { Link } from "react-router-dom";

class ComparingList extends Component {
  render() {
    const jobs = this.props.jobs;
    return (
      <div className="comparing-page">
        <Header {...this.props} />
        <section style={{ minHeight: "300px" }}>
          <h1>Comparing list</h1>
          {!jobs.length ? (
            <div>
              <p>No jobs to compare</p>
              <span className="accent-text">
                <Link to="/jobList">Return to jobs</Link>
              </span>
            </div>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table>
                <thead>
                  <tr>
                    <th>Job title</th>
                    <th>Category</th>
                    <th>Salary</th>
                    <th>Years of experience</th>
                    <th>Company</th>
                    <th>Location</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {jobs.map(job => {
                    return (
                      <tr key={job.id}>
                        <CompareJobItem job={job} />
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </section>
        <Footer {...this.props} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    jobs: state.jobs.jobs
  };
};

export default connect(mapStateToProps)(ComparingList);
