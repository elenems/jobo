import React, { Component } from "react";
import Header from "../layout/header/Header";
import { Route } from "react-router-dom";
import ProfileNav from "../layout/profileNav/ProfileNav";
import UserInfo from "./profilePages/UserInfo";
import UserCompany from "./profilePages/UserCompany";
import { ThemeContext } from "../contexts/ThemeContext";
import UserFavourites from "./profilePages/UserFavourites";

class Profile extends Component {
  toggleTheme = () => {
    this.props.theme.toggleTheme();
  };

  render() {
    const style = this.props.theme.theme.isLightTheme
      ? this.props.theme.theme.lightTheme
      : this.props.theme.theme.darkTheme;

    return (
      <div
        className="profile-page"
        style={{ backgroundColor: style.background }}
      >
        <Header {...this.props} />
        <ProfileNav
          theme={this.props.theme.theme}
          toggleTheme={this.toggleTheme}
        />
        <section style={{ minHeight: "450px" }}>
          <Route
            path="/profile/info"
            render={props => (
              <UserInfo
                {...props}
                isLight={this.props.theme.theme.isLightTheme}
                style={style}
              />
            )}
          />
          <Route
            path="/profile/favourites"
            render={props => (
              <UserFavourites
                isLight={this.props.theme.theme.isLightTheme}
                {...props}
                style={style}
              />
            )}
          />
          <Route
            path="/profile/company"
            render={props => (
              <UserCompany
                isLight={this.props.theme.theme.isLightTheme}
                {...props}
                style={style}
              />
            )}
          />
        </section>
      </div>
    );
  }
}

export default React.forwardRef((props, ref) => (
  <ThemeContext.Consumer>
    {theme => <Profile {...props} theme={theme} ref={ref} />}
  </ThemeContext.Consumer>
));
