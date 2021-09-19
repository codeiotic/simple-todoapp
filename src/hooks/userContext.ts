import { Session } from "@supabase/gotrue-js";
import { createContext } from "react";

export interface UserContextInterface {
  user: Session | {};
}

const UserContext = createContext<UserContextInterface>({
  user: {},
});

export default UserContext;
