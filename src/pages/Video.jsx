import { useState, useEffect } from "react";
import "../styles/video.css";

function Video() {
  const [videos, setVideos] = useState([
    {
      judul: "Bromo Sunrise Majesty",
      tag: "Gunung",
      link: "/videos/Bromo.mp4",
      desc: "Pemandangan menakjubkan matahari terbit di atas kaldera Gunung Bromo."
    },
    {
      judul: "Raja Ampat Underwater Heaven",
      tag: "Diving",
      link: "/videos/Raja Empat.mp4",
      desc: "Menyusuri keindahan bawah laut Raja Ampat."
    },
    {
      judul: "Bali Cinematic Tour",
      tag: "Pantai",
      link: "/videos/Bali.mp4",
      desc: "Video keindahan pantai dan kebudayaan di Bali."
    }
  ]);

  useEffect(() => {
    async function fetchVideos() {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
        const response = await fetch(`${apiUrl}/video`);
        if (response.ok) {
          const data = await response.json();
          if (data && data.length > 0) {
            const mapped = data.map(item => ({
              judul: item.judul,
              tag: item.tag,
              link: item.link,
              desc: item.desc
            }));
            setVideos(mapped);
          }
        }
      } catch (err) {
        console.log("Using fallback dummy data for Video", err);
      }
    }
    fetchVideos();
  }, []);

  const handleVideoPlay = async (videoItem) => {
    const savedUser = localStorage.getItem("user");
    if (!savedUser) return;
    const user = JSON.parse(savedUser);

    const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

    try {
      await fetch(`${apiUrl}/riwayat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userId: user.id,
          title: `Menonton Video ${videoItem.judul}`,
          desc: `Menonton video pariwisata sinematik ${videoItem.judul}.`,
          icon: "video"
        })
      });
    } catch (err) {
      console.error("Failed to log video view activity:", err);
    }
  };

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
                {video.link && (video.link.includes("youtube.com") || video.link.includes("youtu.be")) ? (
                  <iframe
                    src={video.link}
                    title={video.judul}
                    allowFullScreen
                    loading="lazy"
                  ></iframe>
                ) : (
                  <video 
                    src={video.link} 
                    controls 
                    onPlay={() => handleVideoPlay(video)}
                    style={{
                      position: "absolute",
                      inset: 0,
                      width: "100%",
                      height: "100%",
                      border: "none",
                      backgroundColor: "#000"
                    }}
                  />
                )}
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