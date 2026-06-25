import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/detail.css";

function Detail() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get query param for destination ID
  const queryParams = new URLSearchParams(location.search);
  const destId = queryParams.get("id") || "bali";

  const [destination, setDestination] = useState({
    name: "Pantai Tanah Lot",
    location: "Bali, Indonesia",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1200&auto=format&fit=crop",
    rating: "4.9",
    reviews_count: 1200,
    desc: "Tanah Lot adalah pura laut yang berada di atas batu karang besar di tepi laut. Tempat ini menjadi salah satu ikon wisata Bali yang paling terkenal. Keunikan utama pura ini terletak pada lokasinya yang menjorok ke laut, sehingga saat air pasang pura akan terlihat terisolasi di tengah lautan luas.",
    price: "Rp 30.000",
    hours: "07.00 - 18.00",
    category: "Budaya"
  });

  const [reviews, setReviews] = useState([]);
  const [isFavorited, setIsFavorited] = useState(false);
  const [stars, setStars] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(true);
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

  const fetchDestination = async () => {
    try {
      const response = await fetch(`${apiUrl}/destinasi/${destId}`);
      if (response.ok) {
        const data = await response.json();
        setDestination(data);
        return data;
      }
    } catch (err) {
      console.log("Failed to fetch destination details from MySQL, using defaults", err);
    }
    return null;
  };

  const fetchReviews = async () => {
    try {
      const response = await fetch(`${apiUrl}/ulasan?destinationId=${destId}`);
      if (response.ok) {
        const data = await response.json();
        setReviews(data);
      }
    } catch (err) {
      console.log("Failed to fetch reviews from MySQL", err);
    }
  };

  const checkFavoriteStatus = async () => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      const user = JSON.parse(savedUser);
      try {
        const response = await fetch(`${apiUrl}/favorit?userId=${user.id}`);
        if (response.ok) {
          const data = await response.json();
          const found = data.some(item => item.id === destId);
          setIsFavorited(found);
        }
      } catch (e) {
        console.error("Error checking favorite status", e);
      }
    }
  };

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const destData = await fetchDestination();
      await fetchReviews();
      await checkFavoriteStatus();
      setLoading(false);

      // Log activity if user is logged in
      const savedUser = localStorage.getItem("user");
      if (savedUser && destData) {
        const user = JSON.parse(savedUser);
        try {
          await fetch(`${apiUrl}/riwayat`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              userId: user.id,
              title: `Melihat destinasi ${destData.name}`,
              desc: `Membuka detail destinasi ${destData.name} untuk melihat info tiket.`,
              icon: "eye"
            })
          });
        } catch (e) {
          console.error("Failed to log view", e);
        }
      }
    }
    loadData();
  }, [destId]);

  const handleToggleFavorite = async () => {
    const savedUser = localStorage.getItem("user");
    if (!savedUser) {
      alert("Silakan login terlebih dahulu untuk menandai favorit!");
      navigate("/login");
      return;
    }
    const user = JSON.parse(savedUser);

    try {
      const response = await fetch(`${apiUrl}/favorit/toggle`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id, destinationId: destId })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);

      setIsFavorited(data.isFavorited);
      alert(data.message);
    } catch (err) {
      alert("Gagal memperbarui favorit: " + err.message);
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    const savedUser = localStorage.getItem("user");
    if (!savedUser) {
      alert("Silakan login terlebih dahulu untuk memberikan ulasan!");
      navigate("/login");
      return;
    }
    const user = JSON.parse(savedUser);

    try {
      const response = await fetch(`${apiUrl}/ulasan`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          destinationId: destId,
          stars,
          comment
        })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);

      alert("Ulasan Anda berhasil ditambahkan!");
      setComment("");
      setStars(5);
      fetchDestination();
      fetchReviews();
    } catch (err) {
      alert("Gagal mengirim ulasan: " + err.message);
    }
  };

  return (
    <div style={{ backgroundColor: 'var(--bg-main)', minHeight: '90vh', padding: '40px 0 80px' }}>
      <div className="container">
        {/* BACK BUTTON */}
        <button 
          onClick={() => navigate(-1)} 
          style={{
            background: 'white',
            border: '1px solid var(--border)',
            padding: '10px 20px',
            borderRadius: '30px',
            fontWeight: '700',
            cursor: 'pointer',
            marginBottom: '24px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: 'var(--shadow-sm)',
            transition: 'var(--transition)'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = '#f1f5f9';
            e.currentTarget.style.borderColor = 'var(--primary-light)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = 'white';
            e.currentTarget.style.borderColor = 'var(--border)';
          }}
        >
          ← Kembali
        </button>

        {/* DETAIL MAIN CARD */}
        <div 
          style={{
            background: 'white',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border)',
            boxShadow: 'var(--shadow-lg)',
            overflow: 'hidden',
            marginBottom: '40px'
          }}
        >
          {/* IMAGE */}
          <div style={{ height: '400px', overflow: 'hidden' }}>
            <img 
              src={destination.image} 
              alt={destination.name} 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>

          {/* CONTENT */}
          <div style={{ padding: '40px' }}>
            {/* TITLE & RATING */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px', marginBottom: '24px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', flexWrap: 'wrap' }}>
                  <h1 style={{ fontSize: '32px', fontWeight: '800', color: 'var(--text-heading)', margin: 0 }}>
                    {destination.name}
                  </h1>
                  <button 
                    onClick={handleToggleFavorite}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '5px',
                      transition: 'transform 0.2s'
                    }}
                    onMouseOver={(e) => { e.currentTarget.style.transform = 'scale(1.2)'; }}
                    onMouseOut={(e) => { e.currentTarget.style.transform = 'scale(1.0)'; }}
                    title={isFavorited ? "Hapus dari Favorit" : "Tambah ke Favorit"}
                  >
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="28" 
                      height="28" 
                      viewBox="0 0 24 24" 
                      fill={isFavorited ? "#f43f5e" : "none"} 
                      stroke={isFavorited ? "none" : "#94a3b8"} 
                      strokeWidth="2"
                    >
                      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
                    </svg>
                  </button>
                </div>
                <p style={{ color: 'var(--text-light)', fontWeight: '600', fontSize: '15px', marginTop: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--primary)', flexShrink: 0 }}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                  {destination.location}
                </p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: 'rgba(251, 191, 36, 0.1)', padding: '8px 16px', borderRadius: '30px' }}>
                <span style={{ color: '#fbbf24', fontSize: '18px' }}>★</span>
                <strong style={{ color: '#d97706' }}>{Number(destination.rating || 0).toFixed(1)}</strong>
                <span style={{ color: '#d97706', fontSize: '13px' }}>({destination.reviews_count || 0} ulasan)</span>
              </div>
            </div>

            {/* DESCRIPTION */}
            <p style={{ fontSize: '16px', lineHeight: '1.8', color: 'var(--text-main)', marginBottom: '40px' }}>
              {destination.desc}
            </p>

            {/* FOOTER INFO BOXES */}
            <div 
              style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                gap: '20px',
                borderTop: '1px solid var(--border)',
                paddingTop: '30px'
              }}
            >
              {/* PRICE */}
              <div 
                style={{ 
                  background: '#f8fafc', 
                  padding: '20px', 
                  borderRadius: 'var(--radius-md)', 
                  border: '1px solid var(--border)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '15px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', color: 'var(--primary)', flexShrink: 0 }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/><path d="M9 5v14"/><path d="M15 5v14"/></svg>
                </div>
                <div>
                  <div style={{ fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-light)' }}>Harga Tiket</div>
                  <div style={{ fontSize: '16px', fontWeight: '800', color: 'var(--text-heading)' }}>{destination.price}</div>
                </div>
              </div>

              {/* HOURS */}
              <div 
                style={{ 
                  background: '#f8fafc', 
                  padding: '20px', 
                  borderRadius: 'var(--radius-md)', 
                  border: '1px solid var(--border)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '15px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', color: 'var(--primary)', flexShrink: 0 }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                </div>
                <div>
                  <div style={{ fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-light)' }}>Jam Buka</div>
                  <div style={{ fontSize: '16px', fontWeight: '800', color: 'var(--text-heading)' }}>{destination.hours}</div>
                </div>
              </div>

              {/* CATEGORY */}
              <div 
                style={{ 
                  background: '#f8fafc', 
                  padding: '20px', 
                  borderRadius: 'var(--radius-md)', 
                  border: '1px solid var(--border)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '15px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', color: 'var(--primary)', flexShrink: 0 }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l4.71-4.71c.94-.94.94-2.48 0-3.42L12 2Z"/><path d="M6 6h.01"/></svg>
                </div>
                <div>
                  <div style={{ fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-light)' }}>Kategori</div>
                  <div style={{ fontSize: '16px', fontWeight: '800', color: 'var(--text-heading)' }}>{destination.category_id || destination.category}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* REVIEWS SECTION */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px' }}>
          
          {/* REVIEWS LIST */}
          <div style={{ background: 'white', border: '1px solid var(--border)', padding: '30px', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-md)' }}>
            <h3 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--text-heading)', marginBottom: '20px' }}>Ulasan Wisatawan</h3>
            {reviews.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {reviews.map((rev) => (
                  <div key={rev.id} style={{ display: 'flex', gap: '15px', borderBottom: '1px solid var(--border)', paddingBottom: '15px' }}>
                    {/* Avatar */}
                    <div style={{ flexShrink: 0, width: '40px', height: '40px', borderRadius: '50%', overflow: 'hidden', border: '1px solid var(--border)' }}>
                      <img 
                        src={rev.user_avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${rev.user_name || "default"}`} 
                        alt={rev.user_name} 
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                      />
                    </div>
                    {/* Content */}
                    <div style={{ flexGrow: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                        <strong style={{ fontSize: '15px', color: 'var(--text-heading)' }}>{rev.user_name}</strong>
                        <span style={{ fontSize: '13px', color: '#fbbf24' }}>
                          {"★".repeat(rev.stars) + "☆".repeat(5 - rev.stars)}
                        </span>
                      </div>
                      <p style={{ margin: 0, fontSize: '14px', color: 'var(--text-main)', lineHeight: '1.6' }}>{rev.comment}</p>
                      <span style={{ fontSize: '11px', color: 'var(--text-light)', display: 'block', marginTop: '6px' }}>
                        {new Date(rev.created_at).toLocaleDateString("id-ID", { day: 'numeric', month: 'short', year: 'numeric' })}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ color: 'var(--text-light)', fontSize: '14px', margin: 0 }}>Belum ada ulasan untuk destinasi ini. Jadilah yang pertama memberikan ulasan!</p>
            )}
          </div>

          {/* ADD REVIEW FORM */}
          <div style={{ background: 'white', border: '1px solid var(--border)', padding: '30px', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-md)', height: 'fit-content' }}>
            <h3 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--text-heading)', marginBottom: '20px' }}>Berikan Ulasan</h3>
            <form onSubmit={handleReviewSubmit}>
              {/* STAR RATING INPUT */}
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '700', color: 'var(--text-main)', marginBottom: '8px' }}>Rating Bintang</label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setStars(star)}
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '24px',
                        color: star <= stars ? '#fbbf24' : '#cbd5e1',
                        padding: 0
                      }}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>

              {/* COMMENT INPUT */}
              <div style={{ marginBottom: '20px' }}>
                <label htmlFor="review-comment" style={{ display: 'block', fontSize: '14px', fontWeight: '700', color: 'var(--text-main)', marginBottom: '8px' }}>Komentar Anda</label>
                <textarea
                  id="review-comment"
                  rows="4"
                  placeholder="Ceritakan pengalaman Anda mengunjungi tempat ini..."
                  required
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '14px',
                    color: 'var(--text-heading)',
                    backgroundColor: '#f8fafc',
                    resize: 'none'
                  }}
                />
              </div>

              <button
                type="submit"
                style={{
                  width: '100%',
                  background: '#000000',
                  color: 'white',
                  border: 'none',
                  padding: '12px',
                  borderRadius: '30px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.15)',
                  transition: 'background-color 0.2s'
                }}
                onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#1e293b'; }}
                onMouseOut={(e) => { e.currentTarget.style.backgroundColor = '#000000'; }}
              >
                Kirim Ulasan
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Detail;