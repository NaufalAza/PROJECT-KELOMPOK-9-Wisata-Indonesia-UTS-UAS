import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/testimoni.css";

function Testimoni() {
  const navigate = useNavigate();
  const [testimonials, setTestimonials] = useState([
    {
      id: 1,
      name: "Praroro",
      stars: 5,
      avatar: "https://encrypted-tbn2.gstatic.com/licensed-image?q=tbn:ANd9GcRVx07NtdAoD89i0RWS_JR8yeOoeRijWRMbvjpFRFISeJJStSWf6jArBAWSyhvjod8zf7j-3VW2_AeD9kg",
      text: "Pelayanan website ini luar biasa membantu! Informasi mengenai destinasi wisata di Indonesia sangat lengkap dan terverifikasi dengan baik. Mempermudah rencana perjalanan keluarga saya."
    },
  ]);

  const [stars, setStars] = useState(5);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    const savedUser = localStorage.getItem("user");
    if (!savedUser) {
      alert("Silakan login terlebih dahulu untuk memberikan testimoni!");
      navigate("/login");
      return;
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

  const fetchTestimonials = async () => {
    try {
      const response = await fetch(`${apiUrl}/testimoni`);
      if (response.ok) {
        const data = await response.json();
        if (data && data.length > 0) {
          const mapped = data.map(item => ({
            id: item.id,
            name: item.user_name || "Pengunjung",
            stars: item.stars,
            avatar: item.user_avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${item.user_name || "default"}`,
            text: item.text
          }));
          setTestimonials(mapped);
        }
      }
    } catch (err) {
      console.log("Using fallback dummy testimonials", err);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchTestimonials().finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const savedUser = localStorage.getItem("user");
    if (!savedUser) {
      alert("Silakan login terlebih dahulu untuk memberikan testimoni!");
      navigate("/login");
      return;
    }
    const user = JSON.parse(savedUser);

    try {
      const response = await fetch(`${apiUrl}/testimoni`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          stars,
          text
        })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);

      alert("Terima kasih! Testimoni Anda berhasil ditambahkan.");
      setText("");
      setStars(5);
      setIsModalOpen(false);
      fetchTestimonials();
    } catch (err) {
      alert("Gagal menambahkan testimoni: " + err.message);
    }
  };

  return (
    <div>
      {/* HERO SECTION */}
      <div className="testimoni-hero" style={{ padding: "80px 0" }}>
        <div className="container">
          <h1>Testimoni Pengunjung</h1>
          <p style={{ marginBottom: "24px" }}>Apa kata mereka tentang pengalaman menjelajahi keindahan Indonesia bersama Explore Nusantara?</p>
          <button 
            onClick={handleOpenModal}
            style={{
              background: "var(--secondary)",
              color: "white",
              border: "none",
              padding: "14px 32px",
              borderRadius: "30px",
              fontWeight: "700",
              fontSize: "16px",
              cursor: "pointer",
              boxShadow: "0 6px 20px rgba(249, 115, 22, 0.35)",
              transition: "var(--transition)",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px"
            }}
            onMouseOver={(e) => { e.currentTarget.style.backgroundColor = 'var(--secondary-hover)'; }}
            onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'var(--secondary)'; }}
          >
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"></path>
            </svg>
            Tulis Testimoni Anda
          </button>
        </div>
      </div>

      {/* TESTIMONIAL CONTENT CONTAINER */}
      <div className="container" style={{ padding: "60px 0" }}>
        {/* TESTIMONIAL LIST */}
        <div className="testimoni-list">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
            <h2 style={{ fontSize: "24px", fontWeight: "800", color: "var(--text-heading)", margin: 0 }}>Ulasan Pengguna</h2>
            <button 
              onClick={handleOpenModal}
              style={{
                background: "var(--primary)",
                color: "white",
                border: "none",
                padding: "10px 20px",
                borderRadius: "30px",
                fontWeight: "700",
                fontSize: "14px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                boxShadow: "0 4px 10px rgba(15, 118, 110, 0.15)",
                transition: "var(--transition)"
              }}
              onMouseOver={(e) => { e.currentTarget.style.backgroundColor = 'var(--primary-hover)'; }}
              onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'var(--primary)'; }}
            >
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15"></path>
              </svg>
              Tulis Testimoni
            </button>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            {testimonials.map((test) => (
              <div className="testimoni-card" key={test.id} style={{ display: "flex", gap: "20px", background: "white", padding: "24px", borderRadius: "var(--radius-md)", border: "1px solid var(--border)" }}>
                <div className="testimoni-avatar" style={{ flexShrink: 0 }}>
                  <img src={test.avatar} alt={test.name} style={{ width: "60px", height: "60px", borderRadius: "50%", objectFit: "cover" }} />
                </div>
                <div className="testimoni-content">
                  <h3 className="testimoni-name" style={{ fontSize: "16px", fontWeight: "800", color: "var(--text-heading)", margin: "0 0 6px" }}>{test.name}</h3>
                  <div className="testimoni-stars" style={{ color: "#fbbf24", marginBottom: "8px" }}>
                    {"★".repeat(test.stars) + "☆".repeat(5 - test.stars)}
                  </div>
                  <p className="testimoni-text" style={{ fontSize: "14px", lineHeight: "1.6", color: "var(--text-main)", fontStyle: "italic", margin: 0 }}>"{test.text}"</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MODAL BERIKAN TESTIMONI */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={handleCloseModal}>
              ✕
            </button>

            <h2 style={{ fontSize: "24px", fontWeight: "800", color: "var(--text-heading)", marginBottom: "10px" }}>Berikan Testimoni</h2>
            <p style={{ color: "var(--text-light)", fontSize: "14px", marginBottom: "30px" }}>Bagikan cerita dan pengalaman berharga Anda menggunakan platform kami.</p>
            
            <form onSubmit={handleSubmit}>
              {/* STAR INPUT */}
              <div style={{ marginBottom: "24px" }}>
                <label style={{ display: "block", fontSize: "14px", fontWeight: "700", color: "var(--text-main)", marginBottom: "8px" }}>Kepuasan Layanan</label>
                <div style={{ display: "flex", gap: "8px" }}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setStars(star)}
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        fontSize: "28px",
                        color: star <= stars ? "#fbbf24" : "#cbd5e1",
                        padding: 0
                      }}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>

              {/* TESTIMONY TEXT INPUT */}
              <div style={{ marginBottom: "24px" }}>
                <label htmlFor="testimony-text" style={{ display: "block", fontSize: "14px", fontWeight: "700", color: "var(--text-main)", marginBottom: "8px" }}>Testimoni Anda</label>
                <textarea
                  id="testimony-text"
                  rows="5"
                  placeholder="Ceritakan bagaimana platform ini membantu liburan atau eksplorasi Anda..."
                  required
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "14px",
                    border: "1px solid var(--border)",
                    borderRadius: "var(--radius-sm)",
                    fontSize: "14px",
                    color: "var(--text-heading)",
                    backgroundColor: "#f8fafc",
                    resize: "none",
                    lineHeight: "1.6"
                  }}
                />
              </div>

              <button
                type="submit"
                style={{
                  width: "100%",
                  background: "#000000",
                  color: "white",
                  border: "none",
                  padding: "14px",
                  borderRadius: "30px",
                  fontWeight: "700",
                  cursor: "pointer",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                  transition: "background-color 0.2s"
                }}
                onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#1e293b'; }}
                onMouseOut={(e) => { e.currentTarget.style.backgroundColor = '#000000'; }}
              >
                Kirim Testimoni
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Testimoni;
