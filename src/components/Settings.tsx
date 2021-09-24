import { Divider, TextField } from "@material-ui/core";
import { useSnackbar } from "notistack";
import { ChangeEvent, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Loader from "react-loader-spinner";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { supabase } from "../db/supabaseClient";
import { UserActivityInputInterface } from "../db/userActivity";
import UserContext from "../hooks/userContext";
import SettingsStyles from "../styles/Settings";
import { Button } from "./Button";

const Settings = (): JSX.Element => {
  const supabaseUser = supabase.auth.user();
  const [email, setEmail] = useState<string>(supabaseUser?.email);
  const [password, setPassword] = useState<string>("");
  const classNames = SettingsStyles();
  const location = useHistory();
  const [loading, setLoading] = useState<boolean>(false);
  const { enqueueSnackbar } = useSnackbar();

  useEffect((): void => {
    if (!supabaseUser) {
      location.push("/login");
    }
  }, [supabaseUser, location]);

  const changeSettings = async (): Promise<void> => {
    try {
      setLoading(true);
      let { error } = await supabase.auth.update({
        email,
        password,
      });
      if (error) {
        enqueueSnackbar(error.message, { variant: "error" });
      } else {
        enqueueSnackbar("Settings updated", { variant: "success" });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const { reset, handleSubmit, control } =
    useForm<UserActivityInputInterface>();

  return (
    <UserContext.Consumer>
      {(): JSX.Element => {
        return (
          <div className={classNames.parent}>
            <h1 className={classNames.heading}>Settings</h1>
            <Divider className={classNames.divider} />
            <form
              className={classNames.form}
              onSubmit={handleSubmit(changeSettings)}
            >
              <Controller
                control={control}
                name="email"
                defaultValue={email}
                render={({ field: { onChange, value } }): JSX.Element => (
                  <TextField
                    className={classNames.emailInput}
                    type="email"
                    variant="filled"
                    size="medium"
                    label="Update Email"
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
                    type="password"
                    variant="filled"
                    size="medium"
                    label="Update Password"
                    autoComplete="off"
                    onChange={onChange}
                    value={value}
                    required
                    fullWidth
                  />
                )}
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
                    "Update"
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
          </div>
        );
      }}
    </UserContext.Consumer>
  );
};

export default Settings;
