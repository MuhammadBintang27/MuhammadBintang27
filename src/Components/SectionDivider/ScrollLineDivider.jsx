import React, { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

const rgba = (a) => `rgba(232,224,194,${a})`;

const ChevronRail = ({ count = 10, alpha = 0.82, className = '', style }) => (
  <motion.div className={`flex flex-col items-center justify-between ${className}`} style={style}>
    {Array.from({ length: count }).map((_, i) => (
      <motion.div
        key={i}
        animate={{ opacity: [alpha, alpha * 0.52, alpha * 0.1], y: [0, 4, 10] }}
        transition={{ duration: 1.32, repeat: Infinity, ease: 'easeInOut', delay: i * 0.13 }}
        className="flex justify-center"
      >
        <span
          className="block h-[12px] w-[12px] rotate-45 border-b-2 border-r-2"
          style={{ borderColor: rgba(alpha) }}
        />
      </motion.div>
    ))}
  </motion.div>
);

const ScrollLineDivider = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const sp = useSpring(scrollYProgress, { stiffness: 110, damping: 26, mass: 0.5 });

  // ─── Garis 1: paling atas, kiri+kanan bertemu TEPAT di tengah (50%) ───
  const g1p  = useTransform(sp, [0.06, 0.22], [0, 1], { clamp: true });
  const g1hw = useTransform(g1p, [0, 1], ['0%', '50%']); // sampai tengah
  const g1co = useTransform(sp, [0.30, 0.46], [0, 1], { clamp: true });

  // ─── Garis 2: berhenti di ~35% dari masing-masing sisi ───
  const g2p  = useTransform(sp, [0.12, 0.28], [0, 1], { clamp: true });
  const g2hw = useTransform(g2p, [0, 1], ['0%', '35%']);
  const g2vp = useTransform(sp, [0.26, 0.48], [0, 1], { clamp: true });
  // tidak ada chevron

  // ─── Garis 3: berhenti di ~20% dari masing-masing sisi ───
  const g3p  = useTransform(sp, [0.18, 0.34], [0, 1], { clamp: true });
  const g3hw = useTransform(g3p, [0, 1], ['0%', '20%']);
  const g3co = useTransform(sp, [0.42, 0.58], [0, 1], { clamp: true });

  // ─── Garis 4: paling bawah, berhenti di ~8% dari masing-masing sisi ───
  const g4p  = useTransform(sp, [0.24, 0.40], [0, 1], { clamp: true });
  const g4hw = useTransform(g4p, [0, 1], ['0%', '8%']);
  const g4vp = useTransform(sp, [0.38, 0.60], [0, 1], { clamp: true });
  // tidak ada chevron

  // Posisi vertikal 4 garis (makin ke bawah makin jauh dari atas)
  const TOPS = ['12%', '24%', '36%', '48%'];

  // Posisi horizontal ujung tiap garis (di mana vertikal dimulai)
  // Kiri: left = lebar garis. Kanan: right = lebar garis (mirror)
  const LEFTS  = ['50%', '35%', '20%', '8%']; // dari kiri
  const RIGHTS = ['50%', '35%', '20%', '8%']; // dari kanan (mirror)

  return (
    <section
      ref={ref}
      aria-hidden="true"
      className="relative h-[80vh] overflow-hidden border-y border-[#e8e0c2]/15 bg-[#0d0e12]"
    >
      {/* Garis vertikal kecil di atas tengah (dari top section turun ke garis 1) */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 w-px origin-top"
        style={{
          top: 0,
          height: TOPS[0],
          scaleY: g1p,
          transformOrigin: 'top',
          background: rgba(0.35),
        }}
      />

      <div className="relative mx-auto h-full w-full max-w-[1600px]">

        {/* ════ GARIS 1: bertemu di tengah → 1 vertikal tengah + chevron ════ */}
        {/* Horizontal dari kiri */}
        <motion.div
          className="absolute left-0 h-px"
          style={{ top: TOPS[0], width: g1hw, background: rgba(0.45) }}
        />
        {/* Horizontal dari kanan */}
        <motion.div
          className="absolute right-0 h-px"
          style={{ top: TOPS[0], width: g1hw, background: rgba(0.45) }}
        />
        {/* Chevron di tengah menggantikan garis vertikal */}
        <ChevronRail
          className="absolute left-1/2 w-4 -translate-x-1/2"
          style={{ top: `calc(${TOPS[0]} + 4px)`, bottom: '3%', opacity: g1co }}
          count={22}
          alpha={0.92}
        />

        {/* ════ GARIS 2: berhenti ~35% → 2 vertikal (kiri & kanan), tanpa chevron ════ */}
        <motion.div
          className="absolute left-0 h-px"
          style={{ top: TOPS[1], width: g2hw, background: rgba(0.50) }}
        />
        <motion.div
          className="absolute right-0 h-px"
          style={{ top: TOPS[1], width: g2hw, background: rgba(0.50) }}
        />
        {/* Vertikal kiri dari ujung garis 2 */}
        <motion.div
          className="absolute w-px origin-top"
          style={{
            top: TOPS[1],
            left: LEFTS[1],
            bottom: '3%',
            scaleY: g2vp,
            transformOrigin: 'top',
            background: rgba(0.55),
          }}
        />
        {/* Vertikal kanan dari ujung garis 2 */}
        <motion.div
          className="absolute w-px origin-top"
          style={{
            top: TOPS[1],
            right: RIGHTS[1],
            bottom: '3%',
            scaleY: g2vp,
            transformOrigin: 'top',
            background: rgba(0.55),
          }}
        />

        {/* ════ GARIS 3: berhenti ~20% → 2 vertikal + chevron di kiri & kanan ════ */}
        <motion.div
          className="absolute left-0 h-px"
          style={{ top: TOPS[2], width: g3hw, background: rgba(0.60) }}
        />
        <motion.div
          className="absolute right-0 h-px"
          style={{ top: TOPS[2], width: g3hw, background: rgba(0.60) }}
        />
        {/* Chevron kiri menggantikan garis vertikal kiri */}
        <ChevronRail
          className="absolute left-[20%] w-4 -translate-x-1/2"
          style={{ top: `calc(${TOPS[2]} + 4px)`, bottom: '3%', opacity: g3co }}
          count={16}
          alpha={0.78}
        />
        {/* Chevron kanan menggantikan garis vertikal kanan */}
        <ChevronRail
          className="absolute right-[20%] w-4 translate-x-1/2"
          style={{ top: `calc(${TOPS[2]} + 4px)`, bottom: '3%', opacity: g3co }}
          count={16}
          alpha={0.78}
        />

        {/* ════ GARIS 4: berhenti ~8% → 2 vertikal paling tepi, tanpa chevron ════ */}
        <motion.div
          className="absolute left-0 h-px"
          style={{ top: TOPS[3], width: g4hw, background: rgba(0.70) }}
        />
        <motion.div
          className="absolute right-0 h-px"
          style={{ top: TOPS[3], width: g4hw, background: rgba(0.70) }}
        />
        {/* Vertikal kiri */}
        <motion.div
          className="absolute w-px origin-top"
          style={{
            top: TOPS[3],
            left: LEFTS[3],
            bottom: '3%',
            scaleY: g4vp,
            transformOrigin: 'top',
            background: rgba(0.72),
          }}
        />
        {/* Vertikal kanan */}
        <motion.div
          className="absolute w-px origin-top"
          style={{
            top: TOPS[3],
            right: RIGHTS[3],
            bottom: '3%',
            scaleY: g4vp,
            transformOrigin: 'top',
            background: rgba(0.72),
          }}
        />

      </div>
    </section>
  );
};

export default ScrollLineDivider;