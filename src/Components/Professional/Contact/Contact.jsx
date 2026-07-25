import { motion } from 'framer-motion';
import ScrollLineDivider from '../SectionDivider/ScrollLineDivider';
import { CONTACTS as contacts } from '../../../data/contactsData';

const Contact = () => (
  <>
    <ScrollLineDivider />

    <section
      id="contact"
      className="relative bg-[linear-gradient(180deg,#101117_0%,#0d0f14_100%)] py-20 sm:py-28"
    >
      <div className="mx-auto w-full max-w-4xl px-4 text-center sm:px-8">

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-cyan-100/62">
            Get in Touch
          </p>

          <h2 className="mb-6 text-[clamp(3rem,9vw,7rem)] font-black leading-[0.92] tracking-[-0.02em] text-[#e8e0c2]">
            Hit Me Up
          </h2>

          <p className="mx-auto mb-16 max-w-[52ch] text-[1rem] leading-relaxed text-white/50 sm:text-[1.05rem]">
            Whether you have a question, want to collaborate, or just want to say hi, feel free to reach out!
          </p>
        </motion.div>

        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8">
          {contacts.map(({ label, icon: Icon, href }, index) => (
            <motion.a
              key={label}
              href={href}
              target={href.startsWith('mailto') ? '_self' : '_blank'}
              rel="noopener noreferrer"
              aria-label={label}
              initial={{ opacity: 0, y: 24, scale: 0.85 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.45, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="group flex h-24 w-24 items-center justify-center rounded-full bg-yellow-400 shadow-[0_0_28px_rgba(250,204,21,0.55)] transition-all duration-300 hover:scale-110 hover:shadow-[0_0_42px_rgba(250,204,21,0.80)] sm:h-28 sm:w-28"
            >
              <Icon className="h-10 w-10 text-[#0f1014] sm:h-12 sm:w-12" />
            </motion.a>
          ))}
        </div>

      </div>
    </section>
  </>
);

export default Contact;
