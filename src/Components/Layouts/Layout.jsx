import React, { useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "./Footer";
import StarsCanvas from "../Elements/StarBackground";

const LayoutWeb = ({ children, bgColor = "bg-techstack-theme", isDark = true }) => {
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
        <div className="absolute h-96 w-96 rounded-full bg-cyan-400/12 blur-3xl -top-20 -left-20" />
        <div className="absolute h-96 w-96 rounded-full bg-amber-300/12 blur-3xl -bottom-20 -right-20" />
      </div>

      {/* Stars background for all sections */}
      <div className="pointer-events-none absolute inset-0 z-0 h-full w-full">
        <StarsCanvas />
      </div>

      {/* Konten Utama */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* <Navbar /> */}
        <div className="flex-grow">{children}</div> {/* Konten utama */}
        <Footer />
      </div>
    </div>
  );
};

export default LayoutWeb;