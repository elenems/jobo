import React from "react";

export default function Modal(props) {
  let modalStyle = {};
  props.show
    ? (modalStyle = { display: "block" })
    : (modalStyle = { display: "none" });
  return (
    <div style={modalStyle} className="modal">
      <h4>{props.title}</h4>
      <button className="styled-button" onClick={props.confirm}>
        Confirm
      </button>
      <button className="styled-button" onClick={props.cancel}>
        Cancel
      </button>
    </div>
  );
}
