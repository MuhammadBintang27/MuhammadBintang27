import { Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LayoutWeb from "./Components/Professional/Layouts/Layout";
import VersionChooser from "./Pages/VersionChooser";
import MainLayout from "./Pages/Professional/MainLayout";
import InitialLoader from "./Components/Professional/InitialLoader";
import PlayfulLoader from "./Components/Playful/PlayfulLoader";
import SplashGate from "./Components/Elements/SplashGate";
import CinematicScrollProvider from "./Components/Elements/CinematicScrollProvider";

const ProjectDetail = lazy(() => import("./Pages/Professional/ProjectDetail"));
const PlayfulMainLayout = lazy(() => import("./Pages/Playful/PlayfulMainLayout"));
const PlayfulProjectDetail = lazy(() => import("./Pages/Playful/PlayfulProjectDetail"));

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

const App = () => (
  <CinematicScrollProvider>
    <Router>
      <Routes>
        <Route path="/" element={<VersionChooser />} />
        <Route
          path="/calm"
          element={
            <SplashGate Loader={InitialLoader}>
              <MainLayout />
            </SplashGate>
          }
        />
        {/* Legacy route — the "calm" version was previously called "professional" */}
        <Route path="/professional" element={<Navigate to="/calm" replace />} />
        <Route
          path="/projects/:slug"
          element={
            <Suspense fallback={<div className="h-screen bg-[#0f1014]" />}>
              <ProjectDetail />
            </Suspense>
          }
        />
        <Route
          path="/playful"
          element={
            <SplashGate Loader={PlayfulLoader}>
              <Suspense fallback={<div className="h-screen bg-[#F2E1C4]" />}>
                <PlayfulMainLayout />
              </Suspense>
            </SplashGate>
          }
        />
        <Route
          path="/playful/projects/:slug"
          element={
            <Suspense fallback={<div className="h-screen bg-[#F2E1C4]" />}>
              <PlayfulProjectDetail />
            </Suspense>
          }
        />
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </Router>
  </CinematicScrollProvider>
);

export default App;
