import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';

// Mounts `children` behind a still-opaque `Loader`, then lifts the loader
// once the page has settled — reused per version (professional/playful) so
// each one plays its own themed splash instead of a single app-wide loader.
const SplashGate = ({ Loader, children }) => {
  const [showApp, setShowApp] = useState(false);
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const minimumLoaderDuration = 1200;
    const appMountSettleTime = 450;
    const startTime = performance.now();
    let timeoutId;
    let exitTimeoutId;

    const finishLoading = () => {
      const elapsed = performance.now() - startTime;
      const remainingTime = Math.max(minimumLoaderDuration - elapsed, 0);

      timeoutId = window.setTimeout(() => {
        setShowApp(true);
        exitTimeoutId = window.setTimeout(() => {
          setShowLoader(false);
        }, appMountSettleTime);
      }, remainingTime);
    };

    if (document.readyState === 'complete') {
      finishLoading();
    } else {
      window.addEventListener('load', finishLoading, { once: true });
    }

    return () => {
      window.clearTimeout(timeoutId);
      window.clearTimeout(exitTimeoutId);
      window.removeEventListener('load', finishLoading);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = showLoader ? 'hidden' : 'auto';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showLoader]);

  return (
    <>
      <AnimatePresence>{showLoader && <Loader key="splash-loader" />}</AnimatePresence>
      {showApp && children}
    </>
  );
};

export default SplashGate;
