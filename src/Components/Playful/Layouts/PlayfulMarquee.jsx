const DEFAULT_ITEMS = [
  'Software Engineering',
  'Full-Stack Web',
  'AI-Driven Builder',
  'Mobile Development',
  'Creative Problem Solver',
  'Clean Interfaces',
];

// Scrolling gold ticker used as a section divider (echoes the PlayfulLoader
// bottom bar). The item group is rendered twice so the CSS -50% translate
// loops seamlessly. `reverse` flips the scroll direction; `drip` pours the
// hand-poured "cat tumpah" edge off the bottom — same in-flow model as the
// Projects section: a block SVG on cream, gold fill, deep alternating C-curve
// lobes, -mt-px to seal the hairline, preserveAspectRatio=none to stretch
// edge-to-edge at any width.
const PlayfulMarquee = ({ items = DEFAULT_ITEMS, reverse = false, drip = true }) => (
  <div className="relative">
    <div className="relative overflow-hidden whitespace-nowrap bg-[#F0A716] py-3 sm:py-4">
      <div
        className={`inline-block ${reverse ? 'animate-scroll-text-reverse' : 'animate-scroll-text'}`}
      >
        {Array.from({ length: 2 }).map((_, group) => (
          <span key={group}>
            {items.map((item, i) => (
              <span
                key={`${group}-${i}`}
                className="mx-5 inline-block font-modak text-lg tracking-wide text-[#FFFDF8] [-webkit-text-stroke:1px_rgba(36,26,18,0.12)] [paint-order:stroke_fill] sm:mx-7 sm:text-2xl"
              >
                {item} <span className="text-[#241A12]/40">·</span>
              </span>
            ))}
          </span>
        ))}
      </div>
    </div>

    {drip && (
  <div className="pointer-events-none relative z-[1] -mt-px bg-[#F2E1C4] leading-[0]" aria-hidden="true">
    {/* Same gold as the bar (#F0A716) and NO drop-shadow, so the pour reads as
        one continuous piece with the ticker instead of a detached sticker. */}

    {/* Mobile — only a handful of wide lobes. preserveAspectRatio=none squeezes
        the 1440 viewBox into ~375px, so the full desktop run would collapse into
        thin spikes ("duri"); fewer lobes keep each drip fat and rounded. */}
    <svg
      className="block h-[68px] w-full sm:hidden"
      viewBox="0 0 1440 210"
      preserveAspectRatio="none"
      fill="none"
    >
      <path
        d="M0,0 L1440,0 L1440,50
           C 1340,50 1340,195 1240,195
           C 1140,195 1140,55 1040,55
           C 930,55 930,140 820,140
           C 690,140 690,48 560,48
           C 420,48 420,178 280,178
           C 140,178 140,72 0,72 Z"
        fill="#F0A716"
      />
    </svg>

    {/* Desktop — the full run of smooth, rounded lobes (has room at 1440px). */}
    <svg
      className="hidden h-[150px] w-full sm:block"
      viewBox="0 0 1440 210"
      preserveAspectRatio="none"
      fill="none"
    >
      <path
        d="M0,0 L1440,0 L1440,55
           C 1390,55 1390,180 1340,180
           C 1282,180 1282,45 1225,45
           C 1173,45 1173,125 1122,125
           C 1066,125 1066,50 1010,50
           C 958,50 958,190 907,190
           C 846,190 846,40 785,40
           C 733,40 733,105 682,105
           C 623,105 623,52 565,52
           C 513,52 513,175 462,175
           C 403,175 403,42 345,42
           C 296,42 296,135 247,135
           C 191,135 191,48 135,48
           C 67,48 67,115 0,115 Z"
        fill="#F0A716"
      />
    </svg>
  </div>
)}
  </div>
);

export default PlayfulMarquee;
