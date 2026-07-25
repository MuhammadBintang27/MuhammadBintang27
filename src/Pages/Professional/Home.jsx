import { useLayoutEffect, useRef, useState } from 'react';
import { FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AnimatedProfileImage from '../../Components/Professional/Profile/AnimatedProfileImage';
import { PROFILE } from '../../data/profileData';

gsap.registerPlugin(ScrollTrigger);

const profileImage = PROFILE.profileImage;
const [roleOne, roleTwo, roleThree] = PROFILE.roles;

const Home = () => {
  const [cvOpen, setCvOpen] = useState(false);
  const sectionRef = useRef(null);
  const leftColumnRef = useRef(null);
  const rightColumnRef = useRef(null);
  const parallaxRef = useRef(null);
  const ctaRef = useRef(null);
  const badgeRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const eduRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const staggerItems = [
        badgeRef.current, titleRef.current, descRef.current,
        eduRef.current, ctaRef.current,
      ];

      gsap.set([leftColumnRef.current, rightColumnRef.current, ...staggerItems], {
        autoAlpha: 0,
      });

      // Reveal fires earlier and moves faster so the section is already alive
      // by the time it fills the viewport, instead of arriving late.
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 88%',
          toggleActions: 'play none none reverse',
        },
        defaults: { ease: 'power3.out' },
      });

      tl.fromTo(
        leftColumnRef.current,
        { x: -56, autoAlpha: 0 },
        { x: 0, autoAlpha: 1, duration: 0.85 },
      )
        .fromTo(
          rightColumnRef.current,
          { x: 56, scale: 0.96, autoAlpha: 0 },
          { x: 0, scale: 1, autoAlpha: 1, duration: 0.85 },
          '<',
        )
        .fromTo(
          staggerItems,
          { y: 26, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.65, stagger: 0.09 },
          '-=0.6',
        );

      // Gentle scroll parallax on the portrait for a sense of depth.
      gsap.fromTo(
        parallaxRef.current,
        { yPercent: 7 },
        {
          yPercent: -7,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen overflow-hidden bg-[linear-gradient(180deg,#0f1014_0%,#12141b_44%,#101117_100%)]"
    >
      <style>{`
        @keyframes homeGlowDrift {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(40px, -28px) scale(1.12); }
        }
        @keyframes eduShine {
          0%, 55%, 100% { transform: translateX(-130%) skewX(-18deg); }
          25%, 35% { transform: translateX(230%) skewX(-18deg); }
        }
      `}</style>

      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute -right-20 bottom-1/4 h-96 w-96 rounded-full bg-amber-300/[0.06] blur-3xl"
        style={{ animation: 'homeGlowDrift 18s ease-in-out infinite reverse' }}
      />

      {/* Top divider indicator */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-20">
        <div className="mx-4 border-t border-cyan-100/20 sm:mx-8" />
        <div className="mx-4 mt-3 flex items-center justify-center sm:mx-8">
          <div className="h-px w-[43%] bg-cyan-100/18" />
          <motion.div
            className="mx-4 flex flex-col items-center"
            animate={{ y: [0, 3, 0], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2.1, repeat: Infinity, ease: 'easeInOut' }}
          >
            <span className="h-3 w-px bg-cyan-100/40" />
            <span className="h-1.5 w-1.5 rotate-45 border-b border-r border-cyan-100/65" />
            <span className="mt-0.5 h-1.5 w-1.5 rotate-45 border-b border-r border-cyan-100/40" />
          </motion.div>
          <div className="h-px w-[43%] bg-cyan-100/18" />
        </div>
      </div>

      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 pt-8 sm:px-8 sm:pt-12">
        <div className="mx-auto w-full max-w-6xl">
          <div className="flex flex-col items-center justify-between gap-10 md:flex-row lg:gap-16">

            {/* Left — text */}
            <div ref={leftColumnRef} className="w-full text-center md:w-1/2 md:text-left">

              <p
                ref={badgeRef}
                className="mb-3 flex items-center justify-center gap-3 text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-cyan-100/62 md:justify-start"
              >
                <span className="h-px w-8 bg-gradient-to-r from-cyan-300/70 to-transparent" />
                Inside My Build
              </p>

              <div ref={titleRef}>
                <TypeAnimation
                  sequence={[
                    roleOne, 2400,
                    roleTwo, 2400,
                    roleThree, 2000,
                  ]}
                  wrapper="h1"
                  speed={50}
                  className="mb-6 text-[clamp(2.4rem,6vw,4.8rem)] font-black uppercase leading-[0.94] tracking-[-0.02em] text-[#e8e0c2]"
                  repeat={Infinity}
                />
              </div>

              <p
                ref={descRef}
                className="mb-6 max-w-[56ch] text-[1rem] leading-relaxed text-white/62 md:text-[1.1rem]"
              >
                {PROFILE.bio}
              </p>

              {/* Education decoration */}
              <div
                ref={eduRef}
                className="relative mb-8 inline-flex items-center gap-3 overflow-hidden rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 backdrop-blur-sm transition-colors duration-300 hover:border-cyan-200/25"
              >
                <span
                  className="pointer-events-none absolute inset-y-0 w-16 bg-gradient-to-r from-transparent via-white/[0.09] to-transparent"
                  style={{ animation: 'eduShine 5.5s ease-in-out infinite' }}
                />
                <div className="rounded-full ">
                  <img src={PROFILE.education.logo} alt="Education" className="h-6" />
                </div>
                <div className="text-left">
                  <p className="text-[0.78rem] font-semibold leading-tight text-white/85">
                    {PROFILE.education.degree}
                  </p>
                  <p className="mt-0.5 text-[0.68rem] leading-tight text-white/40">
                    {PROFILE.education.detail}
                  </p>
                </div>
              </div>

              <div
                ref={ctaRef}
                className="flex flex-wrap justify-center gap-3 md:justify-start"
              >
                <button
                  onClick={() => setCvOpen(true)}
                  className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-400 to-yellow-300 px-7 py-2.5 text-sm font-bold text-[#0f1014] shadow-[0_0_18px_rgba(251,191,36,0.30)] transition-all duration-300 hover:scale-[1.04] hover:shadow-[0_0_28px_rgba(251,191,36,0.50)]"
                >
                  <FileText size={14} strokeWidth={2.5} />
                  View CV
                </button>
                <a
                  href="#contact"
                  className="rounded-full border border-white/15 px-7 py-2.5 text-sm font-bold text-white/65 transition hover:border-white/30 hover:text-white"
                >
                  Find Me
                </a>
              </div>
            </div>

            {/* Right — profile image (inner wrapper carries the scroll parallax) */}
            <div ref={rightColumnRef} className="flex w-full justify-center md:w-1/2 md:justify-end">
              <div ref={parallaxRef} className="w-full">
                <AnimatedProfileImage profileImage={profileImage} />
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* CV Modal */}
      <AnimatePresence>
        {cvOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCvOpen(false)}
          >
            <motion.div
              className="relative flex h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#12141b]"
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 320, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal header */}
              <div className="flex shrink-0 items-center justify-between border-b border-white/8 px-5 py-3.5">
                <p className="text-[0.78rem] font-semibold uppercase tracking-widest text-white/50">
                  Curriculum Vitae
                </p>
                <div className="flex items-center gap-2">
                  <a
                    href={PROFILE.cvPath}
                    download
                    className="rounded-lg border border-white/10 px-3.5 py-1.5 text-xs font-semibold text-white/60 transition hover:border-white/25 hover:text-white"
                  >
                    Download
                  </a>
                  <button
                    onClick={() => setCvOpen(false)}
                    className="flex h-7 w-7 items-center justify-center rounded-lg text-white/40 transition hover:bg-white/8 hover:text-white"
                    aria-label="Close"
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* PDF viewer */}
              <iframe
                src={PROFILE.cvPath}
                title="Muhammad Bintang CV"
                className="h-full w-full flex-1"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Home;
