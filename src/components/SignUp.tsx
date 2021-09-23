import { Divider, Switch, TextField } from "@material-ui/core";
import { motion } from "framer-motion";
import { useSnackbar } from "notistack";
import { ChangeEvent, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Loader from "react-loader-spinner";
import { Link, useHistory } from "react-router-dom";
import { supabase } from "../db/supabaseClient";
import userActivity, {
  UserActivityInputInterface,
  UserActivityReturnInterface,
} from "../db/userActivity";
import UserContext from "../hooks/userContext";
import SignUpStyles from "../styles/SignUp";
import { Button } from "../components/Button";

const SignUp = (): JSX.Element => {
  const classNames = SignUpStyles();
  const [checked, setChecked] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const location = useHistory();
  const supabaseUser = supabase.auth.user();
  const { enqueueSnackbar } = useSnackbar();
  const { register, handleSubmit, setValue } =
    useForm<UserActivityInputInterface>();

  const transition = { duration: 0.4, ease: "easeInOut" };

  const onFormSubmit: SubmitHandler<UserActivityInputInterface> = ({
    email,
    password,
  }: UserActivityInputInterface): void => {
    setLoading(true);
    console.log(email, password);
    userActivity({
      email: email,
      password: password,
      type: "signUp",
      finalCallback: (): void => {
        setLoading(false);
        location.push("/home");
      },
    }).then(({ error, user }: UserActivityReturnInterface): void => {
      if (error) {
        enqueueSnackbar(error.message, { variant: "error" });
      } else {
        enqueueSnackbar("Signed up as " + user.email, { variant: "success" });
      }
    });
  };

  useEffect((): void => {
    if (supabaseUser) {
      location.push("/home");
    }
  }, [supabaseUser, location]);

  const clear = (): void => {
    setValue("email", "");
    setValue("password", "");
    setChecked(false);
  };

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
              <h1 className={classNames.heading}>Sign Up</h1>
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
                  fullWidth
                  required
                  autoComplete="off"
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
                  required
                  fullWidth
                  autoComplete="off"
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
                      "Sign Up"
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
                Already have an account? <Link to="/login">Log In</Link>
              </p>
            </div>
          );
        }}
      </UserContext.Consumer>
    </motion.div>
  );
};

export default SignUp;
