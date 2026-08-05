import { FaArrowUp } from 'react-icons/fa';

const scrollToTop = () => {
  if (window.__lenis) window.__lenis.scrollTo(0);
  else window.scrollTo({ top: 0, behavior: 'smooth' });
};

// Cream stage continuing straight out of the Contact section — same background
// as the rest of the Playful world, so the red "cat tumpah" drips above land on
// one continuous cream surface with no colour seam. Dark ink on cream.
const PlayfulFooter = () => (
  <footer className="relative overflow-hidden bg-[#F2E1C4] px-4 pb-8 pt-16 sm:px-8">
    {/* Stray droplets settling on the cream — same splatter vocabulary. */}
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      <span className="absolute left-[10%] top-[24%] h-3.5 w-3.5 rounded-full bg-[#E5301E] sm:h-4 sm:w-4" />
      <span className="absolute right-[12%] top-[18%] h-5 w-5 rounded-full bg-[#F0A716] sm:h-6 sm:w-6" />
      <span className="absolute right-[9%] top-[46%] h-2.5 w-2.5 rounded-full bg-[#E5301E]" />
    </div>

    <div className="relative z-10 mx-auto w-full max-w-6xl">

      {/* Big signature wordmark */}
      <h2 className="select-none text-center font-mouse text-[clamp(3.2rem,14vw,9rem)] uppercase leading-[0.9] text-[#FFFDF8] [-webkit-text-stroke:6px_#F0A716] [paint-order:stroke_fill] drop-shadow-[5px_5px_0_rgba(36,26,18,0.14)]">
        Bintang
      </h2>

      {/* Bottom bar */}
      <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-[#241A12]/10 pt-6 sm:flex-row">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#241A12]/50">
          Muhammad Bintang Indra Hidayat
        </p>
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#241A12]/50">
          Portfolio · {new Date().getFullYear()}
        </p>
        <button
          type="button"
          onClick={scrollToTop}
          aria-label="Back to top"
          className="group flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#241A12]/60 transition-colors hover:text-[#E5301E]"
        >
          Back to top
          <FaArrowUp className="h-3 w-3 transition-transform duration-200 group-hover:-translate-y-0.5" />
        </button>
      </div>

    </div>
  </footer>
);

export default PlayfulFooter;
