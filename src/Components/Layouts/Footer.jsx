const Footer = () => {
  return (
    <footer className="text-white text-center py-8">
      {/* Logo */}
      <div className="text-4xl mb-4">⚡</div>
      {/* Tagline */}
      <p className="text-lg mb-6">
      I don’t just write code, I write stories that solve real problems.      </p>
      {/* Social Icons */}
      <div className="flex justify-center space-x-6 mb-6">
        {/* Instagram */}
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:scale-110 transition-transform"
          aria-label="Instagram"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-8 h-8"
            fill="white"
            viewBox="0 0 24 24"
          >
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.17.054 1.96.24 2.414.414a4.92 4.92 0 011.788 1.166 4.922 4.922 0 011.166 1.788c.174.454.36 1.244.414 2.414.058 1.267.07 1.647.07 4.851s-.012 3.584-.07 4.851c-.054 1.17-.24 1.96-.414 2.414a4.93 4.93 0 01-1.166 1.788 4.93 4.93 0 01-1.788 1.166c-.454.174-1.244.36-2.414.414-1.267.058-1.647.07-4.851.07s-3.584-.012-4.851-.07c-1.17-.054-1.96-.24-2.414-.414a4.93 4.93 0 01-1.788-1.166 4.93 4.93 0 01-1.166-1.788c-.174-.454-.36-1.244-.414-2.414C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.851c.054-1.17.24-1.96.414-2.414a4.922 4.922 0 011.166-1.788A4.92 4.92 0 015.601 2.6c.454-.174 1.244-.36 2.414-.414C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.691 0 8.264.013 7.057.072 5.855.13 4.972.325 4.192.633a6.922 6.922 0 00-2.39 1.564 6.927 6.927 0 00-1.564 2.39C.325 5.027.13 5.91.072 7.112.013 8.319 0 8.746 0 12c0 3.255.013 3.681.072 4.888.058 1.202.253 2.085.561 2.865.358.906.878 1.704 1.564 2.39a6.927 6.927 0 002.39 1.564c.78.308 1.663.503 2.865.561 1.207.059 1.634.072 4.888.072s3.681-.013 4.888-.072c1.202-.058 2.085-.253 2.865-.561a6.923 6.923 0 002.39-1.564 6.923 6.923 0 001.564-2.39c.308-.78.503-1.663.561-2.865.059-1.207.072-1.634.072-4.888s-.013-3.681-.072-4.888c-.058-1.202-.253-2.085-.561-2.865a6.922 6.922 0 00-1.564-2.39 6.922 6.922 0 00-2.39-1.564C16.027.325 15.144.13 13.943.072 12.736.013 12.309 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 11-2.881 0 1.44 1.44 0 012.881 0z" />
          </svg>
        </a>
        {/* LinkedIn */}
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:scale-110 transition-transform"
          aria-label="LinkedIn"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-8 h-8"
            fill="white"
            viewBox="0 0 24 24"
          >
            <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.268c-.966 0-1.5-.711-1.5-1.596 0-.909.558-1.596 1.449-1.596.887 0 1.5.687 1.515 1.596 0 .885-.627 1.596-1.464 1.596zm13.5 10.268h-3v-4.5c0-1.197-.843-2-1.88-2-.881 0-1.404.589-1.637 1.158-.085.211-.106.507-.106.802v4.54h-3v-9h3v1.303c.415-.618 1.121-1.303 2.496-1.303 1.845 0 3.127 1.208 3.127 3.818v5.182z" />
          </svg>
        </a>
        {/* Gmail */}
        <a
          href="mailto:example@example.com"
          className="hover:scale-110 transition-transform"
          aria-label="Gmail"
        >
          <img
            src="./gmail.svg"
            alt="Gmail Icon"
            className="w-8 h-8"
          />
        </a>
      </div>
      {/* Credits */}
      <p className="text-sm mb-1">
        Handcrafted by me ©{""}
        <span className="font-semibold">muhammadbintanghidayat</span>
      </p>
    </footer>
  );
};

export default Footer;
