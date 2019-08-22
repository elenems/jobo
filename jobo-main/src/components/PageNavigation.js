import React, { Component } from "react";

export default class PageNavigation extends Component {
  moveNext = () => {
    const search = this.props.location.search;
    let url = search;
    if (search.match(/page/)) {
      const pageToMove = parseInt(search.match(/page=\d+/)[0].slice(5)) + 1;
      if (pageToMove <= Math.ceil(this.props.jobsLength / 5)) {
        url = url.replace(/page=\d+/, "page=" + pageToMove);
        this.props.history.push(url);
      }
    } else {
      if (!url.length) {
        url += "/jobList?page=2";
      } else {
        url += "&page=2";
      }

      this.props.history.push(url);
    }
  };

  movePrev = () => {
    const search = this.props.location.search;
    let url = search;
    if (search.match(/page/)) {
      const pageToMove = parseInt(search.match(/page=\d+/)[0].slice(5)) - 1;
      if (pageToMove > 0) {
        url = url.replace(/page=\d+/, "page=" + pageToMove);
        this.props.history.push(url);
      }
    }
  };

  render() {
    const search = this.props.location.search;
    const numOfPages = Math.ceil(this.props.jobsLength / 5);
    const page = search.match(/page=\d+/)
      ? search.match(/page=\d+/)[0].slice(5)
      : 1;

    const prevStyle =
      parseInt(page) === 1
        ? { display: "none" }
        : { display: "inline-block", marginRight: "10px" };
    const nextStyle =
      parseInt(page) === numOfPages
        ? { display: "none" }
        : { display: "inline-block", marginLeft: "10px" };
    return (
      <div className="page-navigation">
        <button
          style={prevStyle}
          onClick={this.movePrev}
          className="styled-button"
        >
          Previous
        </button>
        <span>
          Page {page} of {numOfPages}
        </span>
        <button
          style={nextStyle}
          onClick={this.moveNext}
          className="styled-button"
        >
          Next
        </button>
      </div>
    );
  }
}
