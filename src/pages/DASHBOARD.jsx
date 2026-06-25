import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/dashboard.css";

function Dashboard() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [favoritesCount, setFavoritesCount] = useState(0);
  const [watchedVideosCount, setWatchedVideosCount] = useState(0);
  const [viewedDestinationsCount, setViewedDestinationsCount] = useState(0);
  const [testimonialsCount, setTestimonialsCount] = useState(0);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (!savedUser) {
      alert("Silakan masuk terlebih dahulu untuk melihat dashboard.");
      navigate("/login");
      return;
    }
    const user = JSON.parse(savedUser);
    setCurrentUser(user);

    async function loadDashboardData() {
      try {
        // Fetch favorites to get count
        const favRes = await fetch(`${apiUrl}/favorit?userId=${user.id}`);
        if (favRes.ok) {
          const favs = await favRes.json();
          setFavoritesCount(favs.length);
        }

        // Fetch testimonials to get count
        const testRes = await fetch(`${apiUrl}/testimoni?userId=${user.id}`);
        if (testRes.ok) {
          const tests = await testRes.json();
          setTestimonialsCount(tests.length);
        }

        // Fetch recent activities
        const actRes = await fetch(`${apiUrl}/riwayat?userId=${user.id}`);
        if (actRes.ok) {
          const acts = await actRes.json();
          
          // Count video play activities
          const videoCount = acts.filter(item => item.icon === 'video' || item.title.startsWith("Menonton Video")).length;
          setWatchedVideosCount(videoCount);

          // Count viewed destinations
          const viewCount = acts.filter(item => item.icon === 'eye' || item.title.startsWith("Melihat destinasi")).length;
          setViewedDestinationsCount(viewCount);

          // Map to match the dashboard item format
          const mapped = acts.slice(0, 3).map(item => ({
            id: item.id,
            icon: renderIcon(item.icon),
            text: item.title,
            date: new Date(item.created_at).toLocaleDateString("id-ID", { day: 'numeric', month: 'short', year: 'numeric' })
          }));
          setActivities(mapped);
        }
      } catch (err) {
        console.log("Error loading dashboard data:", err);
      } finally {
        setLoading(false);
      }
    }

    loadDashboardData();
  }, []);

  const renderIcon = (iconName) => {
    switch (iconName) {
      case 'heart':
      case 'heart-off':
        return <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#f43f5e' }}><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>;
      case 'message-square':
      case 'comment':
        return <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>;
      case 'video':
        return <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#86198f' }}><path d="m22 8-6 4 6 4V8Z"/><rect width="14" height="12" x="2" y="6" rx="2" ry="2"/></svg>;
      case 'eye':
        return <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#0ea5e9' }}><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>;
      default:
        return <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>;
    }
  };

  const stats = [
    {
      label: "Destinasi Dilihat",
      value: viewedDestinationsCount,
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>,
      badgeClass: "badge-dilihat"
    },
    {
      label: "Favorit Saya",
      value: favoritesCount,
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>,
      badgeClass: "badge-favorit"
    },
    {
      label: "Video Ditonton",
      value: watchedVideosCount,
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 8-6 4 6 4V8Z"/><rect width="14" height="12" x="2" y="6" rx="2" ry="2"/></svg>,
      badgeClass: "badge-ditonton"
    },
    {
      label: "Testimoni Kamu",
      value: testimonialsCount,
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
      badgeClass: "badge-testimoni"
    }
  ];

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "100px 20px", color: "var(--text-light)" }}>
        <h3>Loading dashboard...</h3>
      </div>
    );
  }

  return (
    <div className="dashboard-page" style={{ backgroundColor: 'var(--bg-main)', minHeight: '80vh' }}>
      <div className="container dashboard-container">
        {/* HEADER */}
        <div className="dashboard-header">
          <h1 className="dashboard-welcome">Selamat Datang Kembali, {currentUser?.name || "Pengguna"}! </h1>
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
          {activities.length > 0 ? (
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
          ) : (
            <p style={{ color: "var(--text-light)", padding: "20px 0", margin: 0, fontSize: "14px" }}>Belum ada aktivitas terbaru.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
