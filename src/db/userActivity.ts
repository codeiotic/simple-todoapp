import { User, UserCredentials } from "@supabase/gotrue-js";
import { supabase } from "./supabaseClient";

export interface UserActivityProps extends UserCredentials {
  /**
   * The type of user activity to perform
   */
  type: "login" | "signUp" | "signOut" | "update";
  /**
   * The call back to be called after the async operation is complete
   */
  finalCallback: () => void;
}

export interface UserActivityReturnInterface {
  /** The Error object containing `error.message`*/
  error: Error;
  /** The actual user. This is optional as it is based on the type of operation you are doing */
  user?: User;
}

export interface UserActivityInputInterface {
  /** The email of the user */
  email: string;
  /** The password of the user */
  password: string;
}

const userActivity = async ({
  email,
  password,
  type,
  finalCallback,
}: UserActivityProps): Promise<UserActivityReturnInterface> => {
  switch (type) {
    case "login":
      try {
        let { error, user } = await supabase.auth.signIn({ email, password });
        return { error, user };
      } catch (error) {
        throw new Error(error);
      } finally {
        finalCallback();
      }

    case "signUp":
      try {
        let { error } = await supabase.auth.signOut();
        return { error };
      } catch (error) {
        throw new Error(error);
      } finally {
        finalCallback();
      }

    case "signOut":
      try {
        let { error } = await supabase.auth.signOut();
        return { error };
      } catch (error) {
        throw new Error(error);
      } finally {
        finalCallback();
      }

    case "update":
      try {
        let { user, error } = await supabase.auth.update({ email, password });
        return { user, error };
      } catch (error) {
        throw new Error(error);
      } finally {
        finalCallback();
      }

    default:
      throw new Error("Unknown user activity type");
  }
};

export default userActivity;
