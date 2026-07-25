import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FaFileDownload, FaArrowRight } from 'react-icons/fa';
import { PROFILE } from '../../../data/profileData';

const scrollToContact = () => {
  const el = document.getElementById('contact');
  if (!el) return;
  if (window.__lenis) window.__lenis.scrollTo(el);
  else el.scrollIntoView({ behavior: 'smooth' });
};

const PlayfulAbout = () => {
  const [cvOpen, setCvOpen] = useState(false);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setCvOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = cvOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [cvOpen]);

  return (
  <section
    id="about"
    className="relative overflow-hidden bg-[#F2E1C4] px-5 py-16 sm:px-8 md:py-24"
  >
    <div className="mx-auto grid w-full max-w-6xl items-center gap-12 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:gap-16">

      {/* Left — framed photo with the education pill overlapping the base */}
      <motion.div
        initial={{ opacity: 0, x: -40, rotate: -3 }}
        whileInView={{ opacity: 1, x: 0, rotate: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto w-full max-w-[22rem] md:mx-0"
      >
        <div className="relative overflow-hidden rounded-[2rem] border-[6px] border-[#F0A716] bg-[#EAD2A8] shadow-[10px_12px_0_rgba(36,26,18,0.16)]">
          <img
            src={PROFILE.profileImage}
            alt={PROFILE.name}
            className="h-full w-full object-cover"
            style={{ objectPosition: 'center top', aspectRatio: '4 / 5' }}
          />
        </div>

        {/* Education pill — star logo + degree, straddles the bottom edge */}
        <motion.div
          initial={{ opacity: 0, x: '-50%', y: 20, scale: 0.9 }}
          whileInView={{ opacity: 1, x: '-50%', y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.35, ease: [0.34, 1.56, 0.64, 1] }}
          className="absolute -bottom-6 left-1/2 flex w-[90%] items-center gap-3 rounded-full bg-[#E5301E] px-4 py-3 shadow-[5px_5px_0_rgba(36,26,18,0.18)]"
        >
          <img
            src={PROFILE.education.logo}
            alt="Universitas Syiah Kuala"
            className="h-9 w-9 shrink-0 object-contain drop-shadow-[1px_1px_0_rgba(0,0,0,0.2)]"
          />
          <div className="min-w-0 leading-tight">
            <p className="truncate text-sm font-extrabold text-[#FFFDF8] sm:text-base">
              {PROFILE.education.degree}
            </p>
            <p className="truncate text-[0.62rem] font-medium tracking-wide text-[#FFFDF8]/85 sm:text-xs">
              {PROFILE.education.detail}
            </p>
          </div>
        </motion.div>
      </motion.div>

      {/* Right — greeting, bio, CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        className="mt-8 text-center md:mt-0 md:text-left"
      >
        <h2 className="font-mouse text-[clamp(3rem,8vw,6rem)] uppercase leading-[0.95] text-[#E5301E] [-webkit-text-stroke:2px_#FFFDF8] [paint-order:stroke_fill] drop-shadow-[4px_4px_0_rgba(36,26,18,0.14)]">
          Hola, I&apos;m Bintang
        </h2>

        <p className="mx-auto mt-6 max-w-xl font-mouse text-lg leading-snug tracking-wide text-[#241A12] sm:text-xl md:mx-0">
          {PROFILE.bio}
        </p>

        <div className="mt-8 flex flex-row flex-wrap items-center justify-center gap-3 sm:gap-4 md:justify-start">
          <button
            type="button"
            onClick={() => setCvOpen(true)}
            className="group inline-flex items-center gap-3 rounded-full bg-[#E5301E] px-7 py-3 text-base font-bold text-[#FFFDF8] shadow-[4px_4px_0_rgba(36,26,18,0.18)] transition hover:bg-[#C22112] active:translate-y-0.5"
          >
            <FaFileDownload className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
            View CV
          </button>
          <button
            type="button"
            onClick={scrollToContact}
            className="group inline-flex items-center gap-3 rounded-full bg-[#241A12] px-7 py-3 text-base font-bold text-[#FFFDF8] shadow-[4px_4px_0_rgba(36,26,18,0.18)] transition hover:bg-[#3a2a1c] active:translate-y-0.5"
          >
            Get in Touch
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#E5301E]">
              <FaArrowRight className="h-3 w-3 -rotate-45 transition-transform group-hover:translate-x-0.5" />
            </span>
          </button>
        </div>
      </motion.div>
    </div>

    {/* CV Modal — playful-skinned PDF viewer, mirrors the professional one */}
    <AnimatePresence>
      {cvOpen && (
        <motion.div
          className="fixed inset-0 z-[300] flex items-center justify-center bg-[#241A12]/70 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setCvOpen(false)}
        >
          <motion.div
            className="relative flex h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-[1.75rem] border-[5px] border-[#F0A716] bg-[#FFFDF8] shadow-[10px_12px_0_rgba(36,26,18,0.28)]"
            initial={{ scale: 0.92, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 20 }}
            transition={{ type: 'spring', stiffness: 320, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal header */}
            <div className="flex shrink-0 items-center justify-between border-b-2 border-[#F0A716]/40 bg-[#F2E1C4] px-5 py-3.5">
              <p className="font-modak text-lg tracking-wide text-[#E5301E]">
                Curriculum Vitae
              </p>
              <div className="flex items-center gap-2">
                <a
                  href={PROFILE.cvPath}
                  download
                  className="rounded-full bg-[#E5301E] px-4 py-1.5 text-xs font-bold text-[#FFFDF8] shadow-[2px_2px_0_rgba(36,26,18,0.18)] transition hover:bg-[#C22112]"
                >
                  Download
                </a>
                <button
                  type="button"
                  onClick={() => setCvOpen(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FFFDF8] font-bold text-[#241A12] shadow-[2px_2px_0_rgba(36,26,18,0.18)] transition hover:bg-[#F3E6CC]"
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

export default PlayfulAbout;
