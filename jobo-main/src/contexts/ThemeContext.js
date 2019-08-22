import React, { Component, createContext } from "react";

export const ThemeContext = createContext();

class ThemeContextProvider extends Component {
  state = {
    lightTheme: {
      text: "#000",
      background: "#fff",
      accent: "#1cc7e4"
    },
    darkTheme: {
      text: "#fff",
      background: "#251f1f",
      accent: "#da3f3f"
    },
    isLightTheme: localStorage.getItem("theme") === "light" ? true : false
  };

  toggleTheme = () => {
    if (localStorage.getItem("theme") === "dark") {
      if (document.getElementById("companyDescription")) {
        document.getElementById("companyDescription").classList.remove("red");
        document.getElementById("companyDescription").classList.add("blue");
      }
      localStorage.setItem("theme", "light");
      this.setState({
        isLightTheme: true
      });
    } else {
      if (document.getElementById("companyDescription")) {
        document.getElementById("companyDescription").classList.remove("blue");
        document.getElementById("companyDescription").classList.add("red");
      }

      localStorage.setItem("theme", "dark");
      this.setState({
        isLightTheme: false
      });
    }
  };

  render() {
    return (
      <ThemeContext.Provider
        value={{ toggleTheme: this.toggleTheme, theme: this.state }}
      >
        {this.props.children}
      </ThemeContext.Provider>
    );
  }
}

export default ThemeContextProvider;
