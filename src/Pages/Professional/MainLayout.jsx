import { lazy } from "react";
import LayoutWeb from "../../Components/Professional/Layouts/Layout";
import Contact from "../../Components/Professional/Contact/Contact";
import HeroSection from "../../Components/Professional/ScrollRevealSection/HeroSection";
import MobileHero from "../../Components/Professional/ScrollRevealSection/MobileHero";
import AchievementsSection from "../../Components/Professional/Achievements/AchievementsSection";
import ProjectsSection from "../../Components/Professional/Projects/ProjectsSection";
import Home from "./Home";
import LazyMount from "../../Components/Elements/LazyMount";

const TechStack = lazy(() => import("../../Components/TechStack/TechStack"));

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

export default MainLayout;
