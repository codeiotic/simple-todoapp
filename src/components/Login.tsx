import { Divider, Switch, TextField } from "@material-ui/core";
import { useSnackbar } from "notistack";
import { ChangeEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../db/supabaseClient";
import LogInStyles from "../styles/Login";
import { useHistory } from "react-router-dom";
import Loader from "react-loader-spinner";
import UserContext from "../hooks/userContext";
import userActivity from "../db/userActivity";
import {
  UserActivityReturnInterface,
  UserActivityInputInterface,
} from "../db/userActivity";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { motion } from "framer-motion";
import { Button } from "../components/Button";
import {
  exitAnimations,
  initialAnimations,
  pageLoadAnimations,
  pageToPageTransition,
} from "../utils/animations";

const LogIn = (): JSX.Element => {
  const classNames = LogInStyles();
  const [checked, setChecked] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  let location = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const supabaseUser = supabase.auth.user();
  const { reset, handleSubmit, control } =
    useForm<UserActivityInputInterface>();

  const onFormSubmit: SubmitHandler<UserActivityInputInterface> = ({
    email,
    password,
  }: UserActivityInputInterface): void => {
    setLoading(true);
    userActivity({
      email: email,
      password: password,
      type: "login",
      finalCallback: (): void => {
        setLoading(false);
        location.push("/home");
      },
    }).then(({ error, user }: UserActivityReturnInterface): void => {
      if (error) {
        enqueueSnackbar(error.message, { variant: "error" });
      } else {
        enqueueSnackbar("Logged in as " + user.email, { variant: "success" });
      }
    });
  };

  useEffect((): void => {
    if (supabaseUser) {
      location.push("/home");
    }
  }, [supabaseUser, location]);

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
              <form
                className={classNames.form}
                onSubmit={handleSubmit(onFormSubmit)}
              >
                <Controller
                  control={control}
                  name="email"
                  defaultValue=""
                  render={({ field: { onChange, value } }): JSX.Element => (
                    <TextField
                      className={classNames.emailInput}
                      type="email"
                      variant="filled"
                      size="medium"
                      label="Email"
                      autoComplete="off"
                      onChange={onChange}
                      value={value}
                      fullWidth
                      required
                    />
                  )}
                />
                <Controller
                  control={control}
                  name="password"
                  defaultValue=""
                  rules={{
                    required: true,
                  }}
                  render={({ field: { value, onChange } }): JSX.Element => (
                    <TextField
                      className={classNames.passwordInput}
                      type={checked ? "text" : "password"}
                      variant="filled"
                      size="medium"
                      label="Password"
                      autoComplete="off"
                      onChange={onChange}
                      value={value}
                      required
                      fullWidth
                    />
                  )}
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
                    onClick={(): void =>
                      reset({
                        email: "",
                        password: "",
                      })
                    }
                    size="large"
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
    </motion.div>
  );
};

export default LogIn;
