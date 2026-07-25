import { motion } from 'framer-motion';
import { PROFILE } from '../../../data/profileData';

const NAME = PROFILE.shortName.toUpperCase();

const PlayfulHero = () => (
  <section
    id="home"
    className="relative flex min-h-screen flex-col items-center justify-center gap-6 overflow-hidden bg-[#F2E1C4] px-4 pb-16 pt-36 sm:px-8 lg:gap-0 lg:pb-24 lg:pt-8"
  >
    <div className="relative mx-auto flex w-full max-w-[1800px] justify-center">
      {/* Shrink-wrapped to the wordmark's own rendered width/height, so the
          tags can anchor to its true edges at any viewport size instead of
          guessing against the full section width. */}
      <div className="relative inline-flex h-[36vw] items-center lg:h-[clamp(4.4rem,35vw,60rem)]">
        {/* Left tag — overlaps the leading edge of the wordmark.
            Entrance handled here; the gentle infinite float lives on the
            inner span so the two transitions don't fight. */}
        <motion.span
          initial={{ opacity: 0, scale: 0.7, rotate: -22 }}
          animate={{ opacity: 1, scale: 1, rotate: -10 }}
          transition={{ duration: 0.55, delay: 1.7, ease: [0.34, 1.56, 0.64, 1] }}
          className="absolute left-0 top-1/2 z-30 -translate-x-1/2 -translate-y-1/2"
        >
          <motion.span
            animate={{ y: [0, -8, 0], rotate: [0, -2, 0] }}
            transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut', delay: 0.9 }}
            className="block whitespace-nowrap font-modak text-[clamp(0.68rem,2.7vw,1.85rem)] leading-none tracking-wide text-[#F0A716] [-webkit-text-stroke:2px_#FFFDF8] [paint-order:stroke_fill] drop-shadow-[2px_2px_0_rgba(36,26,18,0.18)] lg:[-webkit-text-stroke:3.5px_#FFFDF8]"
          >
            Software
            <br />
            Engineering
          </motion.span>
        </motion.span>

        {/* Right tag — overlaps the trailing edge of the wordmark */}
        <motion.span
          initial={{ opacity: 0, scale: 0.7, rotate: 22 }}
          animate={{ opacity: 1, scale: 1, rotate: 10 }}
          transition={{ duration: 0.55, delay: 1.8, ease: [0.34, 1.56, 0.64, 1] }}
          className="absolute right-0 top-1/2 z-30 translate-x-1/2 -translate-y-1/2"
        >
          <motion.span
            animate={{ y: [0, -8, 0], rotate: [0, 2, 0] }}
            transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut', delay: 1.3 }}
            className="block whitespace-nowrap text-right font-modak text-[clamp(0.68rem,2.7vw,1.85rem)] leading-none tracking-wide text-[#F0A716] [-webkit-text-stroke:2px_#FFFDF8] [paint-order:stroke_fill] drop-shadow-[2px_2px_0_rgba(36,26,18,0.18)] lg:[-webkit-text-stroke:3.5px_#FFFDF8]"
          >
            Full-Stack Web
            <br />
            &amp; Mobile
            <br />
            Development
          </motion.span>
        </motion.span>

        {/* Wordmark — natural tight kerning, sized via vw */}
        <h1
          aria-label={NAME}
          className="relative z-10 flex items-baseline whitespace-nowrap font-mouse uppercase leading-[0.92] text-[#E5301E] text-[36vw] [-webkit-text-stroke:10px_#FFFDF8] [paint-order:stroke_fill] drop-shadow-[5px_5px_0_rgba(36,26,18,0.16)] lg:text-[clamp(4.4rem,35vw,60rem)] lg:[-webkit-text-stroke:34px_#FFFDF8] lg:drop-shadow-[12px_12px_0_rgba(36,26,18,0.16)]"
        >
          {NAME.split('').map((char, i) => (
            <motion.span
              key={i}
              className="inline-block"
              initial={{ y: '90%', opacity: 0, scale: 0.9 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.95 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              {char}
            </motion.span>
          ))}
        </h1>

        {/* Desktop-only photo overlay — covers the wordmark box (inset-0),
            photo flex-centered so the face tracks the centre of "BINTANG"
            on both axes. Hidden on mobile, where the photo drops below the
            wordmark instead (crav mobile pattern). Asset is provided and
            managed by the user (public/heroplayful.webp). */}
        <div className="pointer-events-none absolute inset-0 z-20 hidden items-center justify-center lg:flex">
          {/* Entrance on the outer wrapper, endless bob on the inner one, so
              the face gently floats up & down once it has settled. */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 44 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 1.55, ease: [0.16, 1, 0.3, 1] }}
            className="-translate-y-[6%]"
          >
            <motion.img
              src="/heroplayful.webp"
              alt={PROFILE.name}
              animate={{ y: [0, -16, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className="w-auto max-w-[90%] object-contain drop-shadow-[10px_14px_0_rgba(36,26,18,0.16)]"
              style={{ height: 'clamp(5.3rem, 38vw, 66rem)' }}
            />
          </motion.div>
        </div>

        {/* Doodles anchored to the wordmark box corners — terminal hugging the
            top-left of BINTANG, bug the bottom-right — so they overlap the
            letters at EVERY size (bigger on mobile, tucked smaller on desktop).
            z-40 keeps them above the photo; the corners keep them off the face. */}
        <motion.img
          src="playful/terminal.webp"
          alt=""
          aria-hidden="true"
          onError={(e) => { e.currentTarget.style.display = 'none'; }}
          animate={{ y: [0, -12, 0], rotate: [-12, -9, -12] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
          className="pointer-events-none absolute left-[-6%] top-[-52%] z-40 w-[34%] max-w-[300px] object-contain lg:left-[-8%] lg:top-[-6%] lg:w-[20%] lg:max-w-[320px]"
        />
        <motion.img
          src="playful/bug.webp"
          alt=""
          aria-hidden="true"
          onError={(e) => { e.currentTarget.style.display = 'none'; }}
          animate={{ y: [0, -12, 0], rotate: [12, 9, 12] }}
          transition={{ duration: 5.6, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
          className="pointer-events-none absolute bottom-[-6%] right-[-6%] z-40 hidden w-[16%] max-w-[260px] object-contain lg:block"
        />
      </div>
    </div>

    {/* Mobile-only photo — sits below the wordmark as its own block, not
        overlapping the letters, matching the crav mobile layout. */}
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 44 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.85, delay: 1.55, ease: [0.16, 1, 0.3, 1] }}
      className="relative z-10 flex w-full justify-center lg:hidden"
    >
      {/* Photo + bug share one bob (animation on the wrapper) so the bug stays
          perched on the photo's bottom-right corner as it floats. */}
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="relative inline-block"
      >
        <img
          src="/heroplayful.webp"
          alt={PROFILE.name}
          className="block h-auto w-auto max-w-[70vw] object-contain drop-shadow-[8px_10px_0_rgba(36,26,18,0.16)]"
          style={{ maxHeight: '42vh' }}
        />
        {/* Bug perched on the photo's bottom-right corner (mobile only —
            parent block is lg:hidden). Auto-hidden if the asset is missing. */}
        <motion.img
          src="playful/bug.webp"
          alt=""
          aria-hidden="true"
          onError={(e) => { e.currentTarget.style.display = 'none'; }}
          animate={{ rotate: [12, 6, 12] }}
          transition={{ duration: 4.6, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
          className="pointer-events-none absolute bottom-[-2%] right-[-14%] w-[42%] max-w-[150px] object-contain"
        />
      </motion.div>
    </motion.div>

    {/* Caption blurbs — pinned to the section bottom on every size (absolute),
        so the wordmark + photo stay centred without the captions skewing them.
        Stacked & centred on mobile; split into left/right columns on desktop. */}
    <div className="absolute inset-x-0 bottom-8 z-10 mx-auto flex w-full max-w-[1600px] flex-col items-center gap-4 px-6 text-center md:flex-row md:items-start md:justify-between md:gap-10 md:px-8 md:text-left">
      <motion.p
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
        className="max-w-sm font-mouse text-xl leading-tight tracking-wide text-[#241A12] sm:text-2xl"
      >
        Blending engineering and creativity into products that feel clear, useful, and human.
      </motion.p>
      <motion.p
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 5.4, repeat: Infinity, ease: 'easeInOut', delay: 1.9 }}
        className="max-w-sm font-mouse text-xl leading-tight tracking-wide text-[#241A12] md:text-right sm:text-2xl"
      >
        Exploring AI workflows, designing clean interfaces, and shipping ideas end-to-end.
      </motion.p>
    </div>
  </section>
);

export default PlayfulHero;
