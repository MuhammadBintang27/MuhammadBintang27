import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';
import { CONTACTS } from '../../../data/contactsData';

// Playful finale — no longer a neat card, but a full-bleed "cat tumpah"
// (spilled paint): red pours IN from the top edge as a splash crown, floods a
// full-width pool that carries the content, then drips OUT the bottom into the
// tan footer. Same poured-paint vocabulary as the Projects pour, so the whole
// theme reads as one continuous spill. Content sits straight on the paint —
// gold eyebrow, outlined comic title, cream copy, dark CTA, cream badges.
const PlayfulContact = () => (
  <section
    id="contact"
    className="relative overflow-hidden bg-[#F2E1C4] px-5 sm:px-8"
  >
    {/* The poured red mass — a flex column: splash crown (drips in from the top)
        · solid pool (flex-1, carries the content) · drip edge (drips out into
        the footer). Overlapping ±1px seals the hairlines between the pieces. */}
    <div
      className="pointer-events-none absolute inset-0 flex flex-col"
      aria-hidden="true"
    >
      {/* Splash crown — red lands from above with an irregular, wavy top edge
          (a few bumps like paint just spread out), solid underside. */}
      <svg
        className="block h-[104px] w-full shrink-0 sm:h-[150px]"
        viewBox="0 0 1440 160"
        preserveAspectRatio="none"
        fill="none"
      >
        <path
          d="M0,160 L0,74
             C 120,74 150,22 262,34
             C 362,45 402,66 520,60
             C 640,54 690,16 802,28
             C 912,40 962,72 1082,62
             C 1192,52 1252,20 1440,42
             L1440,160 Z"
          fill="#E5301E"
        />
      </svg>

      {/* Solid pool — the body of the spill the content rests on. */}
      <div className="-my-px flex-1 bg-[#E5301E]" />

      {/* Cat tumpah — red drips poured off the pool onto the cream, melting the
          section down toward the tan footer. Same path as the Projects pour. */}
      <svg
        className="block h-[92px] w-full shrink-0 sm:h-[180px]"
        viewBox="0 0 1440 210"
        preserveAspectRatio="none"
        fill="none"
      >
        <path
          d="M0,0 L1440,0 L1440,188
             C 1377,188 1353,120 1290,120
             C 1206,120 1174,198 1090,198
             C 993,198 957,86 860,86
             C 768,86 732,154 640,154
             C 540,154 500,100 400,100
             C 304,100 266,198 170,198
             C 99,198 71,56 0,56 Z"
          fill="#E5301E"
        />
      </svg>
    </div>

    {/* Splatter — cream droplets flung across the pour + a couple of red flecks
        thrown up above the crown, selling the "just spilled" look. */}
    <div className="pointer-events-none absolute inset-0 z-[5]" aria-hidden="true">
      <span className="absolute left-[9%] top-[7%] h-4 w-4 rounded-full bg-[#E5301E] sm:h-5 sm:w-5" />
      <span className="absolute right-[12%] top-[5%] h-2.5 w-2.5 rounded-full bg-[#E5301E]" />
      <span className="absolute left-[14%] top-[34%] h-3 w-3 rounded-full bg-[#F2E1C4] sm:h-4 sm:w-4" />
      <span className="absolute right-[11%] top-[40%] h-5 w-5 rounded-full bg-[#F2E1C4] sm:h-6 sm:w-6" />
      <span className="absolute left-[7%] top-[58%] h-2.5 w-2.5 rounded-full bg-[#F2E1C4]" />
      <span className="absolute right-[8%] bottom-[24%] h-4 w-4 rounded-full bg-[#F0A716] sm:h-5 sm:w-5" />
      <span className="absolute left-[16%] bottom-[22%] h-3 w-3 rounded-full bg-[#F0A716]" />
    </div>

    {/* Content — sits straight on the poured paint. */}
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center px-2 pb-[118px] pt-[132px] text-center sm:pb-[200px] sm:pt-[176px]"
    >
      <p className="mb-4 font-modak text-sm uppercase tracking-[0.28em] text-[#FFD23F]">
        Get in Touch
      </p>

      <h2 className="font-mouse text-[clamp(2.8rem,10vw,6.5rem)] uppercase leading-[0.9] tracking-tight text-[#FFFDF8] [-webkit-text-stroke:2px_#241A12] [paint-order:stroke_fill] drop-shadow-[5px_6px_0_rgba(36,26,18,0.22)]">
        Let&apos;s Talk!
      </h2>

      <p className="mx-auto mt-6 max-w-[46ch] font-mouse text-lg leading-snug tracking-wide text-[#FFFDF8]/90 sm:text-xl">
        Got a question, a wild idea, or just want to say hi? Slide into any of
        these — I&apos;m always up for a good conversation.
      </p>

      {/* Primary email CTA — the big obvious "poke me here" button */}
      <a
        href="mailto:muhammad.bintang.indra@gmail.com"
        className="group mt-9 inline-flex items-center gap-3 rounded-full bg-[#241A12] px-8 py-3.5 text-base font-bold text-[#FFFDF8] shadow-[5px_5px_0_rgba(36,26,18,0.28)] transition hover:bg-[#3a2a1c] active:translate-y-0.5"
      >
        Say Hello
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#F0A716]">
          <FaArrowRight className="h-3 w-3 -rotate-45 text-[#241A12] transition-transform group-hover:translate-x-0.5" />
        </span>
      </a>

      {/* Social badges — round cream stickers, each wobbles on hover */}
      <div className="mt-11 flex flex-wrap items-center justify-center gap-4 sm:gap-5">
        {CONTACTS.map(({ label, icon: Icon, href }, index) => (
          <motion.a
            key={label}
            href={href}
            target={href.startsWith('mailto') ? '_self' : '_blank'}
            rel="noopener noreferrer"
            aria-label={label}
            title={label}
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.4, delay: 0.15 + index * 0.07, ease: [0.34, 1.56, 0.64, 1] }}
            className="group flex h-14 w-14 items-center justify-center rounded-full border-[3px] border-[#241A12]/10 bg-[#FFFDF8] shadow-[4px_5px_0_rgba(36,26,18,0.24)] transition-transform duration-200 hover:-translate-y-1 hover:rotate-[8deg] active:translate-y-0 sm:h-16 sm:w-16"
          >
            <Icon className="h-6 w-6 text-[#E5301E] transition-colors group-hover:text-[#241A12] sm:h-7 sm:w-7" />
          </motion.a>
        ))}
      </div>
    </motion.div>
  </section>
);

export default PlayfulContact;
