import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import MyPlants from './pages/MyPlants';
import Search from './pages/Search';
import Wishlist from './pages/Wishlist';
import Profile from './pages/Profile';
import NotFoundPage from "./pages/NotFoundPage";
import { AuthListener } from './components/auth/AuthListener';
import ProtectedRoutes from './components/auth/ProtectedRoutes';

import LoginPage from './pages/LoginPage';         // Erstellen!
import RegisterPage from './pages/RegisterPage';   // Erstellen!
import PlantCatalogPage from './pages/plantCatalogue';
import PlantDetail from './pages/PlantDetail';
import ReminderPage from './pages/reminderPage';
import FAQ from './pages/FAQ';
import Impressum from './pages/Impressum';
import SettingsPage from './pages/Settings';

import { useUserStore } from "./store/userStore";

export default function App() {
  const { loading } = useUserStore();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <svg className="animate-spin h-8 w-8 text-primary" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
        <span className="ml-3 text-lg">Lade GardenGuru ...</span>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <AuthListener />
      <Routes>
        {/* Auth Seiten sind für alle sichtbar */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="impressum" element={<Impressum />} />

        {/* Ab hier NUR für eingeloggte User sichtbar */}
        <Route
          path="/"
          element={
            <ProtectedRoutes>
              <Layout />
            </ProtectedRoutes>
          }
        >
          <Route index element={<HomePage />} />
          <Route path="myPlants" element={<MyPlants />} />
          <Route path="search" element={<Search />} />
          <Route path="wishlist" element={<Wishlist />} />
          <Route path="profile" element={<Profile />} />
          <Route path="Catalogue" element={<PlantCatalogPage/>} />
          <Route path="plants/:plantId" element={<PlantDetail />} />
          <Route path="reminders" element={<ReminderPage />} />
          <Route path="faq" element={<FAQ />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}