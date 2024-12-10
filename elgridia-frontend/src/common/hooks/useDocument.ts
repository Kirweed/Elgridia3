import { useEffect, useState, useMemo } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "src/common/services/firebase";
import { useAuth } from "src/modules/auth/hooks";

export const useDocument = <T>(path: string) => {
  const [document, setDocument] = useState<T>();
  const { uid } = useAuth();
  const documentRef = useMemo(() => ref(db, `${uid}/${path}`), [uid, path]);

  useEffect(() => {
    const unsubscribe = onValue(documentRef, (snapshot) => {
      const data = snapshot.val();
      setDocument(data);
    });

    return unsubscribe;
  }, [documentRef]);

  return [document, setDocument] as const;
};
