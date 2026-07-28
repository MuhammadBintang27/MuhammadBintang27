import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { NAV_ITEMS } from '../../../data/navData';
import { VERSION_ROUTES, rememberVersion } from '../../../data/versionConfig';

// Overshoot easing shared with the rest of the Playful theme (Hero tags,
// About/Contact pop-ins) so the nav bounces with the same personality.
const BOUNCE = [0.34, 1.56, 0.64, 1];

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
      {/* Pills — always visible, drop in with a bounce on mount and wiggle on
          hover instead of sitting there inert. */}
      <div className="fixed right-4 top-4 z-[200] flex items-center gap-2 sm:right-6 sm:top-6 sm:gap-3">
        <motion.button
          initial={{ opacity: 0, y: -22, scale: 0.7 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.25, ease: BOUNCE }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          type="button"
          onClick={() => handleNavClick('projects')}
          className="rounded-full bg-[#E5301E] px-4 py-2 text-sm font-bold text-[#FFFDF8] shadow-[3px_3px_0_rgba(36,26,18,0.18)] transition-colors hover:bg-[#C22112] sm:px-5"
        >
          Projects
        </motion.button>
        <motion.button
          initial={{ opacity: 0, y: -22, scale: 0.7 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.35, ease: BOUNCE }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          type="button"
          onClick={() => setIsOpen((v) => !v)}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          className="overflow-hidden rounded-full bg-[#FFFDF8] px-4 py-2 text-sm font-bold text-[#241A12] shadow-[3px_3px_0_rgba(36,26,18,0.18)] transition-colors hover:bg-[#F3E6CC] sm:px-5"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={isOpen ? 'close' : 'open'}
              initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 90, scale: 0.6 }}
              transition={{ duration: 0.25, ease: BOUNCE }}
              className="inline-block"
            >
              {isOpen ? '✕ Close' : '☰ Menu'}
            </motion.span>
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Full-screen overlay — bursts open from the menu pill like a splash of
          paint (clip-path circle reveal) instead of a flat cross-fade. */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ clipPath: 'circle(0% at 94% 5%)' }}
            animate={{ clipPath: 'circle(150% at 94% 5%)' }}
            exit={{ clipPath: 'circle(0% at 94% 5%)' }}
            transition={{ duration: 0.55, ease: [0.65, 0, 0.35, 1] }}
            className="fixed inset-0 z-[190] bg-[#E5301E]"
          >
            {/* Small wordmark */}
            <div className="absolute right-5 top-5 sm:right-8 sm:top-7">
              <motion.button
                initial={{ opacity: 0, y: -10, rotate: -6, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.35, delay: 0.25, ease: BOUNCE }}
                whileHover={{ rotate: -4, scale: 1.05 }}
                type="button"
                onClick={() => handleNavClick('home')}
                className="font-mouse text-xl uppercase tracking-wide text-[#F5C63D] [-webkit-text-stroke:1px_#8C1A0E] [paint-order:stroke_fill] sm:text-2xl"
              >
                Bintang
              </motion.button>
            </div>

            {/* Nav items — bubble-letter Modak style, bounce in one by one and
                wiggle/slide on hover instead of a plain colour change. */}
            <div className="flex h-full flex-col justify-center px-8 sm:px-16 lg:px-24">
              <nav aria-label="Main navigation">
                {NAV_ITEMS.map((item, i) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -48, rotate: -4 }}
                    animate={{ opacity: 1, x: 0, rotate: 0 }}
                    exit={{ opacity: 0, x: -24, rotate: -2 }}
                    transition={{ duration: 0.45, delay: 0.2 + i * 0.07, ease: BOUNCE }}
                  >
                    <motion.button
                      whileHover={{ x: 14, rotate: -2, scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      transition={{ duration: 0.2, ease: 'easeOut' }}
                      type="button"
                      onClick={() => handleNavClick(item.id)}
                      className="group block py-1 text-left font-modak text-[clamp(2.2rem,7.5vw,5.2rem)] uppercase leading-[1.08] tracking-wide text-[#F5C63D]"
                      style={{ textShadow: '0 5px 0 #C9820F' }}
                    >
                      {item.label}
                    </motion.button>
                  </motion.div>
                ))}
              </nav>
            </div>

            {/* Bottom bar */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ delay: 0.45, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="absolute bottom-7 left-5 right-5 flex items-center justify-between gap-4 sm:left-8 sm:right-8"
            >
              {/* Version switcher */}
              <div className="flex items-center gap-2.5">
                <span className="hidden font-modak text-sm tracking-wide text-[#FFFDF8]/70 sm:inline">
                  Version
                </span>
                <motion.button
                  whileHover={{ scale: 1.06, rotate: -3 }}
                  whileTap={{ scale: 0.94 }}
                  type="button"
                  onClick={switchToCalm}
                  aria-label="Switch to the calm version"
                  className="rounded-full bg-[#0f1014] px-5 py-2.5 text-sm font-bold text-[#F2E1C4] shadow-[3px_3px_0_rgba(36,26,18,0.25)] transition-colors hover:bg-black"
                >
                  Calm
                </motion.button>
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
