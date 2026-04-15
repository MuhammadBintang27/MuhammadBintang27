import React, { useLayoutEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AnimatedProfileImage from '../Components/Profile/AnimatedProfileImage';

const profileImage = '/FotoProfile.png';

const Home = () => {
  const sectionRef = useRef(null);
  const leftColumnRef = useRef(null);
  const rightColumnRef = useRef(null);
  const ctaRef = useRef(null);
  const badgeRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.set(
        [
          leftColumnRef.current,
          rightColumnRef.current,
          ctaRef.current,
          badgeRef.current,
          titleRef.current,
          descRef.current,
        ],
        {
        autoAlpha: 0,
        },
      );

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 74%',
          toggleActions: 'play none none reverse',
        },
        defaults: {
          ease: 'power4.out',
        },
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
      id="get-to-know"
      className="relative min-h-screen overflow-hidden border-t border-cyan-100/20 bg-[linear-gradient(180deg,#0f1014_0%,#12141b_44%,#101117_100%)] "
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 z-20">
        <div className="mx-4 border-t border-cyan-100/34 sm:mx-8" />
        <div className="mx-4 mt-3 flex items-center justify-center sm:mx-8">
          <div className="h-px w-[43%] bg-cyan-100/32" />
          <motion.div
            className="mx-4 flex flex-col items-center"
            animate={{ y: [0, 3, 0], opacity: [0.78, 1, 0.78] }}
            transition={{ duration: 2.1, repeat: Infinity, ease: 'easeInOut' }}
          >
            <span className="h-3 w-px bg-cyan-100/55" />
            <span className="h-1.5 w-1.5 rotate-45 border-b border-r border-cyan-100/88" />
            <span className="mt-0.5 h-1.5 w-1.5 rotate-45 border-b border-r border-cyan-100/62" />
          </motion.div>
          <div className="h-px w-[43%] bg-cyan-100/32" />
        </div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 pt-8 sm:px-8 sm:pt-12">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -left-20 -top-20 h-96 w-96 rounded-full bg-cyan-400/14 blur-3xl" />
          <div className="absolute -bottom-24 right-0 h-80 w-80 rounded-full bg-cyan-100/10 blur-3xl" />
        </div>

        <div className="container mx-auto z-10">
          <div className="mx-auto max-w-6xl">
            {/* Two column layout */}
            <div className="flex flex-col items-center justify-between gap-8 md:flex-row lg:gap-12">

              {/* Left column - Text content */}
              <div ref={leftColumnRef} className="w-full text-center md:w-1/2 md:text-left">
                <div>
                  <p
                    ref={badgeRef}
                    className="mb-3 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-cyan-100/62"
                  >
                    Inside My Build
                  </p>
                </div>

                <div ref={titleRef}>
                  <TypeAnimation
                    sequence={[
                      'Full Stack Developer',
                      2400,
                      'AI-Driven Builder',
                      2400,
                      'Creative Problem Solver',
                      2000,
                    ]}
                    wrapper="h1"
                    speed={50}
                    className="mb-6 text-[clamp(2.45rem,6.2vw,4.9rem)] font-black uppercase leading-[0.95] tracking-[-0.02em] text-[#e8e0c2]"
                    repeat={Infinity}
                  />
                </div>

                <p
                  ref={descRef}
                  className="mb-8 max-w-[60ch] text-[1.01rem] leading-relaxed text-slate-200/86 md:text-[1.14rem]"
                >
                  Informatics student at Universitas Syiah Kuala, blending engineering and creativity into products
                  that feel clear, useful, and human. I enjoy exploring AI workflows, designing clean interfaces, and
                  shipping ideas from concept to working experience.
                </p>

                <div ref={ctaRef} className="flex justify-center space-x-4 md:justify-start">
                  <a
                    href="#achievements"
                    className="border border-cyan-100/45 bg-cyan-100/10 px-7 py-3 text-[0.76rem] font-bold uppercase tracking-[0.16em] text-cyan-50 transition-all duration-300 hover:bg-cyan-100/85 hover:text-[#0b1013]"
                  >
                    Explore Milestones
                  </a>
                  <a
                    href="#tech-stack"
                    className="border border-cyan-100/30 px-7 py-3 text-[0.76rem] font-bold uppercase tracking-[0.16em] text-cyan-100/90 transition-all duration-300 hover:border-cyan-100/70 hover:bg-cyan-100/10"
                  >
                    See Tech Stack
                  </a>
                </div>
              </div>

              {/* Right column - Profile Image */}
              <div ref={rightColumnRef} className="flex w-full justify-center md:w-1/2 md:justify-end">
                <AnimatedProfileImage profileImage={profileImage} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
