import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaGithub, FaArrowLeft, FaExternalLinkAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import { PROJECTS } from "../data/projectsData";


const ProjectDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const project = PROJECTS.find((p) => p.slug === slug);
  const otherProjects = PROJECTS.filter((p) => p.slug !== slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    if (!project) navigate("/404", { replace: true });
  }, [project, navigate]);

  if (!project) return null;

  const hasGithub = !!project.github;
  const hasWebsite = !!project.ctaLink;

  return (
    <div className="min-h-screen bg-[#0f1014]">

      {/* Back button */}
      <div className="fixed left-0 right-0 top-0 z-50 px-4 pt-5 sm:px-8">
        <button
          onClick={() => navigate("/#projects")}
          className="group flex items-center gap-2 rounded-full border border-white/15 bg-[#0f1014]/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-white/55 backdrop-blur-md transition hover:border-white/30 hover:text-white"
        >
          <FaArrowLeft className="h-3 w-3 transition-transform duration-200 group-hover:-translate-x-0.5" />
          Projects
        </button>
      </div>

      {/* Main split layout */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="mx-auto max-w-6xl px-4 pb-20 pt-24 sm:px-8 sm:pt-28"
      >
        <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-16">

          {/* Left — info */}
          <div className="flex-1">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-100/55">
              {project.category}
            </p>

            <h1 className="mt-3 text-[clamp(2.4rem,6vw,5rem)] font-black uppercase leading-[0.9] tracking-[-0.02em] text-[#e8e0c2]">
              {project.title}
            </h1>

            <p className="mt-2 text-base text-white/45 sm:text-lg">
              {project.description}
            </p>

            {/* Meta row */}
            <div className="mt-6 flex flex-wrap gap-6 border-y border-white/10 py-5">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/30">Role</p>
                <p className="mt-1 text-sm font-medium text-white/75">{project.role}</p>
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/30">Year</p>
                <p className="mt-1 text-sm font-medium text-white/75">{project.year}</p>
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/30">Type</p>
                <p className="mt-1 text-sm font-medium text-white/75">{project.category}</p>
              </div>
            </div>

            {/* Summary & content */}
            <p className="mt-6 text-base leading-relaxed text-white/65">
              {project.summary}
            </p>

            {/* Tags */}
            <div className="mt-6 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-cyan-100/20 bg-cyan-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-cyan-100/65"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* CTA buttons */}
            {(hasGithub || hasWebsite) && (
              <div className="mt-8 flex flex-wrap gap-3">
                {hasGithub && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-2.5 text-sm font-bold text-white/65 transition hover:border-white/35 hover:text-white"
                  >
                    <FaGithub className="h-4 w-4" />
                    Lihat GitHub
                  </a>
                )}
                {hasWebsite && (
                  <a
                    href={project.ctaLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-400 to-yellow-300 px-6 py-2.5 text-sm font-bold text-[#0f1014] shadow-[0_0_16px_rgba(251,191,36,0.28)] transition hover:shadow-[0_0_24px_rgba(251,191,36,0.45)]"
                  >
                    <FaExternalLinkAlt className="h-3.5 w-3.5" />
                    Lihat Website
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Right — image */}
          <div className="w-full lg:w-[52%] lg:shrink-0">
            <div className="overflow-hidden rounded-2xl border border-white/10 shadow-[0_32px_80px_rgba(0,0,0,0.55)]">
              <img
                src={project.src}
                alt={project.title}
                className="aspect-video w-full object-cover"
              />
            </div>
          </div>

        </div>
      </motion.div>

      {/* Other Projects */}
      <section className="bg-[#0f1014] pb-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-8">
          <div className="border-t border-white/10 pt-16">

            <div className="mb-10">
              <div className="mb-3 flex items-center gap-3">
                <div className="h-px w-8 bg-white/18" />
                <span className="text-xs font-semibold uppercase tracking-[0.24em] text-white/30">
                  More Work
                </span>
              </div>
              <h2 className="text-[clamp(1.8rem,5vw,3.8rem)] font-black uppercase leading-[0.9] tracking-[-0.02em] text-[#e8e0c2]">
                Other Projects.
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {otherProjects.map((proj, i) => (
                <motion.button
                  key={proj.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08, ease: "easeOut" }}
                  onClick={() => navigate(`/projects/${proj.slug}`)}
                  className="group text-left"
                >
                  <div className="overflow-hidden rounded-2xl border border-white/10">
                    <img
                      src={proj.src}
                      alt={proj.title}
                      className="aspect-video w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                  </div>
                  <div className="mt-4 flex items-end justify-between gap-3">
                    <div>
                      <p className="text-xs text-white/30">
                        {proj.category} · {proj.year}
                      </p>
                      <h3 className="mt-1 text-xl font-black uppercase tracking-tight text-[#e8e0c2] transition-colors duration-200 group-hover:text-cyan-300">
                        {proj.title}
                      </h3>
                    </div>
                    <span className="mb-0.5 shrink-0 text-lg text-white/22 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-cyan-300">
                      ↗
                    </span>
                  </div>
                </motion.button>
              ))}
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};

export default ProjectDetail;
