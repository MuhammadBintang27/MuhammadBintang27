import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import calmHeroImg from '../assets/images/hero/imagepertama.webp';
import {
  VERSION_KEY,
  VERSION_ROUTES,
  normaliseVersion,
  rememberVersion,
} from '../data/versionConfig';

const CONDENSED = "'Barlow Condensed','Roboto Condensed','Arial Narrow',sans-serif";

/* ---- Faux browser-window chrome shared by both previews ---- */
const WindowChrome = ({ url, dark }) => (
  <div
    className={`flex items-center gap-2 px-3 py-2 ${
      dark ? 'bg-[#16171d]' : 'bg-[#E8D2A8]'
    }`}
  >
    <span className="flex gap-1.5">
      <span className={`h-2 w-2 rounded-full ${dark ? 'bg-white/20' : 'bg-[#E5301E]'}`} />
      <span className={`h-2 w-2 rounded-full ${dark ? 'bg-white/20' : 'bg-[#F0A716]'}`} />
      <span className={`h-2 w-2 rounded-full ${dark ? 'bg-white/20' : 'bg-[#4A3220]/40'}`} />
    </span>
    <span
      className={`ml-1 truncate rounded px-2 py-0.5 text-[9px] font-medium tracking-wide ${
        dark ? 'bg-white/5 text-white/40' : 'bg-[#FFFDF8]/60 text-[#4A3220]/70'
      }`}
    >
      {url}
    </span>
  </div>
);

