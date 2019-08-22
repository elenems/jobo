import React from "react";

export default function Popup(props) {
  let style = props.visible ? { display: "block" } : { display: "none" };
  return (
    <div style={style} className="popup">
      {props.message}
    </div>
  );
}
