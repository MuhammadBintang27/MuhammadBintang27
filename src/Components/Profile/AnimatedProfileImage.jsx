import React from 'react';
import { motion } from 'framer-motion';
import OptimizedImage from '../Elements/OptimizedImage';

const AnimatedProfileImage = ({ profileImage }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="w-full md:w-1/2 flex justify-center md:justify-end relative"
    >
      {/* Animated geometric background */}
      <div className="absolute inset-0 overflow-hidden" style={{ zIndex: -1 }}>
        {/* Diagonal lines */}
        {[...Array(6)].map((_, index) => (
          <motion.div
            key={`line-${index}`}
            className="absolute h-[1px] w-[200%] bg-gradient-to-r from-yellow-400/20 via-blue-400/20 to-transparent"
            style={{
              top: `${index * 20}%`,
              left: '-50%',
              transform: 'rotate(-35deg)',
            }}
            initial={{ x: -100, opacity: 0 }}
            animate={{ 
              x: 0,
              opacity: [0, 1, 1, 0],
              transition: {
                duration: 3,
                delay: index * 0.2,
                repeat: Infinity,
                repeatType: "reverse"
              }
            }}
          />
        ))}
        
        {/* Floating shapes */}
        <motion.div
          className="absolute top-20 -left-10 w-20 h-20 border border-yellow-400/20 rounded-full"
          animate={{
            y: [0, 20, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-40 -right-10 w-32 h-32 border border-blue-400/20"
          style={{ transform: 'rotate(45deg)' }}
          animate={{
            rotate: 405,
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Profile Image Container */}
      <div className="relative w-[400px] h-[500px] perspective-1000">
        {/* Static Image */}
        <OptimizedImage
          src={profileImage}
          alt="Profile"
          className="w-full h-full object-cover rounded-lg relative z-10"
          style={{
            filter: 'drop-shadow(0 0 20px rgba(0,0,0,0.3))',
            objectPosition: 'center top'
          }}
        />

        {/* Magic Cylinder Effect */}
        <motion.div
          className="absolute inset-0 z-20"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {},
          }}
        >
          {/* Front cylinder half */}
          <motion.div
            className="absolute inset-0 w-full rounded-lg bg-gradient-to-b from-yellow-400/30 via-blue-400/20 to-transparent backdrop-blur-sm"
            initial={{ height: "0%", top: "100%" }}
            animate={{
              height: ["0%", "100%", "100%", "0%"],
              top: ["100%", "0%", "0%", "100%"]
            }}
            transition={{
              duration: 8,
              times: [0, 0.4, 0.6, 1],
              repeat: Infinity,
              repeatDelay: 2
            }}
            style={{
              borderBottom: "4px solid rgba(234, 179, 8, 0.3)",
            }}
          />

          {/* Left side glow */}
          <motion.div
            className="absolute left-0 w-[2px] bg-gradient-to-b from-yellow-400 via-blue-400 to-transparent"
            initial={{ height: "0%", top: "100%" }}
            animate={{
              height: ["0%", "100%", "100%", "0%"],
              top: ["100%", "0%", "0%", "100%"],
              opacity: [0.8, 1, 1, 0.8]
            }}
            transition={{
              duration: 8,
              times: [0, 0.4, 0.6, 1],
              repeat: Infinity,
              repeatDelay: 2
            }}
          />

          {/* Right side glow */}
          <motion.div
            className="absolute right-0 w-[2px] bg-gradient-to-b from-yellow-400 via-blue-400 to-transparent"
            initial={{ height: "0%", top: "100%" }}
            animate={{
              height: ["0%", "100%", "100%", "0%"],
              top: ["100%", "0%", "0%", "100%"],
              opacity: [0.8, 1, 1, 0.8]
            }}
            transition={{
              duration: 8,
              times: [0, 0.4, 0.6, 1],
              repeat: Infinity,
              repeatDelay: 2
            }}
          />

          {/* Sparkle effects */}
          <motion.div
            className="absolute inset-0 overflow-hidden"
            animate={{
              background: [
                "radial-gradient(circle at 30% 40%, rgba(234, 179, 8, 0.2) 0%, transparent 8%)",
                "radial-gradient(circle at 70% 60%, rgba(96, 165, 250, 0.2) 0%, transparent 8%)",
                "radial-gradient(circle at 50% 50%, rgba(234, 179, 8, 0.2) 0%, transparent 8%)",
              ]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
        </motion.div>

        {/* Rotating ring effect */}
        <motion.div
          className="absolute inset-0 border-4 border-yellow-400/20 rounded-lg"
          animate={{
            rotateY: [0, 360],
            borderColor: ["rgba(234, 179, 8, 0.2)", "rgba(96, 165, 250, 0.2)", "rgba(234, 179, 8, 0.2)"]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            transformStyle: "preserve-3d"
          }}
        />
      </div>
    </motion.div>
  );
};

export default AnimatedProfileImage;