/* ---- Calm hero preview — mirrors the dark cinematic hero's final frame ---- */
const CalmPreview = () => (
  <div className="w-full overflow-hidden rounded-xl border border-white/10 bg-[#0b0c10] shadow-2xl">
    <WindowChrome url="bintang.dev/calm" dark />
    <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#0b0c10]">
      {/* full hero frame — the character + cinematic backdrop */}
      <div
        className="absolute inset-0"
        style={{ backgroundImage: `url(${calmHeroImg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      />
      {/* legibility gradients: darken edges + bottom for the overlays */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_38%,rgba(2,4,11,0.72)_100%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#02040b]/45 via-transparent to-[#02040b]/92" />

      {/* corner-bracket frame, like the real hero */}
      <div className="pointer-events-none absolute inset-2 border border-cyan-100/30">
        <span className="absolute -left-px -top-px h-3 w-3 border-l border-t border-cyan-100/80" />
        <span className="absolute -right-px -top-px h-3 w-3 border-r border-t border-cyan-100/80" />
        <span className="absolute -bottom-px -left-px h-3 w-3 border-b border-l border-cyan-100/80" />
        <span className="absolute -bottom-px -right-px h-3 w-3 border-b border-r border-cyan-100/80" />
      </div>

      {/* CREATE / INSPIRE eyebrow */}
      <div className="absolute inset-x-4 top-3 flex items-center justify-between text-[6px] font-bold uppercase tracking-[0.22em] text-cyan-100/85">
        <span>Create</span>
        <span>Inspire</span>
      </div>

      {/* Hola + oversized BINTANG wordmark, dropped below the face so the
          letters sit across the body instead of covering it */}
      <div className="absolute inset-x-0 top-[31%] flex flex-col items-center text-center">
        <p className="text-[6px] font-semibold tracking-[0.14em] text-[#e8e0c2]/85" style={{ fontFamily: "'DM Mono',monospace" }}>
          Hola, I&apos;m
        </p>
        <p
          className="text-[#E8E0C2]"
          style={{
            fontFamily: CONDENSED,
            fontWeight: 900,
            fontSize: 'clamp(2.2rem,9vw,3.6rem)',
            lineHeight: 0.8,
            letterSpacing: '-0.02em',
            textShadow: '0 1px 0 rgba(255,248,220,0.16), 0 8px 20px rgba(0,0,0,0.5)',
          }}
        >
          BINTANG
        </p>
      </div>

      {/* bottom-left tagline */}
      <div className="absolute bottom-3 left-3 max-w-[58%] text-left">
        <p
          className="mb-1 text-[5px] font-bold uppercase tracking-[0.2em] text-[#e8e0c2]/55"
          style={{ borderLeft: '1px solid rgba(220,210,180,0.4)', paddingLeft: '4px', fontFamily: "'DM Mono',monospace" }}
        >
          Software Engineer
        </p>
        <p className="text-[8px] font-semibold leading-tight text-[#e8e0c2]/90" style={{ fontFamily: CONDENSED }}>
          Someone who keeps learning and building.
        </p>
      </div>

      {/* bottom-right stat card */}
      <div
        className="absolute bottom-3 right-3 text-right"
        style={{ border: '1px solid rgba(220,210,180,0.2)', background: 'rgba(0,0,0,0.4)', padding: '4px 7px 3px' }}
      >
        <p
          className="font-black italic leading-none text-[#E8E0C2]"
          style={{ fontFamily: CONDENSED, fontSize: 'clamp(0.9rem,3.6vw,1.4rem)', letterSpacing: '0.02em' }}
        >
          10,000+
        </p>
        <p className="mt-0.5 text-[4.5px] font-bold uppercase tracking-[0.2em] text-[#e8e0c2]/55" style={{ fontFamily: "'DM Mono',monospace" }}>
          Hours of Coding
        </p>
      </div>
    </div>
  </div>
);

/* ---- Playful hero preview — mirrors the warm, bold hero ---- */
const PlayfulPreview = () => (
  <div className="w-full overflow-hidden rounded-xl border-2 border-[#241A12]/15 bg-[#F2E1C4] shadow-[6px_6px_0_rgba(36,26,18,0.15)]">
    <WindowChrome url="bintang.dev/playful" />
    <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#F2E1C4]">
      <div
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage: 'radial-gradient(rgba(214,140,10,0.28) 1.2px, transparent 1.2px)',
          backgroundSize: '14px 14px',
        }}
      />
      {/* wordmark */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="font-mouse uppercase leading-none text-[#E5301E] [-webkit-text-stroke:3px_#FFFDF8] [paint-order:stroke_fill] drop-shadow-[2px_2px_0_rgba(36,26,18,0.16)]" style={{ fontSize: 'clamp(2rem,7vw,3.4rem)' }}>
          BINTANG
        </span>
      </div>
      {/* hero photo */}
      <img
        src="/heroplayful.webp"
        alt=""
        aria-hidden="true"
        onError={(e) => { e.currentTarget.style.display = 'none'; }}
        className="absolute bottom-0 left-1/2 z-10 h-[92%] w-auto -translate-x-1/2 object-contain drop-shadow-[4px_5px_0_rgba(36,26,18,0.16)]"
      />

      {/* doodles hugging the corners, echoing the real hero */}
      <img
        src="/playful/terminal.webp"
        alt=""
        aria-hidden="true"
        onError={(e) => { e.currentTarget.style.display = 'none'; }}
        className="pointer-events-none absolute left-1 top-1 z-20 w-[26%] max-w-[70px] -rotate-12 object-contain drop-shadow-[2px_2px_0_rgba(36,26,18,0.12)]"
      />
      <img
        src="/playful/bug.webp"
        alt=""
        aria-hidden="true"
        onError={(e) => { e.currentTarget.style.display = 'none'; }}
        className="pointer-events-none absolute bottom-1 right-1 z-20 w-[18%] max-w-[48px] rotate-12 object-contain drop-shadow-[2px_2px_0_rgba(36,26,18,0.12)]"
      />
      <img
        src="/playful/mouse.webp"
        alt=""
        aria-hidden="true"
        onError={(e) => { e.currentTarget.style.display = 'none'; }}
        className="pointer-events-none absolute bottom-2 left-2 z-20 w-[17%] max-w-[46px] -rotate-6 object-contain drop-shadow-[2px_2px_0_rgba(36,26,18,0.12)]"
      />
      <img
        src="/playful/laptop.webp"
        alt=""
        aria-hidden="true"
        onError={(e) => { e.currentTarget.style.display = 'none'; }}
        className="pointer-events-none absolute right-1 top-2 z-20 w-[22%] max-w-[58px] rotate-6 object-contain drop-shadow-[2px_2px_0_rgba(36,26,18,0.12)]"
      />

      {/* floating tag */}
      <span className="absolute left-1/2 top-1.5 z-30 -translate-x-1/2 -rotate-3 whitespace-nowrap text-center font-modak text-[8px] leading-tight tracking-wide text-[#F0A716] [-webkit-text-stroke:1.2px_#FFFDF8] [paint-order:stroke_fill]">
        Software Engineering
      </span>
    </div>
  </div>
);

const VersionChooser = () => {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);
  const [hovered, setHovered] = useState(null); // 'calm' | 'playful' | null

  useEffect(() => {
    const stored = normaliseVersion(window.localStorage.getItem(VERSION_KEY));
    if (stored) {
      navigate(VERSION_ROUTES[stored], { replace: true });
      return;
    }
    setReady(true);
  }, [navigate]);

  const choose = (version) => {
    rememberVersion(version);
    navigate(VERSION_ROUTES[version]);
  };

  if (!ready) return null;

  return (
    <div className="relative flex min-h-[100dvh] w-full flex-col overflow-hidden sm:flex-row">
      {/* ---- Calm panel ---- */}
      <motion.button
        type="button"
        onClick={() => choose('calm')}
        onMouseEnter={() => setHovered('calm')}
        onMouseLeave={() => setHovered(null)}
        initial={{ clipPath: 'inset(0 0 100% 0)' }}
        animate={{ clipPath: 'inset(0 0 0% 0)' }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="group relative flex flex-1 flex-col items-center justify-center overflow-hidden bg-[#0f1014] px-6 py-16 text-center transition-[flex-grow] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] sm:py-0"
        style={{ flexGrow: hovered === 'calm' ? 1.3 : hovered === 'playful' ? 0.85 : 1 }}
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_58%,rgba(56,189,248,0.12),transparent_58%)]" />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex w-full max-w-sm flex-col items-center"
        >
          <motion.div
            animate={{ y: hovered === 'calm' ? -6 : 0, rotate: hovered === 'calm' ? -1 : 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mb-7 w-full"
          >
            <CalmPreview />
          </motion.div>

          <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.4em] text-cyan-100/50">
            Version 01
          </p>
          <h2 className="text-[clamp(2.2rem,6vw,4rem)] font-black uppercase leading-[0.9] tracking-[-0.03em] text-[#e8e0c2]">
            Calm
          </h2>
          <div className="mt-4 max-w-sm">
            <p className="text-base font-medium leading-snug text-[#e8e0c2]/80 sm:text-lg">
              Every detail whispers. Every interaction flows.
            </p>
            <p className="mt-2 text-sm leading-relaxed text-white/45 sm:text-[15px]">
              An experience shaped by balance, precision, and the beauty of less.
            </p>
          </div>

          <span className="mt-7 inline-flex items-center gap-2 rounded-full border border-white/15 px-7 py-3 text-sm font-bold text-white/70 transition group-hover:gap-3 group-hover:border-white/40 group-hover:text-white">
            Enter
          </span>
        </motion.div>
      </motion.button>

      {/* ---- Playful panel ---- */}
      <motion.button
        type="button"
        onClick={() => choose('playful')}
        onMouseEnter={() => setHovered('playful')}
        onMouseLeave={() => setHovered(null)}
        initial={{ clipPath: 'inset(100% 0 0 0)' }}
        animate={{ clipPath: 'inset(0% 0 0 0)' }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="group relative flex flex-1 flex-col items-center justify-center overflow-hidden bg-[#F2E1C4] px-6 py-16 text-center transition-[flex-grow] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] sm:py-0"
        style={{ flexGrow: hovered === 'playful' ? 1.3 : hovered === 'calm' ? 0.85 : 1 }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage: 'radial-gradient(rgba(214,140,10,0.18) 1.5px, transparent 1.5px)',
            backgroundSize: '22px 22px',
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex w-full max-w-sm flex-col items-center"
        >
          <motion.div
            animate={{ y: hovered === 'playful' ? -6 : 0, rotate: hovered === 'playful' ? 1.5 : 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mb-7 w-full"
          >
            <PlayfulPreview />
          </motion.div>

          <p className="mb-2 font-modak text-sm tracking-wide text-[#D68C0A]">
            Version 02
          </p>
          <h2 className="font-mouse text-[clamp(2.4rem,6.5vw,4.4rem)] uppercase leading-[0.9] text-[#E5301E] [-webkit-text-stroke:4px_#FFFDF8] [paint-order:stroke_fill] drop-shadow-[3px_3px_0_rgba(36,26,18,0.16)]">
            Playful
          </h2>
          <div className="mt-4 max-w-sm">
            <p className="text-base font-semibold leading-snug text-[#241A12] sm:text-lg">
              Every detail smiles. Every interaction dances.
            </p>
            <p className="mt-2 text-sm leading-relaxed text-[#4A3220]/80 sm:text-[15px]">
              An experience driven by curiosity, expression, and the joy of more.
            </p>
          </div>

          <span className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#E5301E] px-7 py-3 text-sm font-bold text-[#FFFDF8] shadow-[3px_3px_0_rgba(36,26,18,0.18)] transition group-hover:gap-3 group-hover:bg-[#C22112] group-hover:shadow-[5px_5px_0_rgba(36,26,18,0.22)]">
            Enter
          </span>
        </motion.div>
      </motion.button>

      {/* ---- Centre intro badge ---- */}
      {/* Positioning lives on the outer wrapper; the scale animation lives on
          the inner node so Framer's inline transform can't clobber the
          -translate-x-1/2 that centres the badge. */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 sm:top-8 sm:translate-y-0">
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-full border border-white/15 bg-black/40 px-5 py-2 text-center backdrop-blur-md"
        >
          <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/60">
            Choose your experience
          </span>
        </motion.div>
      </div>

      {/* ---- Signature ---- */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.6 }}
        className="pointer-events-none absolute bottom-5 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.28em] text-white/40 mix-blend-difference"
      >
        Muhammad Bintang Indra Hidayat · Portfolio
      </motion.p>
    </div>
  );
};

export default VersionChooser;
