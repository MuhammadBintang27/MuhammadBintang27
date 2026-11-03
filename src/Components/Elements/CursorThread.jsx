import { useEffect, useRef } from 'react';

// A thread that trails the cursor: a chain of points where each one eases
// toward the one ahead of it, so the line stretches out while the mouse moves
// and winds back into the cursor when it stops. Written straight to the DOM
// each frame (no React state) and only runs while something is still moving.
// Mouse-only, and off for visitors who ask for reduced motion.
const POINTS = 26;
const FOLLOW = 0.38;
const STICKER_SIZE = 46;

const CursorThread = ({ color, width = 2, stickers = [] }) => {
  const rootRef = useRef(null);
  const pathRef = useRef(null);
  const stickerRefs = useRef([]);

  useEffect(() => {
    // shortcut: checked once on mount, so plugging in a mouse needs a reload.
    const enabled = window.matchMedia('(pointer: fine) and (prefers-reduced-motion: no-preference)');
    if (!enabled.matches) return undefined;

    const points = Array.from({ length: POINTS }, () => ({ x: 0, y: 0 }));
    let head = null;
    let rafId = 0;

    const tick = () => {
      let moving = false;
      points[0].x = head.x;
      points[0].y = head.y;
      for (let i = 1; i < POINTS; i += 1) {
        const dx = points[i - 1].x - points[i].x;
        const dy = points[i - 1].y - points[i].y;
        points[i].x += dx * FOLLOW;
        points[i].y += dy * FOLLOW;
        if (Math.abs(dx) + Math.abs(dy) > 0.2) moving = true;
      }

      // Smooth curve through the midpoints between neighbouring points.
      let d = `M${points[0].x},${points[0].y}`;
      for (let i = 1; i < POINTS - 1; i += 1) {
        const mx = (points[i].x + points[i + 1].x) / 2;
        const my = (points[i].y + points[i + 1].y) / 2;
        d += ` Q${points[i].x},${points[i].y} ${mx},${my}`;
      }
      pathRef.current.setAttribute('d', d);

      // Stickers ride the thread, swing with its motion, and fade out as the
      // thread winds back in so they don't pile up on the cursor.
      stickers.forEach((sticker, k) => {
        const el = stickerRefs.current[k];
        if (!el) return;
        const p = points[sticker.at];
        const next = points[Math.min(sticker.at + 1, POINTS - 1)];
        const tilt = Math.max(-35, Math.min(35, (p.x - next.x) * 2.5));
        const spread = Math.hypot(p.x - head.x, p.y - head.y);
        el.style.opacity = String(Math.min(1, spread / 90));
        el.style.transform = `translate(${p.x - STICKER_SIZE / 2}px, ${p.y - STICKER_SIZE / 2}px) rotate(${tilt}deg)`;
      });

      rafId = moving ? requestAnimationFrame(tick) : 0;
    };

    const onMove = (e) => {
      // Over a WebGL canvas (the 3D tech stack) every pointer move already
      // re-renders the scene; redrawing a full-screen overlay on top of it
      // made both stutter. Step aside there and re-wind at the cursor after.
      if (e.target instanceof HTMLCanvasElement) {
        rootRef.current.style.opacity = '0';
        cancelAnimationFrame(rafId);
        rafId = 0;
        head = null;
        return;
      }
      if (!head) {
        // Start wound up at the cursor instead of streaking in from the corner.
        points.forEach((p) => {
          p.x = e.clientX;
          p.y = e.clientY;
        });
      }
      head = { x: e.clientX, y: e.clientY };
      rootRef.current.style.opacity = '1';
      if (!rafId) rafId = requestAnimationFrame(tick);
    };

    const onLeave = () => {
      rootRef.current.style.opacity = '0';
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    document.documentElement.addEventListener('mouseleave', onLeave);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('pointermove', onMove);
      document.documentElement.removeEventListener('mouseleave', onLeave);
    };
  }, [stickers]);

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[9000] opacity-0 transition-opacity duration-300"
    >
      <svg className="absolute inset-0 h-full w-full overflow-visible">
        <path
          ref={pathRef}
          fill="none"
          stroke={color}
          strokeWidth={width}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {stickers.map((sticker, k) => (
        <div
          key={sticker.at}
          ref={(el) => {
            stickerRefs.current[k] = el;
          }}
          className="absolute left-0 top-0 opacity-0 drop-shadow-[2px_3px_0_rgba(36,26,18,0.22)]"
          style={{ width: STICKER_SIZE, height: STICKER_SIZE, willChange: 'transform' }}
        >
          {sticker.icon}
        </div>
      ))}
    </div>
  );
};

export default CursorThread;
