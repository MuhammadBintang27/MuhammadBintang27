import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { NAV_ITEMS } from '../../../data/navData';
import { VERSION_ROUTES, rememberVersion } from '../../../data/versionConfig';

const PlayfulNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const switchToCalm = () => {
    setIsOpen(false);
    rememberVersion('calm');
    navigate(VERSION_ROUTES.calm);
  };

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setIsOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const handleNavClick = (id) => {
    setIsOpen(false);
    if (location.pathname === '/playful') {
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 320);
    } else {
      navigate(`/playful#${id}`);
    }
  };

  return (
    <>
      {/* Pills — always visible */}
      <div className="fixed right-4 top-4 z-[200] flex items-center gap-2 sm:right-6 sm:top-6 sm:gap-3">
        <button
          type="button"
          onClick={() => handleNavClick('projects')}
          className="rounded-full bg-[#E5301E] px-4 py-2 text-sm font-bold text-[#FFFDF8] shadow-[3px_3px_0_rgba(36,26,18,0.18)] transition hover:bg-[#C22112] sm:px-5"
        >
          Projects
        </button>
        <button
          type="button"
          onClick={() => setIsOpen((v) => !v)}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          className="rounded-full bg-[#FFFDF8] px-4 py-2 text-sm font-bold text-[#241A12] shadow-[3px_3px_0_rgba(36,26,18,0.18)] transition hover:bg-[#F3E6CC] sm:px-5"
        >
          {isOpen ? '✕ Close' : '☰ Menu'}
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
            className="fixed inset-0 z-[190] bg-[#E5301E]"
          >
            {/* Small wordmark */}
            <div className="absolute right-5 top-5 sm:right-8 sm:top-7">
              <button
                type="button"
                onClick={() => handleNavClick('home')}
                className="font-mouse text-xl uppercase tracking-wide text-[#F5C63D] [-webkit-text-stroke:1px_#8C1A0E] [paint-order:stroke_fill] sm:text-2xl"
              >
                Bintang
              </button>
            </div>

            {/* Nav items — bubble-letter Modak style */}
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
                      type="button"
                      onClick={() => handleNavClick(item.id)}
                      className="group block py-1 text-left font-modak text-[clamp(2.2rem,7.5vw,5.2rem)] uppercase leading-[1.08] tracking-wide text-[#F5C63D] transition-transform duration-150 hover:translate-x-2"
                      style={{ textShadow: '0 5px 0 #C9820F' }}
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
                <span className="hidden font-modak text-sm tracking-wide text-[#FFFDF8]/70 sm:inline">
                  Version
                </span>
                <button
                  type="button"
                  onClick={switchToCalm}
                  aria-label="Switch to the calm version"
                  className="rounded-full bg-[#0f1014] px-5 py-2.5 text-sm font-bold text-[#F2E1C4] shadow-[3px_3px_0_rgba(36,26,18,0.25)] transition hover:bg-black"
                >
                  Calm
                </button>
              </div>

              <p className="text-right text-[11px] font-semibold uppercase tracking-[0.22em] text-[#FFFDF8]/60">
                Portfolio · {new Date().getFullYear()}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PlayfulNav;
