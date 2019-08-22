import React from "react";
import { Link } from "react-router-dom";
import { IconContext } from "react-icons";
import { MdStar } from "react-icons/md";
const star = (
  <IconContext.Provider value={{ color: "#f1ec15" }}>
    <MdStar />
  </IconContext.Provider>
);

export default function JobItem(props) {
  const {
    title,
    location,
    description,
    company,
    companyName,
    views,
    stars
  } = props.job;
  let content = null;
  let style = {
    text: "#000",
    accent: "#1cc7e4"
  };
  if (props.styleContext) {
    style = props.styleContext;
  }

  if (props.fromCompany) {
    let buttonStyle =
      style.text === "#000" ? "styled-button" : "styled-button-dark";
    content = (
      <div className="job">
        <div className="job-header">
          <div>
            <h6>
              <Link style={{ color: style.text }} to={`/job/${props.job.id}`}>
                {title}
              </Link>
            </h6>
            <p>{location}</p>
          </div>
          <div>
            <button onClick={props.removeItem} className={buttonStyle}>
              Remove
            </button>
          </div>
        </div>
        <p>Views: {views}</p>
        <p>Stars: {stars}</p>
        <p>
          {description.length > 150
            ? description.slice(0, 150) + "..."
            : description}
        </p>
      </div>
    );
  } else {
    content = (
      <div className="job">
        <div className="job-header">
          <div>
            <h6>
              <Link style={{ color: style.text }} to={`/job/${props.job.id}`}>
                {title}
              </Link>
            </h6>
            <p>
              <Link style={{ color: style.text }} to={`/company/${company}`}>
                {companyName}
              </Link>
            </p>
            <p>{location}</p>
          </div>
          <div>
            <button
              title="Unstar"
              className="clear-button"
              style={{ fontSize: "30px" }}
              onClick={props.unstar}
            >
              {star}
            </button>
          </div>
        </div>
        <p>
          {description.length > 150
            ? description.slice(0, 150) + "..."
            : description}
        </p>
      </div>
    );
  }

  return (
    <li style={{ borderColor: style.accent }} className="company-item">
      {content}
    </li>
  );
}
