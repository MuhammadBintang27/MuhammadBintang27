import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const NAME = "BINTANG";

const InitialLoader = () => {
  const [progress, setProgress] = useState(1);

  useEffect(() => {
    // Time-based rAF counter: at most one update per display frame, and the
    // value is derived from elapsed time — if a frame is dropped while the
    // browser is busy, the number catches up smoothly instead of stuttering.
    const duration = 1200;
    const start = performance.now();
    let rafId;

    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - (1 - t) * (1 - t); // ease-out: decelerates near 100
      setProgress(Math.max(1, Math.round(eased * 100)));
      if (t < 1) {
        rafId = requestAnimationFrame(tick);
      }
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  const displayProgress = progress.toString().padStart(2, "0");

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col justify-between overflow-hidden bg-[#0f1014] px-6 py-6 sm:px-10 sm:py-8"
      style={{ willChange: "transform" }}
      exit={{ y: "-100%" }}
      transition={{ duration: 0.85, ease: [0.83, 0, 0.17, 1] }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_60%,rgba(56,189,248,0.10),transparent_55%)]" />

      {/* Top row — mono labels, echoes the hero frame */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="relative flex items-center justify-between text-[0.62rem] font-bold uppercase tracking-[0.28em] text-cyan-100/55 sm:text-[0.68rem]"
        style={{ fontFamily: "'DM Mono','Courier New',monospace" }}
      >
        <span>Muhammad Bintang</span>
        <span>Portfolio</span>
      </motion.div>

      {/* Center — name reveal, letter by letter */}
      <motion.div
        className="relative flex flex-col items-center"
        exit={{ y: -90, opacity: 0 }}
        transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
      >
        <h1
          aria-label={NAME}
          className="flex items-baseline justify-center overflow-hidden whitespace-nowrap text-[#e8e0c2]"
          style={{
            fontFamily:
              "'Barlow Condensed','Roboto Condensed','Arial Narrow','Bahnschrift',sans-serif",
            fontSize: "clamp(3.6rem, 13vw, 10.5rem)",
            fontWeight: 900,
            lineHeight: 0.92,
            letterSpacing: "-0.01em",
          }}
        >
          {NAME.split("").map((char, i) => (
            <span key={i} className="inline-block overflow-hidden">
              <motion.span
                className="inline-block"
                initial={{ y: "112%" }}
                animate={{ y: 0 }}
                transition={{
                  duration: 0.72,
                  delay: 0.12 + i * 0.055,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {char}
              </motion.span>
            </span>
          ))}
        </h1>

        {/* Progress line under the name — driven directly by the rAF counter,
            no tween retargeting on every update */}
        <div className="mt-5 h-px w-[min(72vw,520px)] overflow-hidden bg-white/12">
          <div
            className="h-full origin-left bg-gradient-to-r from-cyan-300/80 via-[#e8e0c2] to-amber-300"
            style={{ transform: `scaleX(${progress / 100})` }}
          />
        </div>
      </motion.div>

      {/* Bottom row — status + big counter */}
      <div className="relative flex items-end justify-between">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="pb-2 text-[0.62rem] font-bold uppercase tracking-[0.38em] text-yellow-300/75 sm:text-[0.7rem]"
          style={{ fontFamily: "'DM Mono','Courier New',monospace" }}
        >
          Loading experience
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-right leading-none text-[#e8e0c2]/85"
          style={{
            fontFamily:
              "'Barlow Condensed','Roboto Condensed','Arial Narrow',sans-serif",
            fontSize: "clamp(3rem, 9vw, 6.5rem)",
            fontWeight: 900,
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {displayProgress}
          <span className="align-top text-[0.32em] text-cyan-100/60">%</span>
        </motion.p>
      </div>
    </motion.div>
  );
};

export default InitialLoader;