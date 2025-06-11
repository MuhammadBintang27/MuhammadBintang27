import React, { useEffect } from "react";
import Nav from "./Nav";
import Footer from "./Footer";
import StarsCanvas from "../Elements/StarBackground";

const LayoutWeb = ({ children, bgColor = "bg-blue-900", isDark = true }) => {
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  // Fungsi untuk memeriksa apakah nilai `bgColor` adalah hex
  const isHexColor = (color) => /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color);

  // Tentukan style berdasarkan tipe `bgColor`
  const backgroundStyle = isHexColor(bgColor)
    ? { backgroundColor: bgColor } // Gunakan inline style untuk hex
    : {}; // Kosongkan jika bukan hex

  return (
    <div
      className={`relative w-full min-h-screen ${
        isHexColor(bgColor) ? "" : bgColor // Gunakan class Tailwind jika bukan hex
      } text-textDark`}
      style={backgroundStyle} // Terapkan inline style jika hex
    >
      {/* StarsCanvas berada di atas background */}
      <div className="absolute inset-0 z-0 w-full h-full">
        <StarsCanvas />
      </div>

      {/* Konten Utama */}
      <div className="relative z-10 min-h-screen flex flex-col">
        <Nav />
        <div className="flex-grow">{children}</div> {/* Konten utama */}
        <Footer />
      </div>
    </div>
  );
};

export default LayoutWeb;
