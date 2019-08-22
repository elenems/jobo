import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { UserContext } from "../../contexts/UserContext";
import Popup from "../../components/Popup";

export default function UserInfo(props) {
  const userContext = useContext(UserContext);
  const [message, setMessage] = useState("");
  const [user, setUser] = useState({
    firstName: "",
    location: "",
    lastName: "",
    phone: "",
    email: "",
    signUpDate: ""
  });
  const [initUser, setInitUser] = useState({});
  const [editable, setEditable] = useState(false);

  const style = props.style;
  const isLight = props.isLight;

  let buttonStyle = isLight === true ? "styled-button" : "styled-button-dark";
  useEffect(() => {
    if (userContext.user.email) {
      axios
        .get(`/getUser?email=${userContext.user.email}`)
        .then(data => {
          setUser(data.data);
          setInitUser(data.data);
        })
        .catch(e => {});
    }
  }, [userContext.user.email]);

  const handleChange = e => {
    setUser({
      ...user,
      [e.target.id]: e.target.value
    });
  };

  const allowEdit = e => {
    e.preventDefault();
    setEditable(true);
  };

  const cancelEdit = e => {
    e.preventDefault();
    setUser({
      ...initUser
    });
    setEditable(false);
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .post("/changeUserInfo", user)
      .then(() => {
        setEditable(false);
        setInitUser({
          ...user
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
    ? {
        borderBottom: "2px solid #1cc7e4",
        borderColor: style.accent,
        color: style.text
      }
    : {
        borderBottom: "2px solid white",
        corderColor: style.accent,
        color: style.text
      };

  return (
    <div style={{ color: style.text }}>
      <Popup visible={!!message.length} message={message} />
      <h2>Info</h2>
      <form className="profile-form">
        <div>
          <label htmlFor="firstName">Firstname:</label>
          <input
            onChange={handleChange}
            disabled={editable ? "" : "disabled"}
            style={inputStyle}
            id="firstName"
            type="text"
            value={user.firstName}
          />
        </div>
        <div>
          <label htmlFor="lastName">Lastname:</label>
          <input
            onChange={handleChange}
            disabled={editable ? "" : "disabled"}
            style={inputStyle}
            id="lastName"
            type="text"
            value={user.lastName}
          />
        </div>
        <div>
          <label htmlFor="location">Location:</label>
          <input
            id="location"
            onChange={handleChange}
            disabled={editable ? "" : "disabled"}
            style={inputStyle}
            type="text"
            value={user.location}
          />
        </div>
        <div>
          <label htmlFor="phone">Phone:</label>
          <input
            id="phone"
            onChange={handleChange}
            disabled={editable ? "" : "disabled"}
            style={inputStyle}
            type="number"
            value={user.phone}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            style={{ color: style.text }}
            id="email"
            disabled
            type="text"
            value={user.email}
          />
        </div>
        <div>
          <label htmlFor="signUpDate">Signup date:</label>
          <input
            style={{ color: style.text }}
            id="signUpDate"
            disabled
            type="text"
            value={user.signUpDate}
          />
        </div>
        {buttons}
      </form>
    </div>
  );
}
