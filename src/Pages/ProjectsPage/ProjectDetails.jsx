import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { IoArrowBack } from "react-icons/io5"; // Tambahkan ikon panah kembali
import StarsCanvas from "../../Components/Elements/StarBackground";
import { motion } from "framer-motion";
import LayoutDetails from "../../Components/Layouts/LayoutDetails";
import ScrollToTop from "../../Components/Elements/ScrollToTop";
import "./style.css"; // Import the shared styles

// Data proyek


const TechBadge = ({ tech }) => (
  <motion.div
    whileHover={{ scale: 1.05, backgroundColor: "rgba(0,0,0,0.4)" }}
    whileTap={{ scale: 0.95 }}
    className="px-4 py-2 bg-black/30 backdrop-blur-sm rounded-full border border-gray-700 hover:border-yellow-400 transition-all duration-300"
  >
    <span className="text-white text-sm font-medium">{tech}</span>
  </motion.div>
);

const ProjectLink = ({ href, icon, text }) => (
  <motion.a
    whileHover={{ scale: 1.05, backgroundColor: "rgba(0,0,0,0.4)" }}
    whileTap={{ scale: 0.95 }}
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center gap-2 px-6 py-3 bg-black/30 backdrop-blur-sm rounded-full border border-gray-700 text-white hover:border-yellow-400 transition-all duration-300 group"
  >
    <motion.span
      whileHover={{ rotate: 360 }}
      transition={{ duration: 0.5 }}
      className="group-hover:text-yellow-400"
    >
      {icon}
    </motion.span>
    <span className="group-hover:text-yellow-400">{text}</span>
  </motion.a>
);

const ProjectDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state;

  // If no state is present, show the not found page
  if (!state) {
    return (
      <LayoutDetails>
        <ScrollToTop />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center min-h-screen"
        >
          <div className="text-center">
            <h1 className="text-4xl text-white mb-4">Project Not Found</h1>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/')}
              className="px-6 py-3 bg-yellow-400 text-blue-900 rounded-full hover:bg-yellow-300 transition-colors"
            >
              Back to Home
            </motion.button>
          </div>
        </motion.div>
      </LayoutDetails>
    );
  }

  const {
    projectName,
    description,
    imgSrc,
    bgColor,
    details,
    techStack = [],
    githubUrl = "",
    websiteUrl = "",
    screenshots = [],
    type = "desktop" // tambahkan type agar bisa otomatisasi
  } = state;

  // Ambil 3 gambar pertama
  const mainScreenshots = screenshots.slice(0, 3);

  return (
    <LayoutDetails bgColor={bgColor}>
      <ScrollToTop />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto px-4 md:px-8 py-20"
      >
        {/* Back button */}
        <motion.button
          whileHover={{ x: -5 }}
          onClick={() => navigate('/')}
          className="mb-8 flex items-center text-white hover:text-yellow-400 transition-colors"
        >
          <IoArrowBack className="mr-2" /> Back to Projects
        </motion.button>

        {/* Project header */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-black/30 rounded-3xl overflow-hidden backdrop-blur-lg border border-gray-700 hover:border-yellow-400/50 transition-all duration-300"
        >
          <div className="p-8 md:p-12">
            {/* Project title and description */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mb-8"
            >
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                {projectName.split(' ')[0]}
              </h1>
              {projectName.split(' ').length > 1 && (
                <p className="text-2xl md:text-3xl text-gray-300 font-medium">
                  {projectName.split(' ').slice(1).join(' ')}
                </p>
              )}
            </motion.div>

            {/* Project Mockup Gallery */}
            {mainScreenshots.length > 0 && (
              <div className="relative mb-8 flex flex-col md:flex-row justify-center items-center gap-8">
                {/* Watermark background text, repeated rows */}
                <div className="pointer-events-none absolute inset-0 flex flex-col justify-center items-center z-0">
                  {Array.from({ length: type === 'mobile' ? 6 : 3 }).map((_, i) => (
                    <span
                      key={i}
                      className="font-extrabold uppercase text-[8vw] md:text-[5vw] text-white/10 whitespace-nowrap leading-none"
                      style={{ letterSpacing: '0.05em', userSelect: 'none' }}
                    >
                      {projectName}
                    </span>
                  ))}
                </div>
                {/* Mockup Layer (with z-10) */}
                {type === "mobile" ? (
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="relative w-full flex flex-col md:flex-row justify-center items-center gap-6 md:gap-8 z-10"
                  >
                    {/* Left mockup */}
                    {mainScreenshots[1] && (
                      <motion.div
                        initial={{ rotate: -12, scale: 0.9 }}
                        animate={{ rotate: -12, scale: 0.9 }}
                        whileHover={{ rotate: 0, scale: 1.05 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="hidden md:block opacity-80"
                      >
                        <img
                          src={mainScreenshots[1].imageUrl}
                          alt={mainScreenshots[1].title}
                          className="w-[140px] h-[297px] md:w-[280px] md:h-[594px] object-cover rounded-2xl shadow-xl"
                        />
                      </motion.div>
                    )}
                    {/* Center mockup */}
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="z-10"
                    >
                      <img
                        src={mainScreenshots[0]?.imageUrl}
                        alt={mainScreenshots[0]?.title}
                        className="w-[140px] h-[297px] md:w-[280px] md:h-[594px] object-cover rounded-2xl shadow-2xl"
                      />
                    </motion.div>
                    {/* Right mockup */}
                    {mainScreenshots[2] && (
                      <motion.div
                        initial={{ rotate: 12, scale: 0.9 }}
                        animate={{ rotate: 12, scale: 0.9 }}
                        whileHover={{ rotate: 0, scale: 1.05 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="hidden md:block opacity-80"
                      >
                        <img
                          src={mainScreenshots[2].imageUrl}
                          alt={mainScreenshots[2].title}
                          className="w-[140px] h-[297px] md:w-[280px] md:h-[594px] object-cover rounded-2xl shadow-xl"
                        />
                      </motion.div>
                    )}
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="relative w-full flex flex-col md:flex-row justify-center items-center gap-8 z-10"
                  >
                    {/* Left mockup */}
                    {mainScreenshots[1] && (
                      <motion.div
                        initial={{ rotate: -12, scale: 0.9 }}
                        animate={{ rotate: -12, scale: 0.9 }}
                        whileHover={{ rotate: 0, scale: 1.05 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="hidden md:block opacity-80"
                      >
                        <div className="w-72 h-44 bg-black rounded-lg p-2 flex items-center justify-center shadow-2xl">
                          <img
                            src={mainScreenshots[1].imageUrl}
                            alt={mainScreenshots[1].title}
                            className="h-full object-contain rounded-md"
                          />
                        </div>
                      </motion.div>
                    )}
                    {/* Center mockup */}
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="z-10"
                    >
                      <div className="w-80 h-52 bg-black rounded-lg p-2 flex items-center justify-center shadow-2xl">
                        <img
                          src={mainScreenshots[0]?.imageUrl}
                          alt={mainScreenshots[0]?.title}
                          className="h-full object-contain rounded-md"
                        />
                      </div>
                    </motion.div>
                    {/* Right mockup */}
                    {mainScreenshots[2] && (
                      <motion.div
                        initial={{ rotate: 12, scale: 0.9 }}
                        animate={{ rotate: 12, scale: 0.9 }}
                        whileHover={{ rotate: 0, scale: 1.05 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="hidden md:block opacity-80"
                      >
                        <div className="w-72 h-44 bg-black rounded-lg p-2 flex items-center justify-center shadow-2xl">
                          <img
                            src={mainScreenshots[2].imageUrl}
                            alt={mainScreenshots[2].title}
                            className="h-full object-contain rounded-md"
                          />
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                )}
              </div>
            )}

            {/* Project details */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="prose prose-lg prose-invert max-w-none"
            >
              <h2 className="text-2xl font-semibold text-white mb-4">Project Details</h2>
              <div className="text-gray-300 space-y-4 whitespace-pre-wrap">
                {details}
              </div>
            </motion.div>

            {/* Tech Stack */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-10 mb-8"
            >
              <h2 className="text-2xl font-semibold text-white mb-4">Tech Stack</h2>
              <div className="flex flex-wrap gap-3">
                {techStack.map((tech, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 * index }}
                  >
                    <TechBadge tech={tech} />
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Project Links */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="flex flex-wrap gap-4 mb-8"
            >
              {githubUrl && (
                <ProjectLink
                  href={githubUrl}
                  icon={
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.73.083-.73 1.205.085 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.605-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12" />
                    </svg>
                  }
                  text="Github Project"
                />
              )}
              {websiteUrl && (
                <ProjectLink
                  href={websiteUrl}
                  icon={
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                  }
                  text="Visit Website"
                />
              )}
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </LayoutDetails>
  );
};

export default ProjectDetails;
