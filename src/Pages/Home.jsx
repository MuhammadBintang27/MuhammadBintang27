import React from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import TechStack from '../Components/TechStack/TechStack';
import StarsCanvas from '../Components/Elements/StarBackground';
import ProfileImage from '../../public/FotoProfile.png';
import Navbar from '../Components/Navbar/Navbar';
import AnimatedProfileImage from '../Components/Profile/AnimatedProfileImage';

const Home = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-900 to-black relative overflow-hidden pt-[80px] pb-8 md:pb-0">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl -top-20 -left-20" />
        <div className="absolute w-96 h-96 bg-blue-400/10 rounded-full blur-3xl -bottom-20 -right-20" />
      </div>

      {/* Stars Canvas */}
      <div className="absolute inset-0">
        <StarsCanvas />
      </div>

      {/* Navbar */}
      <Navbar />

      {/* Tech Stack with highest z-index */}
      <div className="relative z-50">
        <TechStack />
      </div>

      <div className="container mx-auto px-4 z-10">
        <div className="max-w-5xl mx-auto">
          {/* Two column layout */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Left column - Text content */}
            <div className="w-full md:w-1/2 text-center md:text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-yellow-400 text-xl mb-4">HOLA, I'M BINTANG 👋</h2>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <TypeAnimation
                  sequence={[
                    'Tech Explorer',
                    2000,
                    'Full Stack Developer',
                    2000,
                    'Problem Solver',
                    2000,
                    'Man United Fan',
                    2000,
                  
                  ]}
                  wrapper="h1"
                  speed={50}
                  className="text-4xl md:text-6xl font-bold text-white mb-6"
                  repeat={Infinity}
                />
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-gray-300 text-lg md:text-xl mb-8 leading-relaxed"
              >
Informatics student at Universitas Syiah Kuala, always excited about tech and creativity. Passionate about exploring AI and building fun, meaningful projects, whether it’s something for school, a team project, or simply a fun side idea. Outside of coding, you'll probably find me talking football, especially anything about Manchester United.              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex justify-center md:justify-start space-x-4"
              >
                <a
                  href="#project"
                  className="bg-yellow-400 text-black px-8 py-3 rounded-full font-medium hover:bg-yellow-300 transition-colors duration-300"
                >
                  View Projects
                </a>
                <a
                  href="#contact"
                  className="border-2 border-yellow-400 text-yellow-400 px-8 py-3 rounded-full font-medium hover:bg-yellow-400 hover:text-black transition-colors duration-300"
                >
                  Contact Me
                </a>
              </motion.div>
            </div>

            {/* Right column - Profile Image */}
            <AnimatedProfileImage profileImage={ProfileImage} />
          </div>
        </div>
      </div>

      {/* Tech Stack with highest z-index */}
      <div className="relative z-50">
        <TechStack />
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-yellow-400 rounded-full flex justify-center">
          <motion.div
            animate={{
              y: [0, 12, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "loop",
            }}
            className="w-2 h-2 bg-yellow-400 rounded-full mt-2"
          />
        </div>
      </motion.div>
    </div>
  );
};

export default Home;
