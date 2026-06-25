import { useState, useEffect } from "react";
import "../styles/gallery.css";

function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null);

  const [wisata, setWisata] = useState([
    {
      nama: "Keindahan Pantai Uluwatu",
      lokasi: "Bali, Indonesia",
      gambar: "/Galeri/Bali.jpg"
    },
    {
      nama: "Gugusan Karang Wayag",
      lokasi: "Raja Ampat, Papua Barat",
      gambar: "/Galeri/Raja Ampat.jpg"
    },
    {
      nama: "Kawah Gunung Bromo",
      lokasi: "Jawa Timur, Indonesia",
      gambar: "/Galeri/Bromo.jpeg"
    },
  ]);

  useEffect(() => {
    async function fetchGallery() {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
        const response = await fetch(`${apiUrl}/gallery`);
        if (response.ok) {
          const data = await response.json();
          if (data && data.length > 0) {
            const mapped = data.map(item => ({
              nama: item.nama,
              lokasi: item.lokasi,
              gambar: item.gambar
            }));
            setWisata(mapped);
          }
        }
      } catch (err) {
        console.log("Using fallback dummy data for Gallery", err);
      }
    }
    fetchGallery();
  }, []);

  return (
    <div>
      {/* HERO SECTION */}
      <div className="gallery-hero">
        <div className="container">
          <h1>Galeri Wisata Nusantara</h1>
          <p>Koleksi dokumentasi keindahan alam, budaya kearifan lokal, dan lanskap ikonik dari ujung barat hingga ujung timur Indonesia.</p>
        </div>
      </div>

      {/* GALLERY GRID */}
      <div className="container">
        <div className="gallery-grid">
          {wisata.map((item, index) => (
            <div 
              className="gallery-item" 
              key={index}
              onClick={() => setSelectedImage(item)}
            >
              <img src={item.gambar} alt={item.nama} />
              <div className="gallery-overlay">
                <h3>{item.nama}</h3>
                <p style={{ display: 'flex', alignItems: 'center', gap: '4px', justifyContent: 'center' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'white', flexShrink: 0 }}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                  {item.lokasi}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* LIGHTBOX MODAL */}
      {selectedImage && (
        <div className="lightbox-modal">
          <div className="lightbox-content">
            <button 
              className="lightbox-close"
              onClick={() => setSelectedImage(null)}
            >
              &times;
            </button>
            <img 
              src={selectedImage.gambar} 
              alt={selectedImage.nama} 
              className="lightbox-img"
            />
            <h3 className="lightbox-title">{selectedImage.nama}</h3>
            <p style={{ color: '#94a3b8', marginTop: '6px', display: 'flex', alignItems: 'center', gap: '4px', justifyContent: 'center' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--primary)', flexShrink: 0 }}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
              {selectedImage.lokasi}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Gallery;