import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import "../styles/navbar.css";

function Navbar({ isLoggedIn, onLogout }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const loadUser = () => {
      const savedUser = localStorage.getItem("user");
      if (savedUser) {
        setCurrentUser(JSON.parse(savedUser));
      } else {
        setCurrentUser(null);
      }
    };

    if (isLoggedIn) {
      loadUser();
    } else {
      setCurrentUser(null);
    }

    window.addEventListener("user-updated", loadUser);
    return () => {
      window.removeEventListener("user-updated", loadUser);
    };
  }, [isLoggedIn]);

  // Close dropdowns when path changes
  useEffect(() => {
    setMenuOpen(false);
    setProfileDropdownOpen(false);
  }, [location.pathname]);

  // Click outside listener for profile dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const isActive = (path) => location.pathname === path;

  const handleLogoutClick = () => {
    onLogout();
    navigate("/");
    alert("Anda telah keluar dari akun.");
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        {/* Toggle Hamburger Button on Mobile */}
        <div 
          className={`hamburger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
          <h2 className="logo-text">Explore Nusantara</h2>
        </Link>
      </div>

      {/* Desktop Menu links */}
      <div className="nav-menu-desktop">
        <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>
          Beranda
        </Link>
        <Link to="/tentang" className={`nav-link ${isActive('/tentang') ? 'active' : ''}`}>
          Tentang
        </Link>
        <Link to="/kontak" className={`nav-link ${isActive('/kontak') ? 'active' : ''}`}>
          Kontak
        </Link>

        {isLoggedIn ? (
          /* Profile Avatar with Dropdown */
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }} ref={dropdownRef}>
            <div 
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                overflow: 'hidden',
                cursor: 'pointer',
                border: '2px solid var(--primary-light)',
                boxShadow: 'var(--shadow-sm)',
                transition: 'var(--transition)'
              }}
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              onMouseOver={(e) => { e.currentTarget.style.borderColor = 'var(--primary)'; }}
              onMouseOut={(e) => { e.currentTarget.style.borderColor = 'var(--primary-light)'; }}
            >
              <img 
                src={currentUser?.avatar || "https://encrypted-tbn2.gstatic.com/licensed-image?q=tbn:ANd9GcRVx07NtdAoD89i0RWS_JR8yeOoeRijWRMbvjpFRFISeJJStSWf6jArBAWSyhvjod8zf7j-3VW2_AeD9kg"} 
                alt="Profile Avatar" 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

            {/* Profile Dropdown Menu */}
            {profileDropdownOpen && (
              <div 
                style={{
                  position: 'absolute',
                  top: '55px',
                  right: '0',
                  background: 'white',
                  borderRadius: 'var(--radius-sm)',
                  boxShadow: 'var(--shadow-lg)',
                  border: '1px solid var(--border)',
                  width: '200px',
                  padding: '10px 0',
                  display: 'flex',
                  flexDirection: 'column',
                  zIndex: 9999,
                  animation: 'fadeIn 0.2s ease'
                }}
              >
                <div style={{ padding: '8px 20px', borderBottom: '1px solid var(--border)', marginBottom: '8px' }}>
                  <div style={{ fontWeight: '800', color: 'var(--text-heading)', fontSize: '14px' }}>{currentUser?.name || "Praroro"}</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-light)' }}>{currentUser?.email || "praroro@gmail.com"}</div>
                </div>

                <Link to="/dashboard" style={{ padding: '8px 20px', fontSize: '14px', fontWeight: '600', color: 'var(--text-main)', textAlign: 'left' }} className="dropdown-item-hover">
                  Dashboard
                </Link>
                <Link to="/profil" style={{ padding: '8px 20px', fontSize: '14px', fontWeight: '600', color: 'var(--text-main)', textAlign: 'left' }} className="dropdown-item-hover">
                  Profil Saya
                </Link>
                <Link to="/favorit" style={{ padding: '8px 20px', fontSize: '14px', fontWeight: '600', color: 'var(--text-main)', textAlign: 'left' }} className="dropdown-item-hover">
                  Wisata Favorit
                </Link>
                <Link to="/riwayat" style={{ padding: '8px 20px', fontSize: '14px', fontWeight: '600', color: 'var(--text-main)', textAlign: 'left' }} className="dropdown-item-hover">
                  Riwayat Aktivitas
                </Link>
                <Link to="/testimoni" style={{ padding: '8px 20px', fontSize: '14px', fontWeight: '600', color: 'var(--text-main)', textAlign: 'left' }} className="dropdown-item-hover">
                  Testimoni Saya
                </Link>
                
                <button 
                  onClick={handleLogoutClick}
                  style={{
                    border: 'none',
                    background: 'none',
                    padding: '10px 20px',
                    fontSize: '14px',
                    fontWeight: '700',
                    color: '#f43f5e',
                    textAlign: 'left',
                    cursor: 'pointer',
                    borderTop: '1px solid var(--border)',
                    marginTop: '8px',
                    width: '100%'
                  }}
                  className="dropdown-item-hover"
                >
                  Keluar (Logout)
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login" className="nav-link nav-btn-login">
            Masuk
          </Link>
        )}
      </div>

      {/* Mobile Dropdown Menu */}
      <div className={`nav-dropdown-mobile ${menuOpen ? 'open' : ''}`}>
        <Link to="/" className={`mobile-link ${isActive('/') ? 'active' : ''}`}>
          Beranda
        </Link>
        <Link to="/tentang" className={`mobile-link ${isActive('/tentang') ? 'active' : ''}`}>
          Tentang
        </Link>
        <Link to="/kontak" className={`mobile-link ${isActive('/kontak') ? 'active' : ''}`}>
          Kontak
        </Link>

        {isLoggedIn ? (
          <div style={{ borderTop: '1px solid var(--border)', paddingTop: '15px', marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ padding: '0 12px', fontSize: '13px', color: 'var(--text-light)' }}>
              Akun: <strong>{currentUser?.name || "Haikal Maulana"}</strong>
            </div>
            <Link to="/dashboard" className="mobile-link"> Dashboard</Link>
            <Link to="/profil" className="mobile-link"> Profil Saya</Link>
            <Link to="/favorit" className="mobile-link"> Wisata Favorit</Link>
            <Link to="/riwayat" className="mobile-link"> Riwayat Aktivitas</Link>
            <Link to="/testimoni" className="mobile-link"> Testimoni Saya</Link>
            <button 
              onClick={handleLogoutClick}
              style={{
                background: 'rgba(244, 63, 94, 0.1)',
                border: 'none',
                color: '#f43f5e',
                padding: '10px',
                borderRadius: '30px',
                fontWeight: '700',
                cursor: 'pointer',
                marginTop: '5px'
              }}
            >
              Keluar
            </button>
          </div>
        ) : (
          <Link to="/login" className="mobile-link" style={{ 
            marginTop: '10px',
            textAlign: 'center',
            backgroundColor: 'var(--primary)',
            color: 'white',
            borderRadius: '30px'
          }}>
            Masuk / Daftar
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;