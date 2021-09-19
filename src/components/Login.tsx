import { Button, Divider, Switch, TextField } from "@material-ui/core";
import { useSnackbar } from "notistack";
import { ChangeEvent, MouseEvent, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../db/supabaseClient";
import LogInStyles from "../styles/Login";
import { useHistory } from "react-router-dom";
import Loader from "react-loader-spinner";
import UserContext, { UserContextInterface } from "../hooks/userContext";

const LogIn = (): JSX.Element => {
  const classNames = LogInStyles();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [checked, setChecked] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  let location = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  const logInUser = async (e: MouseEvent): Promise<void> => {
    e.preventDefault();
    setLoading(true);
    let { error, user } = await supabase.auth.signIn({
      email,
      password,
    });
    if (error) {
      enqueueSnackbar(error.message, { variant: "error" });
    }
    enqueueSnackbar("Logged in as " + user.email, { variant: "success" });
    setLoading(false);
    location.push("/home");
  };

  const clear = (): void => {
    setEmail("");
    setPassword("");
    setChecked(false);
  };

  return (
    <UserContext.Consumer>
      {({ user }: UserContextInterface): JSX.Element => {
        if (user && user !== {}) {
          location.goBack();
        }
        return (
          <div className={classNames.parent}>
            <h1 className={classNames.heading}>Log In</h1>
            <Divider className={classNames.divider} />
            <form className={classNames.form}>
              <TextField
                className={classNames.emailInput}
                type="email"
                variant="filled"
                size="small"
                label="Email"
                fullWidth
                required
                value={email}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>): void =>
                  setEmail(e.target.value)
                }
              />
              <TextField
                className={classNames.passwordInput}
                type={checked ? "text" : "password"}
                variant="filled"
                size="small"
                label="Password"
                required
                fullWidth
                value={password}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>): void =>
                  setPassword(e.target.value)
                }
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
              <Divider className={classNames.divider} />
              <div className={classNames.buttons}>
                <Button
                  variant="contained"
                  type="submit"
                  className={classNames.primaryButton}
                  onClick={logInUser}
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
                  variant="outlined"
                  type="button"
                  className={classNames.secondaryButton}
                  onClick={clear}
                >
                  Cancel
                </Button>
              </div>
            </form>
            <p className={classNames.signUpLink}>
              Don't have an account? <Link to="/sign-up">Sign Up</Link>
            </p>
          </div>
        );
      }}
    </UserContext.Consumer>
  );
};

export default LogIn;
