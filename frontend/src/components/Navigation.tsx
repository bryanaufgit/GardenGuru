import { NavLink } from "react-router-dom";
import { Home, Leaf, User, Library, ListTodo} from "lucide-react";

const navItems = [
  { to: "/", icon: <Home size={24} className="text-white/80 group-hover:text-primary-dark group-[.bg-primary-light]:text-primary-dark" />, label: "Start" },
  { to: "/MyPlants", icon: <Leaf size={24} className="text-white/80 group-hover:text-primary-dark group-[.bg-primary-light]:text-primary-dark" />, label: "Meine Pflanzen" },
  { to: "/reminders", icon: <ListTodo size={24} className="text-white/80 group-hover:text-primary-dark group-[.bg-primary-light]:text-primary-dark" />, label: "Erinnerungen" },
  { to : "/catalogue", icon: <Library size={24} className="text-white/80 group-hover:text-primary-dark group-[.bg-primary-light]:text-primary-dark" />, label: "Pflanzenkatalog" },
  { to: "/profile", icon: <User size={24} className="text-white/80 group-hover:text-primary-dark group-[.bg-primary-light]:text-primary-dark" />, label: "Profil" },
];

interface Props {
  variant: "sidebar" | "bottom";
}

export default function Navigation({ variant }: Props) {
  const isBottom = variant === "bottom";
  const baseStyles = "bg-sidebar text-primary-dark";
  const navClass = isBottom
  ? `fixed bottom-0 left-0 right-0 h-16 flex justify-around items-center md:hidden z-100 ${baseStyles}`
  : `hidden md:flex md:fixed md:top-0 md:left-0 md:w-64 md:h-screen md:flex-col md:items-start md:space-y-6 md:p-4 ${baseStyles}`;

  return (
    <nav className={navClass} role="navigation" aria-label="Hauptnavigation">
      {navItems.map(({ to, icon, label }) => (
        <NavLink
          to={to}
          key={to}
          className={({ isActive }) =>
            `group flex flex-col items-center md:flex-row md:gap-2 md:w-full p-2 rounded-md hover:bg-primary-light focus:outline-none focus:ring-2 focus:ring-primary ${
              isActive ? "bg-primary-light font-semibold" : ""
            }`
          }
          aria-label={label}
        >
          {icon}
          <span className="text-sm md:block hidden text-white/80 group-hover:text-primary-dark group-[.bg-primary-light]:text-primary-dark">{label}</span>
        </NavLink>
      ))}
    </nav>
  );
}