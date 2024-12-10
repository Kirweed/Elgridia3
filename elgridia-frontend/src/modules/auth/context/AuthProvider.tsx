import { FC, PropsWithChildren, useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { FirebaseError } from "@firebase/util";
import { auth } from "src/common/services/firebase";
import { setAccessToken, setRefreshToken } from "src/modules/auth/utils/token";
import { AuthContext } from "src/modules/auth/context/AuthContext";
import { Loader } from "src/common/components";

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState({ stateChanged: true, login: false });
  const [error, setError] = useState<FirebaseError>();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        setRefreshToken(currentUser.refreshToken);
        currentUser?.getIdToken().then((token) => setAccessToken(token));
      }
      setLoading((prev) => ({ ...prev, stateChanged: false }));
    });

    return unsubscribe;
  }, []);

  if (Object.values(loading).some((item) => item)) {
    return <Loader />;
  }

  const value = {
    user,
    loading,
    setLoading,
    error,
    setError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
