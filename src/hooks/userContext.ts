import { Session } from "@supabase/gotrue-js";
import { createContext } from "react";

export interface UserContextInterface {
  user?: Session | {};
  setUser: (session: Session) => void;
}

const UserContext = createContext<UserContextInterface>({
  user: {},
  setUser: (): void => {},
});

export default UserContext;
