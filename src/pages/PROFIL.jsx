import { useState } from "react";
import "../styles/profil.css";

function Profil() {
  const [profile, setProfile] = useState({
    name: "Praroro",
    username: "Praroro",
    email: "praroro@gmail.com",
    phone: "0812-3456-7890",
    joinDate: "1 Januari 2026",
    location: "Jakarta, Indonesia",
    avatar: "https://encrypted-tbn2.gstatic.com/licensed-image?q=tbn:ANd9GcRVx07NtdAoD89i0RWS_JR8yeOoeRijWRMbvjpFRFISeJJStSWf6jArBAWSyhvjod8zf7j-3VW2_AeD9kg"
  });

  const handleEditProfile = () => {
    alert("Fitur edit informasi profil segera hadir!");
  };

  return (
    <div style={{ backgroundColor: 'var(--bg-main)', minHeight: '80vh' }}>
      <div className="container profil-container">
        <div className="profil-layout">
          {/* USER AVATAR CARD */}
          <div className="profil-header-card">
            <div className="profil-avatar-wrapper">
              <img 
                src={profile.avatar} 
                alt={profile.name} 
                className="profil-avatar-img"
              />
            </div>
            <h2 className="profil-user-name">{profile.name}</h2>
            <p className="profil-user-email">{profile.email}</p>
            <span className="profil-user-location">📍 {profile.location}</span>
          </div>

          {/* USER INFO DETAILS */}
          <div className="profil-info-card">
            <h3 className="profil-info-title">Informasi Akun</h3>
            
            <div className="profil-fields-grid">
              <div className="profil-field-group">
                <label>Username</label>
                <div className="profil-field-val">{profile.username}</div>
              </div>

              <div className="profil-field-group">
                <label>Alamat Email</label>
                <div className="profil-field-val">{profile.email}</div>
              </div>

              <div className="profil-field-group">
                <label>Nomor Telepon</label>
                <div className="profil-field-val">{profile.phone}</div>
              </div>

              <div className="profil-field-group">
                <label>Tanggal Bergabung</label>
                <div className="profil-field-val">{profile.joinDate}</div>
              </div>
            </div>

            <button className="btn-profil-edit" onClick={handleEditProfile}>
              Edit Profil Saya
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profil;
