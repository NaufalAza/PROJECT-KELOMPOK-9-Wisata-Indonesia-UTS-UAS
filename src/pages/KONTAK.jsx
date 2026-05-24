import { useState } from "react";
import "../styles/contact.css";

function Kontak() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Pesan berhasil dikirim!\nNama: ${formData.name}\nEmail: ${formData.email}\nPesan: ${formData.message}`);
    setFormData({ name: "", email: "", message: "" });
  };

  const contactInfo = [
    {
      title: "Surat Elektronik (Email)",
      value: "info@explorenusantara.com",
      icon: "✉️"
    },
    {
      title: "Layanan WhatsApp",
      value: "+62 812-3456-789",
      icon: "💬"
    },
    {
      title: "Instagram Resmi",
      value: "@explorenusantara",
      icon: "📸"
    }
  ];

  return (
    <div>
      {/* HERO SECTION */}
      <div className="contact-hero">
        <div className="container">
          <h1>Hubungi Kami</h1>
          <p>Memiliki saran destinasi tersembunyi, kerja sama kemitraan pariwisata, atau membutuhkan bantuan pemesanan? Hubungi tim kami.</p>
        </div>
      </div>

      <div className="container">
        {/* LAYOUT CONTAINER */}
        <div className="contact-layout">
          {/* LEFT: INFO CARDS */}
          <div className="contact-info-list">
            {contactInfo.map((info, index) => (
              <div className="contact-card" key={index}>
                <div className="contact-icon-box">{info.icon}</div>
                <div>
                  <div className="contact-card-title">{info.title}</div>
                  <div className="contact-card-value">{info.value}</div>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT: CONTACT FORM */}
          <div className="contact-form-container">
            <h2 className="contact-form-title">Kirimkan Pesan Anda</h2>
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="contact-form-group">
                <label htmlFor="name">Nama Lengkap</label>
                <input 
                  type="text" 
                  id="name" 
                  placeholder="Masukkan nama lengkap Anda"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="contact-form-group">
                <label htmlFor="email">Alamat Email</label>
                <input 
                  type="email" 
                  id="email" 
                  placeholder="Masukkan alamat email Anda"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div className="contact-form-group">
                <label htmlFor="message">Isi Pesan / Pertanyaan</label>
                <textarea 
                  id="message" 
                  rows="5"
                  placeholder="Tulis pesan Anda di sini secara detail..."
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                ></textarea>
              </div>

              <button type="submit" className="btn-contact-submit">
                Kirim Pesan Sekarang
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Kontak;