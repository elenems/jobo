import React, { Component } from "react";
import Header from "../layout/header/Header";
import CompanyJobItem from "../components/CompanyJobItem";
import Loader from "../components/Loader";
import axios from "axios";
import { UserContext } from "../contexts/UserContext";
import Footer from "../layout/footer/Footer";
import Filters from "../containers/Filters";
import PageNavigation from "../components/PageNavigation";

class JobList extends Component {
  state = {
    isLoading: true,
    user: {},
    jobs: {},
    jobsLength: 1
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.location.search !== this.props.location.search) {
      axios
        .get(`getJobsFromQuery${this.props.location.search}`)
        .then(data => {
          if (data.data.jobs) {
            this.setState({
              jobs: data.data.jobs,
              jobsLength: data.data.jobsLength,
              isLoading: false
            });
          } else {
            this.setState({
              jobs: {},
              isLoading: false
            });
          }
        })
        .catch(e => {
          this.setState({
            isLoading: false
          });
        });
    }

    if (
      this.props.user.user.isAuthenticated &&
      prevProps.user.user.isAuthenticated !==
        this.props.user.user.isAuthenticated
    ) {
      axios.get(`/getUser?email=${this.props.user.user.email}`).then(data => {
        this.setState({
          user: data.data,
          isLoading: false
        });
      });
    }
  }

  componentDidMount() {
    if (this.props.user.user.isAuthenticated) {
      axios.get(`/getUser?email=${this.props.user.user.email}`).then(data => {
        this.setState({
          user: data.data
        });
      });
    }
    axios
      .get(`getJobsFromQuery${this.props.location.search}`)
      .then(data => {
        if (data.data.jobs) {
          this.setState({
            jobs: data.data.jobs,
            jobsLength: data.data.jobsLength,
            isLoading: false
          });
        } else {
          this.setState({
            jobs: {},
            isLoading: false
          });
        }
      })
      .catch(e => {
        this.setState({
          isLoading: false
        });
      });
  }

  render() {
    return (
      <div className="job-list-page">
        <Header {...this.props} />
        <section>
          <h1>Job list</h1>
          {this.state.isLoading ? (
            <Loader />
          ) : (
            <div>
              <Filters {...this.props} />
              <div style={{ marginTop: "30px" }} className="job-list-container">
                <div style={{ minHeight: "250px" }} className="job-list">
                  {this.state.isLoading ? (
                    <Loader />
                  ) : !this.state.jobs.length ? (
                    <p>No jobs found</p>
                  ) : (
                    this.state.jobs.map(job => {
                      return (
                        <CompanyJobItem
                          {...this.props}
                          key={job.id}
                          user={this.state.user}
                          job={job}
                        />
                      );
                    })
                  )}
                </div>
                <div className="filters" />
              </div>
              <PageNavigation
                {...this.props}
                jobsLength={this.state.jobsLength}
              />
            </div>
          )}
        </section>
        <Footer />
      </div>
    );
  }
}

export default React.forwardRef((props, ref) => (
  <UserContext.Consumer>
    {user => <JobList {...props} user={user} ref={ref} />}
  </UserContext.Consumer>
));
