import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { IconContext } from "react-icons";
import { MdStar } from "react-icons/md";
import Modal from "../components/Modal";
import axios from "axios";
import { MdAddBox } from "react-icons/md";
import { connect } from "react-redux";
import { addJob } from "../store/actions/jobsActions";

const add = (
  <IconContext.Provider value={{ color: "#bfbaba" }}>
    <MdAddBox />
  </IconContext.Provider>
);

const added = (
  <IconContext.Provider value={{ color: "#1cc7e4" }}>
    <MdAddBox />
  </IconContext.Provider>
);

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

function CompanyJobItem(props) {
  const [isStared, setIsStared] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isCompared, setIsCompared] = useState(false);

  useEffect(() => {
    if (props.user.email) {
      if (props.user.staredJobs.indexOf(props.job.id) !== -1) {
        setIsStared(true);
      }
    }

    if (props.jobs.length) {
      if (
        props.jobs.find(job => {
          return job.id === props.job.id;
        })
      ) {
        setIsCompared(true);
      }
    }
  }, [
    props.job.id,
    props.user.staredJobs,
    props.user.email,
    props.jobs.length,
    props.jobs
  ]);

  const confirmModal = () => {
    props.history.push("/login");
  };

  const cancelModal = () => {
    setShowModal(false);
  };

  const addToCompare = () => {
    props.addToCompare(props.job);
    setIsCompared(true);
  };

  const toggleStar = () => {
    const { email = false } = props.user;
    if (email) {
      if (isStared) {
        axios
          .post("/removeStarJob", {
            jobId: props.job.id,
            userId: email
          })
          .then(() => {
            setIsStared(false);
          });
      } else {
        axios
          .post("/addStarJob", {
            jobId: props.job.id
          })
          .then(() => {
            axios.post(`/starJob?email=${email}`, {
              jobId: props.job.id
            });
          })
          .then(() => {
            setIsStared(true);
          })
          .catch(e => {});
      }
    } else {
      setShowModal(true);
    }
  };

  return (
    <div className="company-job-item">
      <Modal
        show={showModal}
        title="Please login to star this job"
        confirm={confirmModal}
        cancel={cancelModal}
      />
      <h6 className="accent-text">
        <Link to={`/job/${props.job.id}`}>{props.job.title}</Link>
        <button onClick={toggleStar} className="clear-button">
          {isStared ? starChecked : starUnChecked}
        </button>
        {!isCompared ? (
          <button
            onClick={addToCompare}
            title="Compare this job"
            className="clear-button"
          >
            {add}
          </button>
        ) : (
          <button title="Alrady in list" className="clear-button">
            {added}
          </button>
        )}
      </h6>
      <p>Location: {props.job.location}</p>
      <p>Category: {props.job.category}</p>
      <p>Date: {props.job.date}</p>
      <p>Salary: {props.job.salary ? props.job.salary : "Not written"}</p>
      <p>{props.job.description.slice(0, 150) + " ..."}</p>
    </div>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    addToCompare: job => {
      dispatch(addJob(job));
    }
  };
};

const mapStateToProps = state => {
  return {
    jobs: state.jobs.jobs
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CompanyJobItem);
