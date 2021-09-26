import { Divider, Switch, TextField } from "@material-ui/core";
import { motion } from "framer-motion";
import { useSnackbar } from "notistack";
import { ChangeEvent, useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import Loader from "react-loader-spinner";
import { Link, useHistory } from "react-router-dom";
import { supabase } from "../db/supabaseClient";
import { UserActivityInputInterface } from "../db/userActivity";
import UserContext from "../hooks/userContext";
import SignUpStyles from "../styles/SignUp";
import { Button } from "../components/Button";
import {
  exitAnimations,
  initialAnimations,
  pageLoadAnimations,
  pageToPageTransition,
} from "../utils/animations";

const SignUp = (): JSX.Element => {
  const classNames = SignUpStyles();
  const [checked, setChecked] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const location = useHistory();
  const supabaseUser = supabase.auth.user();
  const { enqueueSnackbar } = useSnackbar();
  const { handleSubmit, reset, control } =
    useForm<UserActivityInputInterface>();

  const onFormSubmit: SubmitHandler<UserActivityInputInterface> = (): void => {
    setLoading(true);
    reset({
      email: "",
      password: "",
    });
    enqueueSnackbar("Sorry, currently we are not accepting any sign ups", {
      variant: "info",
    });
    setLoading(false);
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
              <h1 className={classNames.heading}>Sign Up</h1>
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
                      "Sign Up"
                    )}
                  </Button>
                  <Button
                    variantType="secondary"
                    type="button"
                    variant="outlined"
                    onClick={() =>
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
