import { useLayoutEffect, useRef, useState } from 'react';
import { FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AnimatedProfileImage from '../Components/Profile/AnimatedProfileImage';

gsap.registerPlugin(ScrollTrigger);

const profileImage = '/Fotoutama.webp';

const Home = () => {
  const [cvOpen, setCvOpen] = useState(false);
  const sectionRef = useRef(null);
  const leftColumnRef = useRef(null);
  const rightColumnRef = useRef(null);
  const ctaRef = useRef(null);
  const badgeRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(
        [leftColumnRef.current, rightColumnRef.current, ctaRef.current,
          badgeRef.current, titleRef.current, descRef.current],
        { autoAlpha: 0 },
      );

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 74%',
          toggleActions: 'play none none reverse',
        },
        defaults: { ease: 'power4.out' },
      });

      tl.fromTo(
        leftColumnRef.current,
        { x: -110, autoAlpha: 0 },
        { x: 0, autoAlpha: 1, duration: 1.55 },
      )
        .fromTo(
          rightColumnRef.current,
          { x: 110, autoAlpha: 0 },
          { x: 0, autoAlpha: 1, duration: 1.55 },
          '<',
        )
        .fromTo(
          [badgeRef.current, titleRef.current, descRef.current, ctaRef.current],
          { y: 28, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 1.1, stagger: 0.16 },
          '-=0.52',
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
                className="mb-3 text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-cyan-100/62"
              >
                Inside My Build
              </p>

              <div ref={titleRef}>
                <TypeAnimation
                  sequence={[
                    'Full Stack Developer', 2400,
                    'AI-Driven Builder', 2400,
                    'Creative Problem Solver', 2000,
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
                Informatics graduate from Universitas Syiah Kuala, blending engineering and
                creativity into products that feel clear, useful, and human. I enjoy
                exploring AI workflows, designing clean interfaces, and shipping ideas
                from concept to working experience.
              </p>

              {/* Education decoration */}
              <div className="mb-8 inline-flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 backdrop-blur-sm">
                <div className="rounded-full ">
                  <img src="/logousk.webp" alt="Education" className="h-6" />
                </div>
                <div className="text-left">
                  <p className="text-[0.78rem] font-semibold leading-tight text-white/85">
                    Bachelor of Informatics
                  </p>
                  <p className="mt-0.5 text-[0.68rem] leading-tight text-white/40">
                    Cum Laude&nbsp;·&nbsp;GPA 3.82&nbsp;·&nbsp;Universitas Syiah Kuala
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

            {/* Right — profile image */}
            <div ref={rightColumnRef} className="flex w-full justify-center md:w-1/2 md:justify-end">
              <AnimatedProfileImage profileImage={profileImage} />
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
                    href="/CV.pdf"
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
                src="/CV.pdf"
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
