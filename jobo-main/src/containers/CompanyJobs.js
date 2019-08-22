import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import JobItem from "../components/JobItem";
import Popup from "../components/Popup";
import Modal from "../components/Modal";

export default class CompanyJobs extends PureComponent {
  state = {
    companyJobs: [],
    message: "",
    confirmDelation: "",
    showModal: false,
    jobIdToDelete: ""
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.props.company.id !== prevProps.company.id) {
      axios
        .post("/getCompanyJobs", {
          id: this.props.company.id
        })
        .then(data => {
          this.setState({
            companyJobs: data.data.jobs
          });
        })
        .catch(e => {});
    }
  }

  confirmDeletion = () => {
    axios
      .post("/removeJob", {
        jobId: this.state.jobIdToDelete
      })
      .then(() => {
        axios
          .post("/getCompanyJobs", {
            id: this.props.company.id
          })
          .then(data => {
            this.setState({
              companyJobs: data.data.jobs,
              message: "Job removed successfully",
              showModal: false,
              jobIdToDelete: null
            });
            setTimeout(() => {
              this.setState({
                message: ""
              });
            }, 2000);
          });
      })
      .catch(e => {
        this.setState({
          message: "Error removing the job"
        });
        setTimeout(() => {
          this.setState({
            message: "",
            showModal: false,
            jobIdToDelete: null
          });
        }, 2000);
      });
  };

  cancelDeletion = () => {
    this.setState({
      showModal: false
    });
  };

  removeItem = id => e => {
    this.setState({
      showModal: true,
      jobIdToDelete: id
    });
  };

  render() {
    let content = null;
    const { company } = this.props;
    const { style } = this.props;
    const isLight = this.props.isLight;
    let buttonStyle = isLight ? "styled-button" : "styled-button-dark";

    if (company.id) {
      content = !company.companyJobs.length ? (
        <h4 style={{ color: style.text }}>Add a first job</h4>
      ) : (
        <ul>
          {this.state.companyJobs.map(job => {
            return (
              <JobItem
                removeItem={this.removeItem(job.id)}
                fromCompany={true}
                key={job.id}
                job={job}
                styleContext={style}
              />
            );
          })}
        </ul>
      );
    }
    return (
      <div>
        <Modal
          confirm={this.confirmDeletion}
          title={"Confirm deletion"}
          cancel={this.cancelDeletion}
          show={this.state.showModal}
        />
        <Popup
          visible={!!this.state.message.length}
          message={this.state.message}
        />
        <Link to={{ pathname: "/addJob", search: `?id=${company.id}` }}>
          <button
            style={{ margin: "0px 0px 20px 0px" }}
            className={buttonStyle}
          >
            Add a job
          </button>
        </Link>
        {content}
      </div>
    );
  }
}
