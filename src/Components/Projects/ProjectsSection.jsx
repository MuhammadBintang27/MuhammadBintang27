import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import ScrollLineDivider from "../SectionDivider/ScrollLineDivider";
import { PROJECTS } from "../../data/projectsData";

const ProjectsSection = () => {
  const navigate = useNavigate();
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      <ScrollLineDivider />

      {/* Floating cursor preview — desktop only */}
      <AnimatePresence>
        {hoveredIndex !== null && (
          <motion.div
            key={hoveredIndex}
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.88 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="pointer-events-none fixed z-[50] hidden md:block"
            style={{
              left: mousePos.x + 28,
              top: mousePos.y - 72,
            }}
          >
            <img
              src={PROJECTS[hoveredIndex].src}
              alt={PROJECTS[hoveredIndex].title}
              className="h-[220px] w-[360px] rounded-xl object-cover shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <section
        id="projects"
        className="relative bg-[linear-gradient(180deg,#0f1014_0%,#12141b_44%,#101117_100%)] py-16 sm:py-20"
      >
          {/* Header */}
          <div className="mx-auto mb-12 w-full max-w-6xl px-4 sm:mb-16 sm:px-8">
            <header className="text-center">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.24em] text-cyan-100/62">
                Selected Works
              </p>
              <h2 className="text-[clamp(2.3rem,7vw,6.2rem)] font-black uppercase leading-[0.9] tracking-[-0.02em] text-[#e8e0c2]">
                Projects
              </h2>
            </header>
          </div>

          {/* Work list — full width */}
          <ul className="px-4 sm:px-8">
            {PROJECTS.map((project, index) => (
              <li
                key={project.slug}
                className="group border-t border-white/10 last:border-b last:border-white/10"
              >
                <button
                  type="button"
                  onClick={() => navigate(`/projects/${project.slug}`)}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className="flex w-full cursor-pointer items-center gap-4 py-5 text-left transition-colors duration-200 sm:py-7"
                >
                  <span className="w-10 shrink-0 font-mono text-sm text-white/30 sm:w-14 sm:text-base">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <h3 className="flex-1 text-[clamp(1.5rem,4.5vw,3.5rem)] font-black uppercase leading-none tracking-tight text-[#e8e0c2] transition-colors duration-200 group-hover:text-cyan-300">
                    {project.title}
                  </h3>

                  <div className="hidden shrink-0 items-center gap-6 sm:flex">
                    <span className="text-sm text-white/38">{project.category}</span>
                    <span className="w-10 text-right text-sm text-white/30">{project.year}</span>
                  </div>

                  <span className="ml-1 shrink-0 text-xl text-white/25 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-cyan-300">
                    ↗
                  </span>
                </button>
              </li>
            ))}
          </ul>
      </section>
    </>
  );
};

export default ProjectsSection;
