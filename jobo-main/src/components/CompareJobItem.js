import React from "react";
import { IconContext } from "react-icons";
import { MdRemoveCircleOutline } from "react-icons/md";
import { connect } from "react-redux";
import { removeJob } from "../store/actions/jobsActions";
import { Link } from "react-router-dom";

const removeIcon = (
  <IconContext.Provider value={{ color: "#ff4f6e" }}>
    <MdRemoveCircleOutline />
  </IconContext.Provider>
);

function CompareJobItem(props) {
  const {
    title,
    companyName,
    salary,
    category,
    location,
    yearsOfExperience,
    id,
    company
  } = props.job;

  const remove = () => {
    props.removeJob(id);
  };

  return (
    <React.Fragment>
      <td>
        <Link className="underline-link" to={`job/${id}`}>
          {title}
        </Link>
      </td>
      <td>{category}</td>
      <td>{salary}</td>
      <td>{yearsOfExperience}</td>
      <td>
        <Link className="underline-link" to={`company/${company}`}>
          {companyName}
        </Link>
      </td>
      <td>{location}</td>
      <td>
        <button title="remove" onClick={remove} className="clear-button">
          {removeIcon}
        </button>
      </td>
    </React.Fragment>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    removeJob: id => {
      dispatch(removeJob(id));
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(CompareJobItem);
