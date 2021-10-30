import { Divider, Switch, TextField } from "@material-ui/core";
import { motion } from "framer-motion";
import {
  ChangeEvent,
  FC,
  FormEvent,
  useContext,
  useEffect,
  useState,
} from "react";
import Loader from "react-loader-spinner";
import { Link, useHistory } from "react-router-dom";
import UserContext from "../hooks/userContext";
import SignUpStyles from "../styles/SignUp";
import {
  exitAnimations,
  initialAnimations,
  pageLoadAnimations,
  pageToPageTransition,
} from "../utils";
import { Button, Error } from ".";
import { validateForm } from "../utils";
import { useSnackbar } from "notistack";
import {
  createUserWithEmailAndPassword,
  User,
  UserCredential,
} from "firebase/auth";
import { auth } from "../db/firebase";

const SignUp: FC = () => {
  const [checked, setChecked] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  let location = useHistory();
  const User: User = useContext(UserContext);
  const classNames = SignUpStyles();
  const { enqueueSnackbar } = useSnackbar();

  const onFormSubmit = (e: FormEvent): void => {
    setError("");
    e.preventDefault();
    setLoading(true);
    let validate = validateForm({
      email,
      password,
    });
    validate.then((res) => {
      if (res.err) {
        setError(res.err);
      } else if (res.value) {
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential: UserCredential) => {
            const user: User = userCredential.user;
            console.log(user);
            enqueueSnackbar("Successfully logged in", { variant: "success" });
          })
          .catch((err) => {
            console.log(err);
          });
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
              <h1 className={classNames.heading}>Sign Up</h1>
              <Divider className={classNames.divider} />
              <form className={classNames.form} onSubmit={onFormSubmit}>
                <TextField
                  className={classNames.emailInput}
                  type="email"
                  variant="filled"
                  size="medium"
                  label="Email"
                  autoComplete="off"
                  onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                    setEmail(e.target.value)
                  }
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
                  onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                    setPassword(e.target.value)
                  }
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
                      "Sign Up"
                    )}
                  </Button>
                  <Button
                    variantType="secondary"
                    type="button"
                    variant="outlined"
                    onClick={() => {
                      setPassword("");
                      setEmail("");
                      setError("");
                    }}
                    size="large"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
              <p className={classNames.signUp}>
                Already have an account?{" "}
                <Link to="/login" className={classNames.signUpLink}>
                  Log In
                </Link>
              </p>
            </div>
          );
        }}
      </UserContext.Consumer>
    </motion.div>
  );
};

export default SignUp;
