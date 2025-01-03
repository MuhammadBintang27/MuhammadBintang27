import React from 'react';
import './style.css';

const Gallery = () => {
    return (
        <div className="banner h-screen">
            <div className="slider" style={{ '--quantity': 10 }}>
                <div className="item" style={{ '--position': 1 }}>
                    <img src="../../fotoutama.png" alt="" />
                </div>
                <div className="item" style={{ '--position': 2 }}>
                    <img src="../../fotoutama.png" alt="" />
                </div>
                <div className="item" style={{ '--position': 3 }}>
                    <img src="../../galeri/galeri1.jpg" alt="" />
                </div>
                <div className="item" style={{ '--position': 4 }}>
                    <img src="images/dragon_4.jpg" alt="" />
                </div>
                <div className="item" style={{ '--position': 5 }}>
                    <img src="images/dragon_5.jpg" alt="" />
                </div>
                <div className="item" style={{ '--position': 6 }}>
                    <img src="images/dragon_6.jpg" alt="" />
                </div>
                <div className="item" style={{ '--position': 7 }}>
                    <img src="images/dragon_7.jpg" alt="" />
                </div>
                <div className="item" style={{ '--position': 8 }}>
                    <img src="images/dragon_8.jpg" alt="" />
                </div>
                <div className="item" style={{ '--position': 9 }}>
                    <img src="images/dragon_9.jpg" alt="" />
                </div>
                <div className="item" style={{ '--position': 10 }}>
                    <img src="images/dragon_10.jpg" alt="" />
                </div>
            </div>
            <div className="content">
            <h1 data-content="CSS ONLY">CSS ONLY</h1>
                <div className="author">
                    <h2>LUN DEV</h2>
                    <p><b>Web Design</b></p>
                    <p>
                        Subscribe to the channel to watch many interesting videos
                    </p>
                </div>
                <div className="model"></div>
            </div>
        </div>
    );
};

export default Gallery;
