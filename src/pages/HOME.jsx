import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/home.css";

function Home() {

  const dummyDestinations = [
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

  const [popularDestinations, setPopularDestinations] = useState(dummyDestinations);

  useEffect(() => {
    async function getDestinations() {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
        const response = await fetch(`${apiUrl}/destinasi/popular`);
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        
        if (data && data.length > 0) {
          const mapped = data.map(item => ({
            id: item.id,
            name: item.name,
            location: item.location,
            image: item.image,
            badge: item.badge,
            rating: item.rating ? item.rating.toString() : "0.0",
            desc: item.desc
          }));
          setPopularDestinations(mapped);
        }
      } catch (err) {
        console.log("Using dummy data for Home. (Local server might not be running or connection failed)", err.message);
      }
    }
    getDestinations();
  }, []);

  return (

    <div>

      {/* HERO SECTION */}
      <div
        className="hero-section"
        style={{
          backgroundImage: "url('/Beranda/beranda.jpg')"
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
        </div>

      </div>

      {/* MENU PILIHAN (EKSPLORASI FITUR) */}
      <section className="section-container container" style={{ paddingBottom: '20px' }}>
        <div className="section-header" style={{ marginBottom: '40px' }}>
          <span className="section-subtitle">
            Pilihan Jelajah
          </span>
          <h2 className="section-title">
            Eksplorasi Fitur Nusantara
          </h2>
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '24px'
        }}>
          {/* CARD 1: DESTINASI */}
          <Link to="/destinasi" className="pilihan-card" style={{ textDecoration: 'none' }}>
            <div className="pilihan-icon-wrapper" style={{ backgroundColor: 'rgba(15, 118, 110, 0.1)', color: 'var(--primary)' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: '800', margin: '15px 0 8px', color: 'var(--text-heading)' }}>Destinasi Wisata</h3>
            <p style={{ fontSize: '14px', color: 'var(--text-light)', lineHeight: '1.5', margin: 0 }}>Temukan berbagai destinasi wisata menarik dari Sabang sampai Merauke.</p>
          </Link>

          {/* CARD 2: KATEGORI */}
          <Link to="/kategori" className="pilihan-card" style={{ textDecoration: 'none' }}>
            <div className="pilihan-icon-wrapper" style={{ backgroundColor: 'rgba(249, 115, 22, 0.1)', color: 'var(--secondary)' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l4.71-4.71c.94-.94.94-2.48 0-3.42L12 2Z"/><path d="M6 6h.01"/></svg>
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: '800', margin: '15px 0 8px', color: 'var(--text-heading)' }}>Kategori Wisata</h3>
            <p style={{ fontSize: '14px', color: 'var(--text-light)', lineHeight: '1.5', margin: 0 }}>Cari destinasi favorit berdasarkan pantai, gunung, atau alam.</p>
          </Link>

          {/* CARD 3: GALERI */}
          <Link to="/gallery" className="pilihan-card" style={{ textDecoration: 'none' }}>
            <div className="pilihan-icon-wrapper" style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: '800', margin: '15px 0 8px', color: 'var(--text-heading)' }}>Galeri Foto</h3>
            <p style={{ fontSize: '14px', color: 'var(--text-light)', lineHeight: '1.5', margin: 0 }}>Eksplorasi visual keindahan alam nusantara lewat dokumentasi foto.</p>
          </Link>

          {/* CARD 4: VIDEO */}
          <Link to="/video" className="pilihan-card" style={{ textDecoration: 'none' }}>
            <div className="pilihan-icon-wrapper" style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 8-6 4 6 4V8Z"/><rect width="14" height="12" x="2" y="6" rx="2" ry="2"/></svg>
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: '800', margin: '15px 0 8px', color: 'var(--text-heading)' }}>Video Sinematik</h3>
            <p style={{ fontSize: '14px', color: 'var(--text-light)', lineHeight: '1.5', margin: 0 }}>Saksikan tayangan video sinematik keindahan alam Indonesia.</p>
          </Link>
        </div>
      </section>

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

                <div className="card-location" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--primary)' }}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg> {dest.location}
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
                    to={`/detail?id=${dest.id}`}
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
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg> info@explorenusantara.com
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg> +62 812-3456-789
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg> Jakarta, Indonesia
                </li>
              </ul>

            </div>

          </div>

          <div className="footer-bottom">

            <p style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', flexWrap: 'wrap' }}>
              &copy; {new Date().getFullYear()} Explore Nusantara. Dibuat dengan <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none" style={{ color: '#e11d48', display: 'inline-block', verticalAlign: 'middle' }}><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg> untuk Indonesia.
            </p>

          </div>

        </div>

      </footer>

    </div>

  );
}

export default Home;