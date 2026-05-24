import "../styles/video.css";

function Video() {

  const videos = [

    {
      judul: "BROMO",
      tag: "Official Tourism Video",
      link: "https://www.youtube.com/embed/tffsEhpyjng",
      desc: "Menyaksikan Keindahan Pemandangan Gunung Bromo."
    },

    {
      judul: "Raja Ampat",
      tag: "Nature & Diving",
      link: "https://www.youtube.com/embed/PgrGHs0U2Zs",
      desc: "Menyaksikan langsung petualangan menyelam di kepulauan karst Raja Ampat, pusat segitiga terumbu karang dunia dengan biota laut yang melimpah."
    },

    {
      judul: "Bali",
      tag: "Culture & Beach",
      link: "https://www.youtube.com/embed/9mcEpVFOm-g",
      desc: "Jelajahi keindahan pura suci, sawah terasering Jatiluwih yang hijau, serta keindahan tebing laut Pantai Kelingking di Nusa Penida."
    }

  ];

  return (

    <div className="video-page">

      <div className="container">

        {/* HERO */}
        <div className="video-hero">

          <h1>Galeri Video Nusantara</h1>

          <p>
            Saksikan tayangan sinematik keindahan alam,
            kekayaan budaya, serta keramahan nusantara
            langsung melalui pemutar video berikut.
          </p>

        </div>

        {/* VIDEO LIST */}
        <div className="video-grid">

          {videos.map((video, index) => (

            <div className="video-card" key={index}>

              {/* VIDEO */}
              <div className="video-wrapper">

                <iframe
                  src={video.link}
                  title={video.judul}
                  allowFullScreen
                  loading="lazy"
                ></iframe>

              </div>

              {/* INFO */}
              <div className="video-info">

                <span className="video-tag">
                  {video.tag}
                </span>

                <h3 className="video-card-title">
                  {video.judul}
                </h3>

                <p className="video-card-desc">
                  {video.desc}
                </p>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>

  );
}

export default Video;