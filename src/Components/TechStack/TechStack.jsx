import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const TechStack = () => {
  const [activeLeft, setActiveLeft] = useState(0);
  const [activeRight, setActiveRight] = useState(0);

  const leftTechStack = [
    { name: 'React', icon: '/tech/react.svg' },
    { name: 'Express', icon: '/tech/express.svg' },
    { name: 'Node.js', icon: '/tech/nodedotjs.svg' },
    { name: 'MongoDB', icon: '/tech/mongodb.svg' },
    { name: 'Next.js', icon: '/tech/nextdotjs.svg' },
  ];

  const rightTechStack = [
    { name: 'Laravel', icon: '/tech/laravel.svg' },
    { name: 'TensorFlow', icon: '/tech/tensorflow.svg' },
    { name: 'PyTorch', icon: '/tech/pytorch.svg' },
    { name: 'Flutter', icon: '/tech/flutter.svg' },
    { name: 'Kotlin', icon: '/tech/kotlin.svg' },
  ];

  useEffect(() => {
    // Animate left stack
    const leftInterval = setInterval(() => {
      setActiveLeft((current) => (current + 1) % leftTechStack.length);
    }, 2000);

    // Animate right stack with offset
    const rightInterval = setInterval(() => {
      setActiveRight((current) => (current + 1) % rightTechStack.length);
    }, 2000);

    return () => {
      clearInterval(leftInterval);
      clearInterval(rightInterval);
    };
  }, []);

  return (
    <>
      {/* Left Stack */}
      <div className="absolute left-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-8">
        {leftTechStack.map((tech, index) => (
          <motion.div
            key={tech.name}
            initial={{ opacity: 0, x: -50 }}
            animate={{ 
              opacity: 1, 
              x: 0,
              y: activeLeft === index ? -10 : 0,
              scale: activeLeft === index ? 1.1 : 1,
            }}
            transition={{
              y: {
                duration: 1,
                ease: "easeInOut"
              },
              scale: {
                duration: 0.3
              }
            }}
            className="relative group"
          >
            <div className={`w-12 h-12 bg-black/20 backdrop-blur-sm rounded-xl p-2 flex items-center justify-center border transition-colors duration-300 
              ${activeLeft === index ? 'border-yellow-400/50' : 'border-gray-800'}`}>
              <img 
                src={tech.icon} 
                alt={tech.name} 
                className="w-8 h-8 brightness-0 invert" 
              />
            </div>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: activeLeft === index ? 1 : 0 }}
              transition={{ duration: 0.2 }}
              className="absolute left-full ml-2 top-1/2 -translate-y-1/2 bg-black/80 backdrop-blur-sm px-2 py-1 rounded text-xs text-white pointer-events-none"
            >
              {tech.name}
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Right Stack */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-8">
        {rightTechStack.map((tech, index) => (
          <motion.div
            key={tech.name}
            initial={{ opacity: 0, x: 50 }}
            animate={{ 
              opacity: 1, 
              x: 0,
              y: activeRight === index ? -10 : 0,
              scale: activeRight === index ? 1.1 : 1,
            }}
            transition={{
              y: {
                duration: 1,
                ease: "easeInOut"
              },
              scale: {
                duration: 0.3
              }
            }}
            className="relative group"
          >
            <div className={`w-12 h-12 bg-black/20 backdrop-blur-sm rounded-xl p-2 flex items-center justify-center border transition-colors duration-300 
              ${activeRight === index ? 'border-yellow-400/50' : 'border-gray-800'}`}>
              <img 
                src={tech.icon} 
                alt={tech.name} 
                className="w-8 h-8 brightness-0 invert" 
              />
            </div>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: activeRight === index ? 1 : 0 }}
              transition={{ duration: 0.2 }}
              className="absolute right-full mr-2 top-1/2 -translate-y-1/2 bg-black/80 backdrop-blur-sm px-2 py-1 rounded text-xs text-white pointer-events-none"
            >
              {tech.name}
            </motion.div>
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default TechStack;