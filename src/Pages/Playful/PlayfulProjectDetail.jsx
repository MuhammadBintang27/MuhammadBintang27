import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaGithub, FaArrowLeft } from 'react-icons/fa';
import { ArrowUpRight } from 'lucide-react';
import { PROJECTS } from '../../data/projectsData';
import PlayfulMarquee from '../../Components/Playful/Layouts/PlayfulMarquee';

// Playful twin of the professional ProjectDetail — same split concept (info left,
// framed shot right, then an "Other Projects" grid) reskinned in the Playful
// palette: cream stage, red comic type, hard drop shadows. Its own accent is a
// GOLD "cat tumpah" pouring in from the top edge (differentiating it from the
// red pours in Projects/Contact), keeping the spilled-paint world consistent.

// Gold "cat tumpah" pouring in from the top edge. Each drip/hump bottom is a
// TRUE semicircle (SVG arc), so every tip is round — never a sharp stalactite.
// Anchors set only where each drip hangs (x), how deep (y), and which way it
// bulges ('d' = drip down, 'r' = hump up); a builder wires them with vertical
// necks + rounded caps and auto-clamps each cap radius so neighbours never
// overlap. A soft drop shadow under the edge gives the paint depth. The whole
// band sits BEHIND the text (z-0), so the intentional overlap never hides copy.
const POUR_W = 1828;
const POUR_H = 520;

// Build a smooth drippy top-band path from anchors. leftY/rightY are where the
// band meets the page edges.
const buildPour = (anchors, leftY, rightY) => {
  const n = anchors.length;
  // Clamp each cap radius to ≤46% of the gap to either neighbour → no overlap.
  const rad = anchors.map((a, i) => {
    const gapL = a.x - (i === 0 ? 0 : anchors[i - 1].x);
    const gapR = (i === n - 1 ? POUR_W : anchors[i + 1].x) - a.x;
    return Math.max(12, Math.min(a.h, 0.46 * gapL, 0.46 * gapR));
  });

  let d = `M0,0 L${POUR_W},0 L${POUR_W},${rightY}`;
  let px = POUR_W;
  let py = rightY;
  for (let i = n - 1; i >= 0; i--) {
    const { x, y, dir } = anchors[i];
    const r = Math.round(rad[i]);
    const rx = x + r;
    const lx = x - r;
    const midY = Math.round((py + y) / 2);
    // Vertical-tangent neck down into the cap, then a clean semicircle bottom.
    d += ` C ${Math.round(px)},${midY} ${rx},${midY} ${rx},${y}`;
    d += ` A ${r},${r} 0 0 ${dir === 'd' ? 1 : 0} ${lx},${y}`;
    px = lx;
    py = y;
  }
  const midY = Math.round((py + leftY) / 2);
  d += ` C ${Math.round(px)},${midY} 0,${midY} 0,${leftY} Z`;
  return d;
};

// x = where it hangs, y = anchor depth (cap bulges r beyond it), dir d/r.
const POUR_DESKTOP = buildPour(
  [
    { x: 70, y: 372, dir: 'd', h: 46 },
    { x: 210, y: 120, dir: 'r', h: 55 },
    { x: 300, y: 344, dir: 'd', h: 30 },
    { x: 378, y: 100, dir: 'r', h: 42 },
    { x: 452, y: 296, dir: 'd', h: 38 },
    { x: 542, y: 195, dir: 'r', h: 46 },
    { x: 630, y: 418, dir: 'd', h: 44 },
    { x: 722, y: 210, dir: 'r', h: 54 },
    { x: 852, y: 172, dir: 'r', h: 66 },
    { x: 978, y: 205, dir: 'r', h: 52 },
    { x: 1052, y: 296, dir: 'd', h: 36 },
    { x: 1140, y: 205, dir: 'r', h: 40 },
    { x: 1212, y: 150, dir: 'r', h: 36 },
    { x: 1302, y: 316, dir: 'd', h: 42 },
    { x: 1400, y: 150, dir: 'r', h: 42 },
    { x: 1510, y: 420, dir: 'd', h: 48 },
    { x: 1610, y: 225, dir: 'r', h: 42 },
    { x: 1690, y: 282, dir: 'd', h: 30 },
    { x: 1742, y: 115, dir: 'r', h: 34 },
    { x: 1786, y: 250, dir: 'd', h: 26 },
  ],
  300,
  240,
);

