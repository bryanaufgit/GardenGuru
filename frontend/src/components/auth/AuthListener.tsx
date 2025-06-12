// src/components/auth/AuthListener.tsx
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../lib/firebase";
import { useUserStore } from "../../store/userStore";

export function AuthListener() {
  const setUser = useUserStore((state) => state.setUser);
  const setLoading = useUserStore((state) => state.setLoading);

  useEffect(() => {
    let didFinish = false;
    // Timeout-Failsafe (3 Sekunden)
    const timeout = setTimeout(() => {
      if (!didFinish) setLoading(false);
    }, 3000);

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      didFinish = true;
      clearTimeout(timeout);
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

    return () => {
      clearTimeout(timeout);
      unsubscribe();
    };
  }, [setUser, setLoading]);

  return null;
}