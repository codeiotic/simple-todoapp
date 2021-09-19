import { TextField } from "@material-ui/core";
import { ChangeEvent, useState } from "react";
import { useHistory } from "react-router";
import UserContext, { UserContextInterface } from "../hooks/userContext";
import SettingsStyles from "../styles/Settings";

const Settings = (): JSX.Element => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const classNames = SettingsStyles();
  const location = useHistory();

  return (
    <UserContext.Consumer>
      {({ user }: UserContextInterface): JSX.Element => {
        // console.log(!(!user && user === {}));
        if (!(!user && user === {})) {
          location.goBack();
        }
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
