import { useUserStore } from "../../store/userStore";
import { Navigate } from "react-router-dom";

export default function ProtectedRoutes({ children }: { children: React.ReactNode }) {
  const user = useUserStore((state) => state.user);
  const loading = useUserStore((state) => state.loading);

  if (loading) return null;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}