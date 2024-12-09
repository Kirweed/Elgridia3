import { useCallback, useMemo } from "react";
import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { FirebaseError } from "@firebase/util";
import { auth } from "src/common/services/firebase";
import { LoginValues } from "src/modules/auth/types.ts";
import { useAuthContext } from "src/modules/auth/hooks/useAuthContext";

export const useAuth = () => {
  const { user, setLoading, error, setError } = useAuthContext();

  const login = useCallback(
    async (data: LoginValues) => {
      setLoading((prev) => ({ ...prev, login: true }));
      const { email, password } = data;

      setError(undefined);

      try {
        await signInWithEmailAndPassword(auth, email, password);
      } catch (error) {
        if (error instanceof FirebaseError) {
          setLoading((prev) => ({ ...prev, login: false }));
          setError(error);
        }
      } finally {
        setLoading((prev) => ({ ...prev, login: false }));
      }
    },
    [setLoading, setError],
  );

  const logout = async () => {
    await signOut(auth);
  };

  const resetPassword = useCallback(
    async (email: string) => {
      setError(undefined);

      try {
        await sendPasswordResetEmail(auth, email);
      } catch (error) {
        if (error instanceof FirebaseError) {
          setError(error);
        }
      }
    },
    [setError],
  );

  return useMemo(
    () => ({
      uid: user?.uid || "",
      name: user?.email?.split("@")[0] || "",
      error,
      login,
      logout,
      resetPassword,
    }),
    [user, error, login, resetPassword],
  );
};
