import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Main from "./components/Main";
import LogIn from "./components/Login";
import SignUp from "./components/SignUp";
import Home from "./components/Home";
import Header from "./components/Header";
import { useContext, useEffect, useState } from "react";
import { supabase } from "./db/supabaseClient";
import { AuthChangeEvent, Session } from "@supabase/gotrue-js";
import UserContext, { UserContextInterface } from "./hooks/userContext";

const App = (): JSX.Element => {
  const [userState, setUserState] = useState<UserContextInterface>({
    user: {},
  });

  useEffect((): void => {
    setUserState({
      user: supabase.auth.session(),
    });

    supabase.auth.onAuthStateChange(
      (_event: AuthChangeEvent, session: Session): void => {
        setUserState({
          user: session,
        });
      }
    );
  }, []);

  return (
    <UserContext.Provider value={userState}>
      <UserContext.Consumer>
        {({ user }: UserContextInterface): JSX.Element => {
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
        }}
      </UserContext.Consumer>
    </UserContext.Provider>
  );
};

export default App;
