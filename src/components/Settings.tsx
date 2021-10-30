import { Divider, TextField } from "@material-ui/core";
import { useSnackbar } from "notistack";
import {
  ChangeEvent,
  FC,
  FormEvent,
  useContext,
  useEffect,
  useState,
} from "react";
import Loader from "react-loader-spinner";
import { useHistory } from "react-router";
import UserContext from "../hooks/userContext";
import SettingsStyles from "../styles/Settings";
import { motion } from "framer-motion";
import {
  exitAnimations,
  initialAnimations,
  pageLoadAnimations,
  pageToPageTransition,
} from "../utils";
import { Button } from ".";
import { User } from "firebase/auth";

const Settings: FC = () => {
  const User: User = useContext(UserContext);
  const classNames = SettingsStyles();
  const location = useHistory();
  const [loading, setLoading] = useState<boolean>(false);
  const { enqueueSnackbar } = useSnackbar();
  const [email, setEmail] = useState<string>(User?.email);
  const [password, setPassword] = useState<string>("");

  useEffect((): void => {
    if (!User) {
      location.push("/login");
    }
  }, [User, location]);

  const changeSettings = (e: FormEvent): void => {
    e.preventDefault();
    setLoading(true);
    enqueueSnackbar("Sorry, this activity is prohibited", {
      variant: "info",
    });
    setLoading(false);
  };

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
              <h1 className={classNames.heading}>Settings</h1>
              <Divider className={classNames.divider} />
              <form className={classNames.form} onSubmit={changeSettings}>
                <TextField
                  className={classNames.emailInput}
                  type="email"
                  variant="filled"
                  size="medium"
                  label="Update Email"
                  autoComplete="off"
                  onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                    setEmail(e.target.value)
                  }
                  value={email}
                  fullWidth
                  required
                />

                <TextField
                  className={classNames.passwordInput}
                  type="password"
                  variant="filled"
                  size="medium"
                  label="Update Password"
                  autoComplete="off"
                  onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                    setPassword(e.target.value)
                  }
                  value={password}
                  required
                  fullWidth
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
                    onClick={(): void => {
                      setEmail("");
                      setPassword("");
                    }}
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
    </motion.div>
  );
};

export default Settings;
