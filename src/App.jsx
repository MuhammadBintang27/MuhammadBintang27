import { useEffect, useState, lazy, Suspense } from "react";
import { AnimatePresence } from "framer-motion";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LayoutWeb from "./Components/Layouts/Layout";
import Contact from "./Components/Contact/Contact";
import HeroSection from "./Components/ScrollRevealSection/HeroSection";
import MobileHero from "./Components/ScrollRevealSection/MobileHero";
import AchievementsSection from "./Components/Achievements/AchievementsSection";
import ProjectsSection from "./Components/Projects/ProjectsSection";
import Home from "./Pages/Home";
import InitialLoader from "./Components/Elements/InitialLoader";
import CinematicScrollProvider from "./Components/Elements/CinematicScrollProvider";
import LazyMount from "./Components/Elements/LazyMount";

const TechStack = lazy(() => import("./Components/TechStack/TechStack"));
const ProjectDetail = lazy(() => import("./Pages/ProjectDetail"));

// 404 Page Component
const NotFound = () => (
  <LayoutWeb>
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-white mb-4">404</h1>
        <p className="text-xl text-gray-300 mb-8">Page Not Found</p>
        <a
          href="/"
          className="px-6 py-3 bg-yellow-400 text-blue-900 rounded-full hover:bg-yellow-300 transition-colors"
        >
          Back to Home
        </a>
      </div>
    </div>
  </LayoutWeb>
);

const MainLayout = () => (
  <LayoutWeb>
    <main>

      <section className="relative hidden md:block">
        <HeroSection />
      </section>

      <section className="relative md:hidden">
        <MobileHero />
      </section>

      <section className="relative -mt-px">
        <Home />
      </section>

      <section className="relative -mt-px">
        <AchievementsSection />
      </section>

      <section className="relative -mt-px">
        <ProjectsSection />
      </section>

      <section className="relative -mt-px">
        <LazyMount mountOnIdle fallback={<div className="h-screen bg-[#0f1014]" />}>
          <TechStack />
        </LazyMount>
      </section>

      <Contact />
    </main>
  </LayoutWeb>
);

const App = () => {
  // Two-phase reveal: first mount the app behind the still-opaque loader so
  // all the heavy setup (router, Lenis, GSAP, hero) happens off-screen, then
  // lift the curtain once the main thread is idle — keeps the exit smooth.
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

    if (document.readyState === "complete") {
      finishLoading();
    } else {
      window.addEventListener("load", finishLoading, { once: true });
    }

    return () => {
      window.clearTimeout(timeoutId);
      window.clearTimeout(exitTimeoutId);
      window.removeEventListener("load", finishLoading);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = showLoader ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showLoader]);

  return (
    <>
      {/* Loader exits as a curtain lifting over the app; AnimatePresence keeps
          it mounted just long enough to play the exit animation. */}
      <AnimatePresence>{showLoader && <InitialLoader key="initial-loader" />}</AnimatePresence>

      {showApp && (
        <CinematicScrollProvider>
          <Router>
            <Routes>
              <Route path="/" element={<MainLayout />} />
              <Route path="/projects/:slug" element={<Suspense fallback={<div className="h-screen bg-[#0f1014]" />}><ProjectDetail /></Suspense>} />
              <Route path="/404" element={<NotFound />} />
              <Route path="*" element={<Navigate to="/404" replace />} />
            </Routes>
          </Router>
        </CinematicScrollProvider>
      )}
    </>
  );
};

export default App;
