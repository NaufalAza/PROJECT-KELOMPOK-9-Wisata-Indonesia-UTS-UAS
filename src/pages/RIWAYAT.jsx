import "../styles/riwayat.css";

function Riwayat() {
  const historyItems = [
    {
      id: 1,
      date: "20 Mei 2026",
      title: "Melihat detail Pantai Kuta, Bali",
      desc: "Menjelajahi informasi tiket, jam operasional, ulasan, serta rute menuju Pantai Kuta.",
      icon: "🏝️"
    },
    {
      id: 2,
      date: "19 Mei 2026",
      title: "Menonton video Wisata Lombok",
      desc: "Menonton tayangan sinematik udara keindahan laut dan sirkuit Mandalika Lombok di halaman Video.",
      icon: "🎥"
    },
    {
      id: 3,
      date: "15 Mei 2026",
      title: "Menambahkan Gili Trawangan ke favorit",
      desc: "Menandai destinasi pulau eksotis Gili Trawangan ke dalam daftar simpanan liburan.",
      icon: "❤️"
    },
    {
      id: 4,
      date: "13 Mei 2026",
      title: "Memberikan testimoni di Pantai Kuta",
      desc: "Menulis ulasan bintang lima mengenai keramahan penduduk lokal dan kebersihan pantai Kuta.",
      icon: "💬"
    },
    {
      id: 5,
      date: "10 Mei 2026",
      title: "Melihat Kawah Putih, Bandung",
      desc: "Mencari detail kawah belerang vulkanik eksotis di Ciwidey Jawa Barat.",
      icon: "🌋"
    }
  ];

  return (
    <div>
      {/* HERO SECTION */}
      <div className="riwayat-hero">
        <div className="container">
          <h1>Riwayat Aktivitas</h1>
          <p>Linimasa seluruh penjelajahan wisata, video yang ditonton, serta interaksi Anda di platform Explore Nusantara.</p>
        </div>
      </div>

      {/* TIMELINE CONTAINER */}
      <div className="container">
        <div className="timeline-container">
          {historyItems.map((item) => (
            <div className="timeline-item" key={item.id}>
              <div className="timeline-icon-bubble">
                {item.icon}
              </div>
              <div className="timeline-content-card">
                <div className="timeline-date">{item.date}</div>
                <h3 className="timeline-item-title">{item.title}</h3>
                <p className="timeline-item-desc">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Riwayat;
