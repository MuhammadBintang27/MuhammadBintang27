import { SiGmail } from 'react-icons/si';
import { FaWhatsapp, FaInstagram, FaGithub, FaLinkedin } from 'react-icons/fa';
import ScrollLineDivider from '../SectionDivider/ScrollLineDivider';

const contacts = [
  {
    label: 'Gmail',
    icon: SiGmail,
    href: 'mailto:muhammad.bintang.indra@gmail.com',
  },
  {
    label: 'WhatsApp',
    icon: FaWhatsapp,
    href: 'https://wa.me/6282261583328',
  },
  {
    label: 'Instagram',
    icon: FaInstagram,
    href: 'https://www.instagram.com/muhammadbintangindra/',
  },
  {
    label: 'GitHub',
    icon: FaGithub,
    href: 'https://github.com/MuhammadBintang27',
  },
  {
    label: 'LinkedIn',
    icon: FaLinkedin,
    href: 'https://www.linkedin.com/in/muhammad-bintang-indra-hidayat-b634a2274/',
  },
];

const Contact = () => (
  <>
    <ScrollLineDivider />

    <section
      id="contact"
      className="relative bg-[linear-gradient(180deg,#101117_0%,#0d0f14_100%)] py-20 sm:py-28"
    >
      <div className="mx-auto w-full max-w-4xl px-4 text-center sm:px-8">

        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-cyan-100/62">
          Get in Touch
        </p>

        <h2 className="mb-6 text-[clamp(3rem,9vw,7rem)] font-black leading-[0.92] tracking-[-0.02em] text-[#e8e0c2]">
          Hit Me Up
        </h2>

        <p className="mx-auto mb-16 max-w-[52ch] text-[1rem] leading-relaxed text-white/50 sm:text-[1.05rem]">
          Whether you have a question, want to collaborate, or just want to say hi, feel free to reach out!
        </p>

        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8">
          {contacts.map(({ label, icon: Icon, href }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('mailto') ? '_self' : '_blank'}
              rel="noopener noreferrer"
              aria-label={label}
              className="group flex h-24 w-24 items-center justify-center rounded-full bg-yellow-400 shadow-[0_0_28px_rgba(250,204,21,0.55)] transition-all duration-300 hover:scale-110 hover:shadow-[0_0_42px_rgba(250,204,21,0.80)] sm:h-28 sm:w-28"
            >
              <Icon className="h-10 w-10 text-[#0f1014] sm:h-12 sm:w-12" />
            </a>
          ))}
        </div>

      </div>
    </section>
  </>
);

export default Contact;
