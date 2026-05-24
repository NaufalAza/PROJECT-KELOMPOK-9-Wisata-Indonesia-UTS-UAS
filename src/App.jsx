import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/HOME";
import LoginRegister from "./pages/LoginRegister";
import Kontak from "./pages/KONTAK";
import Tentang from "./pages/TENTANG";
import Destinasi from "./pages/DESTINASI";
import Gallery from "./pages/Gallery";
import Detail from "./pages/DETAIL";
import Video from "./pages/Video";
import Kategori from "./pages/KATEGORI";
import Dashboard from "./pages/DASHBOARD";
import Profil from "./pages/PROFIL";
import Testimoni from "./pages/TESTIMONI";
import Favorit from "./pages/FAVORIT";
import Riwayat from "./pages/RIWAYAT";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <BrowserRouter>
      {/* Floating Modern Navbar with simulated login status */}
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />

      {/* Pages Content Router */}
      <Routes>
        {/* Entry Stage 1 */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginRegister onLogin={handleLogin} />} />
        <Route path="/register" element={<LoginRegister onLogin={handleLogin} />} />
        <Route path="/kontak" element={<Kontak />} />
        <Route path="/tentang" element={<Tentang />} />

        {/* Process Stage 2 */}
        <Route path="/destinasi" element={<Destinasi />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/kategori" element={<Kategori />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profil" element={<Profil />} />

        {/* Output Stage 3 */}
        <Route path="/detail" element={<Detail />} />
        <Route path="/video" element={<Video />} />
        <Route path="/testimoni" element={<Testimoni />} />
        <Route path="/favorit" element={<Favorit />} />
        <Route path="/riwayat" element={<Riwayat />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;