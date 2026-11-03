import { lazy, useEffect, useState } from "react";
import LayoutWeb from "../../Components/Professional/Layouts/Layout";
import Contact from "../../Components/Professional/Contact/Contact";
import HeroSection from "../../Components/Professional/ScrollRevealSection/HeroSection";
import MobileHero from "../../Components/Professional/ScrollRevealSection/MobileHero";
import AchievementsSection from "../../Components/Professional/Achievements/AchievementsSection";
import ProjectsSection from "../../Components/Professional/Projects/ProjectsSection";
import Home from "./Home";
import LazyMount from "../../Components/Elements/LazyMount";

const TechStack = lazy(() => import("../../Components/TechStack/TechStack"));

const desktopQuery = window.matchMedia("(min-width: 768px)");

const MainLayout = () => {
  const [isDesktop, setIsDesktop] = useState(desktopQuery.matches);

  useEffect(() => {
    const onChange = (e) => setIsDesktop(e.matches);
    desktopQuery.addEventListener("change", onChange);
    return () => desktopQuery.removeEventListener("change", onChange);
  }, []);

  return (
    <LayoutWeb>
      <main>

        {/* Mount only the hero that fits, so the hidden one's scroll-scrubbed
            timeline doesn't run on every scroll. */}
        <section className="relative">
          {isDesktop ? <HeroSection /> : <MobileHero />}
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
};

export default MainLayout;
