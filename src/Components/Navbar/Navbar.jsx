import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrollTimeout, setScrollTimeout] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Clear any existing timeout
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }

      // Always show navbar in home section (top of page)
      if (currentScrollY < window.innerHeight) {
        setIsVisible(true);
        setLastScrollY(currentScrollY);
        return;
      }

      // Show navbar while scrolling
      setIsVisible(true);

      // Set new timeout to hide navbar after scrolling stops
      const timeout = setTimeout(() => {
        setIsVisible(false);
      }, 1500);

      setScrollTimeout(timeout);
      setLastScrollY(currentScrollY);
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
    };
  }, [scrollTimeout, lastScrollY]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed w-full flex justify-center top-6 z-50"
        >
          <nav
            className="bg-black/80 backdrop-blur-md px-6 py-3 rounded-full border border-gray-800 shadow-[0_0_24px_4px_rgba(253,224,71,0.6)]"
            style={{ boxShadow: '0 0 10px 3px rgba(253, 224, 71, 0.7), 0 0 8px 2px rgba(251, 191, 36, 0.5)' }}
          >
            <ul className="flex items-center space-x-8">
              {[
                { name: 'Home', id: 'home' },
                { name: 'Project', id: 'project' },
                { name: 'Gallery', id: 'gallery' }
              ].map((item) => (
                <li key={item.name}>
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className="text-gray-300 hover:text-yellow-400 transition-colors duration-300 cursor-pointer text-sm font-medium"
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Navbar; 