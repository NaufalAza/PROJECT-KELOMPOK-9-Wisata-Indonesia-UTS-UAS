import { Link } from "react-router-dom";
import "../styles/home.css";

function Home() {

  const popularDestinations = [

  {
    id: "bali",
    name: "Bali",
    location: "Pulau Dewata",
    image:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=600&auto=format&fit=crop",
    badge: "Terpopuler",
    rating: "4.9",
    desc:
      "Pulau Dewata menawarkan pantai eksotis, pura megah di atas tebing, dan kehidupan budaya spiritual yang kental."
  },

  {
    id: "bromo",
    name: "Gunung Bromo",
    location: "Jawa Timur",
    image:
      "https://images.unsplash.com/photo-1604999333679-b86d54738315?q=80&w=600&auto=format&fit=crop",
    badge: "Gunung",
    rating: "4.8",
    desc:
      "Gunung Bromo menawarkan pemandangan sunrise yang indah dengan hamparan pasir luas dan pegunungan eksotis."
  },

  {
    id: "raja-ampat",
    name: "Raja Ampat",
    location: "Papua Barat",
    image:
      "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=80&w=600&auto=format&fit=crop",
    badge: "Laut & Diving",
    rating: "5.0",
    desc:
      "Raja Ampat terkenal dengan keindahan lautnya yang jernih, pulau karst eksotis, dan surga diving terbaik dunia."
  }

];

  return (

    <div>

      {/* HERO SECTION */}
      <div
        className="hero-section"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1600&auto=format&fit=crop')"
        }}
      >

        <div className="hero-overlay"></div>

        <div className="hero-content fade-in">

          <span className="hero-tagline">
            Wonderful Indonesia
          </span>

          <h1 className="hero-title">
            Jelajahi Keindahan <span>Nusantara</span>
          </h1>

          <p className="hero-desc">
            Temukan destinasi tersembunyi,
            rasakan kebudayaan lokal yang kaya,
            dan ciptakan momen petualangan
            tak terlupakan di tanah air.
          </p>

          {/* BUTTONS */}
          <div className="hero-btns">

            {/* KE KATEGORI */}
            <Link
              to="/kategori"
              className="btn-primary"
            >
              Mulai Jelajah
            </Link>

            {/* KE DESTINASI */}
            <Link
              to="/destinasi"
              className="btn-secondary"
            >
              Lihat Destinasi
            </Link>

          </div>

        </div>

      </div>

      {/* POPULAR DESTINATIONS */}
      <section className="section-container container">

        <div className="section-header">

          <span className="section-subtitle">
            Rekomendasi Kami
          </span>

          <h2 className="section-title">
            Destinasi Populer
          </h2>

        </div>

        <div
          className="cards-grid"
          style={{
            gridTemplateColumns:
              "repeat(auto-fit, minmax(260px, 1fr))"
          }}
        >

          {popularDestinations.map((dest) => (

            <div className="dest-card" key={dest.id}>

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

              <div className="card-content">

                <div className="card-location">
                  <span>📍</span> {dest.location}
                </div>

                <h3 className="card-title">
                  {dest.name}
                </h3>

                <p className="card-desc">
                  {dest.desc}
                </p>

                <div className="card-footer">

                  <div className="card-rating">
                    <span className="star-icon">★</span>
                    <span>{dest.rating}</span>
                  </div>

                  <Link
                    to="/detail"
                    className="card-link"
                  >
                    Lihat Detail <span>→</span>
                  </Link>

                </div>

              </div>

            </div>

          ))}

        </div>

      </section>

      {/* CTA BANNER */}
      <section className="container">

        <div className="cta-banner">

          <h2 className="cta-title">
            Siap untuk Memulai Petualangan Anda?
          </h2>

          <p className="cta-desc">
            Dapatkan informasi perjalanan
            terlengkap dan pesan pemandu
            wisata lokal terbaik untuk menemani
            liburan impian Anda di Indonesia.
          </p>

          <Link
            to="/kontak"
            className="cta-btn"
          >
            Hubungi Kami Sekarang
          </Link>

        </div>

      </section>

      {/* FOOTER */}
      <footer>

        <div className="container">

          <div className="footer-grid">

            <div className="footer-brand">

              <h3>Explore Nusantara</h3>

              <p>
                Platform terpercaya penyedia
                informasi pariwisata terindah
                di Indonesia.
              </p>

            </div>

            <div className="footer-links">

              <h4>Navigasi</h4>

              <ul>
                <li><Link to="/">Beranda</Link></li>
                <li><Link to="/destinasi">Destinasi</Link></li>
                <li><Link to="/gallery">Galeri Foto</Link></li>
                <li><Link to="/video">Video Sinematik</Link></li>
              </ul>

            </div>

            <div className="footer-links">

              <h4>Perusahaan</h4>

              <ul>
                <li><Link to="/tentang">Tentang Kami</Link></li>
                <li><Link to="/kontak">Kontak</Link></li>
                <li><Link to="/login">Daftar Akun</Link></li>
              </ul>

            </div>

            <div className="footer-links">

              <h4>Hubungi Kami</h4>

              <ul>
                <li>📧 info@explorenusantara.com</li>
                <li>📞 +62 812-3456-789</li>
                <li>📍 Jakarta, Indonesia</li>
              </ul>

            </div>

          </div>

          <div className="footer-bottom">

            <p>
              &copy; {new Date().getFullYear()}
              Explore Nusantara.
              Dibuat dengan ❤️ untuk Indonesia.
            </p>

          </div>

        </div>

      </footer>

    </div>

  );
}

export default Home;