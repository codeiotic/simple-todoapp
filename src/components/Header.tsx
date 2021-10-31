import { useSnackbar } from "notistack";
import { FC, useContext, useState } from "react";
import Loader from "react-loader-spinner";
import { Link } from "react-router-dom";
import { Button } from ".";
import { signOut, User } from "firebase/auth";
import UserContext from "../hooks/userContext";
import HeaderStyles from "../styles/Header";
import { auth } from "../db/firebase";

const Header: FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const classNames = HeaderStyles();
  const { enqueueSnackbar } = useSnackbar();
  const user: User = useContext(UserContext);

  const signOutUser: () => Promise<void> = async (): Promise<void> => {
    setLoading(true);
    signOut(auth)
      .then(() => {
        enqueueSnackbar("Successfully logged out", { variant: "success" });
      })
      .catch((error) => {
        enqueueSnackbar(error.message, { variant: "error" });
      });
    setLoading(false);
  };

  return (
    <UserContext.Consumer>
      {(): JSX.Element => (
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
              {user ? (
                <>
                  <Link to="/login" className={classNames.links}>
                    <Button
                      variant="contained"
                      type="submit"
                      variantType="primary"
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
                  </Link>
                  <Link to="/home" className={classNames.links}>
                    <Button variant="outlined" variantType="secondary">
                      Home
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/sign-up" className={classNames.links}>
                    <Button variantType="primary" variant="contained">
                      Sign Up
                    </Button>
                  </Link>
                  <Link to="/login" className={classNames.links}>
                    <Button variantType="secondary" variant="outlined">
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
