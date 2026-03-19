import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CinematicScrollProvider = ({ children }) => {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return undefined;
    }

    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.15,
    });

    const handleLenisScroll = () => {
      ScrollTrigger.update();
    };

    const handleGsapTick = (time) => {
      lenis.raf(time * 1000);
    };

    lenis.on("scroll", handleLenisScroll);
    gsap.ticker.add(handleGsapTick);
    gsap.ticker.lagSmoothing(0);

    // Expose Lenis instance so existing components can trigger smooth programmatic scroll.
    window.__lenis = lenis;

    return () => {
      gsap.ticker.remove(handleGsapTick);
      lenis.off("scroll", handleLenisScroll);
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);

  return children;
};

export default CinematicScrollProvider;
