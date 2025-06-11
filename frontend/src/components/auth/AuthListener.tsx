// src/components/auth/AuthListener.tsx
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../lib/firebase";
import { useUserStore } from "../../store/userStore";

export function AuthListener() {
  const setUser = useUserStore((state) => state.setUser);
  const setLoading = useUserStore((state) => state.setLoading);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        user.getIdToken().then((token) => {
          setUser(user, token);
          setLoading(false);
        });
      } else {
        setUser(null, null);
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, [setUser, setLoading]);

  return null;
}