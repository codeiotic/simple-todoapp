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
import { useForm, SubmitHandler } from "react-hook-form";
import { motion } from "framer-motion";
import { Button } from "../components/Button";

const LogIn = (): JSX.Element => {
  const classNames = LogInStyles();
  const [checked, setChecked] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  let location = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const supabaseUser = supabase.auth.user();
  const { register, handleSubmit, setValue } =
    useForm<UserActivityInputInterface>();

  const transition = { duration: 0.4, ease: "easeInOut" };

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

  const clear = (): void => {
    setChecked(false);
    setValue("email", "", {
      shouldTouch: true,
      shouldDirty: true,
    });
    setValue("password", "", {
      shouldTouch: true,
      shouldDirty: true,
    });
  };

  useEffect((): void => {
    if (supabaseUser) {
      location.push("/home");
    }
  }, [supabaseUser, location]);

  return (
    <motion.div
      exit={{
        opacity: 0.9,
        backgroundColor: "#002233",
      }}
      initial={{
        opacity: 0.9,
      }}
      animate={{
        opacity: 1,
      }}
      transition={transition}
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
                <TextField
                  className={classNames.emailInput}
                  type="email"
                  variant="filled"
                  size="small"
                  label="Email"
                  autoComplete="off"
                  fullWidth
                  required
                  {...register("email", {
                    required: true,
                  })}
                />
                <TextField
                  className={classNames.passwordInput}
                  type={checked ? "text" : "password"}
                  variant="filled"
                  size="small"
                  label="Password"
                  autoComplete="off"
                  required
                  fullWidth
                  {...register("password", {
                    required: true,
                  })}
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
                    variantType="primary"
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
    </motion.div>
  );
};

export default LogIn;
