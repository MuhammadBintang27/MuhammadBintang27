import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { NAV_ITEMS } from "../../../data/navData";
import { VERSION_ROUTES, rememberVersion } from "../../../data/versionConfig";

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const switchToPlayful = () => {
    setIsOpen(false);
    rememberVersion("playful");
    navigate(VERSION_ROUTES.playful);
  };

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") setIsOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const handleNavClick = (id) => {
    setIsOpen(false);
    if (location.pathname === "/calm") {
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 320);
    } else {
      navigate(`/calm#${id}`);
    }
  };

  return (
    <>
      {/* Hamburger / Close button — always visible */}
      <div className="fixed right-4 top-4 z-[200] sm:right-6 sm:top-6">
        <button
          onClick={() => setIsOpen((v) => !v)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          className="relative flex h-10 w-10 flex-col items-center justify-center gap-[5px] rounded-full border border-white/15 bg-[#0f1014]/80 backdrop-blur-md transition hover:border-white/30"
        >
          <motion.span
            animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
            className="block h-px w-[18px] origin-center bg-white"
          />
          <motion.span
            animate={{ opacity: isOpen ? 0 : 1, scaleX: isOpen ? 0 : 1 }}
            transition={{ duration: 0.15 }}
            className="block h-px w-[18px] bg-white"
          />
          <motion.span
            animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
            className="block h-px w-[18px] origin-center bg-white"
          />
        </button>
      </div>

      {/* Full-screen overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28 }}
            className="fixed inset-0 z-[190] bg-[#09090c]"
          >
            {/* Logo */}
            <div className="absolute left-5 top-5 sm:left-8 sm:top-7">
              <button
                onClick={() => handleNavClick("home")}
                className="text-base font-black uppercase tracking-tight text-[#e8e0c2]/70 transition hover:text-[#e8e0c2]"
              >
                Bintang.
              </button>
            </div>

            {/* Nav items */}
            <div className="flex h-full flex-col justify-center px-8 sm:px-16 lg:px-24">
              <nav aria-label="Main navigation">
                {NAV_ITEMS.map((item, i) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -32 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -16 }}
                    transition={{ duration: 0.32, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <button
                      onClick={() => handleNavClick(item.id)}
                      className="group block py-0.5 text-left text-[clamp(2.6rem,8.5vw,7rem)] font-black uppercase leading-[1.05] tracking-[-0.025em] text-[#e8e0c2]/55 transition-colors duration-100 hover:text-[#e8e0c2]"
                    >
                      {item.label}
                    </button>
                  </motion.div>
                ))}
              </nav>
            </div>

            {/* Bottom bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.28, duration: 0.3 }}
              className="absolute bottom-7 left-5 right-5 flex items-center justify-between gap-4 sm:left-8 sm:right-8"
            >
              {/* Version switcher */}
              <div className="flex items-center gap-2.5">
                <span className="hidden text-[11px] font-semibold uppercase tracking-[0.22em] text-white/30 sm:inline">
                  Version
                </span>
                <button
                  type="button"
                  onClick={switchToPlayful}
                  aria-label="Switch to the playful version"
                  className="rounded-full bg-[#E5301E] px-5 py-2.5 text-sm font-bold text-[#FFFDF8] shadow-[3px_3px_0_rgba(0,0,0,0.35)] transition hover:bg-[#C22112]"
                >
                  Playful
                </button>
              </div>

              <p className="text-right text-[11px] font-semibold uppercase tracking-[0.22em] text-white/25">
                Portfolio · {new Date().getFullYear()}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Nav;
