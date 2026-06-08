import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope } from 'react-icons/fa';

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

const Footer = () => (
  <footer className="relative bg-[#0a0c11] px-4 py-12 sm:px-8">
    <div className="mx-auto w-full max-w-6xl">
      <div className="border-t border-white/8 pt-10">
        <div className="flex flex-col items-center gap-6 text-center">

          <div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-[0.24em] text-cyan-100/45">
              Portfolio
            </p>
            <h3 className="text-2xl font-black uppercase tracking-tight text-[#e8e0c2] sm:text-3xl">
              Muhammad Bintang
            </h3>
          </div>

          
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
