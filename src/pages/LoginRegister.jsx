import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../styles/login.css";

function LoginRegister({ onLogin }) {

  // NAVIGATE
  const navigate = useNavigate();

  // STATE LOGIN / REGISTER
  const [isLogin, setIsLogin] = useState(true);

  // SHOW PASSWORD
  const [showPassword, setShowPassword] = useState(false);

  // FORM DATA
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: ""
  });

  // HANDLE SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

    // LOGIN
    if (isLogin) {
      try {
        const response = await fetch(`${apiUrl}/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email: formData.email, // works for username or email
            password: formData.password
          })
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Login gagal!");
        }

        alert(`Login Berhasil!\nSelamat datang kembali, ${data.user.name}!`);

        // Save session in localStorage
        localStorage.setItem("user", JSON.stringify(data.user));

        if (onLogin) onLogin(data.user);

        // Redirect to profile
        navigate("/profil");
      } catch (err) {
        alert(err.message);
      }
    }

    // REGISTER
    else {
      if (formData.password !== formData.confirmPassword) {
        alert("Konfirmasi kata sandi tidak cocok!");
        return;
      }

      try {
        const response = await fetch(`${apiUrl}/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name: formData.name,
            username: formData.username,
            email: formData.email,
            password: formData.password
          })
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Registrasi gagal!");
        }

        alert("Registrasi Berhasil!\nSilakan masuk dengan akun baru Anda.");

        // Reset form and switch to login view
        setIsLogin(true);
        setFormData({
          name: "",
          email: "",
          username: "",
          password: "",
          confirmPassword: ""
        });
      } catch (err) {
        alert(err.message);
      }
    }
  };

  return (
    <div
      className="login-page"
      style={{
        backgroundImage:
          "linear-gradient(rgba(15, 23, 42, 0.4), rgba(15, 23, 42, 0.7)), url('https://encrypted-tbn2.gstatic.com/licensed-image?q=tbn:ANd9GcRVx07NtdAoD89i0RWS_JR8yeOoeRijWRMbvjpFRFISeJJStSWf6jArBAWSyhvjod8zf7j-3VW2_AeD9kg')"
      }}
    >

      {/* CARD */}
      <div
        className="login-card"
        style={{
          background: "rgba(255, 255, 255, 0.95)",
          color: "var(--text-heading)",
          border: "1px solid var(--border)",
          boxShadow: "var(--shadow-xl)",
          position: "relative",
          paddingBottom: "120px",
          overflow: "hidden"
        }}
      >

        {/* TITLE */}
        <h1
          style={{
            color: "var(--text-heading)",
            fontWeight: "800"
          }}
        >
          {isLogin
            ? "Selamat Datang Kembali! "
            : "Buat Akun Baru"}
        </h1>

        {/* SUBTITLE */}
        <p
          className="login-card-subtitle"
          style={{
            color: "var(--text-light)",
            marginBottom: "30px"
          }}
        >
          {isLogin
            ? "Login untuk melanjutkan perjalananmu"
            : "Daftar untuk mulai menjelajah"}
        </p>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="login-form"
        >

          {/* NAMA */}
          {!isLogin && (
            <div className="login-input-group">

              <label
                htmlFor="reg-name"
                style={{
                  color: "var(--text-main)"
                }}
              >
                 Nama Lengkap
              </label>

              <input
                type="text"
                id="reg-name"
                placeholder="Masukkan nama lengkap Anda"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    name: e.target.value
                  })
                }
                style={{
                  backgroundColor: "#f8fafc",
                  color: "var(--text-heading)"
                }}
              />

            </div>
          )}

          {/* EMAIL */}
          <div className="login-input-group">

            <label
              htmlFor="login-email"
              style={{
                color: "var(--text-main)"
              }}
            >
              {isLogin
                ? " USERNAME ATAU EMAIL"
                : " ALAMAT EMAIL"}
            </label>

            <input
              type={isLogin ? "text" : "email"}
              id="login-email"
              placeholder={
                isLogin
                  ? "Email atau username"
                  : "nama@email.com"
              }
              required
              value={formData.email}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  email: e.target.value
                })
              }
              style={{
                backgroundColor: "#f8fafc",
                color: "var(--text-heading)"
              }}
            />

          </div>

          {/* USERNAME */}
          {!isLogin && (
            <div className="login-input-group">

              <label
                htmlFor="reg-user"
                style={{
                  color: "var(--text-main)"
                }}
              >
                 Username
              </label>

              <input
                type="text"
                id="reg-user"
                placeholder="Buat username unik"
                required
                value={formData.username}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    username: e.target.value
                  })
                }
                style={{
                  backgroundColor: "#f8fafc",
                  color: "var(--text-heading)"
                }}
              />

            </div>
          )}

          {/* PASSWORD */}
          <div
            className="login-input-group"
            style={{
              position: "relative"
            }}
          >

            <label
              htmlFor="login-password"
              style={{
                color: "var(--text-main)"
              }}
            >
               KATA SANDI
            </label>

            <div
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center"
              }}
            >

              <input
                type={showPassword ? "text" : "password"}
                id="login-password"
                placeholder="••••••••"
                required
                value={formData.password}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    password: e.target.value
                  })
                }
                style={{
                  backgroundColor: "#f8fafc",
                  color: "var(--text-heading)",
                  width: "100%",
                  paddingRight: "45px"
                }}
              />

              {/* ICON EYE */}
              <span
                onClick={() =>
                  setShowPassword(!showPassword)
                }
                style={{
                  position: "absolute",
                  right: "15px",
                  cursor: "pointer",
                  userSelect: "none",
                  color: "var(--text-light)"
                }}
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block' }}><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.52 13.52 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" x2="22" y1="2" y2="22"/></svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block' }}><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                )}
              </span>

            </div>

          </div>

          {/* CONFIRM PASSWORD */}
          {!isLogin && (
            <div className="login-input-group">

              <label
                htmlFor="reg-confirm"
                style={{
                  color: "var(--text-main)"
                }}
              >
                 Konfirmasi Kata Sandi
              </label>

              <input
                type={showPassword ? "text" : "password"}
                id="reg-confirm"
                placeholder="••••••••"
                required
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    confirmPassword: e.target.value
                  })
                }
                style={{
                  backgroundColor: "#f8fafc",
                  color: "var(--text-heading)"
                }}
              />

            </div>
          )}

          {/* REMEMBER */}
          {isLogin && (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                fontSize: "13px",
                marginTop: "-5px"
              }}
            >

              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  cursor: "pointer",
                  fontWeight: "600"
                }}
              >
                <input type="checkbox" />
                Ingat saya
              </label>

              <a
                href="#forgot"
                onClick={(e) => {

                  e.preventDefault();

                  alert(
                    "Tautan pemulihan kata sandi dikirim ke email."
                  );

                }}
                style={{
                  color: "var(--primary)",
                  fontWeight: "700"
                }}
              >
                Lupa Password?
              </a>

            </div>
          )}

          {/* BUTTON LOGIN */}
          <button
            type="submit"
            className="btn-login-submit"
            style={{
              background: isLogin
                ? "#0d6efd"
                : "#198754",

              boxShadow: isLogin
                ? "0 4px 14px rgba(13, 110, 253, 0.3)"
                : "0 4px 14px rgba(25, 135, 84, 0.3)",

              borderRadius: "8px"
            }}
          >
            {isLogin
              ? "Login"
              : "Daftar Sekarang"}
          </button>

        </form>

        {/* SWITCH LOGIN REGISTER */}
        <p
          className="login-switch-text"
          style={{
            color: "var(--text-light)",
            marginTop: "20px"
          }}
        >

          {isLogin
            ? "Belum punya akun?"
            : "Sudah punya akun?"}

          <span
            className="login-switch-btn"
            onClick={() => {

              setIsLogin(!isLogin);

              setFormData({
                name: "",
                email: "",
                username: "",
                password: "",
                confirmPassword: ""
              });

            }}
            style={{
              color: "var(--primary)",
              textDecoration: "none",
              cursor: "pointer",
              fontWeight: "bold"
            }}
          >
            {isLogin
              ? " Daftar di sini"
              : " Login di sini"}
          </span>

        </p>

        {/* IMAGE BAWAH */}
        <div
          style={{
            position: "absolute",
            bottom: "0",
            left: "0",
            right: "0",
            height: "90px",

            backgroundImage:
              "url('https://encrypted-tbn2.gstatic.com/licensed-image?q=tbn:ANd9GcRVx07NtdAoD89i0RWS_JR8yeOoeRijWRMbvjpFRFISeJJStSWf6jArBAWSyhvjod8zf7j-3VW2_AeD9kg')",

            backgroundSize: "cover",

            backgroundPosition: "center 70%",

            opacity: "0.25",

            borderTop: "1px solid var(--border)"
          }}
        ></div>

      </div>

    </div>
  );
}

export default LoginRegister;