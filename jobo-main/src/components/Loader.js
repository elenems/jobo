import React from "react";
import LoaderSVG from "../assets/images/loader.svg";
export default function Loader(props) {
  let styling = {};
  if (props.height) {
    styling = { height: props.height };
  }
  return (
    <div style={styling} className="loader-container">
      <img src={LoaderSVG} alt="Loading..." />
    </div>
  );
}
