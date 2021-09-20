import { TextField } from "@material-ui/core";
import { ChangeEvent, useEffect, useState } from "react";
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

  useEffect((): void => {
    if (!supabaseUser?.email) {
      location.push("/login");
    }
  }, [supabaseUser, location]);

  return (
    <UserContext.Consumer>
      {(): JSX.Element => {
        return (
          <div className={classNames.parent}>
            <TextField
              size="small"
              label="Email"
              variant="filled"
              type="email"
              value={email}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>): void =>
                setEmail(e.target.value)
              }
            />
            <TextField
              size="small"
              label="Password"
              variant="filled"
              type="password"
              value={password}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                setPassword(e.target.value)
              }
            />
          </div>
        );
      }}
    </UserContext.Consumer>
  );
};

export default Settings;
