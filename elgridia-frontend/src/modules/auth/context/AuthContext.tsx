import { createContext, SetStateAction, Dispatch } from "react";
import { User } from "firebase/auth";
import { FirebaseError } from "@firebase/util";

type Loading = {
  stateChanged: boolean;
  login: boolean;
};

type AuthContextProps = {
  user: User | null;
  loading: Loading;
  setLoading: Dispatch<SetStateAction<Loading>>;
  error?: FirebaseError;
  setError: (error?: FirebaseError) => void;
};

export const AuthContext = createContext<AuthContextProps>({
  user: null,
  loading: { stateChanged: true, login: false },
  setLoading: () => {},
  setError: () => {},
});
