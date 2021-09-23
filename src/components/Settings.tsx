import { Button, TextField } from "@material-ui/core";
import { useSnackbar } from "notistack";
import { ChangeEvent, useEffect, useState } from "react";
import Loader from "react-loader-spinner";
import { useHistory } from "react-router";
import { supabase } from "../db/supabaseClient";
import UserContext from "../hooks/userContext";
import SettingsStyles from "../styles/Settings";

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

  return (
    <UserContext.Consumer>
      {(): JSX.Element => {
        return (
          <div className={classNames.parent}>
            <TextField
              size="small"
              label="Change Email"
              variant="filled"
              type="email"
              value={email}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>): void =>
                setEmail(e.target.value)
              }
            />
            <TextField
              size="small"
              label="Change Password"
              variant="filled"
              type="password"
              value={password}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>): void =>
                setPassword(e.target.value)
              }
            />
            <Button variant="contained" onClick={changeSettings}>
              {loading ? (
                <Loader type="Oval" color="#002233" height="24" width="42" />
              ) : (
                "Save Changes"
              )}
            </Button>
          </div>
        );
      }}
    </UserContext.Consumer>
  );
};

export default Settings;
