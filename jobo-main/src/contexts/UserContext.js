import React, { createContext, useState } from "react";

export const UserContext = createContext();

const UserContextProvider = props => {
  const [user, setUser] = useState({
    isAuthenticated: false,
    jobTitleSearch: "",
    jobLocationSearch: "",
    jobCategorySearch: "All"
  });
  const authenticateUser = email => {
    setUser({
      ...user,
      isAuthenticated: true,
      email
    });
  };

  const unauthenticateUser = () => {
    localStorage.removeItem("token");
    setUser({
      ...user,
      isAuthenticated: false,
      email: ""
    });
  };

  const setJobTitleSearch = val => {
    setUser(Object.assign(user, { jobTitleSearch: val }));
  };

  const setJobCategorySearch = val => {
    setUser(Object.assign(user, { jobCategorySearch: val }));
  };

  const setJobLocationSearch = val => {
    setUser(Object.assign(user, { jobLocationSearch: val }));
  };

  return (
    <UserContext.Provider
      value={{
        user,
        authenticateUser,
        unauthenticateUser,
        setJobLocationSearch,
        setJobTitleSearch,
        setJobCategorySearch
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
