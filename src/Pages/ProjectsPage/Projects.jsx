import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Import Link component for routing
import "./style.css";

const Projects = () => {
  const [active, setActive] = useState(0);
  const [zIndex, setZIndex] = useState(2);
  const [direction, setDirection] = useState("next"); // Track animation direction
  const items = [
    {
      imgSrc: "project/gascariProject.png",
      bgColor: "#14B8A6",
      title: "GasCari",
      description: "GasCari Search Engine",
      category: "Apa itu GasCari?",
      details:
        "GasCari adalah sistem penelusuran informasi otomotif yang dikembangkan sebagai proyek akhir mata kuliah Penelusuran Informasi. Sistem ini memanfaatkan teknologi seperti TF-IDF, Cosine Similarity, dan Jaccard Similarity untuk mencocokkan kueri pengguna dengan artikel dari sumber terpercaya seperti Autonetmagz, Motorplus, dan Oto-Detik. Dengan antarmuka responsif berbasis React, serta fitur crawling dan scraping, GasCari menyediakan pencarian artikel yang cepat, relevan, dan mudah digunakan. 🚗🔍",
      link: "/project-details", // Add link path here
    },
    {
      imgSrc: "project/ayadesign.png",
      bgColor: "#FB923C",
      title: "AyaDesign",
      description: "AyaDesign Platform",
      category: "Apa itu AyaDesign?",
      details:
        "AyaDesign adalah sebuah platform online yang dirancang untuk memudahkan jual beli desain kreatif antara desainer dan pelanggan. Platform ini dikembangkan sebagai proyek akhir mata kuliah Pemrograman Berbasis Web, dengan tujuan menciptakan solusi praktis untuk menjembatani kreativitas desainer dan kebutuhan pelanggan. Melalui AyaDesign, desainer dapat memamerkan karya mereka, menetapkan harga, dan menjangkau calon pembeli, sementara pelanggan dapat dengan mudah menjelajahi dan membeli desain yang diinginkan. Proses pembelian dilakukan secara efisien, di mana pelanggan akan diarahkan ke WhatsApp admin untuk konfirmasi dan detail pesanan.",
      link: "/project-details/", // Add link path here
    },
  ];

  const handleNext = () => {
    setDirection("next");
    setActive((prev) => (prev + 1) % items.length);
    setZIndex((prev) => prev + 1);
  };

  const handlePrev = () => {
    setDirection("prev");
    setActive((prev) => (prev - 1 + items.length) % items.length);
    setZIndex((prev) => prev + 1);
  };

  const handleDotClick = (index) => {
    if (index !== active) {
      setDirection(index > active ? "next" : "prev");
      setActive(index);
      setZIndex((prev) => prev + 1);
    }
  };

  useEffect(() => {
    const autoRun = setTimeout(() => {
      handleNext();
    }, 10000);

    return () => clearTimeout(autoRun);
  }, [active]);

  useEffect(() => {
    showSlider(direction);
  }, [active, direction]);

  const showSlider = (type) => {
    const carousel = document.querySelector(".carousel");
    carousel.style.pointerEvents = "none";

    let itemActiveOld = document.querySelector(".carousel .list .item.active");
    if (itemActiveOld) itemActiveOld.classList.remove("active");

    setZIndex((prev) => prev + 1);
    document.querySelectorAll(".carousel .list .item")[active].style.zIndex =
      zIndex;
    document
      .querySelectorAll(".carousel .list .item")
      [active].classList.add("active");

    if (type === "next") {
      carousel.style.setProperty("--transform", "300px");
    } else {
      carousel.style.setProperty("--transform", "-300px");
    }
    carousel.classList.add("effect");

    let dotActiveOld = document.querySelector(".dots li.active");
    if (dotActiveOld) dotActiveOld.classList.remove("active");
    document.querySelectorAll(".dots li")[active].classList.add("active");

    setTimeout(() => {
      carousel.classList.remove("effect");
      carousel.style.pointerEvents = "auto";
    }, 1500);
  };

  return (
    <div className="carousel h-screen">
      <div className="list">
        {items.map((item, index) => (
          <div
            key={index}
            className={`item ${index === active ? "active" : ""} ${direction}`}
            style={{
              "--img-src": `url(${item.imgSrc})`,
              "--bg-color": item.bgColor,
              "--title": `'${item.title}'`,
              zIndex: index === active ? zIndex : 1,
            }}
          >
            <div className="content">
              <div
                className="image"
                style={{ backgroundImage: `url(${item.imgSrc})` }}
              >
                {/* Hover button to navigate */}
                <Link
                  to={item.link}
                  state={{
                    projectName: item.title,
                    description: item.description,
                    imgSrc: item.imgSrc,
                    bgColor: item.bgColor,
                    details: item.details,
                  }}
                  className="hover-button"
                >
                  Go to Project
                </Link>
              </div>
              <div className="info">
                <div className="title">{item.description}</div>
                <div className="category">{item.category}</div>
                <div className="des">{item.details}</div>
                <Link
                  to={item.link}
                  state={{
                    projectName: item.title,
                    description: item.description,
                    imgSrc: item.imgSrc,
                    bgColor: item.bgColor,
                    details: item.details,
                  }}
                >
                  See More <span>&#8594;</span>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="arrows">
        <button id="prev" onClick={handlePrev}>
          &lt;
        </button>
        <button id="next" onClick={handleNext}>
          &gt;
        </button>
      </div>
      <ul className="dots">
        {items.map((_, index) => (
          <li
            key={index}
            className={index === active ? "active" : ""}
            onClick={() => handleDotClick(index)}
          ></li>
        ))}
      </ul>
    </div>
  );
};

export default Projects;
