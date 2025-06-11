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

export default function App() {
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