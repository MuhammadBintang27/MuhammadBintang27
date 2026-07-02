import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope, FaArrowUp } from 'react-icons/fa';

const SOCIAL_LINKS = [
  {
    href: 'https://github.com/MuhammadBintang27',
    label: 'GitHub',
    Icon: FaGithub,
  },
  {
    href: 'https://www.linkedin.com/in/muhammad-bintang-indra-hidayat-b634a2274/',
    label: 'LinkedIn',
    Icon: FaLinkedin,
  },
  {
    href: 'https://www.instagram.com/muhammadbintangindra/',
    label: 'Instagram',
    Icon: FaInstagram,
  },
  {
    href: 'mailto:muhammad.bintang.indra@gmail.com',
    label: 'Email',
    Icon: FaEnvelope,
  },
];

const scrollToTop = () => {
  if (window.__lenis) window.__lenis.scrollTo(0);
  else window.scrollTo({ top: 0, behavior: 'smooth' });
};

const Footer = () => (
  <footer className="relative overflow-hidden bg-[#0a0c11] px-4 pb-8 pt-14 sm:px-8">
    <div className="mx-auto w-full max-w-6xl">

      {/* Bottom bar */}
      <div className=" flex flex-col items-center justify-between gap-4 border-t border-white/8 pt-6 sm:flex-row">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/25">
          Muhammad Bintang Indra Hidayat
        </p>
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/25">
          Portfolio · {new Date().getFullYear()}
        </p>
        <button
          type="button"
          onClick={scrollToTop}
          aria-label="Back to top"
          className="group flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/35 transition-colors hover:text-cyan-200"
        >
          Back to top
          <FaArrowUp className="h-3 w-3 transition-transform duration-200 group-hover:-translate-y-0.5" />
        </button>
      </div>

    </div>
  </footer>
);

export default Footer;