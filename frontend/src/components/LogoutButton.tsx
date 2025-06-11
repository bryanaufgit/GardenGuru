import { LogOut } from "lucide-react";
import { useUserStore } from "../store/userStore";
import { logout } from "../api/authApi";
import { useNavigate } from "react-router-dom";

export default function LogoutButton() {
  const setUser = useUserStore((state) => state.setUser);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    setUser(null);
    navigate("/login");
  };

  return (
    <button
      onClick={handleLogout}
      className="flex items-center gap-2 px-4 py-2 rounded-2xl border border-gray-200 bg-white shadow hover:bg-red-50 hover:text-red-700 transition-all duration-150 font-semibold text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-400"
      aria-label="Abmelden"
    >
      <LogOut size={20} className="text-red-400" />
      Logout
    </button>
  );
}