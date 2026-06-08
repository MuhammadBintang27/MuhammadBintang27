import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const InitialLoader = () => {
  const [progress, setProgress] = useState(1);

  useEffect(() => {
    const duration = 1200;
    const intervalTime = 12;
    const totalSteps = Math.floor(duration / intervalTime);
    let currentStep = 0;

    const intervalId = window.setInterval(() => {
      currentStep += 1;
      const nextProgress = Math.min(
        100,
        Math.round(1 + (99 * currentStep) / totalSteps)
      );
      setProgress(nextProgress);

      if (nextProgress >= 100) {
        window.clearInterval(intervalId);
      }
    }, intervalTime);

    return () => {
      window.clearInterval(intervalId);
    };
  }, []);

  const displayProgress = progress.toString().padStart(2, "0");

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-techstack-theme">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.14),transparent_62%)]" />

      <div className="relative flex flex-col items-center gap-4 px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="text-[120px] leading-none text-white/40 sm:text-[150px]"
          style={{ fontFamily: '"Bodoni Moda", "Times New Roman", serif' }}
        >
          {displayProgress}
        </motion.h1>

        <div className="h-[3px] w-[270px] overflow-hidden rounded-full bg-white/20">
          <motion.div
            className="h-full rounded-full bg-yellow-400"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.12, ease: "easeOut" }}
          />
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="pt-2 text-[13px] uppercase tracking-[0.45em] text-yellow-300/80"
          style={{ fontFamily: '"Space Mono", monospace' }}
        >
          Loading
        </motion.p>
      </div>
    </div>
  );
};

export default InitialLoader;
