import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/favorit.css";

function Favorit() {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

  const fetchFavorites = async (userId) => {
    try {
      const response = await fetch(`${apiUrl}/favorit?userId=${userId}`);
      if (response.ok) {
        const data = await response.json();
        setFavorites(data);
      }
    } catch (err) {
      console.log("Failed to fetch favorites from MySQL", err);
    }
  };

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (!savedUser) {
      alert("Silakan masuk terlebih dahulu untuk melihat wisata favorit.");
      navigate("/login");
      return;
    }
    const user = JSON.parse(savedUser);
    setLoading(true);
    fetchFavorites(user.id).finally(() => setLoading(false));
  }, []);

  const handleRemoveFavorite = async (id, name) => {
    const savedUser = localStorage.getItem("user");
    if (!savedUser) return;
    const user = JSON.parse(savedUser);

    try {
      const response = await fetch(`${apiUrl}/favorit/toggle`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id, destinationId: id })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);

      alert(`${name} berhasil dihapus dari favorit.`);
      fetchFavorites(user.id);
    } catch (err) {
      alert("Gagal menghapus favorit: " + err.message);
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 20px', color: 'var(--text-light)' }}>
        <h3>Loading favorit...</h3>
      </div>
    );
  }

  return (
    <div>
      {/* HERO SECTION */}
      <div className="favorit-hero">
        <div className="container">
          <h1>Wisata Favorit Saya</h1>
          <p>Kumpulan destinasi wisata impian Indonesia yang telah Anda tandai untuk dikunjungi nanti.</p>
        </div>
      </div>

      {/* FAVORITE GRID */}
      <div className="container">
        {favorites.length > 0 ? (
          <div className="favorit-grid">
            {favorites.map((fav) => (
              <div className="favorit-card" key={fav.id}>
                <div className="favorit-img-wrapper">
                  <img src={fav.image} alt={fav.name} className="favorit-img" />
                </div>
                <div className="favorit-content">
                  <h3 className="favorit-title">{fav.name}</h3>
                  <span className="favorit-location" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--primary)', flexShrink: 0 }}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                    {fav.location}
                  </span>
                </div>
                <button 
                  className="favorit-heart-btn"
                  onClick={() => handleRemoveFavorite(fav.id, fav.name)}
                  title="Hapus dari Favorit"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="none" style={{ color: '#f43f5e' }}><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '80px 20px' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block', margin: '0 auto 20px', color: 'var(--text-light)' }}><path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/></svg>
            <h3 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--text-heading)' }}>Daftar Favorit Kosong</h3>
            <p style={{ color: 'var(--text-light)', marginTop: '6px' }}>Jelajahi destinasi dan klik tombol favorit untuk menambahkannya di sini.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Favorit;
