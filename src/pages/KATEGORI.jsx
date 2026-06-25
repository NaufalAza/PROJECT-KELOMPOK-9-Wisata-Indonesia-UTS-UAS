import { useNavigate } from "react-router-dom";
import "../styles/kategori.css";

function Kategori() {

  const navigate = useNavigate();

  const categories = [

    {
      id: "pantai",
      name: "Pantai & Laut",
      count: "2 Destinasi",
      circleClass: "bg-circle-pantai"
    },

    {
      id: "gunung",
      name: "Gunung & Hutan",
      count: "1 Destinasi",
      circleClass: "bg-circle-gunung"
    },

    {
      id: "alam",
      name: "Taman Alam & Flora",
      count: "Semua Destinasi",
      circleClass: "bg-circle-alam"
    }

  ];

  const handleCategoryClick = (catId) => {

    // PANTAI & LAUT
    if (catId === "pantai") {
      navigate("/destinasi?kategori=pantai");
    }

    // GUNUNG & HUTAN
    else if (catId === "gunung") {
      navigate("/destinasi?kategori=gunung");
    }

    // TAMAN ALAM & FLORA
    else if (catId === "alam") {
      navigate("/destinasi");
    }

  };

  return (

    <div>

      {/* HERO SECTION */}
      <div className="kategori-hero">

        <div className="container">

          <h1>
            Kategori Wisata Indonesia
          </h1>

          <p>
            Pilih kategori petualangan yang ingin Anda
            jelajahi untuk melihat berbagai destinasi
            wisata terbaik Indonesia.
          </p>

        </div>

      </div>

      {/* CATEGORY GRID */}
      <div className="container">

        <div className="kategori-grid">

          {categories.map((cat) => (

            <div
              className="kategori-card"
              key={cat.id}
              onClick={() => handleCategoryClick(cat.id)}
            >

              {/* ICON CIRCLE */}
              <div className={`kategori-icon-circle ${cat.circleClass}`} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

                {cat.id === "pantai" && (
                  <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20"/><path d="M12 4a8 8 0 0 1 8 8h-8Z"/><path d="M12 18H4a8 8 0 0 1 8-8v8Z"/></svg>
                )}

                {cat.id === "gunung" && (
                  <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m8 3 4 8 5-5 5 15H2L8 3z"/></svg>
                )}

                {cat.id === "alam" && (
                  <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 22C16 22 22 16 22 2c0 0-4.04.53-8.12 3.82C9.4 9.49 8.24 14.54 8 18H2v4Z"/><path d="M12 18c.24-2.88 1.4-6.88 4.2-9.4"/></svg>
                )}

              </div>

              {/* TITLE */}
              <h3 className="kategori-title">
                {cat.name}
              </h3>

              {/* COUNT */}
              <span className="kategori-count">
                {cat.count}
              </span>

            </div>

          ))}

        </div>

      </div>

    </div>

  );
}

export default Kategori;