import { Button } from "@material-ui/core";
import { useSnackbar } from "notistack";
import { useState } from "react";
import Loader from "react-loader-spinner";
import { Link, useHistory } from "react-router-dom";
import { supabase } from "../db/supabaseClient";
import UserContext, { UserContextInterface } from "../hooks/userContext";
import HeaderStyles from "../styles/Header";

const Header = (): JSX.Element => {
  const [loading, setLoading] = useState<boolean>(false);
  const classNames = HeaderStyles();
  const { enqueueSnackbar } = useSnackbar();
  const location = useHistory();

  const signOutUser = async (): Promise<void> => {
    setLoading(true);
    let { error } = await supabase.auth.signOut();
    if (error) {
      enqueueSnackbar(error.message);
    }
    setLoading(false);
    location.push("/");
  };

  return (
    <UserContext.Consumer>
      {({ user }: UserContextInterface): JSX.Element => (
        <header className={classNames.header}>
          <div className={classNames.imgParent}>
            <Link to="/">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
                alt="React Logo"
                className={classNames.img}
              />
            </Link>
          </div>
          <nav>
            <div className={classNames.linkParent}>
              {user && user !== {} ? (
                <>
                  <Button
                    variant="contained"
                    className={classNames.primaryBtn}
                    style={{
                      backgroundColor: "#2acafe",
                      height: "2.1rem",
                    }}
                    onClick={signOutUser}
                  >
                    {loading ? (
                      <Loader
                        type="Oval"
                        color="#002233"
                        height="24"
                        width="42"
                      />
                    ) : (
                      "Sign Out"
                    )}
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/sign-up" className={classNames.links}>
                    <Button
                      variant="contained"
                      style={{
                        backgroundColor: "#2acafe",
                        height: "2.1rem",
                      }}
                      className={classNames.primaryBtn}
                    >
                      Sign Up
                    </Button>
                  </Link>
                  <Link to="/login" className={classNames.links}>
                    <Button
                      variant="outlined"
                      style={{
                        border: "1px solid white",
                        height: "2.1rem",
                      }}
                    >
                      LogIn
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </nav>
        </header>
      )}
    </UserContext.Consumer>
  );
};

export default Header;
