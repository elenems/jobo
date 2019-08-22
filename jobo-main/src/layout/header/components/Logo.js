import React from "react";
import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <div>
      <h1>
        <Link to="/">
          Jo<span className="accent-text">Bo</span>
        </Link>
      </h1>
    </div>
  );
}
