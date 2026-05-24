import { Link } from "react-router-dom";
import "../styles/dashboard.css";

function Dashboard() {
  const stats = [
    {
      label: "Destinasi Dilihat",
      value: 32,
      icon: "👁️",
      badgeClass: "badge-dilihat"
    },
    {
      label: "Favorit Saya",
      value: 12,
      icon: "❤️",
      badgeClass: "badge-favorit"
    },
    {
      label: "Video Ditonton",
      value: 8,
      icon: "🎥",
      badgeClass: "badge-ditonton"
    },
    {
      label: "Testimoni Kamu",
      value: 5,
      icon: "💬",
      badgeClass: "badge-testimoni"
    }
  ];

  const activities = [
    {
      id: 1,
      icon: "🏝️",
      text: "Melihat detail Pantai Kuta, Bali",
      date: "20 Mei 2026"
    },
    {
      id: 2,
      icon: "🎥",
      text: "Menonton video Wisata Bromo",
      date: "19 Mei 2026"
    },
    {
      id: 3,
      icon: "💬",
      text: "Memberikan testimoni di Pantai Kuta",
      date: "13 Mei 2026"
    }
  ];

  return (
    <div className="dashboard-page" style={{ backgroundColor: 'var(--bg-main)', minHeight: '80vh' }}>
      <div className="container dashboard-container">
        {/* HEADER */}
        <div className="dashboard-header">
          <h1 className="dashboard-welcome">Selamat Datang Kembali, PRARORO! </h1>
          <p className="dashboard-subtitle">Kelola petualanganmu, lihat riwayat penjelajahan, dan edit informasi profilmu di sini.</p>
        </div>

        {/* STATS CARDS */}
        <div className="stats-container">
          {stats.map((stat, index) => (
            <div className="stat-card" key={index}>
              <div className={`stat-icon-wrapper ${stat.badgeClass}`}>
                {stat.icon}
              </div>
              <div className="stat-info">
                <span className="stat-val">{stat.value}</span>
                <span className="stat-lbl">{stat.label}</span>
              </div>
            </div>
          ))}
        </div>

        {/* RECENT ACTIVITY */}
        <div className="activity-card">
          <h2 className="activity-title">Aktivitas Terbaru</h2>
          <div className="activity-list">
            {activities.map((act) => (
              <div className="activity-list-item" key={act.id}>
                <div className="activity-item-left">
                  <span className="activity-item-icon">{act.icon}</span>
                  <span className="activity-item-text">{act.text}</span>
                </div>
                <span className="activity-item-date">{act.date}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
