import "../styles/about.css";

function Tentang() {
  const features = [
    {
      title: "Tentang Kami",
      desc: "Web ini kami buat untuk mempermudah mengetahui informasi destinasi wisata",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>,
      iconColor: "#0284c7",
      bgColor: "rgba(2, 132, 199, 0.1)"
    },
    {
      title: "Destinasi Terlengkap",
      desc: "Ribuan destinasi wisata pilihan tersebar dari Sabang sampai Merauke.",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.12 3.88 16 2v18l-6-2-6 2V4l6-2z"/><path d="M9 18V2"/><path d="M15 22v-4"/></svg>,
      iconColor: "#16a34a",
      bgColor: "rgba(22, 163, 74, 0.1)"
    },
    {
      title: "Pengalaman Terbaik",
      desc: "Membantu perjalanan liburanmu menjadi lebih mudah and terencana.",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
      iconColor: "#d97706",
      bgColor: "rgba(217, 119, 6, 0.1)"
    }
  ];

  return (
    <div style={{ backgroundColor: 'var(--bg-main)', minHeight: '90vh', padding: '50px 0 80px' }}>
      <div className="container">
        {/* HEADING */}
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h1 style={{ fontSize: '36px', fontWeight: '800', color: 'var(--text-heading)', marginBottom: '10px' }}>
            Tentang Kami
          </h1>
          <p style={{ color: 'var(--text-light)', fontSize: '16px', maxWidth: '600px', margin: '0 auto' }}>
            Explore Nusantara adalah platform digital terpercaya penyedia panduan dan eksplorasi destinasi wisata terbaik di seluruh penjuru Indonesia.
          </p>
        </div>

        {/* SPLIT CONTENT */}
        <div className="about-content">
          {/* LEFT: TEXT & 3 FEATURE CARDS */}
          <div>
            <p style={{ fontSize: '15px', color: 'var(--text-main)', lineHeight: '1.7', marginBottom: '30px' }}>
              Kami mendedikasikan platform ini untuk mempermudah wisatawan menemukan keindahan alam tersembunyi, mempelajari sejarah kebudayaan lokal yang kaya, dan mendapatkan estimasi perjalanan yang akurat. Kami percaya bahwa pariwisata adalah kunci pelestarian kebudayaan Indonesia.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {features.map((feat, index) => (
                <div 
                  key={index}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '20px',
                    background: 'white',
                    padding: '20px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border)',
                    boxShadow: 'var(--shadow-sm)',
                    transition: 'var(--transition)'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                  }}
                >
                  <div 
                    style={{
                      width: '50px',
                      height: '50px',
                      borderRadius: '12px',
                      backgroundColor: feat.bgColor,
                      color: feat.iconColor,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      fontSize: '22px',
                      fontWeight: 'bold',
                      flexShrink: 0
                    }}
                  >
                    {feat.icon}
                  </div>
                  <div>
                    <h4 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--text-heading)', marginBottom: '4px' }}>
                      {feat.title}
                    </h4>
                    <p style={{ fontSize: '14px', color: 'var(--text-light)', margin: 0 }}>
                      {feat.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: BEAUTIFUL PURA ILLUSTRATION CARD */}
          <div className="about-img-wrapper" style={{ height: '450px' }}>
            <img 
              src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=800&auto=format&fit=crop" 
              alt="Pura Ulun Danu Bratan"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tentang;