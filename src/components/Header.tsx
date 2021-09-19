import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import HeaderStyles from "../styles/Header";

const Header = () => {
  const classNames = HeaderStyles();
  return (
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
        </div>
      </nav>
    </header>
  );
};

export default Header;
