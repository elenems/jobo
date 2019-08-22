import React, { Component } from "react";
import Header from "../layout/header/Header";
import Footer from "../layout/footer/Footer";
import HomeBody from "../layout/homeBody/HomeBody";
export default class Home extends Component {
  render() {
    return (
      <React.Fragment>
        <Header {...this.props} />
        <HomeBody {...this.props} />
        <Footer />
      </React.Fragment>
    );
  }
}
