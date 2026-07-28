import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import ScrollLineDivider from "../SectionDivider/ScrollLineDivider";
import { PROJECTS } from "../../../data/projectsData";

// Touch has no hover, so mobile gets a long-press-to-peek gesture instead:
// hold a row to preview the image, release to dismiss; a plain tap still
// navigates straight to the detail page like the button's onClick always did.
const LONG_PRESS_MS = 400;
const LONG_PRESS_MOVE_CANCEL_PX = 10;

const ProjectsSection = () => {
  const navigate = useNavigate();
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [longPressIndex, setLongPressIndex] = useState(null);
  const previewRef = useRef(null);
  const longPressTimerRef = useRef(null);
  const longPressFiredRef = useRef(false);
  const touchStartRef = useRef({ x: 0, y: 0 });

  // Follow the cursor by writing the transform straight to the DOM node —
  // no React re-render per mousemove. Scoped to this section only.
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
      // Was a peek, not a tap — close the preview and swallow the
      // synthetic click so it doesn't also navigate.
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
      <ScrollLineDivider />

      {/* Floating cursor preview — desktop only. All images stay mounted and
          pre-decoded; hovering only flips opacity, so the first hover never
          stutters on image decode. */}
      <div
        ref={previewRef}
        className="pointer-events-none fixed left-0 top-0 z-[50] hidden md:block"
        style={{
          opacity: hoveredIndex !== null ? 1 : 0,
          scale: hoveredIndex !== null ? 1 : 0.88,
          rotate: hoveredIndex !== null ? '0deg' : '-2deg',
          transition: 'opacity 0.18s ease, scale 0.18s ease, rotate 0.18s ease',
        }}
      >
        <div className="relative h-[220px] w-[360px] overflow-hidden rounded-xl shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
          {PROJECTS.map((project, index) => (
            <img
              key={project.slug}
              src={project.src}
              alt={project.title}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover"
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
            className="pointer-events-none fixed inset-0 z-[50] flex items-center justify-center bg-black/70 px-6 md:hidden"
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="w-full max-w-sm overflow-hidden rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
            >
              <img
                src={PROJECTS[longPressIndex].src}
                alt={PROJECTS[longPressIndex].title}
                className="h-56 w-full object-cover"
              />
              <div className="bg-[#12141b] px-4 py-3">
                <p className="text-sm font-semibold text-[#e8e0c2]">{PROJECTS[longPressIndex].title}</p>
                <p className="mt-1 text-xs text-white/40">Lepas untuk menutup</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <section
        id="projects"
        onMouseMove={handleMouseMove}
        className="relative bg-[linear-gradient(180deg,#0f1014_0%,#12141b_44%,#101117_100%)] py-16 sm:py-20"
      >
          {/* Header */}
          <div className="mx-auto mb-12 w-full max-w-6xl px-4 sm:mb-16 sm:px-8">
            <header className="text-center">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.24em] text-cyan-100/62">
                Selected Works
              </p>
              <h2 className="text-[clamp(2.3rem,7vw,6.2rem)] font-black uppercase leading-[0.9] tracking-[-0.02em] text-[#e8e0c2]">
                Projects
              </h2>
            </header>
          </div>

          {/* Work list — full width */}
          <ul className="px-4 sm:px-8">
            {PROJECTS.map((project, index) => (
              <motion.li
                key={project.slug}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
                className="group border-t border-white/10 last:border-b last:border-white/10"
              >
                <button
                  type="button"
                  onClick={() => navigate(`/projects/${project.slug}`)}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onTouchStart={(e) => handleTouchStart(e, index)}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                  onTouchCancel={handleTouchCancel}
                  onContextMenu={(e) => e.preventDefault()}
                  className="flex w-full cursor-pointer select-none items-center gap-4 py-5 text-left transition-colors duration-200 [-webkit-touch-callout:none] sm:py-7"
                >
                  <span className="w-10 shrink-0 font-mono text-sm text-white/30 transition-colors duration-200 group-hover:text-cyan-300/70 sm:w-14 sm:text-base">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <h3 className="flex-1 text-[clamp(1.5rem,4.5vw,3.5rem)] font-black uppercase leading-none tracking-tight text-[#e8e0c2] transition-all duration-200 group-hover:translate-x-2 group-hover:text-cyan-300">
                    {project.title}
                  </h3>

                  <div className="hidden shrink-0 items-center gap-6 sm:flex">
                    <span className="text-sm text-white/38">{project.category}</span>
                    <span className="w-10 text-right text-sm text-white/30">{project.year}</span>
                  </div>

                  <ArrowUpRight
                    className="ml-1 h-5 w-5 shrink-0 text-white/25 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-cyan-300 sm:h-6 sm:w-6"
                    strokeWidth={1.75}
                  />
                </button>
              </motion.li>
            ))}
          </ul>
      </section>
    </>
  );
};

export default ProjectsSection;