const POUR_MOBILE = buildPour(
  [
    { x: 90, y: 348, dir: 'd', h: 55 },
    { x: 250, y: 130, dir: 'r', h: 62 },
    { x: 380, y: 344, dir: 'd', h: 42 },
    { x: 540, y: 150, dir: 'r', h: 64 },
    { x: 620, y: 398, dir: 'd', h: 54 },
    { x: 760, y: 172, dir: 'r', h: 70 },
    { x: 900, y: 205, dir: 'd', h: 48 },
    { x: 1030, y: 150, dir: 'r', h: 52 },
    { x: 1130, y: 322, dir: 'd', h: 48 },
    { x: 1300, y: 150, dir: 'r', h: 58 },
    { x: 1450, y: 392, dir: 'd', h: 56 },
    { x: 1600, y: 150, dir: 'r', h: 58 },
    { x: 1720, y: 296, dir: 'd', h: 46 },
  ],
  280,
  230,
);

const dripShadow = (id) => (
  <filter id={id} x="-6%" y="-6%" width="112%" height="132%">
    <feDropShadow dx="0" dy="9" stdDeviation="9" floodColor="#241A12" floodOpacity="0.16" />
  </filter>
);

const TopPour = () => (
  <div
    className="pointer-events-none absolute inset-x-0 top-0 z-0 leading-[0]"
    aria-hidden="true"
  >
    <svg
      className={`block h-[160px] w-full sm:hidden`}
      viewBox={`0 0 ${POUR_W} ${POUR_H}`}
      preserveAspectRatio="none"
      fill="none"
    >
      <defs>{dripShadow('dripShadowM')}</defs>
      <path filter="url(#dripShadowM)" d={POUR_MOBILE} fill="#FFD750" />
    </svg>
    <svg
      className={`hidden h-[300px] w-full sm:block`}
      viewBox={`0 0 ${POUR_W} ${POUR_H}`}
      preserveAspectRatio="none"
      fill="none"
    >
      <defs>{dripShadow('dripShadowD')}</defs>
      <path filter="url(#dripShadowD)" d={POUR_DESKTOP} fill="#FFD750" />
    </svg>
  </div>
);

const PlayfulProjectDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const project = PROJECTS.find((p) => p.slug === slug);
  const otherProjects = PROJECTS.filter((p) => p.slug !== slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    if (!project) navigate('/404', { replace: true });
  }, [project, navigate]);

  if (!project) return null;

  const hasGithub = !!project.github;
  const hasWebsite = !!project.ctaLink;

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#F2E1C4] text-[#241A12]">
      <TopPour />

      {/* Back button — red sticker pill, always reachable up top */}
      <div className="fixed left-0 right-0 top-0 z-50 px-4 pt-5 sm:px-8">
        <button
          type="button"
          onClick={() => navigate('/playful')}
          className="group flex items-center gap-2 rounded-full bg-[#E5301E] px-5 py-2.5 text-xs font-bold uppercase tracking-[0.15em] text-[#FFFDF8] shadow-[3px_4px_0_rgba(36,26,18,0.24)] transition hover:-translate-y-0.5 active:translate-y-0"
        >
          <FaArrowLeft className="h-3 w-3 transition-transform duration-200 group-hover:-translate-x-0.5" />
          Projects
        </button>
      </div>

      {/* Main split layout */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 mx-auto max-w-6xl px-4 pb-16 pt-24 sm:px-8 sm:pt-32"
      >
        <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-14">
          {/* Left — info */}
          <div className="flex-1">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#241A12]/70">
              {project.category}
            </p>

            <h1 className="mt-2 font-mouse text-[clamp(2.8rem,9vw,6.2rem)] uppercase leading-[0.88] tracking-tight text-[#E5301E] [-webkit-text-stroke:2px_#FFFDF8] [paint-order:stroke_fill] drop-shadow-[5px_6px_0_rgba(36,26,18,0.18)]">
              {project.title}
            </h1>

            <p className="mt-3 text-lg font-bold text-[#241A12]/80 sm:text-xl">
              {project.description}
            </p>

            {/* Meta row */}
            <div className="mt-6 flex flex-wrap gap-10 border-y-2 border-[#241A12]/10 py-4">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#241A12]/45">
                  Role
                </p>
                <p className="mt-1 text-sm font-bold text-[#241A12]/85">{project.role}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#241A12]/45">
                  Year
                </p>
                <p className="mt-1 text-sm font-bold text-[#241A12]/85">{project.year}</p>
              </div>
            </div>

            {/* Summary */}
            <p className="mt-6 text-base leading-relaxed text-[#241A12]/75">
              {project.summary}
            </p>

            {/* Tags — red sticker pills */}
            <div className="mt-6 flex flex-wrap gap-2.5">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-[#E5301E] px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.1em] text-[#FFFDF8] shadow-[2px_3px_0_rgba(36,26,18,0.18)]"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* CTA buttons */}
            {(hasGithub || hasWebsite) && (
              <div className="mt-7 flex flex-wrap gap-3">
                {hasGithub && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-3 rounded-full bg-[#241A12] px-6 py-3 text-sm font-bold uppercase tracking-wide text-[#FFFDF8] shadow-[4px_5px_0_rgba(36,26,18,0.22)] transition hover:-translate-y-0.5 active:translate-y-0"
                  >
                    <FaGithub className="h-4 w-4" />
                    GitHub
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#F0A716]">
                      <ArrowUpRight className="h-3.5 w-3.5 text-[#241A12] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={2.5} />
                    </span>
                  </a>
                )}
                {hasWebsite && (
                  <a
                    href={project.ctaLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-3 rounded-full bg-[#E5301E] px-6 py-3 text-sm font-bold uppercase tracking-wide text-[#FFFDF8] shadow-[4px_5px_0_rgba(36,26,18,0.22)] transition hover:-translate-y-0.5 active:translate-y-0"
                  >
                    Visit Site
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#FFFDF8]">
                      <ArrowUpRight className="h-3.5 w-3.5 text-[#E5301E] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={2.5} />
                    </span>
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Right — framed shot (playful photo sticker) */}
          <div className="w-full lg:w-[48%] lg:shrink-0">
            <div className="rotate-[1.4deg] overflow-hidden rounded-[1.4rem] border-[6px] border-[#FFFDF8] bg-[#FFFDF8] shadow-[10px_12px_0_rgba(36,26,18,0.2)]">
              <img
                src={project.src}
                alt={project.title}
                className="aspect-[4/3] w-full rounded-[1rem] object-cover"
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Gold ticker divider (no drip — keeps the spill "sedikit") */}
      <PlayfulMarquee drip={false} />

      {/* Other Projects */}
      <section className="relative z-10 px-4 pb-24 pt-12 sm:px-8 sm:pt-16">
        <div className="mx-auto max-w-6xl">
          <header className="mb-8 sm:mb-12">
            <p className="mb-2 font-modak text-sm uppercase tracking-[0.28em] text-[#D68C0A]">
              More Work
            </p>
            <h2 className="font-mouse text-[clamp(2.4rem,8vw,5.5rem)] uppercase leading-[0.9] tracking-tight text-[#E5301E] [-webkit-text-stroke:2px_#FFFDF8] [paint-order:stroke_fill] drop-shadow-[5px_6px_0_rgba(36,26,18,0.18)]">
              Other Projects
            </h2>
          </header>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-7">
            {otherProjects.map((proj, i) => (
              <motion.button
                key={proj.slug}
                type="button"
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => navigate(`/playful/projects/${proj.slug}`)}
                className="group rounded-[1.6rem] bg-[#FFD750] p-4 text-left shadow-[8px_10px_0_rgba(36,26,18,0.18)] transition-transform duration-200 hover:-translate-y-1 hover:rotate-[-0.6deg] active:translate-y-0"
              >
                <div className="overflow-hidden rounded-[1.1rem]">
                  <img
                    src={proj.src}
                    alt={proj.title}
                    loading="lazy"
                    className="aspect-video w-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                  />
                </div>
                <h3 className="mt-3 px-1 text-xl font-black uppercase leading-none tracking-tight text-[#FFFDF8] sm:text-2xl">
                  {proj.title}
                </h3>
                <p className="mt-1.5 px-1 pb-1 text-[11px] font-bold uppercase tracking-[0.12em] text-[#FFFDF8]/80">
                  {proj.category} · {proj.year}
                </p>
              </motion.button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default PlayfulProjectDetail;
