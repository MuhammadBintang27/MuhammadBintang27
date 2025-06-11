import React from 'react';
import './style.css';

const Gallery = () => {
    return (
        <div className="banner h-screen">
            <div className="slider" style={{ '--quantity': 10 }}>
                <div className="item" style={{ '--position': 1 }}>
                    <img src="./../../galeri/foto1.jpg" alt="1" />
                </div>
                <div className="item" style={{ '--position': 2 }}>
                    <img src="./../../galeri/foto2.jpg" alt="2" />
                </div>
                <div className="item" style={{ '--position': 3 }}>
                    <img src="./../../galeri/foto3.jpg" alt="3" />
                </div>
                <div className="item" style={{ '--position': 4 }}>
                    <img src="./../../galeri/foto4.JPG" alt="4" />
                </div>
                <div className="item" style={{ '--position': 5 }}>
                    <img src="./../../galeri/foto5.JPG" alt="5" />
                </div>
                <div className="item" style={{ '--position': 6 }}>
                    <img src="./../../galeri/foto6.JPG" alt="6" />
                </div>
                <div className="item" style={{ '--position': 7 }}>
                    <img src="./../../galeri/foto7.JPG" alt="7" />
                </div>
                <div className="item" style={{ '--position': 8 }}>
                    <img src="./../../galeri/foto8.JPG" alt="8" />
                </div>
                <div className="item" style={{ '--position': 9 }}>
                    <img src="./../../galeri/foto9.JPG" alt="9" />
                </div>
                <div className="item" style={{ '--position': 10 }}>
                    <img src="./../../galeri/foto10.JPG" alt="10" />
                </div>
            </div>
            <div className="content">
    <h1 data-content="LENS OF ME">LENS OF ME</h1>
    <div className="author">
        <h2>Captured</h2>
        <p><b>Photography Journey</b></p>
        <p>
            "Lens of Me" showcases my world, captured one frame at a time.
        </p>
    </div>
    <div className="model"></div>
</div>

        </div>
    );
};

export default Gallery;
