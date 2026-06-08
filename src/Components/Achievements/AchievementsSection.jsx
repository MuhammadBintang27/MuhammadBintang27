import { useLayoutEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrollLineDivider from '../SectionDivider/ScrollLineDivider';
import logikaImage from '../../assets/images/achievement/logika.webp';
import lidmImage from '../../assets/images/achievement/lidm.webp';
import hack4HealthImage from '../../assets/images/achievement/hack4health.webp';
import utuImage from '../../assets/images/achievement/utu.webp';
import alibabaImage from '../../assets/images/achievement/alibaba.webp';
gsap.registerPlugin(ScrollTrigger);

const ACHIEVEMENTS = [
  {
    title: '1st Place LOGIKA UI 2025 Data Science Competition',
    image: logikaImage,
    initialX: -290,
    initialY: -78,
    initialRotate: -10,
    targetX: -560,
    targetY: -120,
    targetRotate: -20,
  },
  {
    title: 'Bronze Medal LIDM 2025 Digital Learning Innovation',
    image: lidmImage,
    initialX: -120,
    initialY: 42,
    initialRotate: -6,
    targetX: -335,
    targetY: -18,
    targetRotate: -12,
  },
  {
    title: 'Top 10 AI X Creativity Hackathon Alibaba Cloud',
    image: alibabaImage,
    initialX: 22,
    initialY: -48,
    initialRotate: 3,
    targetX: 0,
    targetY: -120,
    targetRotate: 0,
  },
  {
    title: '2nd Place Hack4Health Hackathon ITB',
    image: hack4HealthImage,
    initialX: 188,
    initialY: 44,
    initialRotate: 7,
    targetX: 335,
    targetY: -18,
    targetRotate: 12,
  },
  {
    title: '3rd Place UTU Awards E-Commerce Design',
    image: utuImage,
    initialX: 340,
    initialY: -70,
    initialRotate: 10,
    targetX: 560,
    targetY: -120,
    targetRotate: 20,
  },
];

const computeScale = () => Math.min(1, window.innerWidth / 1400);

const AchievementsSection = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const cardsContainerRef = useRef(null);
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
          borderColor: 'rgba(0,0,0,0.9)',
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
      cardRefs.current = cardRefs.current.filter(Boolean);

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
          scrub: 1,
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

    return () => context.revert();
  }, []);

  return (
    <>
      <ScrollLineDivider />

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

        <div className="relative z-30 mx-auto w-full max-w-[1500px] px-4 pt-6 sm:px-8 sm:pt-8">
          <header ref={headingRef} className="mb-8 text-center sm:mb-10">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.24em] text-cyan-100/62">
              Milestones
            </p>
            <h2 className="text-[clamp(2.6rem,8vw,7.6rem)] font-black uppercase leading-[0.9] tracking-[-0.02em] text-[#e8e0c2]">
              What I&apos;ve Achieved
            </h2>
          </header>

          <div
            ref={cardsContainerRef}
            className="relative mx-auto h-[60vh] w-full max-w-[1300px] overflow-visible rounded-[18px] border border-white/10 bg-[#111319] shadow-[0_40px_120px_rgba(0,0,0,0.56)] sm:h-[70vh]"
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
                className="absolute left-1/2 top-1/2 z-30 cursor-grab -translate-x-1/2 -translate-y-1/2"
                style={{ zIndex: ACHIEVEMENTS.length - index + 20 }}
              >
                <div className="w-[min(64vw,330px)] overflow-hidden rounded-[8px] border border-black/90 bg-[#0c0c10] p-[10px] shadow-[0_24px_46px_rgba(0,0,0,0.58)] sm:w-[300px]">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="pointer-events-none h-52 w-full rounded-[2px] object-cover sm:h-[290px]"
                  />
                  <h3 className="mt-2 pb-1 text-center text-[clamp(0.98rem,1.3vw,1.35rem)] font-bold leading-tight text-white/92">
                    {item.title}
                  </h3>
                </div>
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
