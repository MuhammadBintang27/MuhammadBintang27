import { useEffect, useState, lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LayoutWeb from "./Components/Layouts/Layout";
import Contact from "./Components/Contact/Contact";
import HeroSection from "./Components/ScrollRevealSection/HeroSection";
import AchievementsSection from "./Components/Achievements/AchievementsSection";
import ProjectsSection from "./Components/Projects/ProjectsSection";
import Home from "./Pages/Home";
import InitialLoader from "./Components/Elements/InitialLoader";
import CinematicScrollProvider from "./Components/Elements/CinematicScrollProvider";

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
        <Suspense fallback={<div className="h-screen bg-[#0f1014]" />}>
          <TechStack />
        </Suspense>
      </section>

      <Contact />
    </main>
  </LayoutWeb>
);

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Preload heavy lazy chunks during the loader screen so they're ready when needed
  useEffect(() => {
    import("./Components/TechStack/TechStack");
    import("./Pages/ProjectDetail");
  }, []);

  useEffect(() => {
    const minimumLoaderDuration = 1200;
    const startTime = performance.now();
    let timeoutId;

    const finishLoading = () => {
      const elapsed = performance.now() - startTime;
      const remainingTime = Math.max(minimumLoaderDuration - elapsed, 0);

      timeoutId = window.setTimeout(() => {
        setIsLoading(false);
      }, remainingTime);
    };

    if (document.readyState === "complete") {
      finishLoading();
    } else {
      window.addEventListener("load", finishLoading, { once: true });
    }

    return () => {
      window.clearTimeout(timeoutId);
      window.removeEventListener("load", finishLoading);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = isLoading ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isLoading]);

  if (isLoading) {
    return <InitialLoader />;
  }

  return (
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
  );
};

export default App;
