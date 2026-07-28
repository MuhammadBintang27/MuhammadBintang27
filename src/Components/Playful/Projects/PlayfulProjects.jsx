import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { PROJECTS } from '../../../data/projectsData';

// Playful twin of the professional ProjectsSection — identical concept (a full
// width numbered work list with a cursor-following image preview) reskinned in
// the Playful palette: cream header with red ink, then the work list on a red
// slab (cream ink), comic outline type. It ends in a hand-poured "cat tumpah"
// (spilled-paint) drip edge that melts into the cream Tech Stack section below.

// Touch has no hover, so mobile gets a long-press-to-peek gesture instead:
// hold a row to preview the image, release to dismiss; a plain tap still
// navigates straight to the detail page like the button's onClick always did.
const LONG_PRESS_MS = 400;
const LONG_PRESS_MOVE_CANCEL_PX = 10;

const PlayfulProjects = () => {
  const navigate = useNavigate();
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [longPressIndex, setLongPressIndex] = useState(null);
  const previewRef = useRef(null);
  const longPressTimerRef = useRef(null);
  const longPressFiredRef = useRef(false);
  const touchStartRef = useRef({ x: 0, y: 0 });

  // Follow the cursor by writing the transform straight to the DOM node — no
  // React re-render per mousemove. Scoped to this section only.
  const handleMouseMove = (e) => {
    if (previewRef.current) {
      previewRef.current.style.transform = `translate(${e.clientX + 28}px, ${e.clientY - 72}px)`;
    }
  };

  const clearLongPressTimer = () => {
    if (longPressTimerRef.current) {
      window.clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }
  };

  const handleTouchStart = (e, index) => {
    const touch = e.touches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
    longPressFiredRef.current = false;
    clearLongPressTimer();
    longPressTimerRef.current = window.setTimeout(() => {
      longPressFiredRef.current = true;
      setLongPressIndex(index);
      navigator.vibrate?.(15);
    }, LONG_PRESS_MS);
  };

  const handleTouchMove = (e) => {
    if (!longPressTimerRef.current) return;
    const touch = e.touches[0];
    const dx = Math.abs(touch.clientX - touchStartRef.current.x);
    const dy = Math.abs(touch.clientY - touchStartRef.current.y);
    if (dx > LONG_PRESS_MOVE_CANCEL_PX || dy > LONG_PRESS_MOVE_CANCEL_PX) {
      clearLongPressTimer();
    }
  };

  const handleTouchEnd = (e) => {
    clearLongPressTimer();
    if (longPressFiredRef.current) {
      e.preventDefault();
      longPressFiredRef.current = false;
      setLongPressIndex(null);
    }
  };

  const handleTouchCancel = () => {
    clearLongPressTimer();
    longPressFiredRef.current = false;
    setLongPressIndex(null);
  };

  return (
    <>
      {/* Floating cursor preview — desktop only. All images stay mounted and
          pre-decoded; hovering only flips opacity, so the first hover never
          stutters on image decode. Framed like a playful photo sticker. */}
      <div
        ref={previewRef}
        className="pointer-events-none fixed left-0 top-0 z-[50] hidden md:block"
        style={{
          opacity: hoveredIndex !== null ? 1 : 0,
          scale: hoveredIndex !== null ? 1 : 0.88,
          rotate: hoveredIndex !== null ? '-3deg' : '-8deg',
          transition: 'opacity 0.18s ease, scale 0.18s ease, rotate 0.18s ease',
        }}
      >
        <div className="relative h-[220px] w-[360px] overflow-hidden rounded-[1.2rem] border-[5px] border-[#FFFDF8] bg-[#FFFDF8] shadow-[8px_10px_0_rgba(36,26,18,0.28)]">
          {PROJECTS.map((project, index) => (
            <img
              key={project.slug}
              src={project.src}
              alt={project.title}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full rounded-[0.85rem] object-cover"
              style={{
                opacity: hoveredIndex === index ? 1 : 0,
                transition: 'opacity 0.16s ease',
              }}
            />
          ))}
        </div>
      </div>

      {/* Long-press peek — mobile only. Mounts on demand since it's a rare,
          deliberate gesture rather than a per-frame hover. */}
      <AnimatePresence>
        {longPressIndex !== null && (
          <motion.div
            key="mobile-project-peek"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="pointer-events-none fixed inset-0 z-[50] flex items-center justify-center bg-[#241A12]/70 px-6 md:hidden"
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, rotate: -3 }}
              animate={{ scale: 1, opacity: 1, rotate: -2 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="w-full max-w-sm overflow-hidden rounded-[1.2rem] border-[5px] border-[#FFFDF8] bg-[#FFFDF8] shadow-[8px_10px_0_rgba(36,26,18,0.28)]"
            >
              <img
                src={PROJECTS[longPressIndex].src}
                alt={PROJECTS[longPressIndex].title}
                className="h-56 w-full rounded-[0.85rem] object-cover"
              />
              <div className="px-4 py-3">
                <p className="font-mouse text-lg uppercase tracking-tight text-[#E5301E]">{PROJECTS[longPressIndex].title}</p>
                <p className="mt-1 text-xs font-semibold text-[#4A3220]/70">Lepas untuk menutup</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <section
        id="projects"
        onMouseMove={handleMouseMove}
        className="relative overflow-hidden bg-[#F2E1C4] pt-16 sm:pt-20"
      >
        {/* Header */}
        <div className="mx-auto mb-10 w-full max-w-6xl px-4 sm:mb-14 sm:px-8">
          <header className="text-center">
            <p className="mb-3 font-modak text-sm uppercase tracking-[0.28em] text-[#D68C0A]">
              Selected Works
            </p>
            <h2 className="font-mouse text-[clamp(3.2rem,12vw,9rem)] uppercase leading-[0.9] tracking-tight text-[#E5301E] [-webkit-text-stroke:2px_#FFFDF8] [paint-order:stroke_fill] drop-shadow-[5px_6px_0_rgba(36,26,18,0.18)]">
              Projects
            </h2>
          </header>
        </div>

        {/* Work list on a red "poured paint" slab — cream ink on red. */}
        <div className="relative bg-[#E5301E]">
          <ul className="px-4 pb-16 sm:px-8 sm:pb-20">
          {PROJECTS.map((project, index) => (
            <motion.li
              key={project.slug}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
              className="group border-t-2 border-[#FFFDF8]/25 last:border-b-2 last:border-[#FFFDF8]/25"
            >
              <button
                type="button"
                onClick={() => navigate(`/playful/projects/${project.slug}`)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onTouchStart={(e) => handleTouchStart(e, index)}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                onTouchCancel={handleTouchCancel}
                onContextMenu={(e) => e.preventDefault()}
                className="flex w-full cursor-pointer select-none items-center gap-4 py-5 text-left transition-colors duration-200 [-webkit-touch-callout:none] sm:py-7"
              >
                <span className="w-10 shrink-0 font-modak text-base text-[#FFE7A6]/70 transition-colors duration-200 group-hover:text-[#FFE7A6] sm:w-14 sm:text-xl">
                  {String(index + 1).padStart(2, '0')}
                </span>

                <h3 className="flex-1 font-mouse text-[clamp(1.7rem,5vw,3.8rem)] uppercase leading-none tracking-tight text-[#FFFDF8] transition-all duration-200 group-hover:translate-x-2 group-hover:text-[#FFD23F]">
                  {project.title}
                </h3>

                <div className="hidden shrink-0 items-center gap-6 sm:flex">
                  <span className="text-sm font-semibold text-[#FFFDF8]/70">{project.category}</span>
                  <span className="w-10 text-right text-sm font-semibold text-[#FFFDF8]/55">{project.year}</span>
                </div>

                <span className="ml-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#FFFDF8]/12 text-[#FFFDF8] transition-all duration-200 group-hover:bg-[#FFD23F] group-hover:text-[#7D0C0A] sm:h-11 sm:w-11">
                  <ArrowUpRight className="h-5 w-5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 sm:h-6 sm:w-6" strokeWidth={2.25} />
                </span>
              </button>
            </motion.li>
          ))}
          </ul>

          {/* Stray cream droplets flung into the red, floating just above the
              main pour — the "splatter" bumps that sell the poured-paint look.
              Positioned by percentage as round spans so they stay circular and
              reflow at any width (an SVG here would stretch them into ovals). */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[2]" aria-hidden="true">
            <span className="absolute bottom-5 left-[17%] h-6 w-6 rounded-full bg-[#F2E1C4] sm:h-7 sm:w-7" />
            <span className="absolute bottom-11 left-[21%] h-2.5 w-2.5 rounded-full bg-[#F2E1C4] sm:h-3 sm:w-3" />
            <span className="absolute bottom-7 left-[50%] h-4 w-4 rounded-full bg-[#F2E1C4] sm:h-5 sm:w-5" />
            <span className="absolute bottom-4 left-[68%] h-5 w-5 rounded-full bg-[#F2E1C4] sm:h-6 sm:w-6" />
            <span className="absolute bottom-10 left-[70%] h-2 w-2 rounded-full bg-[#F2E1C4] sm:h-2.5 sm:w-2.5" />
            <span className="absolute bottom-6 left-[89%] h-4 w-4 rounded-full bg-[#F2E1C4] sm:h-5 sm:w-5" />
          </div>
        </div>

        {/* Spilled paint (cat tumpah) — red drips poured out of the list slab,
            hanging down onto the cream section so Projects melts into the cream
            Tech Stack below. Red fill on the cream section; -mt-px seals the
            hairline where the drips meet the slab. preserveAspectRatio=none lets
            the pour stretch edge-to-edge on any width. */}
        <div className="pointer-events-none relative z-[1] -mt-px leading-[0]">
          <svg
            className="block h-[92px] w-full sm:h-[190px]"
            viewBox="0 0 1440 210"
            preserveAspectRatio="none"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M0,0 L1440,0 L1440,188
                 C 1377,188 1353,120 1290,120
                 C 1206,120 1174,198 1090,198
                 C 993,198 957,86 860,86
                 C 768,86 732,154 640,154
                 C 540,154 500,100 400,100
                 C 304,100 266,198 170,198
                 C 99,198 71,56 0,56 Z"
              fill="#E5301E"
            />
          </svg>
        </div>
      </section>
    </>
  );
};

export default PlayfulProjects;
