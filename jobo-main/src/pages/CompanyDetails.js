import React, { Component } from "react";
import Header from "../layout/header/Header";
import Footer from "../layout/footer/Footer";
import axios from "axios";
import Loader from "../components/Loader";
import CompanyJobItem from "../components/CompanyJobItem";
import { UserContext } from "../contexts/UserContext";

class CompanyDetails extends Component {
  state = {
    isLoading: true,
    company: {},
    jobs: [],
    user: {}
  };

  componentDidMount() {
    window.scrollTo(0, 0);
    axios
      .get(`/getCompany?id=${this.props.match.params.id}`)
      .then(data => {
        this.setState({
          company: data.data
        });
      })
      .then(() => {
        axios
          .post("/getCompanyJobs", {
            id: this.props.match.params.id
          })
          .then(data => {
            this.setState({
              jobs: data.data.jobs
            });
          });
      })
      .then(() => {
        if (this.props.user.user.isAuthenticated) {
          axios
            .get(`/getUser?email=${this.props.user.user.email}`)
            .then(data => {
              this.setState({
                user: data.data,
                isLoading: false
              });
            });
        } else {
          this.setState({
            isLoading: false
          });
        }
      });
  }

  render() {
    return (
      <div className="company-page">
        <Header {...this.props} />
        <section>
          {this.state.isLoading ? (
            <Loader />
          ) : (
            <div>
              <div>
                <h4>{this.state.company.companyName}</h4>
                <p>Category: {this.state.company.companyCategory}</p>
                <p>Website: {this.state.company.companySite}</p>
                <p>{this.state.company.companyDescription}</p>
              </div>
              <div style={{ marginTop: "85px" }}>
                <h4>Company jobs</h4>
                {!this.state.jobs.length ? (
                  <p>No available jobs from this company</p>
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
    {user => <CompanyDetails {...props} user={user} ref={ref} />}
  </UserContext.Consumer>
));
