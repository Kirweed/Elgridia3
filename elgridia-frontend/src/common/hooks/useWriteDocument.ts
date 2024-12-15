import { useCallback } from "react";
import { ref, set } from "firebase/database";
import { useAuth } from "src/modules/auth/hooks";
import { db } from "src/common/services/firebase";

export const useWriteDocument = <T = unknown>() => {
  const { uid } = useAuth();

  const setter = useCallback(
    (path: string, data: T) => set(ref(db, `${uid}/${path}`), data),
    [uid],
  );

  return setter;
};
