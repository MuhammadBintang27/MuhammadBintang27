import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const NAME = 'BINTANG';
const TICKER_TEXT = 'COOKING UP THE PORTFOLIO';

// Corner doodles that pop in and bob — same sticker set as the hero, so the
// loader already feels like the playful world before it opens.
const DOODLES = [
  { src: '/playful/terminal.webp', className: 'left-3 top-10 w-[26%] max-w-[190px] sm:left-10 sm:top-16', rotate: -12, delay: 0.45 },
  { src: '/playful/laptop.webp', className: 'right-3 top-10 w-[24%] max-w-[175px] sm:right-10 sm:top-16', rotate: 10, delay: 0.55 },
  { src: '/playful/mouse.webp', className: 'bottom-24 left-4 w-[20%] max-w-[140px] sm:bottom-28 sm:left-12', rotate: -8, delay: 0.65 },
  { src: '/playful/bug.webp', className: 'bottom-24 right-4 w-[18%] max-w-[128px] sm:bottom-28 sm:right-12', rotate: 12, delay: 0.75 },
];

const PlayfulLoader = () => {
  const [progress, setProgress] = useState(1);

  useEffect(() => {
    const duration = 1200;
    const start = performance.now();
    let rafId;

    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - (1 - t) * (1 - t);
      setProgress(Math.max(1, Math.round(eased * 100)));
      if (t < 1) {
        rafId = requestAnimationFrame(tick);
      }
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col justify-between overflow-hidden bg-[#F2E1C4]"
      style={{ willChange: 'transform' }}
      exit={{ y: '-100%' }}
      transition={{ duration: 0.85, ease: [0.83, 0, 0.17, 1] }}
    >
      {/* Warm dotted paper — echoes the hero and version-chooser preview */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          backgroundImage: 'radial-gradient(rgba(214,140,10,0.22) 1.5px, transparent 1.5px)',
          backgroundSize: '22px 22px',
        }}
      />

      {/* Floating corner doodles */}
      {DOODLES.map((d) => (
        <motion.img
          key={d.src}
          src={d.src}
          alt=""
          aria-hidden="true"
          onError={(e) => { e.currentTarget.style.display = 'none'; }}
          className={`pointer-events-none absolute z-0 object-contain drop-shadow-[3px_4px_0_rgba(36,26,18,0.14)] ${d.className}`}
          initial={{ opacity: 0, scale: 0.4, rotate: d.rotate * 2 }}
          animate={{ opacity: 1, scale: 1, rotate: d.rotate, y: [0, -8, 0] }}
          transition={{
            opacity: { duration: 0.4, delay: d.delay },
            scale: { type: 'spring', stiffness: 420, damping: 12, delay: d.delay },
            rotate: { type: 'spring', stiffness: 420, damping: 12, delay: d.delay },
            y: { duration: 2.4, ease: 'easeInOut', repeat: Infinity, delay: d.delay },
          }}
        />
      ))}

      

      {/* Center — comic-sticker wordmark with tilted tag badges */}
      <motion.div
        className="relative z-10 flex flex-1 flex-col items-center justify-center px-4"
        exit={{ y: -60, opacity: 0 }}
        transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
      >
        <div className="relative flex items-center justify-center">
          {/* Left tag */}
          <motion.span
            initial={{ opacity: 0, scale: 0.7, rotate: -18 }}
            animate={{ opacity: 1, scale: 1, rotate: -8 }}
            transition={{ duration: 0.55, delay: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
            className="absolute -left-4 top-1/2 z-20 -translate-y-1/2 -translate-x-1/2 whitespace-nowrap font-modak text-[clamp(0.85rem,2vw,1.3rem)] leading-none tracking-wide text-[#F0A716] [-webkit-text-stroke:3px_#FFFDF8] [paint-order:stroke_fill] drop-shadow-[2px_2px_0_rgba(36,26,18,0.18)] sm:-left-6"
          >
            Software
            <br />
            Engineering
          </motion.span>

          {/* Right tag */}
          <motion.span
            initial={{ opacity: 0, scale: 0.7, rotate: 18 }}
            animate={{ opacity: 1, scale: 1, rotate: 8 }}
            transition={{ duration: 0.55, delay: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
            className="absolute -right-4 top-1/2 z-20 -translate-y-1/2 translate-x-1/2 whitespace-nowrap font-modak text-[clamp(0.85rem,2vw,1.3rem)] leading-none tracking-wide text-[#F0A716] [-webkit-text-stroke:3px_#FFFDF8] [paint-order:stroke_fill] drop-shadow-[2px_2px_0_rgba(36,26,18,0.18)] sm:-right-6"
          >
            Full-Stack Web
            <br />
            &amp; Mobile
            <br />
            Development
          </motion.span>

          {/* Wordmark — pops in letter by letter */}
          <h1
            aria-label={NAME}
            className="flex items-baseline justify-center whitespace-nowrap font-mouse uppercase text-[#E5301E] [-webkit-text-stroke:8px_#FFFDF8] [paint-order:stroke_fill] drop-shadow-[6px_6px_0_rgba(36,26,18,0.16)]"
            style={{
              fontSize: 'clamp(5.6rem, 22vw, 13rem)',
              lineHeight: 0.92,
            }}
          >
            {NAME.split('').map((char, i) => (
              <motion.span
                key={i}
                className="inline-block"
                initial={{ y: 70, opacity: 0, rotate: i % 2 === 0 ? -10 : 10 }}
                animate={{ y: 0, opacity: 1, rotate: 0 }}
                transition={{
                  type: 'spring',
                  stiffness: 420,
                  damping: 14,
                  delay: 0.1 + i * 0.055,
                }}
              >
                {char}
              </motion.span>
            ))}
          </h1>
        </div>

        {/* Tagline — the playful promise */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-6 text-center font-modak text-sm tracking-wide text-[#E5301E] sm:text-base"
        >
          Every detail smiles · Every interaction dances
        </motion.p>
      </motion.div>

      {/* Bottom — scrolling gold ticker bar + progress counter */}
      <div className="relative z-10">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="px-6 pb-2 text-right text-[0.68rem] font-semibold uppercase tracking-[0.3em] text-[#241A12]/60 sm:px-10"
          style={{ fontFamily: "'DM Mono','Courier New',monospace" }}
        >
          {progress.toString().padStart(2, '0')}%
        </motion.p>

        <div className="overflow-hidden whitespace-nowrap bg-[#F0A716] py-3">
          <div className="inline-block animate-scroll-text">
            {Array.from({ length: 8 }).map((_, i) => (
              <span
                key={i}
                className="mx-4 inline-block font-modak text-lg tracking-wide text-[#FFFDF8] sm:text-xl"
              >
                {TICKER_TEXT} ·
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PlayfulLoader;
