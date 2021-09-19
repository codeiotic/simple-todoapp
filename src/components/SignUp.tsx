import { Button, Divider, Switch, TextField } from "@material-ui/core";
import { useSnackbar } from "notistack";
import { ChangeEvent, MouseEvent, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../db/supabaseClient";
import SignUpStyles from "../styles/SignUp";

const SignUp = (): JSX.Element => {
  const classNames = SignUpStyles();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [checked, setChecked] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const { enqueueSnackbar } = useSnackbar();

  const signUpUser = async (e: MouseEvent): Promise<void> => {
    e.preventDefault();
    try {
      setLoading(true);
      const { user, session, error } = await supabase.auth.signUp({
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
      setLoading(false);
    }
  };

  const clear = (): void => {
    setEmail("");
    setPassword("");
    setChecked(false);
  };

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
            Sign Up
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
};

export default SignUp;
