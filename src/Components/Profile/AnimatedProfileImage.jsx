import React from 'react';
import { motion } from 'framer-motion';
import OptimizedImage from '../Elements/OptimizedImage';

const AnimatedProfileImage = ({ profileImage, className = '' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className={`w-full flex justify-center md:justify-end relative ${className}`}
    >
      <style>{`
        @keyframes ringRotate {
          0% { border-color: rgba(234,179,8,0.2); transform: rotateY(0deg); }
          50% { border-color: rgba(96,165,250,0.2); }
          100% { border-color: rgba(234,179,8,0.2); transform: rotateY(360deg); }
        }
        @keyframes cylinderFill {
          0%, 80%, 100% { height: 0%; top: 100%; }
          32%, 48% { height: 100%; top: 0%; }
        }
        @keyframes cylinderGlow {
          0%, 80%, 100% { height: 0%; top: 100%; opacity: 0.8; }
          32%, 48% { height: 100%; top: 0%; opacity: 1; }
        }
      `}</style>

      <div className="relative w-[400px] h-[500px] perspective-1000">
        <OptimizedImage
          src={profileImage}
          alt="Profile"
          className="w-full h-full object-cover rounded-lg relative z-10"
          style={{
            filter: 'drop-shadow(0 0 20px rgba(0,0,0,0.3))',
            objectPosition: 'center top'
          }}
        />

        <div className="absolute inset-0 z-20">
          <div
            className="absolute w-full rounded-lg bg-gradient-to-b from-yellow-400/30 via-blue-400/20 to-transparent"
            style={{
              animation: 'cylinderFill 10s ease-in-out infinite',
              borderBottom: '4px solid rgba(234, 179, 8, 0.3)',
            }}
          />
          <div
            className="absolute left-0 w-[2px] bg-gradient-to-b from-yellow-400 via-blue-400 to-transparent"
            style={{ animation: 'cylinderGlow 10s ease-in-out infinite' }}
          />
        </div>

        <div
          className="absolute inset-0 border-4 rounded-lg"
          style={{
            animation: 'ringRotate 8s linear infinite',
            transformStyle: 'preserve-3d',
          }}
        />
      </div>
    </motion.div>
  );
};

export default AnimatedProfileImage;
