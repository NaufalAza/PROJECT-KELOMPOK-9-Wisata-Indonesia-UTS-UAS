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

  // DATA DESTINASI
  const destinations = [

    {
      id: "bali",
      name: "Bali",
      location: "Bali",
      category: "pantai",
      rating: "4.9",
      price: "Rp 1.5M - 5M",
      badge: "Pantai & Pura",
      image:
        "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=500&auto=format&fit=crop",
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
        "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=80&w=500&auto=format&fit=crop",
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
        "https://images.unsplash.com/photo-1604999333679-b86d54738315?q=80&w=500&auto=format&fit=crop",
      desc:
        "Kawah vulkanik aktif yang dikelilingi hamparan pasir luas bertajuk Pasir Berbisik. Sangat pas untuk melihat sunrise."
    },

  ];

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

                  <div className="card-location">
                    <span>📍</span>
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
                      to="/detail"
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