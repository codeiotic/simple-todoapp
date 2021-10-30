import { Context, createContext } from "react";
import { User } from "firebase/auth";

const UserContext: Context<User> = createContext<User | null>(null);

export default UserContext;
