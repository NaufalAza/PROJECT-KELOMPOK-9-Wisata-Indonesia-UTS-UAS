import { useState } from "react";
import bali from "../assets/bali.jpg";
import rj4 from "../assets/rj4.jpg";
import bromo from "../assets/bromo.jpg";
import "../styles/gallery.css";

function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null);

  const wisata = [
    {
      nama: "Keindahan Pantai Uluwatu",
      lokasi: "Bali, Indonesia",
      gambar: bali
    },
    {
      nama: "Gugusan Karang Wayag",
      lokasi: "Raja Ampat, Papua Barat",
      gambar: rj4
    },
    {
      nama: "Kawah Gunung Bromo",
      lokasi: "Jawa Timur, Indonesia",
      gambar: bromo
    },
  ];

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
                <p>📍 {item.lokasi}</p>
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
            <p style={{ color: '#94a3b8', marginTop: '6px' }}>📍 {selectedImage.lokasi}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Gallery;