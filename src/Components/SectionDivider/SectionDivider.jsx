import React from 'react';
import './SectionDivider.css';

const SectionDivider = ({ text = "EXPLORE MY PROJECTS" }) => {
  return (
    <div className="relative w-full py-4 bg-gradient-to-r from-blue-950 via-blue-900 to-blue-950 overflow-hidden border-t border-b border-blue-800">
      {/* Animated text container */}
      <div className="flex whitespace-nowrap animate-scrolling-text">
        {/* Repeat the text multiple times to create continuous scrolling effect */}
        {[...Array(6)].map((_, index) => (
          <div key={index} className="flex items-center mx-4">
            <span className="text-orange-500 text-2xl font-bold tracking-wider">{text}</span>
            <span className="mx-4 text-yellow-400 text-2xl font-bold">//</span>
          </div>
        ))}
      </div>

      {/* Gradient overlays for smooth fade effect */}
      <div className="absolute top-0 left-0 w-24 h-full bg-gradient-to-r from-blue-950 to-transparent z-10"></div>
      <div className="absolute top-0 right-0 w-24 h-full bg-gradient-to-l from-blue-950 to-transparent z-10"></div>
      
      {/* Subtle glow effect */}
      <div className="absolute inset-0 bg-blue-500/5 blur-sm"></div>
    </div>
  );
};

export default SectionDivider;