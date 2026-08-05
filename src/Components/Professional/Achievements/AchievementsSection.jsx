import { useLayoutEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrollLineDivider from '../SectionDivider/ScrollLineDivider';
import { ACHIEVEMENTS } from '../../../data/achievementsData';
gsap.registerPlugin(ScrollTrigger);

const computeScale = () => Math.min(1, window.innerWidth / 1400);

const AchievementsSection = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const [loadedImages, setLoadedImages] = useState({});
  const cardsContainerRef = useRef(null);
  const trackViewportRef = useRef(null);
  const trackRef = useRef(null);
  const cardRefs = useRef([]);
  const zCounterRef = useRef(200);
  const scaleRef = useRef(computeScale());

  const dragBounds = {
    top: -420 * scaleRef.current,
    left: -760 * scaleRef.current,
    right: 760 * scaleRef.current,
    bottom: 320 * scaleRef.current,
  };

  const bringCardToFront = (index) => {
    const cardElement = cardRefs.current[index];
    if (!cardElement) {
      return;
    }

    zCounterRef.current += 1;

    // Update z-index directly to avoid a component re-render that can reset transform values.
    cardElement.style.zIndex = String(zCounterRef.current);

    const cardSurface = cardElement.firstElementChild;
    if (cardSurface) {
      gsap.fromTo(
        cardSurface,
        {
          borderColor: 'rgba(245, 236, 205, 0.95)',
          boxShadow: '0 0 0 1px rgba(245,236,205,0.45), 0 28px 60px rgba(0,0,0,0.72)',
        },
        {
          borderColor: 'rgba(207,250,254,0.25)',
          boxShadow: '0 24px 46px rgba(0,0,0,0.58)',
          duration: 0.3,
          ease: 'power2.out',
          overwrite: true,
        },
      );
    }
  };

  useLayoutEffect(() => {
    if (!sectionRef.current) {
      return undefined;
    }

    const context = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 42 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            once: true,
          },
        },
      );
    }, sectionRef);

    // Pinned scatter animation is desktop-only (≥1024px); on phones and iPad the
    // cards live in a swipe track instead — matching the Playful version's
    // breakpoint so both read the same: desktop = scatter, else = slide.
    const mm = gsap.matchMedia();
    mm.add('(min-width: 1024px)', () => {
      const desktopContext = gsap.context(() => {
        cardRefs.current = cardRefs.current.filter(Boolean);

        const setInitialPositions = () => {
          scaleRef.current = computeScale();
          gsap.set(cardRefs.current, {
            x: (index) => ACHIEVEMENTS[index].initialX * scaleRef.current,
            y: (index) => ACHIEVEMENTS[index].initialY * scaleRef.current,
            rotate: (index) => ACHIEVEMENTS[index].initialRotate,
          });
        };

        setInitialPositions();

        const spreadTimeline = gsap.timeline({
          defaults: { ease: 'power3.out' },
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: '+=240%',
            scrub: true,
            pin: sectionRef.current,
            pinSpacing: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onRefresh: setInitialPositions,
          },
        });

        // Hold first viewport: title + complete stacked cards visible before scattering.
        spreadTimeline.to({}, { duration: 0.95 });

        ACHIEVEMENTS.forEach((item, index) => {
          spreadTimeline.to(
            cardRefs.current[index],
            {
              x: () => item.targetX * scaleRef.current,
              y: () => item.targetY * scaleRef.current,
              rotate: item.targetRotate,
            },
            index * 0.14,
          );
        });
      }, sectionRef);

      return () => desktopContext.revert();
    });

    // Mobile: vertical scroll drives the card track horizontally — the
    // section pins until every card has slid past, in both directions.
    mm.add('(max-width: 1023px)', () => {
      const mobileContext = gsap.context(() => {
        const track = trackRef.current;
        const viewport = trackViewportRef.current;
        if (!track || !viewport) {
          return;
        }

        const getDistance = () => Math.max(track.scrollWidth - viewport.clientWidth, 0);

        gsap.to(track, {
          x: () => -getDistance(),
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: () => `+=${getDistance()}`,
            scrub: true,
            pin: sectionRef.current,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
      }, sectionRef);

      return () => mobileContext.revert();
    });

    return () => {
      mm.revert();
      context.revert();
    };
  }, []);

  const renderCardSurface = (item, index) => (
    <div className="w-full overflow-hidden rounded-[12px] border-[3px] border-cyan-100/25 bg-[#1b1e28] p-[20px] shadow-[0_24px_46px_rgba(0,0,0,0.58)] sm:rounded-[8px] sm:border sm:p-[10px]">
      <div className="relative h-[52vh] w-full sm:h-[290px]">
        {!loadedImages[index] && (
          <div className="absolute inset-0 overflow-hidden rounded-[2px] bg-neutral-800">
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.06) 50%, transparent 100%)',
                animation: 'shimmer 1.4s infinite',
                backgroundSize: '200% 100%',
              }}
            />
          </div>
        )}
        <img
          src={item.image}
          alt={item.title}
          loading="lazy"
          onLoad={() => setLoadedImages((prev) => ({ ...prev, [index]: true }))}
          className="pointer-events-none h-full w-full rounded-[2px] object-cover"
          style={{
            opacity: loadedImages[index] ? 1 : 0,
            transition: 'opacity 0.5s ease',
          }}
        />
      </div>
      <h3 className="mt-2 pb-1 text-center text-[clamp(0.98rem,1.3vw,1.35rem)] font-bold leading-tight text-white/92">
        {item.title}
      </h3>
    </div>
  );

  return (
    <>
      <ScrollLineDivider />

      <style>{`@keyframes shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}`}</style>
      <section
        ref={sectionRef}
        id="achievements"
        className="relative min-h-screen overflow-hidden border-b border-cyan-100/20 bg-[linear-gradient(180deg,#0f1014_0%,#12141b_44%,#101117_100%)] py-10 sm:py-12"
      >
        <div
          className="pointer-events-none absolute inset-x-0 top-0 z-20 h-24"
          style={{
            background: 'linear-gradient(to bottom, rgba(15,16,20,0.78) 0%, rgba(15,16,20,0.32) 45%, rgba(15,16,20,0) 100%)',
          }}
        />

        <div className="relative z-30 mx-auto flex min-h-[calc(100svh-6rem)] w-full max-w-[1500px] flex-col justify-start px-4 pt-6 sm:px-8 sm:pt-8 lg:min-h-0">
          <header ref={headingRef} className="mb-8 text-center sm:mb-10">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.24em] text-cyan-100/62">
              Milestones
            </p>
            <h2 className="text-[clamp(2.6rem,8vw,7.6rem)] font-black uppercase leading-[0.9] tracking-[-0.02em] text-[#e8e0c2]">
              What I&apos;ve Achieved
            </h2>
          </header>

          {/* Mobile + iPad (<1024px) — horizontal card track driven by vertical
              scroll: the section pins while the cards slide through, then
              releases */}
          <div className="lg:hidden">
            <div ref={trackViewportRef} className="-mx-4 overflow-hidden">
              <div ref={trackRef} className="flex w-max gap-5 px-8 pb-2 pt-2">
                {ACHIEVEMENTS.map((item, index) => (
                  <motion.article
                    key={item.title}
                    initial={{ opacity: 0, y: 26 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.5, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
                    className="w-[82vw] max-w-[340px] shrink-0"
                    style={{ rotate: index % 2 === 0 ? '-1.6deg' : '1.6deg' }}
                  >
                    {renderCardSurface(item, index)}
                  </motion.article>
                ))}
              </div>
            </div>
          </div>

          {/* Desktop (≥1024px) — pinned scatter + draggable cards */}
          <div
            ref={cardsContainerRef}
            className="relative mx-auto hidden h-[60vh] w-full max-w-[1300px] overflow-visible rounded-[18px] border border-white/10 bg-[#111319] shadow-[0_40px_120px_rgba(0,0,0,0.56)] sm:h-[70vh] lg:block"
          >
            {ACHIEVEMENTS.map((item, index) => (
              <motion.article
                key={item.title}
                ref={(element) => {
                  cardRefs.current[index] = element;
                }}
                onPointerDown={() => bringCardToFront(index)}
                drag
                dragMomentum={false}
                dragConstraints={dragBounds}
                dragElastic={0.16}
                whileTap={{ cursor: 'grabbing', scale: 1.02 }}
                className="absolute left-1/2 top-1/2 z-30 w-[300px] cursor-grab -translate-x-1/2 -translate-y-1/2"
                style={{ zIndex: ACHIEVEMENTS.length - index + 20 }}
              >
                {renderCardSurface(item, index)}
              </motion.article>
            ))}

            <p className="pointer-events-none absolute bottom-8 left-1/2 z-[1] w-full max-w-[560px] -translate-x-1/2 px-4 text-center text-[clamp(1.6rem,3.8vw,3.7rem)] font-black leading-[1.05] text-neutral-500/24 sm:bottom-10">
              Some outcomes of the process.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default AchievementsSection;