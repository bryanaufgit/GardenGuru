import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import MyPlants from './pages/MyPlants';
import Search from './pages/Search';
import Wishlist from './pages/Wishlist';
import Profile from './pages/Profile';
import NotFoundPage from "./pages/NotFoundPage";
import { AuthListener } from './components/auth/AuthListener';

import LoginPage from './pages/LoginPage';         // Erstellen!
import RegisterPage from './pages/RegisterPage';   // Erstellen!

export default function App() {
  return (
    <BrowserRouter>
      <AuthListener />
      <Routes>
        {/* Auth Seiten sind für alle sichtbar */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Ab hier NUR für eingeloggte User sichtbar */}
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="myPlants" element={<MyPlants />} />
          <Route path="search" element={<Search />} />
          <Route path="wishlist" element={<Wishlist />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}