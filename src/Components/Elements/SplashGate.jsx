import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';

// Mounts `children` behind a still-opaque `Loader`, then lifts the loader
// once the page has settled — reused per version (professional/playful) so
// each one plays its own themed splash instead of a single app-wide loader.
// `preload` (optional) is a lazy route's import() — fetched during the splash so
// the chunk isn't parsed and rendered mid-exit, which made the slide-up stutter.
const SplashGate = ({ Loader, preload, children }) => {
  const [showApp, setShowApp] = useState(false);
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const minimumLoaderDuration = 1200;
    const appMountSettleTime = 450;
    const startTime = performance.now();
    let cancelled = false;
    let timeoutId;
    let exitTimeoutId;

    const finishLoading = () => {
      if (cancelled) return;
      const elapsed = performance.now() - startTime;
      const remainingTime = Math.max(minimumLoaderDuration - elapsed, 0);

      timeoutId = window.setTimeout(() => {
        setShowApp(true);
        exitTimeoutId = window.setTimeout(() => {
          setShowLoader(false);
        }, appMountSettleTime);
      }, remainingTime);
    };

    const pageLoaded =
      document.readyState === 'complete'
        ? Promise.resolve()
        : new Promise((resolve) => window.addEventListener('load', resolve, { once: true }));

    // A failed preload still lifts the splash; lazy() surfaces the error itself.
    Promise.all([pageLoaded, preload?.()]).catch(() => {}).then(finishLoading);

    return () => {
      cancelled = true;
      window.clearTimeout(timeoutId);
      window.clearTimeout(exitTimeoutId);
    };
  }, [preload]);

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
