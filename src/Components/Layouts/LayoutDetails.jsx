import React, { useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "./Footer";
import StarsCanvas from "../Elements/StarBackground";

const LayoutDetails = ({ children, bgColor = "bg-[#1B2B65]", isDark = true }) => {
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
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl -top-20 -left-20" />
        <div className="absolute w-96 h-96 bg-blue-400/10 rounded-full blur-3xl -bottom-20 -right-20" />
      </div>

      {/* StarsCanvas berada di atas background */}
      <div className="absolute inset-0 z-0 w-full h-full">
        <StarsCanvas />
      </div>

      {/* Konten Utama */}
      <div className="relative z-10 min-h-screen flex flex-col">
        <div className="flex-grow">{children}</div> {/* Konten utama */}
        <Footer />
      </div>
    </div>
  );
};

export default LayoutDetails;