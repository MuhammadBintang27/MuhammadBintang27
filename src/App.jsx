import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./Pages/Home";
import Projects from "./Pages/ProjectsPage/Projects";
import ProjectDetails from "./Pages/ProjectsPage/ProjectDetails";
import Gallery from "./Pages/GaleriPage/Galeri";
import SectionDivider from "./Components/SectionDivider/SectionDivider";
import LayoutWeb from "./Components/Layouts/Layout";

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
      <section id="home">
        <Home />
      </section>

      <section id="project" className="py-[50px]">
        <Projects />
      </section>

      <section id="gallery" className="py-20">
        <Gallery />
      </section>
    </main>
  </LayoutWeb>
);

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />} />
        <Route path="/project-details" element={<ProjectDetails />} />
        <Route path="/project-details/mobile" element={<ProjectDetails />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
