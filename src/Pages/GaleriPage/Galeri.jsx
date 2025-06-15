import React from "react";
import "./style.css";

const Gallery = () => {
  return (
    <div className="banner h-screen">
      <div className="slider" style={{ "--quantity": 10 }}>
        <div className="item" style={{ "--position": 1 }}>
          <img src="/galeri/photo1.jpg" alt="1" />
        </div>
        <div className="item" style={{ "--position": 2 }}>
          <img src="/galeri/photo2.jpg" alt="2" />
        </div>
        <div className="item" style={{ "--position": 3 }}>
          <img src="/galeri/photo3.jpg" alt="3" />
        </div>
        <div className="item" style={{ "--position": 4 }}>
          <img src="/galeri/photo4.jpg" alt="4" />
        </div>
        <div className="item" style={{ "--position": 5 }}>
          <img src="/galeri/photo5.jpg" alt="5" />
        </div>
        <div className="item" style={{ "--position": 6 }}>
          <img src="/galeri/photo6.jpg" alt="6" />
        </div>
        <div className="item" style={{ "--position": 7 }}>
          <img src="/galeri/photo7.jpg" alt="7" />
        </div>
        <div className="item" style={{ "--position": 8 }}>
          <img src="/galeri/photo8.jpg" alt="8" />
        </div>
        <div className="item" style={{ "--position": 9 }}>
          <img src="/galeri/photo9.jpg" alt="9" />
        </div>
        <div className="item" style={{ "--position": 10 }}>
          <img src="/galeri/photo10.jpg" alt="10" />
        </div>
      </div>
      <div className="content">
        <h1 data-content="LENS OF ME">LENS OF ME</h1>
        <div className="author">
          <h2>Captured</h2>
          <p>
            <b>Photography Journey</b>
          </p>
          <p>"Lens of Me" showcases my world, captured one frame at a time.</p>
        </div>
        <div
          className="model"
          style={{ backgroundImage: `url("/fototengah.png")` }}
        ></div>
      </div>
    </div>
  );
};

export default Gallery;
