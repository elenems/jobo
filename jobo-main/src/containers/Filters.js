import React, { Component } from "react";
import Select from "react-select";
import { UserContext } from "../contexts/UserContext";

const options = [
  { value: "old", label: "Sort by oldest" },
  { value: "new", label: "Sort by newest" }
];

const categoryOptions = [
  { value: "All", label: "All" },
  { value: "IT", label: "IT" },
  { value: "Sport", label: "Sport" },
  { value: "RealEstate", label: "RealEstate" },
  { value: "FoodAndDrinks", label: "FoodAndDrinks" },
  { value: "Science", label: "Science" }
];

const selectStyles = {
  option: (provided, state) => ({
    ...provided,
    borderTop: "1px solid #1cc7e4",
    color: state.isSelected ? "#1cc7e4" : "black",
    padding: 10,
    background: "#fff"
  }),
  control: (provided, state) => {
    const boxShadow = "none";
    const borderRadius = "0px";
    const borderColor = "#1cc7e4";
    const height = "100%";
    const width = "170px";

    return {
      ...provided,
      borderRadius,
      borderColor,
      height,
      width,
      boxShadow,
      ":hover": { borderColor: "#1cc7e4" }
    };
  },
  menu: (provided, state) => ({
    ...provided,
    borderRadius: "0px",
    top: "30px"
  }),
  menuList: (provided, state) => ({
    ...provided,
    border: "1px solid #1cc7e4",
    padding: "0px",
    borderTop: "0px"
  }),
  indicatorSeparator: (provided, state) => {
    const backgroundColor = "#1cc7e4";
    return { ...provided, backgroundColor };
  },
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = "opacity 300ms";

    return { ...provided, opacity, transition };
  }
};

class Filters extends Component {
  state = {
    sort: {
      value: "new",
      label: "Sort by newest"
    },
    category: {
      value: "All",
      label: "All categories"
    }
  };

  handleChange = option => {
    this.setState({
      sort: option
    });
  };

  handleCategoryChange = option => {
    this.setState({
      category: option
    });
  };

  applyFilters = () => {
    const category = this.state.category.value;
    const sort = this.state.sort.value;
    let search = this.props.location.search;
    let url = search ? search : "";
    let sign = search ? "&" : "?";

    if (!search.match("category")) {
      url += `${sign}category=${category}`;
      sign = "&";
    } else {
      url = url.replace(/category=\w+/, "category=" + category);
      sign = "&";
    }

    if (!search.match("sort")) {
      url += `${sign}sort=${sort}`;
      sign = "&";
    } else {
      url = url.replace(/sort=\w+/, "sort=" + sort);
      sign = "&";
    }

    this.props.history.push("/joblist" + url);
  };

  componentDidMount() {
    const search = this.props.location.search;
    if (search.match(/category/)) {
      const category = search.match(/category=\w+/)[0].slice(9);
      this.setState({
        category: {
          value: category,
          label: category
        }
      });
    }

    if (search.match(/sort/)) {
      const sort = search.match(/sort=\w+/)[0].slice(5);
      const sortLabel = sort === "new" ? "Sort by newest" : "Sort by oldest";
      this.setState({
        sort: {
          value: sort,
          label: sortLabel
        }
      });
    }
  }

  render() {
    return (
      <div>
        <div className="filter-container">
          <Select
            value={this.state.sort}
            onChange={this.handleChange}
            options={options}
            styles={selectStyles}
          />
        </div>

        <div className="filter-container">
          <Select
            value={this.state.category}
            onChange={this.handleCategoryChange}
            options={categoryOptions}
            styles={selectStyles}
          />
        </div>

        <div className="filter-container">
          <button onClick={this.applyFilters} className="styled-button">
            Apply
          </button>
        </div>
      </div>
    );
  }
}

export default React.forwardRef((props, ref) => (
  <UserContext.Consumer>
    {user => <Filters {...props} user={user} ref={ref} />}
  </UserContext.Consumer>
));
