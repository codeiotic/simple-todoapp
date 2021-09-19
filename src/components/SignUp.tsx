import { Button, Divider, Switch, TextField } from "@material-ui/core";
import { useSnackbar } from "notistack";
import { ChangeEvent, MouseEvent, useState } from "react";
import Loader from "react-loader-spinner";
import { Link, useHistory } from "react-router-dom";
import { supabase } from "../db/supabaseClient";
import UserContext, { UserContextInterface } from "../hooks/userContext";
import SignUpStyles from "../styles/SignUp";

const SignUp = (): JSX.Element => {
  const classNames = SignUpStyles();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [checked, setChecked] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const location = useHistory();

  const { enqueueSnackbar } = useSnackbar();

  const signUpUser = async (e: MouseEvent): Promise<void> => {
    e.preventDefault();
    try {
      setLoading(true);
      const { error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });
      if (error) {
        enqueueSnackbar(error.message);
      }
      enqueueSnackbar("Check your email for magic link!");
    } catch (error) {
      console.log(error.message);
    } finally {
      location.push("/home");
      setLoading(false);
    }
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
            <h1 className={classNames.heading}>Sign Up</h1>
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
                onChange={(e) => setEmail(e.target.value)}
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
                  onClick={signUpUser}
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
              Already have an account? <Link to="/login">Log In</Link>
            </p>
          </div>
        );
      }}
    </UserContext.Consumer>
  );
};

export default SignUp;
