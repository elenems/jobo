import React, { useState, useContext, useEffect } from "react";
import { IoIosSearch } from "react-icons/io";
import Select from "react-select";
import { UserContext } from "../../../../contexts/UserContext";

const options = [
  { value: "All", label: "All" },
  { value: "Kyiv", label: "Kyiv" },
  { value: "Lviv", label: "Lviv" },
  { value: "Kharkiv", label: "Kharkiv" },
  { value: "Odesa", label: "Odesa" },
  { value: "Dnipro", label: "Dnipro" }
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
    const borderLeft = "none";
    const height = "100%";
    const width = "170px";

    return {
      ...provided,
      borderRadius,
      borderColor,
      borderLeft,
      height,
      width,
      boxShadow,
      ":hover": { borderColor: "#1cc7e4" }
    };
  },
  menu: (provided, state) => ({
    ...provided,
    borderRadius: "0px",
    top: "50px"
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

export default function SearchBar(props) {
  const auth = useContext(UserContext);
  const userSearchLocation = auth.user.jobLocationSearch.length
    ? auth.user.jobLocationSearch
    : "All";
  const [selectedLocation, setSelectedLocation] = useState({
    value: userSearchLocation,
    label: userSearchLocation
  });
  const [jobTitle, setJobTitle] = useState(auth.user.jobTitleSearch);

  useEffect(() => {
    const search = props.location.search;
    if (search.match(/title/)) {
      const title = search.match(/title=\w+/)[0];
      setJobTitle(title.slice(6));
    }
    if (search.match(/location/)) {
      let location = search.match(/location=\w+/)[0];
      location = location.slice(9);
      setSelectedLocation({
        value: location,
        label: location
      });
    }
  }, [props.location.search]);

  const handleChange = option => {
    setSelectedLocation(option);
  };
  const handleSubmit = e => {
    e.preventDefault();
    let url = "/jobList";
    let search = props.location.search;
    if (!search.length) {
      url += `?location=${selectedLocation.value}`;
      if (jobTitle) {
        url += `&title=${jobTitle}`;
      }
    } else {
      let search = props.location.search;
      if (jobTitle && search.match(/title/)) {
        search = search.replace(/title=\w+/, "title=" + jobTitle);
      } else {
        if (jobTitle) {
          search += "&title=" + jobTitle;
        } else {
          search = search.replace(/[?&]title=\w+/, "");
        }
      }
      if (search.match(/location/)) {
        let sign = search[0] === "?" ? "&" : "?";
        if (search.slice(1, 9) === "location") {
          sign = "?";
        }
        search = search.replace(
          /[?&]location=\w+/,
          sign + "location=" + selectedLocation.value
        );
      } else {
        let sign = "?";
        if (search.length) {
          sign = "&";
        }
        if (search.match(/title/)) {
          sign = "&";
        }
        search += sign + "location=" + selectedLocation.value;
      }

      url += search;
    }
    auth.setJobTitleSearch(jobTitle);
    auth.setJobLocationSearch(selectedLocation.value);
    props.history.push(url);
  };

  const handleInputChange = e => {
    setJobTitle(e.target.value);
  };

  return (
    <div className="search-bar">
      <form>
        <button title="search" onClick={handleSubmit}>
          <IoIosSearch />
        </button>
        <input
          onChange={handleInputChange}
          value={jobTitle}
          type="text"
          placeholder="Job title"
        />
        <Select
          value={selectedLocation}
          onChange={handleChange}
          options={options}
          styles={selectStyles}
        />
      </form>
    </div>
  );
}
