import { useLayoutEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import firstImage from '../../../assets/images/hero/imagepertama.webp';
import secondImage from '../../../assets/images/hero/gelap.webp';

gsap.registerPlugin(ScrollTrigger);

const PANEL_COLUMNS = 4;

const TITLE_GLYPHS = [
  { char: 'B', scaleY: 1.34, scaleX: 1.12 },
  { char: 'I', scaleY: 1.1, scaleX: 1.08 },
  { char: 'N', scaleY: 0.82, scaleX: 1.03 },
  { char: 'T', scaleY: 0.82, scaleX: 1.03 },
  { char: 'A', scaleY: 0.82, scaleX: 1.03 },
  { char: 'N', scaleY: 1.1, scaleX: 1.08 },
  { char: 'G', scaleY: 1.34, scaleX: 1.12 },
];

const ease = [0.22, 1, 0.36, 1];

// Each panel is a full-screen layer with the exact same `cover` framing as
// the final image, clipped to its own column — so the photo sits in its true
// mobile position during the reveal and the hand-off at the end is seamless.
const clipFor = (el, topInset) =>
  `inset(${topInset}% ${el.dataset.right}% 0% ${el.dataset.left}%)`;

// Mobile version of the cinematic hero: same scroll-driven panel reveal as
// the desktop HeroSection (second image sweeps in through vertical panels
// while the title shrinks), tuned down to 4 panels for phone GPUs.
const MobileHero = () => {
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const greetingRef = useRef(null);
  const titleRef = useRef(null);
  const bottomRef = useRef(null);
  const cueRef = useRef(null);
  const imageBaseRef = useRef(null);
  const imageTopRef = useRef(null);
  const imageSecondFullRef = useRef(null);
  const vignetteRef = useRef(null);
  const panelRefs = useRef([]);
  const panelShadeRefs = useRef([]);

  useLayoutEffect(() => {
    if (!sectionRef.current || !stageRef.current) {
      return undefined;
    }

    const context = gsap.context(() => {
      panelRefs.current = panelRefs.current.filter(Boolean);
      panelShadeRefs.current = panelShadeRefs.current.filter(Boolean);
      const centerCol = (PANEL_COLUMNS - 1) / 2;
      const getPanelDelay = (panel) =>
        Math.abs(Number(panel?.dataset?.col ?? 0) - centerCol) * 0.12;

      gsap.set(panelRefs.current, {
        clipPath: (index, el) => clipFor(el, 100),
        yPercent: 10,
      });
      gsap.set(panelShadeRefs.current, { opacity: 0.2 });
      gsap.set(imageSecondFullRef.current, { opacity: 0 });
      gsap.set(vignetteRef.current, { opacity: 0.45 });
      gsap.set(titleRef.current, { transformOrigin: 'center top' });

      const timeline = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=180%',
          scrub: true,
          pin: stageRef.current,
          pinSpacing: false,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      timeline
        .to(greetingRef.current, { opacity: 0, y: 46, duration: 0.14 }, 0.03)
        .to(cueRef.current, { opacity: 0, duration: 0.1 }, 0.02)
        .to(
          titleRef.current,
          {
            scale: 0.32,
            // Tuck the shrunken title up near the frame's top edge, like the
            // desktop hero does — recalculated on refresh/rotation.
            y: () => -((stageRef.current?.offsetHeight ?? window.innerHeight) * 0.115),
            duration: 0.34,
          },
          0.02,
        )
        .to(bottomRef.current, { opacity: 0, y: 70, duration: 0.28 }, 0.12)
        .to(imageBaseRef.current, { scale: 1.03, opacity: 0.14 }, 0.1)
        .to(
          panelRefs.current,
          {
            clipPath: (index, el) => clipFor(el, 0),
            yPercent: 0,
            ease: 'power2.out',
            stagger: (index, panel) => getPanelDelay(panel),
          },
          0,
        )
        .to(
          panelShadeRefs.current,
          {
            opacity: 0.75,
            ease: 'power2.out',
            stagger: (index, shade) => getPanelDelay(shade),
          },
          0.02,
        )
        .to(imageSecondFullRef.current, { opacity: 1, duration: 0.2 }, 0.68)
        .to(imageTopRef.current, { opacity: 0, duration: 0.2 }, 0.68)
        .to(vignetteRef.current, { opacity: 0.92 }, 0.46);

      // Hold the final frame briefly before releasing the pin.
      timeline.to(imageSecondFullRef.current, { opacity: 1, duration: 0.2 }, 0.92);
    }, sectionRef);

    return () => context.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative h-[280vh] w-full overflow-x-clip">
      <div
        ref={stageRef}
        className="relative h-screen min-h-[100svh] w-full overflow-hidden bg-techstack-theme"
      >
        {/* Base image (first frame) */}
        <div
          ref={imageBaseRef}
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${firstImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />

        {/* Second image, full — fades in once panels complete */}
        <div
          ref={imageSecondFullRef}
          className="absolute inset-0 z-[1]"
          style={{
            backgroundImage: `url(${secondImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />

        {/* Second image sweeping in through vertical panels — each panel is a
            full-screen cover layer clipped to its column, so the photo is
            already in its final mobile position during the reveal. The whole
            layer fades out once the seamless full image takes over. */}
        <div ref={imageTopRef} className="absolute inset-0 z-10">
          {Array.from({ length: PANEL_COLUMNS }).map((_, col) => {
            const left = (col / PANEL_COLUMNS) * 100;
            const right = ((PANEL_COLUMNS - 1 - col) / PANEL_COLUMNS) * 100;
            return (
              <div
                key={col}
                ref={(element) => {
                  panelRefs.current[col] = element;
                }}
                data-col={col}
                data-left={left}
                data-right={right}
                className="absolute inset-0"
                style={{
                  backgroundImage: `url(${secondImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  clipPath: `inset(100% ${right}% 0% ${left}%)`,
                }}
              >
                {col > 0 && (
                  <div
                    className="absolute inset-y-0 w-px bg-black/45"
                    style={{ left: `${left}%` }}
                  />
                )}
                <div
                  ref={(element) => {
                    panelShadeRefs.current[col] = element;
                  }}
                  data-col={col}
                  className="pointer-events-none absolute inset-y-0"
                  style={{
                    left: `${left}%`,
                    right: `${right}%`,
                    borderTop: '1px solid rgba(0,0,0,0.9)',
                    background:
                      'linear-gradient(to bottom, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.45) 26%, rgba(0,0,0,0) 62%)',
                  }}
                />
              </div>
            );
          })}
        </div>

        {/* Vignette */}
        <div
          ref={vignetteRef}
          className="pointer-events-none absolute inset-0 z-20"
          style={{
            willChange: 'opacity',
            background:
              'linear-gradient(to bottom, rgba(2,4,11,0.8) 0%, rgba(2,4,11,0.2) 30%, rgba(2,4,11,0.16) 58%, rgba(2,4,11,0.9) 100%)',
          }}
        />

        {/* Frame — echoes the desktop hero border */}
        <div className="pointer-events-none absolute inset-2 z-30 border-2 border-cyan-100/55">
          <div className="absolute -left-[2px] -top-[2px] h-7 w-7 border-l-2 border-t-2 border-cyan-100/95" />
          <div className="absolute -right-[2px] -top-[2px] h-7 w-7 border-r-2 border-t-2 border-cyan-100/95" />
          <div className="absolute -bottom-[2px] -left-[2px] h-7 w-7 border-b-2 border-l-2 border-cyan-100/95" />
          <div className="absolute -bottom-[2px] -right-[2px] h-7 w-7 border-b-2 border-r-2 border-cyan-100/95" />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="absolute left-6 right-6 top-[4.2rem] z-40 flex items-center justify-between text-[0.6rem] font-bold uppercase tracking-[0.22em] text-cyan-100/92"
          style={{ fontFamily: "'DM Mono','Courier New',monospace" }}
        >
          <span>CREATE</span>
          <span>INSPIRE</span>
        </motion.div>

        {/* Greeting */}
        <div
          ref={greetingRef}
          className="pointer-events-none absolute left-0 right-0 top-[15%] z-40 select-none text-center"
        >
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.25, ease }}
            className="text-[1.05rem] font-semibold tracking-[0.11em] text-[#e8e0c2]/88"
            style={{ fontFamily: "'DM Mono','Courier New',monospace" }}
          >
            Hola, I&apos;m
          </motion.p>
        </div>

        {/* Title — letter reveal on load, shrinks on scroll */}
        <div
          ref={titleRef}
          className="pointer-events-none absolute left-0 right-0 top-[19.5%] z-40 select-none text-center"
        >
          <h1
            aria-label="BINTANG"
            className="flex items-start justify-center overflow-hidden whitespace-nowrap px-2"
            style={{
              color: '#E8E0C2',
              fontFamily:
                "'Barlow Condensed','Roboto Condensed','Arial Narrow','Bahnschrift',sans-serif",
              fontSize: 'clamp(4.2rem, 19vw, 7.5rem)',
              fontWeight: 900,
              lineHeight: 0.9,
              letterSpacing: '-0.012em',
              textShadow: '0 1px 0 rgba(255,248,220,0.16), 0 10px 24px rgba(0,0,0,0.46)',
            }}
          >
            {TITLE_GLYPHS.map((g, i) => (
              <span key={`${g.char}-${i}`} className="inline-block overflow-hidden">
                <motion.span
                  className="inline-block"
                  initial={{ y: '112%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.7, delay: 0.3 + i * 0.05, ease }}
                  style={{
                    transform: `scale(${g.scaleX},${g.scaleY})`,
                    transformOrigin: 'center top',
                    marginRight: i < TITLE_GLYPHS.length - 1 ? '0.01em' : 0,
                  }}
                >
                  {g.char}
                </motion.span>
              </span>
            ))}
          </h1>
        </div>

        {/* Bottom copy — slides away as the panels sweep in */}
        <motion.div
          ref={bottomRef}
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.75, ease }}
          className="absolute bottom-10 left-6 right-6 z-40"
        >
          <p
            className="mb-3 text-[9px] font-bold uppercase tracking-[0.28em]"
            style={{
              color: 'rgba(220,210,180,0.6)',
              fontFamily: "'DM Mono','Courier New',monospace",
              borderLeft: '2px solid rgba(220,210,180,0.4)',
              paddingLeft: '8px',
            }}
          >
            Software Engineer | Tech Enthusiast
          </p>

          <p
            className="max-w-[26ch] text-[1.35rem] font-semibold leading-[1.25]"
            style={{
              color: 'rgba(235,228,208,0.93)',
              fontFamily: "'Barlow Condensed','Roboto Condensed',sans-serif",
              letterSpacing: '0.01em',
            }}
          >
            Not an expert, but someone who keeps learning and building.
          </p>
        </motion.div>

        {/* Scroll cue — outer div is GSAP's fade target, inner keeps the
            framer pulse loop so the two never write the same property */}
        <div ref={cueRef} className="absolute bottom-3 left-1/2 z-40 -translate-x-1/2">
          <motion.span
            className="block h-2 w-2 rotate-45 border-b-2 border-r-2 border-cyan-100/80"
            animate={{ y: [0, 5, 0], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </div>
    </section>
  );
};

export default MobileHero;