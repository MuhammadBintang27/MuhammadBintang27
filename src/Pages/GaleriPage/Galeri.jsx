import React from "react";
import "./style.css";
import OptimizedImage from "../../Components/Elements/OptimizedImage";

const Gallery = () => {
  return (
    <div className="banner h-screen">
      <div className="slider" style={{ "--quantity": 10 }}>
        <div className="item" style={{ "--position": 1 }}>
          <OptimizedImage src="/galeri/photo1.jpg" alt="1" bare />
        </div>
        <div className="item" style={{ "--position": 2 }}>
          <OptimizedImage src="/galeri/photo2.jpg" alt="2" bare />
        </div>
        <div className="item" style={{ "--position": 3 }}>
          <OptimizedImage src="/galeri/photo3.jpg" alt="3" bare />
        </div>
        <div className="item" style={{ "--position": 4 }}>
          <OptimizedImage src="/galeri/photo4.jpg" alt="4" bare />
        </div>
        <div className="item" style={{ "--position": 5 }}>
          <OptimizedImage src="/galeri/photo5.jpg" alt="5" bare />
        </div>
        <div className="item" style={{ "--position": 6 }}>
          <OptimizedImage src="/galeri/photo6.jpg" alt="6" bare />
        </div>
        <div className="item" style={{ "--position": 7 }}>
          <OptimizedImage src="/galeri/photo7ps.jpg" alt="7" bare />
        </div>
        <div className="item" style={{ "--position": 8 }}>
          <OptimizedImage src="/galeri/photo8.jpg" alt="8" bare />
        </div>
        <div className="item" style={{ "--position": 9 }}>
          <OptimizedImage src="/galeri/photo9.jpg" alt="9" bare />
        </div>
        <div className="item" style={{ "--position": 10 }}>
          <OptimizedImage src="/galeri/photo10ps.jpg" alt="10" bare />
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
          style={{ backgroundImage: `url("/fototengah1.png")` }}
        ></div>
      </div>
    </div>
  );
};

export default Gallery;
