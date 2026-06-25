import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/riwayat.css";

function Riwayat() {
  const navigate = useNavigate();
  const [historyItems, setHistoryItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (!savedUser) {
      alert("Silakan masuk terlebih dahulu untuk melihat riwayat aktivitas.");
      navigate("/login");
      return;
    }
    const user = JSON.parse(savedUser);

    async function fetchHistory() {
      try {
        const response = await fetch(`${apiUrl}/riwayat?userId=${user.id}`);
        if (response.ok) {
          const data = await response.json();
          setHistoryItems(data);
        }
      } catch (err) {
        console.log("Failed to fetch history logs from MySQL", err);
      } finally {
        setLoading(false);
      }
    }

    fetchHistory();
  }, []);

  const renderIcon = (iconName) => {
    switch (iconName) {
      case 'heart':
        return <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="none" style={{ color: '#f43f5e' }}><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>;
      case 'heart-off':
        return <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#f43f5e' }}><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>; // fallback heart
      case 'message-square':
      case 'comment':
        return <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>;
      case 'ticket':
        return <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/><path d="M9 5v14"/><path d="M15 5v14"/></svg>;
      case 'video':
        return <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#86198f' }}><path d="m22 8-6 4 6 4V8Z"/><rect width="14" height="12" x="2" y="6" rx="2" ry="2"/></svg>;
      default:
        return <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>;
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 20px', color: 'var(--text-light)' }}>
        <h3>Loading riwayat...</h3>
      </div>
    );
  }

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
        {historyItems.length > 0 ? (
          <div className="timeline-container">
            {historyItems.map((item) => (
              <div className="timeline-item" key={item.id}>
                <div className="timeline-icon-bubble">
                  {renderIcon(item.icon)}
                </div>
                <div className="timeline-content-card">
                  <div className="timeline-date">
                    {new Date(item.created_at).toLocaleDateString("id-ID", { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </div>
                  <h3 className="timeline-item-title">{item.title}</h3>
                  <p className="timeline-item-desc">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '80px 20px' }}>
            <h3 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--text-heading)' }}>Belum Ada Aktivitas</h3>
            <p style={{ color: 'var(--text-light)', marginTop: '6px' }}>Mulailah menjelajah destinasi, menyukai objek wisata, atau membuat ulasan untuk merekam aktivitas Anda di sini.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Riwayat;
