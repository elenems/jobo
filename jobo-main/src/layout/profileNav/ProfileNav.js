import React from "react";
import { NavLink } from "react-router-dom";
import { MdInfoOutline } from "react-icons/md";
import { MdStar } from "react-icons/md";
import { MdAccountBox } from "react-icons/md";
import { IoIosMoon } from "react-icons/io";
import { IoMdSunny } from "react-icons/io";
import { IconContext } from "react-icons";

export default function ProfileNav(props) {
  const isLight = props.theme.isLightTheme ? true : false;
  const style = isLight ? props.theme.lightTheme : props.theme.darkTheme;
  let themeIcon = null;
  let linkClassActive = isLight
    ? "selected-profile-link"
    : "selected-profile-link-dark";
  let linkClass = isLight ? "profile-nav-link" : "profile-nav-link-dark";
  let textColor = isLight ? "light-text" : "dark-text";

  if (isLight) {
    themeIcon = (
      <IconContext.Provider value={{ color: style.accent }}>
        <IoIosMoon />
      </IconContext.Provider>
    );
  } else {
    themeIcon = (
      <IconContext.Provider value={{ color: style.accent }}>
        <IoMdSunny />
      </IconContext.Provider>
    );
  }

  return (
    <nav style={{ borderColor: style.accent }}>
      <ul>
        <li>
          <button
            title="Toggle theme"
            className="clear-button"
            onClick={props.toggleTheme}
            style={{ fontSize: "32px" }}
          >
            {themeIcon}
          </button>
        </li>
        <li>
          <NavLink
            exact
            activeClassName={linkClassActive}
            className={linkClass}
            to="/profile/info"
          >
            <IconContext.Provider value={{ color: style.text }}>
              <MdInfoOutline />
            </IconContext.Provider>{" "}
            <span className={textColor}>Profile</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            exact
            activeClassName={linkClassActive}
            className={linkClass}
            to="/profile/favourites"
          >
            <IconContext.Provider value={{ color: style.text }}>
              <MdStar />
            </IconContext.Provider>{" "}
            <span className={textColor}>Favourites</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            exact
            activeClassName={linkClassActive}
            className={linkClass}
            to="/profile/company"
          >
            <IconContext.Provider value={{ color: style.text }}>
              <MdAccountBox />
            </IconContext.Provider>{" "}
            <span className={textColor}>Company</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
