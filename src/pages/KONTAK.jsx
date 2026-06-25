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
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
    },
    {
      title: "Layanan WhatsApp",
      value: "+62 812-3456-789",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
    },
    {
      title: "Instagram Resmi",
      value: "@explorenusantara",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>
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