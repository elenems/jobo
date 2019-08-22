import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { UserContext } from "../../contexts/UserContext";
import Popup from "../../components/Popup";
import Loader from "../../components/Loader";
import LoaderDark from "../../components/LoaderDark";
import CompanyJobs from "../../containers/CompanyJobs";

export default function UserCompany(props) {
  const userContext = useContext(UserContext);
  const style = props.style;
  const [message, setMessage] = useState("");
  const [user, setUser] = useState({
    companyId: ""
  });
  const [company, setCompany] = useState({
    companyName: "",
    companyCategory: "",
    companySite: "",
    companyDescription: ""
  });
  const [loading, setLoading] = useState(true);
  const [initCompany, setInitCompany] = useState({});
  const [editable, setEditable] = useState(false);
  let content = null;

  useEffect(() => {
    if (userContext.user.email) {
      axios
        .get(`/getUser?email=${userContext.user.email}`)
        .then(data => {
          setUser(data.data);
          setLoading(false);
        })
        .catch(e => {
          setLoading(false);
        });
    }
  }, [userContext.user.email]);

  useEffect(() => {
    if (user.companyId) {
      axios
        .get(`/getCompany?id=${user.companyId}`)
        .then(data => {
          setCompany(data.data);
          setInitCompany(data.data);
        })
        .catch(e => {});
    }
  }, [user.companyId]);

  const redirectToForm = () => {
    props.history.push("/profile/company/createCompany");
  };

  const handleChange = e => {
    setCompany({
      ...company,
      [e.target.id]: e.target.value
    });
  };

  const allowEdit = e => {
    e.preventDefault();
    setEditable(true);
  };

  const cancelEdit = e => {
    e.preventDefault();
    setCompany({
      ...initCompany
    });
    setEditable(false);
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .post("/updateCompany", company)
      .then(() => {
        setEditable(false);
        setInitCompany({
          ...company
        });
        setMessage("Info has beed updated successfully");
        setTimeout(() => {
          setMessage("");
        }, 2000);
      })
      .catch(e => {
        setMessage("Error updating an info");
        setTimeout(() => {
          setMessage("");
        }, 2000);
      });
  };

  const isLight = props.isLight;
  let buttonStyle = isLight === true ? "styled-button" : "styled-button-dark";

  const loader = isLight ? (
    <Loader height="100%" />
  ) : (
    <LoaderDark height="100%" />
  );

  const buttons = !editable ? (
    <div>
      <button onClick={allowEdit} className={buttonStyle}>
        Change
      </button>
    </div>
  ) : (
    <div>
      <button onClick={cancelEdit} className={buttonStyle}>
        Cancel
      </button>
      <button
        onClick={handleSubmit}
        style={{ marginLeft: "20px" }}
        className={buttonStyle}
      >
        Update
      </button>
    </div>
  );
  const inputStyle = editable
    ? { borderBottom: `2px solid ${style.accent}`, color: style.text }
    : { borderBottom: `2px solid ${style.background}`, color: style.text };

  const textAreaStyle = editable
    ? {
        border: `2px solid ${style.accent}`,
        minHeight: "200px",
        padding: "6px"
      }
    : {
        border: `2px solid ${style.background}`,
        minHeight: "100px",
        padding: "0px"
      };

  if (!loading) {
    content = !user.companyId ? (
      <div>
        <p style={{ color: style.text }}>
          Create your company for posting jobs.
        </p>
        <button onClick={redirectToForm} className={buttonStyle}>
          Create
        </button>
      </div>
    ) : (
      <div className="company-container" style={{ color: style.text }}>
        <div className="company-details">
          <form className="profile-form">
            <div>
              <label htmlFor="companyName">Company name:</label>
              <input
                onChange={handleChange}
                disabled={editable ? "" : "disabled"}
                style={inputStyle}
                id="companyName"
                type="text"
                value={company.companyName}
              />
            </div>
            <div>
              <label htmlFor="companyCategory">Company category:</label>
              <input
                onChange={handleChange}
                disabled={editable ? "" : "disabled"}
                style={inputStyle}
                id="companyCategory"
                type="text"
                value={company.companyCategory}
              />
            </div>
            <div>
              <label htmlFor="companySite">Website:</label>
              <input
                id="companySite"
                onChange={handleChange}
                disabled={editable ? "" : "disabled"}
                style={inputStyle}
                type="text"
                value={company.companySite}
              />
            </div>
            <div style={{ flexDirection: "column" }}>
              <label htmlFor="companyDescription">Description:</label>
              <textarea
                className={isLight ? "blue" : "red"}
                id="companyDescription"
                onChange={handleChange}
                disabled={editable ? "" : "disabled"}
                style={textAreaStyle}
                value={company.companyDescription}
              />
            </div>
            {buttons}
          </form>
        </div>
        <div className="company-jobs">
          <CompanyJobs contextStyle={style} {...props} company={company} />
        </div>
      </div>
    );
  }

  return (
    <div>
      <Popup visible={!!message.length} message={message} />
      <h2 style={{ color: style.text }}>Company</h2>
      {!loading ? content : loader}
    </div>
  );
}
