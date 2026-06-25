import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import "../styles/destinasi.css";
import "../styles/home.css";

function Destinasi() {

  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);

  const kategoriURL = queryParams.get("kategori");

  const [activeCategory, setActiveCategory] = useState("all");

  // AUTO FILTER DARI HALAMAN KATEGORI
  useEffect(() => {

    if (kategoriURL) {
      setActiveCategory(kategoriURL);
    } else {
      setActiveCategory("all");
    }

  }, [kategoriURL]);

  // DATA DESTINASI DUMMY FALLBACK
  const dummyDestinations = [

    {
      id: "bali",
      name: "Bali",
      location: "Bali",
      category: "pantai",
      rating: "4.9",
      price: "Rp 1.5M - 5M",
      badge: "Pantai & Pura",
      image:
        "/Galeri/Bali.jpg",
      desc:
        "Menyuguhkan pesona pantai berpasir putih, tempat berselancar kelas dunia, serta keunikan budaya tari kecak."
    },

    {
      id: "raja-ampat",
      name: "Raja Ampat",
      location: "Papua Barat",
      category: "pantai",
      rating: "5.0",
      price: "Rp 3M - 8M",
      badge: "Diving Paradiso",
      image:
        "/Galeri/Raja Ampat.jpg",
      desc:
        "Kepulauan karst menawan di Papua Barat. Tempat impian bagi penyelam di seluruh dunia dengan kekayaan biota laut terlengkap."
    },

    {
      id: "bromo",
      name: "Gunung Bromo",
      location: "Jawa Timur",
      category: "gunung",
      rating: "4.8",
      price: "Rp 500rb - 1.5M",
      badge: "Gunung Berapi",
      image:
        "/Galeri/Bromo.jpeg",
      desc:
        "Kawah vulkanik aktif yang dikelilingi hamparan pasir luas bertajuk Pasir Berbisik. Sangat pas untuk melihat sunrise."
    },

  ];

  const [destinations, setDestinations] = useState(dummyDestinations);

  useEffect(() => {
    async function getDestinations() {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
        const response = await fetch(`${apiUrl}/destinasi`);
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        
        if (data && data.length > 0) {
          const mapped = data.map(item => ({
            id: item.id,
            name: item.name,
            location: item.location,
            category: item.category_id,
            rating: item.rating ? item.rating.toString() : "0.0",
            price: item.price || "Gratis",
            badge: item.badge,
            image: item.image,
            desc: item.desc
          }));
          setDestinations(mapped);
        }
      } catch (err) {
        console.log("Using dummy data for Destinasi. (Local server might not be running or connection failed)", err.message);
      }
    }
    getDestinations();
  }, []);

  // FILTER DESTINASI
  const filteredDestinations =
    activeCategory === "all"
      ? destinations
      : destinations.filter(
          (dest) => dest.category === activeCategory
        );

  return (

    <div>

      {/* HERO */}
      <div className="destinasi-hero">

        <div className="container">

          <h1>
            Katalog Destinasi Wisata
          </h1>

          <p>
            Cari dan temukan destinasi impian Anda
            dari berbagai pilihan wisata terbaik Indonesia.
          </p>

        </div>

      </div>

      {/* FILTER */}
      <div className="container">

        <div className="filters-wrapper">

          {/* SEMUA */}
          <button
            className={`filter-btn ${
              activeCategory === "all"
                ? "active"
                : ""
            }`}
            onClick={() => setActiveCategory("all")}
          >
            Semua Destinasi
          </button>

          {/* PANTAI */}
          <button
            className={`filter-btn ${
              activeCategory === "pantai"
                ? "active"
                : ""
            }`}
            onClick={() => setActiveCategory("pantai")}
          >
            Pantai & Laut
          </button>

          {/* GUNUNG */}
          <button
            className={`filter-btn ${
              activeCategory === "gunung"
                ? "active"
                : ""
            }`}
            onClick={() => setActiveCategory("gunung")}
          >
            Gunung & Alam
          </button>

        </div>

        {/* CARD LIST */}
        <div className="destinasi-list-container">

          <div className="cards-grid">

            {filteredDestinations.map((dest) => (

              <div
                className="dest-card"
                key={dest.id}
              >

                {/* IMAGE */}
                <div className="card-img-wrapper">

                  <span className="card-badge">
                    {dest.badge}
                  </span>

                  <img
                    src={dest.image}
                    alt={dest.name}
                    className="card-img"
                  />

                </div>

                {/* CONTENT */}
                <div className="card-content">

                  <div className="card-location" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--primary)', flexShrink: 0 }}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                    {dest.location}
                  </div>

                  <h3 className="card-title">
                    {dest.name}
                  </h3>

                  <p className="card-desc">
                    {dest.desc}
                  </p>

                  <div className="card-footer">

                    <span className="price-tag">
                      {dest.price}
                    </span>

                    <Link
                      to={`/detail?id=${dest.id}`}
                      className="btn-detail"
                    >
                      Jelajahi <span>→</span>
                    </Link>

                  </div>

                </div>

              </div>

            ))}

          </div>

        </div>

      </div>

    </div>

  );
}

export default Destinasi;