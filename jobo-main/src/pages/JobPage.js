import React, { Component } from "react";
import Header from "../layout/header/Header";
import axios from "axios";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import { IconContext } from "react-icons";
import { UserContext } from "../contexts/UserContext";
import { MdStar } from "react-icons/md";
import Modal from "../components/Modal";
import Footer from "../layout/footer/Footer";

const starChecked = (
  <IconContext.Provider value={{ color: "#f1ec15" }}>
    <MdStar />
  </IconContext.Provider>
);
const starUnChecked = (
  <IconContext.Provider value={{ color: "#bfbaba" }}>
    <MdStar />
  </IconContext.Provider>
);
class JobPage extends Component {
  state = {
    job: {
      title: "",
      salary: "",
      yearsOfExperince: "",
      location: "",
      companyName: "",
      company: "",
      description: "",
      views: "",
      category: ""
    },
    isStared: false,
    isLoading: false,
    showModal: false
  };

  componentDidMount() {
    this.setState({
      isLoading: true
    });
    axios
      .get(`/getJob?id=${this.props.match.params.id}`)
      .then(data => {
        this.setState({
          job: data.data,
          isLoading: false
        });
      })
      .then(() => {
        if (this.props.user.user.email) {
          axios
            .get(`/getUser?email=${this.props.user.user.email}`)
            .then(data => {
              if (
                data.data.staredJobs.find(elem => {
                  return elem === this.state.job.id;
                })
              ) {
                this.setState({
                  isStared: true
                });
              }
            });
        }
      })
      .then(() => {
        axios.post("/incrementJobView", {
          jobId: this.state.job.id
        });
      })
      .catch(e => {
        this.setState({
          isLoading: false
        });
      });
  }

  toggleStarJob = () => {
    const { isAuthenticated, email } = this.props.user.user;
    if (isAuthenticated) {
      if (this.state.isStared) {
        axios
          .post("/removeStarJob", {
            jobId: this.state.job.id,
            userId: email
          })
          .then(() => {
            this.setState({ isStared: false });
          });
      } else {
        axios
          .post("/addStarJob", {
            jobId: this.state.job.id
          })
          .then(() => {
            axios.post(`/starJob?email=${email}`, {
              jobId: this.state.job.id
            });
          })
          .then(() => {
            this.setState({ isStared: true });
          })
          .catch(e => {});
      }
    } else {
      this.setState({
        showModal: true
      });
    }
  };

  confirmModal = () => {
    this.props.history.push("/login");
  };

  cancelModal = () => {
    this.setState({
      showModal: false
    });
  };

  render() {
    const {
      location,
      description,
      title,
      yearsOfExperience,
      salary,
      company,
      companyName,
      views,
      category
    } = this.state.job;

    return this.state.isLoading ? (
      <Loader />
    ) : (
      <div className="job-page">
        <Header {...this.props} />
        <section>
          <Modal
            show={this.state.showModal}
            title={"Please sign in to like this job"}
            confirm={this.confirmModal}
            cancel={this.cancelModal}
          />
          <div className="job">
            <div className="job-header">
              <div>
                <h2>
                  {title}
                  <button className="clear-button" onClick={this.toggleStarJob}>
                    {this.state.isStared ? starChecked : starUnChecked}
                  </button>
                </h2>
                <p>
                  Company:{" "}
                  <Link className="accent-text" to={`/company/${company}`}>
                    {companyName}
                  </Link>
                </p>
                <p>Location: {location}</p>
                <p>Category: {category}</p>
                <p>Years of experince: {yearsOfExperience}</p>
                <p>Salary: {salary}$</p>
              </div>
            </div>
            <p>Views: {views}</p>
            <p>{description}</p>
          </div>
        </section>
        <Footer />
      </div>
    );
  }
}

export default React.forwardRef((props, ref) => (
  <UserContext.Consumer>
    {user => <JobPage {...props} user={user} ref={ref} />}
  </UserContext.Consumer>
));
