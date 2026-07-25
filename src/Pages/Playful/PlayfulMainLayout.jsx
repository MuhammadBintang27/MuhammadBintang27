import { lazy } from 'react';
import PlayfulLayout from '../../Components/Playful/Layouts/PlayfulLayout';
import PlayfulMarquee from '../../Components/Playful/Layouts/PlayfulMarquee';
import PlayfulHero from '../../Components/Playful/Hero/PlayfulHero';
import PlayfulAbout from '../../Components/Playful/About/PlayfulAbout';
import PlayfulAchievements from '../../Components/Playful/Achievements/PlayfulAchievements';
import PlayfulProjects from '../../Components/Playful/Projects/PlayfulProjects';
import PlayfulContact from '../../Components/Playful/Contact/PlayfulContact';
import LazyMount from '../../Components/Elements/LazyMount';

// Shared 3D Tech Stack — rendered here in its Playful skin (red/yellow keycaps
// on a cream stage). Lazy + idle-mounted so the WebGL context spins up while
// the user is still up top, not as a jank spike mid-scroll.
const TechStack = lazy(() => import('../../Components/TechStack/TechStack'));

// Scaffold — filled in section by section (Achievements, Projects, Tech
// Stack, Contact) as the Playful theme comes together. Nav + Footer are
// already wired via PlayfulLayout.
const PlayfulMainLayout = () => (
  <PlayfulLayout>
    <main>
      <PlayfulHero />
      <PlayfulMarquee />
      <PlayfulAbout />
      <PlayfulAchievements />
      <PlayfulProjects />

      <LazyMount mountOnIdle fallback={<div className="h-screen bg-[#F2E1C4]" />}>
        <TechStack theme="playful" />
      </LazyMount>

      <PlayfulContact />
    </main>
  </PlayfulLayout>
);

export default PlayfulMainLayout;
