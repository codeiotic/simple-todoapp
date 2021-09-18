import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import App from "./App";
import LogIn from "./components/Login";
import SignUp from "./components/SignUp";
import Home from "./components/Home";

const Main = (): JSX.Element => {
  return (
    <Router>
      <Switch>
        <Route path="/signUp">
          <SignUp />
        </Route>
        <Route path="/login">
          <LogIn />
        </Route>
        <Route path="/home">
          <App />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
};

export default Main;
