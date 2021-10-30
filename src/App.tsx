import { Switch, Route, useLocation } from "react-router-dom";
import { FC, useEffect, useState } from "react";
import UserContext from "./hooks/userContext";
import { AnimatePresence } from "framer-motion";
import { Header, Home, LogIn, Main, Settings, SignUp } from "./components";
import { auth } from "./db/firebase";
import { onAuthStateChanged, User, Unsubscribe } from "firebase/auth";

const App: FC = () => {
  const [user, setUser] = useState<User | null>(null);
  let location = useLocation();

  useEffect(() => {
    let unsubscibe: Unsubscribe = onAuthStateChanged(auth, (user: User) => {
      if (user) {
        setUser(user);
      }
    });

    return unsubscibe;
  }, []);

  return (
    <UserContext.Provider value={user}>
      <UserContext.Consumer>
        {(): JSX.Element => {
          return (
            <>
              <Header />
              <AnimatePresence exitBeforeEnter>
                <Switch location={location} key={location.pathname}>
                  <Route path="/" exact component={Home} />
                  <Route path="/settings" exact component={Settings} />
                  <Route path="/home" exact component={Main} />
                  <Route path="/sign-up" exact component={SignUp} />
                  <Route path="/login" exact component={LogIn} />
                </Switch>
              </AnimatePresence>
            </>
          );
        }}
      </UserContext.Consumer>
    </UserContext.Provider>
  );
};

export default App;
