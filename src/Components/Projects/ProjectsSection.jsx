import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ScrollLineDivider from "../SectionDivider/ScrollLineDivider";
import { PROJECTS } from "../../data/projectsData";

gsap.registerPlugin(ScrollTrigger);

const ProjectsSection = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const modalRef = useRef(null);
  const cardRefs = useRef([]);
  const isManualFocusRef = useRef(false);
  const isSectionInViewRef = useRef(false);
  const id = useId();
  const [activeIndex, setActiveIndex] = useState(null);
  const [isManualFocus, setIsManualFocus] = useState(false);
  const [scrollProjectIndex, setScrollProjectIndex] = useState(null);
  const [isSectionInView, setIsSectionInView] = useState(false);

  useEffect(() => {
    isManualFocusRef.current = isManualFocus;
  }, [isManualFocus]);

  useEffect(() => {
    isSectionInViewRef.current = isSectionInView;
  }, [isSectionInView]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setActiveIndex(null);
        setIsManualFocus(false);
      }
    };

    const activeCard =
      typeof activeIndex === "number" ? PROJECTS[activeIndex] : null;

    document.body.style.overflow =
      activeCard && isManualFocus ? "hidden" : "auto";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeIndex, isManualFocus]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!modalRef.current) {
        return;
      }

      if (!modalRef.current.contains(event.target)) {
        setActiveIndex(null);
        setIsManualFocus(false);
      }
    };

    if (typeof activeIndex === "number" && isManualFocus) {
      document.addEventListener("mousedown", handleOutsideClick);
      document.addEventListener("touchstart", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("touchstart", handleOutsideClick);
    };
  }, [activeIndex, isManualFocus]);

  useEffect(() => {
    if (!sectionRef.current) {
      return undefined;
    }

    const isHeadingShown = () => {
      if (!headingRef.current) {
        return true;
      }

      const rect = headingRef.current.getBoundingClientRect();
      // Require the heading block to be clearly in view before auto-expansion starts.
      return rect.top <= window.innerHeight * 0.45;
    };

    const cardTriggers = cardRefs.current
      .filter(Boolean)
      .map((cardElement, index) =>
        ScrollTrigger.create({
          trigger: cardElement,
          start: "center 58%",
          end: "center 42%",
          onToggle: (self) => {
            if (isManualFocusRef.current) {
              return;
            }

            if (!isSectionInViewRef.current) {
              return;
            }

            if (!isHeadingShown()) {
              setActiveIndex(null);
              setScrollProjectIndex(null);
              return;
            }

            if (self.isActive) {
              setActiveIndex(index);
              setScrollProjectIndex(index);
            } else {
              setActiveIndex((previous) => (previous === index ? null : previous));

              const direction = self.direction >= 0 ? 1 : -1;
              const nextIndex = Math.min(
                Math.max(index + direction, 0),
                PROJECTS.length - 1,
              );
              setScrollProjectIndex(nextIndex);
            }
          },
        }),
      );

    const sectionVisibilityTrigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top bottom",
      end: "bottom top",
      onEnter: () => {
        setIsSectionInView(true);
      },
      onEnterBack: () => {
        setIsSectionInView(true);
      },
      onLeave: () => {
        setIsSectionInView(false);
        setActiveIndex(null);
        setScrollProjectIndex(null);
      },
      onLeaveBack: () => {
        setIsSectionInView(false);
        setActiveIndex(null);
        setScrollProjectIndex(null);
      },
    });

    setIsSectionInView(false);
    setActiveIndex(null);
    setScrollProjectIndex(null);

    return () => {
      cardTriggers.forEach((trigger) => trigger.kill());
      sectionVisibilityTrigger.kill();
    };
  }, []);

  const activeCard =
    typeof activeIndex === "number" ? PROJECTS[activeIndex] : null;

  return (
    <>
      <ScrollLineDivider />

      <AnimatePresence>
        {activeCard && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`fixed inset-0 z-[120] bg-black/45 backdrop-blur-[1.5px] ${
              isManualFocus ? "pointer-events-auto" : "pointer-events-none"
            }`}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {activeCard ? (
          <div
            className={`fixed inset-0 z-[130] grid place-items-center px-4 py-8 sm:px-6 ${
              isManualFocus ? "pointer-events-auto" : "pointer-events-none"
            }`}
          >
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute right-5 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white text-black shadow-sm sm:hidden"
              onClick={() => {
                setActiveIndex(null);
                setIsManualFocus(false);
              }}
              aria-label="Close project card"
            >
              x
            </motion.button>

            <motion.div
              layoutId={`card-${activeCard.title}-${id}`}
              ref={modalRef}
              className="aspect-square w-full max-w-[720px] overflow-hidden rounded-3xl border border-white/20 bg-[#111319] shadow-[0_50px_120px_rgba(0,0,0,0.55)]"
            >
              <motion.div
                layoutId={`image-${activeCard.title}-${id}`}
                className="h-[50%]"
              >
                <img
                  src={activeCard.src}
                  alt={activeCard.title}
                  className="h-full w-full object-cover object-center"
                />
              </motion.div>

              <div className="flex h-[50%] flex-col p-5 sm:p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <motion.h3
                      layoutId={`title-${activeCard.title}-${id}`}
                      className="text-2xl font-bold text-white"
                    >
                      {activeCard.title}
                    </motion.h3>
                    <motion.p
                      layoutId={`description-${activeCard.description}-${id}`}
                      className="mt-1 text-sm text-cyan-100/75"
                    >
                      {activeCard.description}
                    </motion.p>
                  </div>

                  <a
                    href={activeCard.ctaLink}
                    target={activeCard.ctaLink.startsWith("#") ? undefined : "_blank"}
                    rel={activeCard.ctaLink.startsWith("#") ? undefined : "noreferrer"}
                    className="rounded-full bg-emerald-500 px-4 py-2 text-sm font-bold text-white transition hover:bg-emerald-400"
                  >
                    {activeCard.ctaText}
                  </a>
                </div>

                <div className="mt-4 min-h-0 flex-1 space-y-4 overflow-auto pr-1 text-sm leading-relaxed text-white/78 sm:text-base">
                  <p>{activeCard.summary}</p>
                  {activeCard.content.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}

                  <div className="flex flex-wrap gap-2 pt-2">
                    {activeCard.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-cyan-100/26 bg-cyan-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-cyan-100/78"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {isSectionInView && typeof scrollProjectIndex === "number" ? (
          <motion.div
            key={PROJECTS[scrollProjectIndex].title}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="pointer-events-none fixed inset-0 z-[10] grid place-items-center"
          >
            <p className="px-4 text-center text-[clamp(2.4rem,8vw,6.4rem)] font-black uppercase tracking-[0.03em] text-[#e8e0c2]/16">
              {PROJECTS[scrollProjectIndex].title}
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <section
        id="projects"
        ref={sectionRef}
        className="relative overflow-hidden border-b border-cyan-100/20 bg-[linear-gradient(180deg,#0f1014_0%,#12141b_44%,#101117_100%)] py-16 sm:py-20"
      >
        <div className="relative z-20 mx-auto w-full max-w-6xl px-4 sm:px-8">
          <header ref={headingRef} className="mb-10 text-center sm:mb-12">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.24em] text-cyan-100/62">
              Selected Works
            </p>
            <h2 className="text-[clamp(2.3rem,7vw,6.2rem)] font-black uppercase leading-[0.9] tracking-[-0.02em] text-[#e8e0c2]">
              Projects
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-sm text-white/65 sm:text-base">
              Setiap card tampil normal dulu. Saat diklik atau saat posisinya
              mencapai area fokus scroll, card akan otomatis expand seperti demo
              Aceternity.
            </p>
          </header>

          <div className="mx-auto flex w-full max-w-[620px] flex-col gap-32 sm:gap-36">
            {PROJECTS.map((project, index) => {
              return (
                <motion.article
                  key={project.title}
                  ref={(element) => {
                    cardRefs.current[index] = element;
                  }}
                  layoutId={`card-${project.title}-${id}`}
                  className="group mx-auto w-full max-w-[520px] cursor-pointer"
                  onClick={() => {
                    setActiveIndex(index);
                    setIsManualFocus(true);
                  }}
                >
                  <motion.div className="overflow-hidden rounded-3xl border border-white/10 bg-[#0f1219]/92 shadow-[0_30px_80px_rgba(0,0,0,0.42)] transition-colors duration-300 hover:border-cyan-100/35">
                    <div className="relative aspect-square">
                      <motion.div
                        layoutId={`image-${project.title}-${id}`}
                        className="absolute inset-0"
                      >
                        <img
                          src={project.src}
                          alt={project.title}
                          className="h-full w-full object-cover object-center"
                        />
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
                      </motion.div>

                      <div className="absolute inset-x-0 bottom-0 z-10 p-5 sm:p-6">
                        <motion.h3
                          layoutId={`title-${project.title}-${id}`}
                          className="text-center text-xl font-bold text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.55)] sm:text-2xl"
                        >
                          {project.title}
                        </motion.h3>
                        <motion.p
                          layoutId={`description-${project.description}-${id}`}
                          className="mt-1 text-center text-sm text-cyan-100/90 drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]"
                        >
                          {project.description}
                        </motion.p>
                      </div>
                    </div>
                  </motion.div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default ProjectsSection;
