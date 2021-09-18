import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Main from "./components/Main";
import LogIn from "./components/Login";
import SignUp from "./components/SignUp";
import Home from "./components/Home";
import Header from "./components/Header";

const App = (): JSX.Element => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/sign-up">
          <SignUp />
        </Route>
        <Route path="/login">
          <LogIn />
        </Route>
        <Route path="/home">
          <Main />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
