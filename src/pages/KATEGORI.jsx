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
              <div className={`kategori-icon-circle ${cat.circleClass}`}>

                {cat.id === "pantai" && "🏖️"}

                {cat.id === "gunung" && "⛰️"}

                {cat.id === "alam" && "🌿"}

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