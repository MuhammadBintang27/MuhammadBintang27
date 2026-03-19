import { useLayoutEffect, useMemo, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import firstImageDefault from '../../assets/images/hero/imagepertama.webp';
import secondImageDefault from '../../assets/images/hero/gelap.webp';

gsap.registerPlugin(ScrollTrigger);

const PANEL_COLUMNS = 7;
const PANEL_ROWS = 1;
const TITLE_GLYPHS = [
  { char: 'B', scaleY: 1.34, scaleX: 1.12 },
  { char: 'I', scaleY: 1.1, scaleX: 1.08 },
  { char: 'N', scaleY: 0.82, scaleX: 1.03 },
  { char: 'T', scaleY: 0.82, scaleX: 1.03 },
  { char: 'A', scaleY: 0.82, scaleX: 1.03 },
  { char: 'N', scaleY: 1.1, scaleX: 1.08 },
  { char: 'G', scaleY: 1.34, scaleX: 1.12 },
];

const buildPanels = () => {
  const panels = [];

  for (let row = 0; row < PANEL_ROWS; row += 1) {
    for (let col = 0; col < PANEL_COLUMNS; col += 1) {
      panels.push({
        id: `${row}-${col}`,
        row,
        col,
      });
    }
  }

  return panels;
};

const panelBackgroundStyle = (imageSrc, row, col) => {
  const x = (col / Math.max(PANEL_COLUMNS - 1, 1)) * 100;
  const y = (row / Math.max(PANEL_ROWS - 1, 1)) * 100;

  return {
    backgroundImage: `url(${imageSrc})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: `${PANEL_COLUMNS * 100}% ${PANEL_ROWS * 100}%`,
    backgroundPosition: `${x}% ${y}%`,
    clipPath: 'inset(100% 0% 0% 0%)',
  };
};

const fullImageBackgroundStyle = (imageSrc) => ({
  backgroundImage: `url(${imageSrc})`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: '100% 100%',
  backgroundPosition: 'center',
});

const HeroSection = ({
  firstImage = firstImageDefault,
  secondImage = secondImageDefault,
}) => {
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const imageBaseRef = useRef(null);
  const imageTopRef = useRef(null);
  const imageSecondFullRef = useRef(null);
  const vignetteRef = useRef(null);
  const edgeShadowRef = useRef(null);
  const greetingRef = useRef(null);
  const titleRef = useRef(null);
  const leftOverlayRef = useRef(null);
  const rightOverlayRef = useRef(null);
  const panelRefs = useRef([]);
  const panelShadeRefs = useRef([]);
  const panels = useMemo(buildPanels, []);

  useLayoutEffect(() => {
    if (!sectionRef.current || !stageRef.current) {
      return undefined;
    }

    const context = gsap.context(() => {
      panelRefs.current = panelRefs.current.filter(Boolean);
      panelShadeRefs.current = panelShadeRefs.current.filter(Boolean);
      const centerCol = (PANEL_COLUMNS - 1) / 2;
      const getPanelDelay = (panel) => {
        const col = Number(panel?.dataset?.col ?? 0);
        return Math.abs(col - centerCol) * 0.1;
      };

      gsap.set(panelRefs.current, {
        clipPath: 'inset(100% 0% 0% 0%)',
        yPercent: 16,
      });
      gsap.set(panelShadeRefs.current, { opacity: 0.2 });

      gsap.set(imageBaseRef.current, { scale: 1, opacity: 1 });
      gsap.set(imageTopRef.current, { opacity: 1 });
      gsap.set(imageSecondFullRef.current, { opacity: 0 });
      gsap.set(vignetteRef.current, { opacity: 0.5 });
      gsap.set(edgeShadowRef.current, { opacity: 0.5 });
      gsap.set(greetingRef.current, { opacity: 1, y: 104 });
      gsap.set(titleRef.current, {
        opacity: 1,
        scale: 1.20,
        y: 136,
        transformOrigin: 'center top',
      });
      gsap.set(leftOverlayRef.current, { opacity: 1, x: 0 });
      gsap.set(rightOverlayRef.current, { opacity: 1, x: 0 });

      const timeline = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=300%',
          scrub: 1,
          pin: stageRef.current,
          pinSpacing: false,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      timeline
        .to(greetingRef.current, { opacity: 0, y: 92, duration: 0.12 }, 0.03)
        .to(titleRef.current, { scale: 0.18, y: 8, duration: 0.32 }, 0.02)
        .to(leftOverlayRef.current, { x: -120, opacity: 0 }, 0.16)
        .to(rightOverlayRef.current, { x: 120, opacity: 0 }, 0.16)
        .to(imageBaseRef.current, { scale: 1.02, opacity: 0.12 }, 0.08)
        .to(
          panelRefs.current,
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            yPercent: 0,
            ease: 'power2.out',
            stagger: (index, panel) => getPanelDelay(panel),
          },
          0,
        )
        .to(
          panelShadeRefs.current,
          {
            opacity: 0.78,
            ease: 'power2.out',
            stagger: (index, panelShade) => getPanelDelay(panelShade),
          },
          0.02,
        )
        .to(imageSecondFullRef.current, { opacity: 1, duration: 0.22 }, 0.68)
        .to(imageTopRef.current, { opacity: 0, duration: 0.22 }, 0.68)
        .to(vignetteRef.current, { opacity: 0.95 }, 0.45)
        .to(edgeShadowRef.current, { opacity: 0.9 }, 0.45);

      // Keep final frame visible a bit longer before releasing pin to TechStack.
      timeline.to(imageSecondFullRef.current, { opacity: 1, duration: 0.24 }, 0.92);
    }, sectionRef);

    return () => context.revert();
  }, []);

  return (
    <section ref={sectionRef} id="home" className="relative h-[320vh] w-full overflow-x-clip">
      <div
        ref={stageRef}
        className="relative h-screen min-h-[100svh] w-full overflow-hidden bg-techstack-theme"
      >
        <div className="pointer-events-none absolute inset-2 z-40 border-2 border-cyan-100/55 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.12)] sm:inset-4">
          <div className="absolute -left-[2px] -top-[2px] h-8 w-8 border-l-2 border-t-2 border-cyan-100/95 sm:h-10 sm:w-10" />
          <div className="absolute -right-[2px] -top-[2px] h-8 w-8 border-r-2 border-t-2 border-cyan-100/95 sm:h-10 sm:w-10" />
          <div className="absolute -left-[2px] -bottom-[2px] h-8 w-8 border-b-2 border-l-2 border-cyan-100/95 sm:h-10 sm:w-10" />
          <div className="absolute -right-[2px] -bottom-[2px] h-8 w-8 border-b-2 border-r-2 border-cyan-100/95 sm:h-10 sm:w-10" />
          <div className="absolute left-4 right-4 top-[10px] sm:left-8 sm:right-8">
            <div className="absolute left-0 top-0 h-px w-[48%] bg-cyan-100/72" />
            <div className="absolute right-0 top-0 h-px w-[48%] bg-cyan-100/72" />
          </div>
          <div className="absolute left-4 right-4 top-[42px] flex items-center justify-between text-[0.62rem] font-bold uppercase tracking-[0.22em] text-cyan-100/92 sm:left-8 sm:right-8 sm:text-[0.68rem]">
            <span>Integrity</span>
            <span>Advancement</span>
          </div>
          <div className="absolute left-4 right-4 top-[58px] sm:left-8 sm:right-8">
            <div className="absolute left-0 top-0 h-px w-[44%] bg-cyan-100/50" />
            <div className="absolute right-0 top-0 h-px w-[44%] bg-cyan-100/50" />
          </div>
          <div className="absolute left-4 right-4 bottom-4 h-px bg-cyan-100/38 sm:left-8 sm:right-8" />
        </div>

        <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_30%,rgba(56,189,248,0.18),transparent_42%),linear-gradient(160deg,#02040b_0%,#020617_48%,#02030a_100%)]" />

        <div className="relative z-20 h-full w-full">
          <div className="relative h-full w-full overflow-hidden border border-cyan-200/20 shadow-[0_36px_90px_rgba(2,6,23,0.62)]">
            <div
              ref={imageBaseRef}
              className="absolute inset-0 z-0"
              style={fullImageBackgroundStyle(firstImage)}
            />

            <div
              ref={imageSecondFullRef}
              className="absolute inset-0 z-[1]"
              style={fullImageBackgroundStyle(secondImage)}
            />

            <div
              ref={greetingRef}
              className="pointer-events-none absolute left-1/2 top-[1.2%] z-30 -translate-x-1/2 select-none sm:top-[1.1%]"
            >
              <p
                className="text-[1.16rem] font-semibold tracking-[0.11em] text-[#e8e0c2]/88 sm:text-[1.34rem]"
                style={{
                  fontFamily: "'DM Mono','Courier New',monospace",
                }}
              >
                Hola, I&apos;m
              </p>
            </div>

            <div
              ref={titleRef}
              className="pointer-events-none absolute left-1/2 top-[3%] z-30 -translate-x-1/2 select-none sm:top-[2%]"
            >
              <h1
                aria-label="BINTANG"
                className="flex w-[114vw] items-start justify-center whitespace-nowrap"
                style={{
                  color: '#E8E0C2',
                  fontFamily:
                    "'Barlow Condensed','Roboto Condensed','Arial Narrow','Bahnschrift',sans-serif",
                  fontSize: 'clamp(8rem, 18vw, 18.5rem)',
                  fontWeight: 900,
                  lineHeight: 0.82,
                  letterSpacing: '-0.012em',
                  WebkitTextStroke: '0.45px rgba(255,240,200,0.18)',
                  textShadow: '0 1px 0 rgba(255,248,220,0.16), 0 10px 24px rgba(0,0,0,0.46)',
                }}
              >
                {TITLE_GLYPHS.map((g, i) => (
                  <span
                    key={`${g.char}-${i}`}
                    className="inline-block"
                    style={{
                      transform: `scale(${g.scaleX},${g.scaleY})`,
                      transformOrigin: 'center top',
                      marginRight: i < TITLE_GLYPHS.length - 1 ? '0.01em' : 0,
                    }}
                  >
                    {g.char}
                  </span>
                ))}
              </h1>
            </div>

            <div ref={imageTopRef} className="absolute inset-0 z-10">
              <div className="grid h-full w-full grid-cols-7 grid-rows-1">
                {panels.map((panel, index) => (
                  <div
                    key={panel.id}
                    ref={(element) => {
                      panelRefs.current[index] = element;
                    }}
                    data-row={panel.row}
                    data-col={panel.col}
                    className="relative h-full w-full overflow-hidden border-l border-black/45 first:border-l-0"
                    style={panelBackgroundStyle(secondImage, panel.row, panel.col)}
                  >
                    <div
                      ref={(element) => {
                        panelShadeRefs.current[index] = element;
                      }}
                      data-col={panel.col}
                      className="pointer-events-none absolute inset-0 z-10"
                      style={{
                        borderTop: '1px solid rgba(0,0,0,0.9)',
                        background:
                          'linear-gradient(to bottom, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.45) 26%, rgba(0,0,0,0) 62%)',
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div
              ref={vignetteRef}
              className="pointer-events-none absolute inset-0 z-20"
              style={{
                willChange: 'opacity',
                background:
                  'radial-gradient(ellipse at center, rgba(0,0,0,0) 36%, rgba(0,0,0,0.18) 52%, rgba(0,0,0,0.72) 76%, rgba(0,0,0,0.98) 100%), linear-gradient(to right, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.58) 11%, rgba(0,0,0,0) 24%, rgba(0,0,0,0) 76%, rgba(0,0,0,0.58) 89%, rgba(0,0,0,0.92) 100%)',
                boxShadow: 'inset 0 0 220px rgba(0, 0, 0, 0.5)',
              }}
            />

            <div
              ref={edgeShadowRef}
              className="pointer-events-none absolute inset-0 z-[21]"
              style={{
                willChange: 'opacity',
                background:
                  'linear-gradient(to right, rgba(0,0,0,0.98) 0%, rgba(0,0,0,0.66) 10%, rgba(0,0,0,0) 22%, rgba(0,0,0,0) 78%, rgba(0,0,0,0.66) 90%, rgba(0,0,0,0.98) 100%), linear-gradient(to bottom, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.44) 12%, rgba(0,0,0,0) 30%, rgba(0,0,0,0) 76%, rgba(0,0,0,0.52) 90%, rgba(0,0,0,0.9) 100%)',
              }}
            />

            <div
              ref={leftOverlayRef}
              className="pointer-events-none absolute bottom-10 left-8 z-30 sm:bottom-14 sm:left-12"
              style={{ maxWidth: 'min(72vw, 420px)' }}
            >
              <p
                className="mb-3 text-[9px] font-bold uppercase tracking-[0.28em]"
                style={{
                  color: 'rgba(220,210,180,0.55)',
                  fontFamily: "'DM Mono','Courier New',monospace",
                  borderLeft: '2px solid rgba(220,210,180,0.4)',
                  paddingLeft: '8px',
                }}
              >
                Software Engineer | Tech Enthusiast
              </p>

              <p
                className="text-[1.05rem] font-semibold leading-[1.3] sm:text-[1.65rem]"
                style={{
                  color: 'rgba(235,228,208,0.93)',
                  fontFamily: "'Barlow Condensed','Roboto Condensed',sans-serif",
                  letterSpacing: '0.01em',
                }}
              >
                Not an expert, but someone who keeps learning and building.
              </p>

              <div className="pointer-events-auto mt-5 flex items-center gap-4">
                <button
                  type="button"
                  className="group relative overflow-hidden border text-[11px] font-bold uppercase tracking-[0.18em] transition-all duration-300"
                  style={{
                    borderColor: 'rgba(220,210,180,0.4)',
                    color: 'rgba(220,210,180,0.9)',
                    padding: '10px 22px',
                    background: 'rgba(0,0,0,0.45)',
                    fontFamily: "'DM Mono','Courier New',monospace",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(220,210,180,0.92)';
                    e.currentTarget.style.color = '#0a0d0b';
                    e.currentTarget.style.borderColor = 'rgba(220,210,180,0.92)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(0,0,0,0.45)';
                    e.currentTarget.style.color = 'rgba(220,210,180,0.9)';
                    e.currentTarget.style.borderColor = 'rgba(220,210,180,0.4)';
                  }}
                >
                  Learn More
                  <span className="ml-2">&rsaquo;</span>
                </button>

                <span
                  className="hidden sm:inline-block"
                  style={{
                    width: 36,
                    height: 1,
                    background: 'rgba(220,210,180,0.3)',
                    display: 'inline-block',
                  }}
                />
              </div>
            </div>

            <div
              ref={rightOverlayRef}
              className="pointer-events-none absolute bottom-10 right-8 z-30 text-right sm:bottom-14 sm:right-12"
            >
              <div
                style={{
                  border: '1px solid rgba(220,210,180,0.2)',
                  padding: '12px 18px 10px',
                  background: 'rgba(0,0,0,0.38)',
                  backdropFilter: 'blur(4px)',
                }}
              >
                <p
                  className="font-black italic leading-none"
                  style={{
                    fontFamily: "'Barlow Condensed','Roboto Condensed',sans-serif",
                    fontSize: 'clamp(2.4rem, 7vw, 5.5rem)',
                    color: '#E8E0C2',
                    letterSpacing: '0.02em',
                    lineHeight: 1,
                  }}
                >
                  100,000
                </p>

                <div
                  className="my-2 ml-auto"
                  style={{ width: '100%', height: 1, background: 'rgba(220,210,180,0.22)' }}
                />

                <p
                  className="text-[9px] font-bold uppercase tracking-[0.28em]"
                  style={{
                    color: 'rgba(220,210,180,0.6)',
                    fontFamily: "'DM Mono','Courier New',monospace",
                  }}
                >
                  Computer Hours Delivered
                </p>

                <div className="mt-2 flex items-end justify-end gap-[2px]">
                  {[0.3, 0.5, 0.4, 0.7, 0.6, 0.9, 0.75, 1, 0.85, 0.65, 0.5, 0.4].map(
                    (h, i) => (
                      <div
                        key={i}
                        style={{
                          width: 3,
                          height: `${h * 14}px`,
                          background: `rgba(220,210,180,${h * 0.55})`,
                        }}
                      />
                    ),
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
