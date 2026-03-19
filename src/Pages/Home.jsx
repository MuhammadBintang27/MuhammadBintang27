import React from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import AnimatedProfileImage from '../Components/Profile/AnimatedProfileImage';

const profileImage = '/FotoProfile.png';

const Home = () => {
  return (
    <section
      id="get-to-know"
      className="relative min-h-screen overflow-hidden border-t border-cyan-100/20 bg-[linear-gradient(180deg,#0f1014_0%,#12141b_44%,#101117_100%)] py-12 sm:py-16"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 z-20">
        <div className="mx-4 border-t border-cyan-100/34 sm:mx-8" />
        <div className="mx-4 mt-3 flex items-center justify-center sm:mx-8">
          <div className="h-px w-[43%] bg-cyan-100/32" />
          <motion.div
            className="mx-4 flex flex-col items-center"
            animate={{ y: [0, 3, 0], opacity: [0.78, 1, 0.78] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
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
          <div className="absolute h-96 w-96 rounded-full bg-cyan-400/14 blur-3xl -top-20 -left-20" />
        </div>

        <div className="container mx-auto z-10">
          <div className="max-w-6xl mx-auto">
            {/* Two column layout */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 lg:gap-12">
              {/* Left column - Text content */}
              <div className="w-full md:w-1/2 text-center md:text-left">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-cyan-100/62">
                    Get To Know Me
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <TypeAnimation
                    sequence={[
                      'Tech Explorer',
                      2000,
                      'Full Stack Developer',
                      2000,
                      'Problem Solver',
                      2000,
                      'Man United Fan',
                      2000,

                    ]}
                    wrapper="h1"
                    speed={50}
                    className="mb-6 text-[clamp(2.3rem,6vw,4.7rem)] font-black uppercase leading-[0.95] tracking-[-0.02em] text-[#e8e0c2]"
                    repeat={Infinity}
                  />
                </motion.div>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="mb-8 text-[1.02rem] leading-relaxed text-slate-200/88 md:text-[1.16rem]"
                >
Informatics student at Universitas Syiah Kuala, always excited about tech and creativity. Passionate about exploring AI and building fun, meaningful projects, whether it’s something for school, a team project, or simply a fun side idea. Outside of coding, you'll probably find me talking football, especially anything about Manchester United.              </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="flex justify-center md:justify-start space-x-4"
                >
                  <a
                    href="#achievements"
                    className="border border-cyan-100/45 bg-cyan-100/10 px-7 py-3 text-[0.76rem] font-bold uppercase tracking-[0.16em] text-cyan-50 transition-all duration-300 hover:bg-cyan-100/85 hover:text-[#0b1013]"
                  >
                    View Achievements
                  </a>
                  <a
                    href="#tech-stack"
                    className="border border-cyan-100/30 px-7 py-3 text-[0.76rem] font-bold uppercase tracking-[0.16em] text-cyan-100/90 transition-all duration-300 hover:border-cyan-100/70 hover:bg-cyan-100/10"
                  >
                    View Tech Stack
                  </a>
                </motion.div>
              </div>

              {/* Right column - Profile Image */}
              <div className="w-full md:w-1/2 flex justify-center md:justify-end">
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
