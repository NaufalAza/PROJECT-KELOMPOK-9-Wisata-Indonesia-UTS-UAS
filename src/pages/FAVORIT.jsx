import { useState } from "react";
import "../styles/favorit.css";

function Favorit() {
  const [favorites, setFavorites] = useState([
    {
      id: "bali",
      name: "Pantai Kuta",
      location: "Kuta, Bali",
      image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=300&auto=format&fit=crop"
    },
  ]);

  const handleRemoveFavorite = (id, name) => {
    setFavorites(favorites.filter((fav) => fav.id !== id));
    alert(`${name} dihapus dari daftar favorit Anda.`);
  };

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
                  <span className="favorit-location">📍 {fav.location}</span>
                </div>
                <button 
                  className="favorit-heart-btn"
                  onClick={() => handleRemoveFavorite(fav.id, fav.name)}
                  title="Hapus dari Favorit"
                >
                  ❤️
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '80px 20px' }}>
            <span style={{ fontSize: '48px', display: 'block', marginBottom: '20px' }}>📁</span>
            <h3 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--text-heading)' }}>Daftar Favorit Kosong</h3>
            <p style={{ color: 'var(--text-light)', marginTop: '6px' }}>Jelajahi destinasi dan klik tombol favorit untuk menambahkannya di sini.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Favorit;
