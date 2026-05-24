import { useNavigate } from "react-router-dom";
import "../styles/detail.css";

function Detail() {
  const navigate = useNavigate();

  const destination = {
    name: "Pantai Tanah Lot",
    location: "Bali, Indonesia",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1200&auto=format&fit=crop",
    rating: "4.9",
    reviewsCount: "1200 ulasan",
    desc: "Tanah Lot adalah pura laut yang berada di atas batu karang besar di tepi laut. Tempat ini menjadi salah satu ikon wisata Bali yang paling terkenal. Keunikan utama pura ini terletak pada lokasinya yang menjorok ke laut, sehingga saat air pasang pura akan terlihat terisolasi di tengah lautan luas. Tempat ini sangat populer untuk melihat panorama matahari terbenam yang memukau.",
    price: "Rp 30.000",
    hours: "07.00 - 18.00",
    category: "Budaya"
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
            overflow: 'hidden'
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
                <h1 style={{ fontSize: '32px', fontWeight: '800', color: 'var(--text-heading)', margin: 0 }}>
                  {destination.name}
                </h1>
                <p style={{ color: 'var(--text-light)', fontWeight: '600', fontSize: '15px', marginTop: '6px' }}>
                  📍 {destination.location}
                </p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: 'rgba(251, 191, 36, 0.1)', padding: '8px 16px', borderRadius: '30px' }}>
                <span style={{ color: '#fbbf24', fontSize: '18px' }}>★</span>
                <strong style={{ color: '#d97706' }}>{destination.rating}</strong>
                <span style={{ color: '#d97706', fontSize: '13px' }}>({destination.reviewsCount})</span>
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
                <div style={{ fontSize: '28px' }}>🎟️</div>
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
                <div style={{ fontSize: '28px' }}>🕒</div>
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
                <div style={{ fontSize: '28px' }}>🏷️</div>
                <div>
                  <div style={{ fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-light)' }}>Kategori</div>
                  <div style={{ fontSize: '16px', fontWeight: '800', color: 'var(--text-heading)' }}>{destination.category}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Detail;