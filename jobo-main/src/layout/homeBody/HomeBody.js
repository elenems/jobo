import React, { Component } from "react";
import CategoryList from "./components/CategoryList/CategoryList";
import CompanyList from "./components/CompanyList/CompanyList";
import LocationList from "./components/LocationList/LocationList";

export default class HomeBody extends Component {
  render() {
    return (
      <div className="home-body">
        <section>
          <h2>Search by categories</h2>
          <CategoryList {...this.props} />
        </section>
        <section>
          <h2>Search by locations</h2>
          <LocationList {...this.props} />
        </section>
        <section>
          <h2>Companies</h2>
          <CompanyList {...this.props} />
        </section>
      </div>
    );
  }
}
