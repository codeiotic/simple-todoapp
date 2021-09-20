import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Main from "./components/Main";
import LogIn from "./components/Login";
import SignUp from "./components/SignUp";
import Home from "./components/Home";
import Header from "./components/Header";
import { useEffect, useState } from "react";
import { supabase } from "./db/supabaseClient";
import { AuthChangeEvent, Session } from "@supabase/gotrue-js";
import UserContext, { UserContextInterface } from "./hooks/userContext";
import Settings from "./components/Settings";

const App = (): JSX.Element => {
  const [userState, setUserState] = useState({});

  useEffect((): (() => void) => {
    setUserState({
      user: supabase.auth.session(),
    });

    let authSubscription = supabase.auth.onAuthStateChange(
      (_event: AuthChangeEvent, session: Session): void => {
        setUserState({
          user: session,
        });
      }
    );

    return (): void => {
      authSubscription.data.unsubscribe();
    };
  }, []);

  return (
    <UserContext.Provider value={{ user: userState, setUser: setUserState }}>
      <UserContext.Consumer>
        {({ user }: UserContextInterface): JSX.Element => {
          return (
            <Router>
              <Header />
              <Switch>
                <Route path="/" exact>
                  <Home />
                </Route>
                <Route path="/settings" exact>
                  <Settings />
                </Route>
                <Route path="/home" exact>
                  <Main />
                </Route>
                <Route path="/sign-up" exact>
                  <SignUp />
                </Route>
                <Route path="/login" exact>
                  <LogIn />
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
