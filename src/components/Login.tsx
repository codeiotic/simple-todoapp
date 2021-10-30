import { Divider, Switch, TextField } from "@material-ui/core";
import {
  ChangeEvent,
  FC,
  FormEvent,
  useContext,
  useEffect,
  useState,
} from "react";
import { Link } from "react-router-dom";
import LogInStyles from "../styles/Login";
import { useHistory } from "react-router-dom";
import Loader from "react-loader-spinner";
import UserContext from "../hooks/userContext";
import { motion } from "framer-motion";
import {
  exitAnimations,
  initialAnimations,
  pageLoadAnimations,
  pageToPageTransition,
} from "../utils";
import { Button, Error } from ".";
import { validateForm } from "../utils";
import { useSnackbar } from "notistack";
import { signInWithEmailAndPassword, UserCredential } from "firebase/auth";
import { auth } from "../db/firebase";

const LogIn: FC = () => {
  const classNames = LogInStyles();
  const [checked, setChecked] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  let location = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const User = useContext(UserContext);

  const onFormSubmit = (e: FormEvent): void => {
    setError("");
    e.preventDefault();
    setLoading(true);
    let foo = validateForm({
      email,
      password,
    });
    foo.then((h) => {
      if (h.err) {
        setError(h.err);
      } else if (h.value) {
        signInWithEmailAndPassword(auth, email, password)
          .then((user: UserCredential) => {
            console.log(user);
            enqueueSnackbar("Successfully Logged In", { variant: "success" });
          })
          .catch((error) =>
            enqueueSnackbar(error.message, { variant: "error" })
          );
      }
    });
    setLoading(false);
  };

  useEffect((): void => {
    if (User) {
      location.push("/home");
    }
  }, [User, location]);

  return (
    <motion.div
      exit={exitAnimations}
      initial={initialAnimations}
      animate={pageLoadAnimations}
      transition={pageToPageTransition}
    >
      <UserContext.Consumer>
        {(): JSX.Element => {
          return (
            <div className={classNames.parent}>
              <h1 className={classNames.heading}>Log In</h1>
              <Divider className={classNames.divider} />
              <form className={classNames.form} onSubmit={onFormSubmit}>
                <TextField
                  className={classNames.emailInput}
                  type="email"
                  variant="filled"
                  size="medium"
                  label="Email"
                  autoComplete="off"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  fullWidth
                  required
                />
                <TextField
                  className={classNames.passwordInput}
                  type={checked ? "text" : "password"}
                  variant="filled"
                  size="medium"
                  label="Password"
                  autoComplete="off"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  required
                  fullWidth
                />
                <p className={classNames.showPwd}>Show password</p>
                <Switch
                  size="small"
                  className={classNames.switch}
                  checked={checked}
                  onChange={(
                    _: ChangeEvent<HTMLInputElement>,
                    checked: boolean
                  ): void => setChecked(checked)}
                />
                {error ? <Error message={error.toString().slice(17)} /> : null}
                <Divider className={classNames.buttonDivider} />
                <div className={classNames.buttons}>
                  <Button
                    variant="contained"
                    type="submit"
                    variantType="primary"
                    size="large"
                  >
                    {loading ? (
                      <Loader
                        type="Oval"
                        color="#002233"
                        height="24"
                        width="42"
                      />
                    ) : (
                      "Login"
                    )}
                  </Button>
                  <Button
                    variantType="secondary"
                    type="button"
                    variant="outlined"
                    onClick={(): void => {
                      setEmail("");
                      setPassword("");
                      setError("");
                    }}
                    size="large"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
              <p className={classNames.signUp}>
                Don't have an account?{" "}
                <Link to="/sign-up" className={classNames.signUpLink}>
                  Sign Up
                </Link>
              </p>
            </div>
          );
        }}
      </UserContext.Consumer>
    </motion.div>
  );
};

export default LogIn;
