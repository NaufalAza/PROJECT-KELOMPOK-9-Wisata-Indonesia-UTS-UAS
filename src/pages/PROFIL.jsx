import { useState } from "react";
import "../styles/profil.css";

// 6 Beautiful Avatar presets from DiceBear
const AVATAR_PRESETS = [
  "https://api.dicebear.com/7.x/adventurer/svg?seed=Naufal",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Aza",
  "https://api.dicebear.com/7.x/bottts/svg?seed=Kelompok9",
  "https://api.dicebear.com/7.x/fun-emoji/svg?seed=Traveler",
  "https://api.dicebear.com/7.x/big-ears/svg?seed=Nusantara",
  "https://api.dicebear.com/7.x/lorelei/svg?seed=Adventure"
];

function Profil() {
  const [profile, setProfile] = useState(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      const u = JSON.parse(savedUser);
      return {
        id: u.id || null,
        name: u.name || "Praroro",
        username: u.username || "Praroro",
        email: u.email || "praroro@gmail.com",
        phone: u.phone || "", // Empty by default
        joinDate: u.join_date ? new Date(u.join_date).toLocaleDateString("id-ID", { day: 'numeric', month: 'long', year: 'numeric' }) : "1 Januari 2026",
        location: u.location || "", // Empty by default
        avatar: u.avatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=default"
      };
    }
    return {
      id: null,
      name: "Praroro",
      username: "Praroro",
      email: "praroro@gmail.com",
      phone: "",
      joinDate: "1 Januari 2026",
      location: "",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=default"
    };
  });

  const [isEditingAvatar, setIsEditingAvatar] = useState(false);
  const [isEditingInfo, setIsEditingInfo] = useState(false);
  const [loading, setLoading] = useState(false);

  // State for profile information editing form
  const [editForm, setEditForm] = useState({
    name: profile.name,
    email: profile.email,
    phone: profile.phone,
    location: profile.location
  });

  const handleStartEdit = () => {
    setEditForm({
      name: profile.name,
      email: profile.email,
      phone: profile.phone,
      location: profile.location
    });
    setIsEditingInfo(true);
  };

  const handleSaveInfo = async (e) => {
    e.preventDefault();
    if (!profile.id) {
      alert("Anda harus masuk terlebih dahulu!");
      return;
    }

    if (!editForm.name.trim() || !editForm.email.trim()) {
      alert("Nama Lengkap dan Alamat Email wajib diisi!");
      return;
    }

    setLoading(true);
    const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

    try {
      const response = await fetch(`${apiUrl}/user/update-info`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userId: profile.id,
          name: editForm.name,
          email: editForm.email,
          phone: editForm.phone,
          location: editForm.location
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Gagal memperbarui profil.");
      }

      // Update local storage
      const savedUser = localStorage.getItem("user");
      if (savedUser) {
        const u = JSON.parse(savedUser);
        u.name = editForm.name;
        u.email = editForm.email;
        u.phone = editForm.phone;
        u.location = editForm.location;
        localStorage.setItem("user", JSON.stringify(u));
      }

      // Update state
      setProfile(prev => ({
        ...prev,
        name: editForm.name,
        email: editForm.email,
        phone: editForm.phone,
        location: editForm.location
      }));

      // Trigger navbar to update
      window.dispatchEvent(new Event("user-updated"));

      alert("Informasi profil berhasil diperbarui!");
      setIsEditingInfo(false);
    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectPreset = async (presetUrl) => {
    if (!profile.id) {
      alert("Anda harus masuk terlebih dahulu!");
      return;
    }

    setLoading(true);
    const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

    try {
      const response = await fetch(`${apiUrl}/user/update-avatar`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userId: profile.id,
          avatar: presetUrl
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Gagal mengubah foto profil.");
      }

      // Update local storage
      const savedUser = localStorage.getItem("user");
      if (savedUser) {
        const u = JSON.parse(savedUser);
        u.avatar = presetUrl;
        localStorage.setItem("user", JSON.stringify(u));
      }

      // Update state
      setProfile(prev => ({
        ...prev,
        avatar: presetUrl
      }));

      // Trigger navbar to update
      window.dispatchEvent(new Event("user-updated"));

      setIsEditingAvatar(false);
    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: 'var(--bg-main)', minHeight: '80vh' }}>
      <div className="container profil-container">
        <div className="profil-layout">
          {/* USER AVATAR CARD */}
          <div className="profil-header-card">
            <div 
              className="profil-avatar-wrapper"
              onClick={() => setIsEditingAvatar(true)}
              title="Klik untuk mengubah foto profil"
            >
              <img 
                src={profile.avatar} 
                alt={profile.name} 
                className="profil-avatar-img"
              />
              <div className="avatar-edit-overlay">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="avatar-edit-icon"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
                <span>Ubah</span>
              </div>
            </div>
            <h2 className="profil-user-name">{profile.name}</h2>
            <p className="profil-user-email">{profile.email}</p>
            <span className="profil-user-location" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--primary)', flexShrink: 0 }}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
              {profile.location || "Lokasi belum diisi"}
            </span>
          </div>

          {/* EDIT AVATAR PANEL */}
          {isEditingAvatar && (
            <div className="avatar-edit-panel">
              <div className="avatar-edit-header">
                <h3 className="avatar-edit-title">Pilih Preset Avatar</h3>
                <button 
                  className="btn-close-panel"
                  onClick={() => setIsEditingAvatar(false)}
                  disabled={loading}
                >
                  &times;
                </button>
              </div>

              {loading ? (
                <div style={{ textAlign: 'center', padding: '20px', color: 'var(--primary)', fontWeight: 'bold' }}>
                  Menyimpan perubahan...
                </div>
              ) : (
                <div className="avatar-presets-grid">
                  {AVATAR_PRESETS.map((preset, index) => (
                    <div 
                      key={index} 
                      className={`avatar-preset-item ${profile.avatar === preset ? "active" : ""}`}
                      onClick={() => handleSelectPreset(preset)}
                      title="Klik untuk langsung menerapkan preset avatar ini"
                    >
                      <img src={preset} alt={`Preset ${index + 1}`} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* USER INFO DETAILS */}
          <div className="profil-info-card">
            <h3 className="profil-info-title">Informasi Akun</h3>
            
            <form onSubmit={handleSaveInfo}>
              <div className="profil-fields-grid">
                <div className="profil-field-group">
                  <label>Username</label>
                  <input 
                    type="text" 
                    value={profile.username} 
                    disabled 
                    className="profil-field-val disabled-input"
                  />
                </div>

                <div className="profil-field-group">
                  <label>Nama Lengkap</label>
                  {isEditingInfo ? (
                    <input 
                      type="text" 
                      value={editForm.name} 
                      onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                      required
                      placeholder="Masukkan nama lengkap..."
                      className="profil-field-input"
                    />
                  ) : (
                    <div className="profil-field-val">{profile.name}</div>
                  )}
                </div>

                <div className="profil-field-group">
                  <label>Alamat Email</label>
                  {isEditingInfo ? (
                    <input 
                      type="email" 
                      value={editForm.email} 
                      onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                      required
                      placeholder="Masukkan alamat email..."
                      className="profil-field-input"
                    />
                  ) : (
                    <div className="profil-field-val">{profile.email}</div>
                  )}
                </div>

                <div className="profil-field-group">
                  <label>Nomor Telepon</label>
                  {isEditingInfo ? (
                    <input 
                      type="text" 
                      value={editForm.phone} 
                      placeholder="Masukkan nomor telepon..."
                      onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                      className="profil-field-input"
                    />
                  ) : (
                    <div className="profil-field-val">
                      {profile.phone || <em style={{ color: 'var(--text-light)', fontWeight: '400' }}>Belum diisi</em>}
                    </div>
                  )}
                </div>

                <div className="profil-field-group">
                  <label>Wilayah / Lokasi</label>
                  {isEditingInfo ? (
                    <input 
                      type="text" 
                      value={editForm.location} 
                      placeholder="Masukkan wilayah lokasi (misal: Jakarta, Indonesia)..."
                      onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                      className="profil-field-input"
                    />
                  ) : (
                    <div className="profil-field-val">
                      {profile.location || <em style={{ color: 'var(--text-light)', fontWeight: '400' }}>Belum diisi</em>}
                    </div>
                  )}
                </div>

                <div className="profil-field-group">
                  <label>Tanggal Bergabung</label>
                  <input 
                    type="text" 
                    value={profile.joinDate} 
                    disabled 
                    className="profil-field-val disabled-input"
                  />
                </div>
              </div>

              {isEditingInfo ? (
                <div className="profil-action-buttons">
                  <button 
                    type="button" 
                    className="btn-info-cancel" 
                    onClick={() => setIsEditingInfo(false)}
                    disabled={loading}
                  >
                    Batal
                  </button>
                  <button 
                    type="submit" 
                    className="btn-info-save"
                    disabled={loading}
                  >
                    {loading ? "Menyimpan..." : "Simpan Perubahan"}
                  </button>
                </div>
              ) : (
                <button 
                  type="button" 
                  className="btn-profil-edit-trigger" 
                  onClick={handleStartEdit}
                >
                  Edit Profil Saya
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profil;
