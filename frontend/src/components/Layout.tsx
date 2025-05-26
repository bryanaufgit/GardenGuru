import { Outlet } from "react-router-dom";
import Navigation from "./Navigation";

export default function Layout() {
  return (
    <div className="flex min-h-screen bg-surface text-gray-900">
      <a href="#main" className="sr-only focus:not-sr-only absolute top-2 left-2 bg-white text-black p-2 rounded z-50">
        Zum Inhalt springen
      </a>
      {/* Sidebar Navigation (Desktop) */}
      <div className="hidden md:flex md:fixed md:top-0 md:left-0 md:w-64 md:h-screen md:flex-col bg-sidebar">
        <Navigation variant="sidebar" />
      </div>

      <main id="main" role="main" className="flex-1 p-4 pb-20 md:pb-4 md:ml-64">
        <Outlet />
      </main>

      {/* Bottom Navigation (Mobile) */}
      <Navigation variant="bottom" />
    </div>
  );
}