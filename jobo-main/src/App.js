import React, { useContext } from "react";
import { UserContext } from "./contexts/UserContext";
import { Route, Switch, Redirect } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import JobPage from "./pages/JobPage";
import JobList from "./pages/JobList";
import CompanyDetails from "./pages/CompanyDetails";
import Profile from "./pages/Profile";
import ComparingList from "./pages/ComparingList";
import CreateCompany from "./pages/CreateCompany";
import CreateJob from "./pages/CreateJob";
import axios from "axios";
import jwtDecode from "jwt-decode";
import ThemeContextProvider from "./contexts/ThemeContext";

axios.defaults.baseURL =
  "https://europe-west1-jobo-745da.cloudfunctions.net/api";

function App() {
  const user = useContext(UserContext);
  const token = localStorage.getItem("token");
  if (!localStorage.getItem("theme")) {
    localStorage.setItem("theme", "light");
  }

  let isAuthenticated = false;
  let decodedToken = null;
  if (token) {
    decodedToken = jwtDecode(token);
    if (decodedToken.email) {
      if (decodedToken.exp * 1000 < Date.now()) {
        user.unauthenticateUser();
        isAuthenticated = false;
      }
      isAuthenticated = true;
    }
  }

  if (!user.user.isAuthenticated && token) {
    user.authenticateUser(decodedToken.email);
    isAuthenticated = true;
  }

  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/job/:id" component={JobPage} />
        <Route exact path="/joblist" component={JobList} />
        <Route exact path="/company/:id" component={CompanyDetails} />
        <Route exact path="/comparingList" component={ComparingList} />

        <Route
          exact
          path="/login"
          render={props =>
            isAuthenticated ? <Redirect to="/" /> : <Login {...props} />
          }
        />

        <Route
          exact
          path="/profile/company/createCompany"
          render={props =>
            !isAuthenticated ? (
              <Redirect to="/login" />
            ) : (
              <CreateCompany {...props} />
            )
          }
        />

        <Route
          exact
          path="/addJob"
          render={props =>
            !isAuthenticated ? (
              <Redirect to="/login" />
            ) : (
              <CreateJob {...props} />
            )
          }
        />

        <Route
          exact
          path="/profile/:page"
          render={props =>
            !isAuthenticated ? (
              <Redirect to="/login" />
            ) : (
              <ThemeContextProvider>
                <Profile {...props} />
              </ThemeContextProvider>
            )
          }
        />

        <Route
          exact
          path="/register"
          render={props =>
            isAuthenticated ? <Redirect to="/" /> : <Register {...props} />
          }
        />
      </Switch>
    </div>
  );
}

export default App;
