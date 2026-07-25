import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ACHIEVEMENTS } from '../../../data/achievementsData';

gsap.registerPlugin(ScrollTrigger);

const clamp = (min, v, max) => Math.max(min, Math.min(v, max));

// Horizontal spread (0..1) and vertical arc (fraction of stage height) for the
// five hanging tags — an upward-opening arc that peaks in the middle, mirroring
// the reference. Positions are derived from the live stage size so the cards
// always stay fully inside the stage at any width.
const SPREAD = [0.0, 0.25, 0.5, 0.75, 1.0];
const ARC = [0.5, 0.3, 0.2, 0.32, 0.5];
const ROTATE = [-8, -5, 2, 5, 9];

// Smooth, flowing curve through the thread anchor points (Catmull-Rom → cubic
// bezier). The tangents follow the natural rise/fall of the tags instead of
// forcing a downward droop, with a gentle alternating wobble so the cord reads
// as hand-drawn rather than mechanical — closer to the reference sketch.
const buildPath = (pts) => {
  if (pts.length < 2) return '';
  let d = `M ${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] || pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] || pts[i + 1];
    const wobble = (i % 2 === 0 ? -1 : 1) * 16; // pronounced hand-drawn swoop
    const cp1x = p1.x + (p2.x - p0.x) / 4.2;
    const cp1y = p1.y + (p2.y - p0.y) / 4.2 + wobble;
    const cp2x = p2.x - (p3.x - p1.x) / 4.2;
    const cp2y = p2.y - (p3.y - p1.y) / 4.2 + wobble;
    d += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
  }
  return d;
};

// A small loop drawn ON TOP of a tag at its hole: the cord dips down through the
// punched hole to the front of the card and back up, so the string reads as
// threaded in-and-out rather than just passing behind.
const loopPath = (x, y) => {
  const w = 7;
  const up = 12;
  const dip = 4;
  return `M ${(x - w).toFixed(1)} ${(y - up).toFixed(1)} C ${(x - w).toFixed(1)} ${(y - 2).toFixed(1)}, ${(x - 3).toFixed(1)} ${(y + dip).toFixed(1)}, ${x.toFixed(1)} ${(y + dip).toFixed(1)} C ${(x + 3).toFixed(1)} ${(y + dip).toFixed(1)}, ${(x + w).toFixed(1)} ${(y - 2).toFixed(1)}, ${(x + w).toFixed(1)} ${(y - up).toFixed(1)}`;
};

const PlayfulAchievements = () => {
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const holeRefs = useRef([]);
  const cardRefs = useRef([]);
  const cardInnerRefs = useRef([]);
  const shadowPathRef = useRef(null);
  const mainPathRef = useRef(null);
  const tieRef = useRef(null);
  const knotRefs = useRef([]);
  const loopRefs = useRef([]);
  // Mobile (pinned horizontal swipe) refs.
  const mViewportRef = useRef(null);
  const mTrackRef = useRef(null);
  const mHoleRefs = useRef([]);
  const mShadowRef = useRef(null);
  const mMainRef = useRef(null);
  const mTieRef = useRef(null);
  const mLoopRefs = useRef([]);
  const mKnotRefs = useRef([]);
  const [dims, setDims] = useState({ w: 0, h: 0 });
  const [laptopOk, setLaptopOk] = useState(true);
  const [mouseOk, setMouseOk] = useState(true);

  const cardW = clamp(120, dims.w * 0.2, 196);
  const fullTrack = Math.max(0, dims.w - cardW);
  // Cap the horizontal spread relative to card size so the tags cluster into a
  // tight arc instead of flying out to the stage edges on narrower desktop /
  // tablet (iPad) widths. The band is then re-centred within the stage.
  const spreadTrack = Math.min(fullTrack, cardW * 3.5);
  const bandStart = (fullTrack - spreadTrack) / 2;
  const leftFor = (i) => bandStart + SPREAD[i] * spreadTrack;

  // Read the live centre of every tag's hole and repaint the thread — done
  // IMPERATIVELY (writing SVG attributes directly, no React state) so the pin +
  // scrub can call it every scroll frame without triggering a re-render, which
  // would otherwise make framer re-assert its transform and fight GSAP.
  const measure = useCallback(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const s = stage.getBoundingClientRect();
    const pts = [];
    for (const el of holeRefs.current) {
      if (!el) return;
      const r = el.getBoundingClientRect();
      pts.push({ x: r.left + r.width / 2 - s.left, y: r.top + r.height / 2 - s.top });
    }
    if (pts.length !== ACHIEVEMENTS.length) return;

    const laptopAnchor = { x: s.width * 0.16, y: s.height * 0.08 };
    const d = buildPath([laptopAnchor, ...pts]);
    shadowPathRef.current?.setAttribute('d', d);
    mainPathRef.current?.setAttribute('d', d);
    pts.forEach((p, i) => {
      const c = knotRefs.current[i];
      if (c) {
        c.setAttribute('cx', p.x);
        c.setAttribute('cy', p.y);
      }
      const loop = loopRefs.current[i];
      if (loop) loop.setAttribute('d', loopPath(p.x, p.y));
    });
    const last = pts[pts.length - 1];
    tieRef.current?.setAttribute(
      'd',
      `M ${last.x} ${last.y} c 16 -12 34 -8 40 7 c 5 12 -5 24 -16 21 c -9 -2 -9 -15 0 -17`,
    );
  }, []);

  // Mobile thread — same cord, but the tags live in a horizontal track that
  // scrolls sideways. Hole centres are static within the track, so we paint the
  // cord once (and on resize); it rides along as the track translates.
  const measureMobile = useCallback(() => {
    const track = mTrackRef.current;
    if (!track) return;
    const t = track.getBoundingClientRect();
    const pts = [];
    for (const el of mHoleRefs.current) {
      if (!el) return;
      const r = el.getBoundingClientRect();
      pts.push({ x: r.left + r.width / 2 - t.left, y: r.top + r.height / 2 - t.top });
    }
    if (pts.length !== ACHIEVEMENTS.length) return;

    const start = { x: pts[0].x - 60, y: pts[0].y - 6 };
    const d = buildPath([start, ...pts]);
    mShadowRef.current?.setAttribute('d', d);
    mMainRef.current?.setAttribute('d', d);
    pts.forEach((p, i) => {
      const c = mKnotRefs.current[i];
      if (c) {
        c.setAttribute('cx', p.x);
        c.setAttribute('cy', p.y);
      }
      const loop = mLoopRefs.current[i];
      if (loop) loop.setAttribute('d', loopPath(p.x, p.y));
    });
    const last = pts[pts.length - 1];
    mTieRef.current?.setAttribute(
      'd',
      `M ${last.x} ${last.y} c 16 -12 34 -8 40 7 c 5 12 -5 24 -16 21 c -9 -2 -9 -15 0 -17`,
    );
  }, []);

  // Track stage size → drives card layout + SVG viewport.
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const ro = new ResizeObserver((entries) => {
      const w = entries[0].contentRect.width;
      setDims({ w, h: clamp(340, w * 0.44, 500) });
    });
    ro.observe(stage);
    return () => ro.disconnect();
  }, []);

  // Re-measure after layout settles (dims change, entrance animation, images).
  useLayoutEffect(() => {
    const run = () => {
      measure();
      measureMobile();
    };
    const id = requestAnimationFrame(run);
    const t = setTimeout(run, 480);
    return () => {
      cancelAnimationFrame(id);
      clearTimeout(t);
    };
  }, [dims, measure, measureMobile]);

  // Pin + scrub (desktop): the section pins and vertical scroll scrubs the tags
  // from a centre stack out to their arc — same feel as the professional
  // scatter. The thread re-measures every scroll frame via onUpdate so it
  // stretches out of the pile as the cards fan open. Cards stay draggable after.
  useLayoutEffect(() => {
    if (!sectionRef.current || dims.w === 0) return undefined;
    const cards = cardRefs.current.filter(Boolean);
    const inners = cardInnerRefs.current.filter(Boolean);
    if (cards.length !== ACHIEVEMENTS.length) return undefined;

    const stageH = dims.h;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add('(min-width: 1024px)', () => {
        const stack = () => {
          // Outer wrapper carries position/scale (drag-owned after); inner
          // wrapper carries the tilt so framer's drag transform can't strip it.
          gsap.set(cards, {
            x: (i) => fullTrack / 2 - leftFor(i),
            y: (i) => stageH * 0.24 - (ARC[i] * stageH - cardW * 0.1),
            opacity: 1,
            transformOrigin: '50% 50%',
          });
          gsap.set(inners, { rotate: 0 });
          measure();
        };
        stack();

        const tl = gsap.timeline({
          defaults: { ease: 'power3.out' },
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: '+=200%',
            scrub: true,
            pin: sectionRef.current,
            pinSpacing: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onRefresh: stack,
            onUpdate: measure,
          },
        });

        // Hold the pile a beat, then fan the tags out one by one. Opacity stays
        // at 1 throughout so scrubbing back never fades the cards away.
        tl.to({}, { duration: 0.5 });
        ACHIEVEMENTS.forEach((_, i) => {
          const at = 0.6 + i * 0.12;
          tl.to(cards[i], { x: 0, y: 0 }, at);
          tl.to(inners[i], { rotate: ROTATE[i] }, at);
        });
        tl.eventCallback('onUpdate', measure);

        return () => {
          gsap.set(cards, { clearProps: 'all' });
          gsap.set(inners, { clearProps: 'all' });
        };
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [dims.w, dims.h, cardW, fullTrack, spreadTrack, bandStart, measure]);

  // Pin + scrub (mobile): the section pins and vertical scroll slides the tag
  // track sideways, with the cord riding along inside the track.
  useLayoutEffect(() => {
    const section = sectionRef.current;
    const viewport = mViewportRef.current;
    const trackEl = mTrackRef.current;
    if (!section || !viewport || !trackEl) return undefined;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add('(max-width: 1023px)', () => {
        measureMobile();
        const distance = () => Math.max(trackEl.scrollWidth - viewport.clientWidth, 0);
        const tween = gsap.to(trackEl, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: () => `+=${distance()}`,
            scrub: true,
            pin: section,
            pinSpacing: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onRefresh: measureMobile,
          },
        });
        return () => tween.kill();
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [measureMobile]);

  return (
    <section
      ref={sectionRef}
      id="achievements"
      className="relative flex min-h-screen flex-col overflow-hidden bg-[#F2E1C4] px-4 pt-16 sm:px-8 sm:pt-20"
    >
      {/* Decorative doodles — section-level (full width), tucked under the
          title. User-supplied SVG/PNG; auto-hidden if absent. */}
      {laptopOk && (
        <img
          src="playful/laptop.webp"
          alt=""
          aria-hidden="true"
          onError={() => setLaptopOk(false)}
          className="pointer-events-none absolute left-[7%] top-20 z-[1] hidden w-[37%] max-w-[380px] object-contain sm:top-28 lg:block"
        />
      )}
      {mouseOk && (
        <img
          src="playful/mouse.webp"
          alt=""
          aria-hidden="true"
          onError={() => setMouseOk(false)}
          className="pointer-events-none absolute right-[7%] top-20 z-[1] hidden w-[33%] max-w-[340px] object-contain sm:top-28 lg:block"
        />
      )}

      {/* Heading */}
      <div className="relative z-20 mx-auto mb-4 max-w-5xl text-center">
        <h2 className="font-mouse text-[clamp(3.2rem,12vw,9rem)] uppercase leading-[0.95] text-[#E5301E] [-webkit-text-stroke:2px_#FFFDF8] [paint-order:stroke_fill] drop-shadow-[4px_4px_0_rgba(36,26,18,0.14)]">
          What I&apos;ve Achieved
        </h2>
        <p className="mt-2 font-mouse text-lg tracking-wide text-[#241A12]/70 sm:text-xl">
          <span className="lg:hidden">Swipe through the highlights.</span>
          <span className="hidden lg:inline">
            Drag the tags around — they stay on the string.
          </span>
        </p>
      </div>

      {/* Stage (desktop) — measured; holds the thread SVG + pin/scrub tags */}
      <div
        ref={stageRef}
        className="relative mx-auto hidden w-full max-w-[1150px] touch-pan-y lg:-mt-8 lg:block"
        style={{ height: dims.h || 480 }}
      >
        {/* Connecting threads (behind the cards) */}
        <svg
          className="pointer-events-none absolute inset-0 z-0"
          width={dims.w || '100%'}
          height={dims.h || '100%'}
          fill="none"
        >
          {/* soft drop shadow */}
          <path
            ref={shadowPathRef}
            stroke="rgba(36,26,18,0.1)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            transform="translate(1.5,3)"
          />
          {/* main cord */}
          <path
            ref={mainPathRef}
            stroke="#7D0C0A"
            strokeWidth="2.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* final tie — a small pigtail loop off the last tag */}
          <path
            ref={tieRef}
            stroke="#7D0C0A"
            strokeWidth="2.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        {/* Hang-tags — start stacked in the centre, then fan out to their arc
            positions as the section scrolls into view (like the professional
            scatter), and stay draggable afterwards. The x/y offsets carry each
            card from the stack to its resting left/top; `onUpdate` keeps the
            threads glued to the holes through both the spread and any drag. */}
        {dims.w > 0 && ACHIEVEMENTS.map((item, i) => {
          const stageH = dims.h || 480;
          const left = leftFor(i);
          const top = ARC[i] * stageH - cardW * 0.1;
          return (
            <motion.div
              key={item.title}
              ref={(el) => (cardRefs.current[i] = el)}
              drag
              dragConstraints={stageRef}
              dragElastic={0.12}
              dragMomentum={false}
              onUpdate={measure}
              onDragEnd={measure}
              whileDrag={{ scale: 1.06, zIndex: 60 }}
              className="absolute z-10 cursor-grab active:cursor-grabbing"
              style={{ left, top, width: cardW }}
            >
              {/* Inner wrapper carries the tilt (GSAP-owned) so a drag on the
                  outer motion.div can't flatten the rotation. */}
              <div
                ref={(el) => (cardInnerRefs.current[i] = el)}
                className="relative"
              >
                {/* Punched hole — the thread anchor */}
                <span
                  ref={(el) => (holeRefs.current[i] = el)}
                  className="absolute left-1/2 top-1.5 z-20 block h-4 w-4 -translate-x-1/2 rounded-full border-[3px] border-[#8C1A0E] bg-[#F2E1C4] shadow-inner"
                />

                {/* Tag body */}
                <div className="rounded-[1.4rem] bg-[#E5301E] p-2 pt-6 shadow-[5px_6px_0_rgba(36,26,18,0.18)]">
                  <div
                    className="overflow-hidden rounded-[1rem] bg-[#FFFDF8]/10"
                    style={{ height: cardW * 0.9 }}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      draggable="false"
                      onLoad={measure}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <p className="px-1 pb-1 pt-2 text-center text-[0.62rem] font-extrabold leading-tight text-[#FFFDF8] sm:text-[0.72rem]">
                    {item.title}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}

        {/* Front thread layer — sits ABOVE the tags so the cord visibly dips
            through each hole (in one side, out the other) instead of only
            passing behind. Updated imperatively in measure(), same as the back
            cord, so it tracks drag + the scrub. */}
        <svg
          className="pointer-events-none absolute inset-0 z-[100]"
          width={dims.w || '100%'}
          height={dims.h || '100%'}
          fill="none"
        >
          {ACHIEVEMENTS.map((_, i) => (
            <g key={i}>
              <path
                ref={(el) => (loopRefs.current[i] = el)}
                stroke="#7D0C0A"
                strokeWidth="2.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle
                ref={(el) => (knotRefs.current[i] = el)}
                r="2.6"
                fill="#8C1A0E"
              />
            </g>
          ))}
        </svg>
      </div>

      {/* Faint watermark echoing the professional "outcomes" line — big comic
          ink sitting low behind the tags (desktop only; the mobile track fills
          the viewport, so it would collide there). */}
      <p className="pointer-events-none absolute inset-x-0 bottom-2 z-[1] mx-auto hidden max-w-[620px] px-4 text-center font-mouse text-[clamp(2.6rem,6vw,5.5rem)] uppercase leading-[0.95] tracking-tight text-[#F0A716] [-webkit-text-stroke:2px_#FFFDF8] [paint-order:stroke_fill] sm:bottom-4 lg:block">
        Some outcomes of the process.
      </p>

      {/* Mobile — pinned; vertical scroll slides the tag track sideways, cord
          threaded through the holes and riding along inside the track. */}
      <div
        ref={mViewportRef}
        className="flex flex-1 items-start overflow-hidden pt-4 lg:hidden"
      >
        <div
          ref={mTrackRef}
          className="relative flex w-max items-center gap-6 py-6 pl-[22vw] pr-[16vw]"
        >
          {/* back cord */}
          <svg className="pointer-events-none absolute inset-0 z-0 h-full w-full" fill="none">
            <path
              ref={mShadowRef}
              stroke="rgba(36,26,18,0.1)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              transform="translate(1.5,3)"
            />
            <path
              ref={mMainRef}
              stroke="#7D0C0A"
              strokeWidth="2.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              ref={mTieRef}
              stroke="#7D0C0A"
              strokeWidth="2.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          {ACHIEVEMENTS.map((item, i) => (
            <div
              key={item.title}
              className="relative z-10 w-[72vw] max-w-[300px] shrink-0"
              style={{ rotate: `${ROTATE[i] * 0.6}deg` }}
            >
              {/* Punched hole — thread anchor */}
              <span
                ref={(el) => (mHoleRefs.current[i] = el)}
                className="absolute left-1/2 top-1.5 z-20 block h-4 w-4 -translate-x-1/2 rounded-full border-[3px] border-[#8C1A0E] bg-[#F2E1C4] shadow-inner"
              />
              <div className="rounded-[1.7rem] bg-[#E5301E] p-[18px] pt-9 shadow-[5px_6px_0_rgba(36,26,18,0.18)]">
                <div className="h-[52vh] overflow-hidden rounded-[1.1rem] bg-[#FFFDF8]/10">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    onLoad={measureMobile}
                    className="h-full w-full object-cover"
                  />
                </div>
                <p className="px-1 pb-1 pt-2 text-center text-[0.72rem] font-extrabold leading-tight text-[#FFFDF8]">
                  {item.title}
                </p>
              </div>
            </div>
          ))}

          {/* front loops — cord dipping through each hole */}
          <svg className="pointer-events-none absolute inset-0 z-[100] h-full w-full" fill="none">
            {ACHIEVEMENTS.map((_, i) => (
              <g key={i}>
                <path
                  ref={(el) => (mLoopRefs.current[i] = el)}
                  stroke="#7D0C0A"
                  strokeWidth="2.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle
                  ref={(el) => (mKnotRefs.current[i] = el)}
                  r="2.6"
                  fill="#8C1A0E"
                />
              </g>
            ))}
          </svg>
        </div>
      </div>
    </section>
  );
};

export default PlayfulAchievements;
