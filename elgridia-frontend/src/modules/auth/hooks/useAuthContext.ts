import { useContext } from "react";
import { AuthContext } from "src/modules/auth/context/AuthContext";

export const useAuthContext = () => {
  return useContext(AuthContext);
};
