import "../styles/testimoni.css";

function Testimoni() {
  const testimonials = [
    {
      id: 1,
      name: "Praroro",
      stars: 5,
      avatar: "https://encrypted-tbn2.gstatic.com/licensed-image?q=tbn:ANd9GcRVx07NtdAoD89i0RWS_JR8yeOoeRijWRMbvjpFRFISeJJStSWf6jArBAWSyhvjod8zf7j-3VW2_AeD9kg",
      text: "Pelayanan website ini luar biasa membantu! Informasi mengenai destinasi wisata di Indonesia sangat lengkap dan terverifikasi dengan baik. Mempermudah rencana perjalanan keluarga saya."
    },
  ];

  return (
    <div>
      {/* HERO SECTION */}
      <div className="testimoni-hero">
        <div className="container">
          <h1>Testimoni Pengunjung</h1>
          <p>Apa kata mereka tentang pengalaman menjelajahi keindahan Indonesia bersama Explore Nusantara?</p>
        </div>
      </div>

      {/* TESTIMONIAL LIST */}
      <div className="container">
        <div className="testimoni-list">
          {testimonials.map((test) => (
            <div className="testimoni-card" key={test.id}>
              <div className="testimoni-avatar">
                <img src={test.avatar} alt={test.name} />
              </div>
              <div className="testimoni-content">
                <h3 className="testimoni-name">{test.name}</h3>
                <div className="testimoni-stars">
                  {"★".repeat(test.stars)}
                </div>
                <p className="testimoni-text">"{test.text}"</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Testimoni;
